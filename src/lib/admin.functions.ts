import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

async function requireAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin only");
}

// Returns whether current user is admin (UI gating).
export const isAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: !!data };
  });

// Bootstrap: makes the calling user an admin IF no admin exists yet.
export const claimAdminIfFirst = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) > 0) return { claimed: false, reason: "An admin already exists." };
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error(error.message);
    return { claimed: true };
  });

// ─────────── Dashboard / analytics ───────────

export const adminDashboardStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.supabase, context.userId);

    const now = new Date();
    const startOfDay = new Date(now); startOfDay.setHours(0, 0, 0, 0);
    const since7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const since30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [orders30, productsAll, customersTotal, reviewsPending, qPending, lowStock, searchToday] = await Promise.all([
      supabaseAdmin.from("orders").select("id, total, status, created_at, user_id").gte("created_at", since30d.toISOString()),
      supabaseAdmin.from("products").select("id, name, stock, price, image_url, slug"),
      supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("product_reviews").select("id", { count: "exact", head: true }).eq("status", "pending"),
      supabaseAdmin.from("product_questions").select("id", { count: "exact", head: true }).eq("status", "pending"),
      supabaseAdmin.from("products").select("id, name, slug, stock, image_url").lt("stock", 5).order("stock", { ascending: true }).limit(10),
      supabaseAdmin.from("search_queries").select("id", { count: "exact", head: true }).gte("created_at", since7d.toISOString()),
    ]);

    const orders = orders30.data ?? [];
    const sum = (arr: any[]) => arr.reduce((s, o) => s + Number(o.total ?? 0), 0);

    const ordersToday = orders.filter((o: any) => new Date(o.created_at) >= startOfDay);
    const orders7d = orders.filter((o: any) => new Date(o.created_at) >= since7d);

    // Revenue by day for the last 14 days
    const dayMap = new Map<string, { revenue: number; orders: number }>();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const k = d.toISOString().slice(0, 10);
      dayMap.set(k, { revenue: 0, orders: 0 });
    }
    orders.forEach((o: any) => {
      const k = o.created_at.slice(0, 10);
      const entry = dayMap.get(k);
      if (entry) {
        entry.revenue += Number(o.total ?? 0);
        entry.orders += 1;
      }
    });
    const revenueSeries = Array.from(dayMap.entries()).map(([date, v]) => ({ date, revenue: v.revenue, orders: v.orders }));

    // Status breakdown
    const statusMap = new Map<string, number>();
    orders.forEach((o: any) => statusMap.set(o.status, (statusMap.get(o.status) ?? 0) + 1));
    const ordersByStatus = Array.from(statusMap.entries()).map(([status, count]) => ({ status, count }));

    // Top products by units sold (last 30d)
    const orderIds = orders.map((o: any) => o.id);
    const { data: items } = orderIds.length
      ? await supabaseAdmin
          .from("order_items")
          .select("product_id, product_name, quantity, line_total")
          .in("order_id", orderIds)
      : { data: [] as any[] };
    const productAgg = new Map<string, { name: string; units: number; revenue: number }>();
    (items ?? []).forEach((it: any) => {
      const key = it.product_id ?? it.product_name;
      const cur = productAgg.get(key) ?? { name: it.product_name, units: 0, revenue: 0 };
      cur.units += it.quantity;
      cur.revenue += Number(it.line_total ?? 0);
      productAgg.set(key, cur);
    });
    const topProducts = Array.from(productAgg.values())
      .sort((a, b) => b.units - a.units)
      .slice(0, 8);

    return {
      kpi: {
        revenue_today: sum(ordersToday),
        revenue_7d: sum(orders7d),
        revenue_30d: sum(orders),
        orders_today: ordersToday.length,
        orders_7d: orders7d.length,
        orders_30d: orders.length,
        aov_30d: orders.length ? sum(orders) / orders.length : 0,
        customers_total: customersTotal.count ?? 0,
        products_total: (productsAll.data ?? []).length,
        reviews_pending: reviewsPending.count ?? 0,
        questions_pending: qPending.count ?? 0,
        searches_7d: searchToday.count ?? 0,
      },
      revenue_series: revenueSeries,
      orders_by_status: ordersByStatus,
      top_products: topProducts,
      low_stock: lowStock.data ?? [],
    };
  });

// ─────────── Orders ───────────

export const adminListOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.supabase, context.userId);
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("id, order_number, contact_name, contact_phone, city, province, total, status, payment_method, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminGetOrder = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.supabase, context.userId);
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("*, order_items(*), order_status_history(status, note, created_at)")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return order;
  });

export const adminUpdateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]),
      })
      .parse(input)
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.supabase, context.userId);
    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ─────────── Products ───────────

export const adminListProducts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.supabase, context.userId);
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("id, slug, name, brand, price, old_price, stock, featured, badge, image_url, category_id, avg_rating, review_count, categories(slug,name)")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

const UpsertProductSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, hyphens only"),
  name: z.string().min(1).max(200),
  brand: z.string().max(120).optional().nullable(),
  description: z.string().max(4000).optional().nullable(),
  price: z.number().min(0),
  old_price: z.number().min(0).optional().nullable(),
  image_url: z.string().max(500).optional().nullable(),
  badge: z.string().max(40).optional().nullable(),
  stock: z.number().int().min(0),
  featured: z.boolean(),
  category_id: z.string().uuid().nullable(),
});

export const adminUpsertProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => UpsertProductSchema.parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.supabase, context.userId);
    const { error } = await supabaseAdmin.from("products").upsert(data, { onConflict: "slug" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.supabase, context.userId);
    const { error } = await supabaseAdmin.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ─────────── Reviews moderation ───────────

export const adminListReviews = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ status: z.enum(["pending", "approved", "rejected", "all"]).optional().default("all") }).parse(input ?? {}))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.supabase, context.userId);
    let q = supabaseAdmin
      .from("product_reviews")
      .select("id, product_id, user_id, rating, title, body, verified_purchase, status, created_at, products(name, slug), profiles(full_name)")
      .order("created_at", { ascending: false })
      .limit(200);
    if (data.status !== "all") q = q.eq("status", data.status);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const adminSetReviewStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), status: z.enum(["pending", "approved", "rejected"]) }).parse(input)
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.supabase, context.userId);
    const { error } = await supabaseAdmin.from("product_reviews").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
