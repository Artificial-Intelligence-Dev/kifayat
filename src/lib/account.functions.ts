import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// ─────────── Addresses ───────────

const AddressSchema = z.object({
  id: z.string().uuid().optional(),
  label: z.string().trim().min(1).max(40).default("Home"),
  full_name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(7).max(30),
  line1: z.string().trim().min(3).max(255),
  line2: z.string().trim().max(255).optional().nullable(),
  city: z.string().trim().min(1).max(80),
  province: z.string().trim().min(1).max(80),
  postal_code: z.string().trim().max(20).optional().nullable(),
  is_default: z.boolean().optional().default(false),
});

export const listAddresses = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("addresses")
      .select("*")
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const upsertAddress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => AddressSchema.parse(input))
  .handler(async ({ data, context }) => {
    const row = { ...data, user_id: context.userId };
    const { data: saved, error } = await context.supabase
      .from("addresses")
      .upsert(row)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true, id: saved.id };
  });

export const deleteAddress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("addresses").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const setDefaultAddress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("addresses")
      .update({ is_default: true })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ─────────── Wishlist ───────────

export const listWishlist = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("wishlist")
      .select("id, product_id, created_at, products(id, slug, name, brand, price, old_price, image_url, badge, stock, avg_rating, review_count, featured, category_id, categories(slug, name))")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r: any) => ({
      wishlist_id: r.id,
      added_at: r.created_at,
      product: r.products
        ? {
            ...r.products,
            category_slug: r.products.categories?.slug ?? null,
            category_name: r.products.categories?.name ?? null,
          }
        : null,
    }));
  });

export const toggleWishlist = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ product_id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: existing } = await context.supabase
      .from("wishlist")
      .select("id")
      .eq("user_id", context.userId)
      .eq("product_id", data.product_id)
      .maybeSingle();
    if (existing) {
      const { error } = await context.supabase.from("wishlist").delete().eq("id", existing.id);
      if (error) throw new Error(error.message);
      return { added: false };
    }
    const { error } = await context.supabase
      .from("wishlist")
      .insert({ user_id: context.userId, product_id: data.product_id });
    if (error) throw new Error(error.message);
    return { added: true };
  });

export const isWishlisted = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ product_id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: row } = await context.supabase
      .from("wishlist")
      .select("id")
      .eq("user_id", context.userId)
      .eq("product_id", data.product_id)
      .maybeSingle();
    return { wishlisted: !!row };
  });

// ─────────── Recently viewed ───────────

export const recordRecentlyViewed = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ product_id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await context.supabase
      .from("recently_viewed")
      .upsert(
        { user_id: context.userId, product_id: data.product_id, viewed_at: new Date().toISOString() },
        { onConflict: "user_id,product_id" }
      );
    // trim to last 30
    const { data: rows } = await context.supabase
      .from("recently_viewed")
      .select("id, viewed_at")
      .order("viewed_at", { ascending: false });
    if (rows && rows.length > 30) {
      const toDelete = rows.slice(30).map((r: any) => r.id);
      await context.supabase.from("recently_viewed").delete().in("id", toDelete);
    }
    return { ok: true };
  });

export const listRecentlyViewed = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("recently_viewed")
      .select("viewed_at, products(id, slug, name, brand, price, old_price, image_url, badge, stock, avg_rating, review_count)")
      .order("viewed_at", { ascending: false })
      .limit(12);
    if (error) throw new Error(error.message);
    return (data ?? []).map((r: any) => ({ viewed_at: r.viewed_at, product: r.products })).filter((r: any) => r.product);
  });
