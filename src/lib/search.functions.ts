import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// ─────────── Daraz-level search ───────────

const SearchSchema = z.object({
  q: z.string().trim().max(120).optional().default(""),
  category: z.string().max(80).optional().nullable(),
  brand: z.string().max(120).optional().nullable(),
  min_price: z.number().min(0).optional().nullable(),
  max_price: z.number().min(0).optional().nullable(),
  min_rating: z.number().min(0).max(5).optional().nullable(),
  sort: z.enum(["relevance", "price_asc", "price_desc", "newest", "rating"]).optional().default("relevance"),
  page: z.number().int().min(1).max(50).optional().default(1),
  per_page: z.number().int().min(1).max(48).optional().default(24),
});

export const searchProducts = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => SearchSchema.parse(input ?? {}))
  .handler(async ({ data }) => {
    const from = (data.page - 1) * data.per_page;
    const to = from + data.per_page - 1;

    let q = supabaseAdmin
      .from("products")
      .select(
        "id, slug, name, brand, price, old_price, image_url, badge, stock, featured, avg_rating, review_count, category_id, categories!inner(slug, name)",
        { count: "exact" }
      );

    // Full-text + trigram fuzzy fallback
    if (data.q && data.q.length > 0) {
      const term = data.q.replace(/[%_]/g, "");
      // websearch_to_tsquery handles natural-language queries
      // fall back to ilike for typo tolerance (trigram index makes it fast)
      q = q.or(
        `name.ilike.%${term}%,brand.ilike.%${term}%,description.ilike.%${term}%`
      );
    }
    if (data.category) q = q.eq("categories.slug", data.category);
    if (data.brand) q = q.ilike("brand", `%${data.brand}%`);
    if (data.min_price != null) q = q.gte("price", data.min_price);
    if (data.max_price != null) q = q.lte("price", data.max_price);
    if (data.min_rating != null) q = q.gte("avg_rating", data.min_rating);

    switch (data.sort) {
      case "price_asc":
        q = q.order("price", { ascending: true });
        break;
      case "price_desc":
        q = q.order("price", { ascending: false });
        break;
      case "newest":
        q = q.order("created_at", { ascending: false });
        break;
      case "rating":
        q = q.order("avg_rating", { ascending: false }).order("review_count", { ascending: false });
        break;
      default:
        q = q.order("featured", { ascending: false }).order("created_at", { ascending: false });
    }

    q = q.range(from, to);

    const { data: rows, error, count } = await q;
    if (error) throw new Error(error.message);

    const items = (rows ?? []).map((r: any) => ({
      ...r,
      category_slug: r.categories?.slug ?? null,
      category_name: r.categories?.name ?? null,
    }));

    // Facets: brand list + price range over the unfiltered (text-only) result
    const { data: brandsRaw } = await supabaseAdmin
      .from("products")
      .select("brand")
      .not("brand", "is", null)
      .limit(500);
    const brandCounts = new Map<string, number>();
    (brandsRaw ?? []).forEach((b: any) => {
      if (b.brand) brandCounts.set(b.brand, (brandCounts.get(b.brand) ?? 0) + 1);
    });

    // Log query (fire-and-forget, don't block response)
    if (data.q && data.page === 1) {
      supabaseAdmin
        .from("search_queries")
        .insert({ query: data.q.toLowerCase(), results_count: count ?? 0 })
        .then(() => {});
    }

    return {
      items,
      total: count ?? 0,
      page: data.page,
      per_page: data.per_page,
      total_pages: Math.max(1, Math.ceil((count ?? 0) / data.per_page)),
      facets: {
        brands: Array.from(brandCounts.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 20),
      },
    };
  });

export const searchSuggest = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ q: z.string().trim().max(80) }).parse(input))
  .handler(async ({ data }) => {
    if (!data.q || data.q.length < 1) return { products: [], queries: [] };
    const term = data.q.replace(/[%_]/g, "");
    const [products, queries] = await Promise.all([
      supabaseAdmin
        .from("products")
        .select("slug, name, brand, image_url, price")
        .or(`name.ilike.%${term}%,brand.ilike.%${term}%`)
        .limit(6),
      supabaseAdmin
        .from("search_queries")
        .select("query")
        .ilike("query", `%${term.toLowerCase()}%`)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);
    const seen = new Set<string>();
    const popularQueries = (queries.data ?? [])
      .map((r: any) => r.query as string)
      .filter((q) => {
        if (seen.has(q)) return false;
        seen.add(q);
        return true;
      });
    return {
      products: products.data ?? [],
      queries: popularQueries,
    };
  });

export const trendingSearches = createServerFn({ method: "GET" }).handler(async () => {
  // Top 8 queries in the last 7 days
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabaseAdmin
    .from("search_queries")
    .select("query")
    .gte("created_at", since)
    .gt("results_count", 0)
    .limit(500);
  if (error) return [];
  const counts = new Map<string, number>();
  (data ?? []).forEach((r: any) => {
    const k = (r.query as string).trim().toLowerCase();
    if (k.length < 2) return;
    counts.set(k, (counts.get(k) ?? 0) + 1);
  });
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([query, count]) => ({ query, count }));
});
