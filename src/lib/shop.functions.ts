import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// ─────────── Public reads (admin client — RLS open for select) ───────────

export type DBCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
};

export type DBProduct = {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  description: string | null;
  price: number;
  old_price: number | null;
  image_url: string | null;
  badge: string | null;
  stock: number;
  featured: boolean;
  category_id: string | null;
  category_slug?: string | null;
  category_name?: string | null;
};

export const listCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("id, slug, name, description, image_url, sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as DBCategory[];
});

export const listProducts = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z
      .object({
        categorySlug: z.string().optional(),
        featured: z.boolean().optional(),
        limit: z.number().min(1).max(100).optional(),
      })
      .parse(input ?? {})
  )
  .handler(async ({ data }) => {
    let q = supabaseAdmin
      .from("products")
      .select("id, slug, name, brand, description, price, old_price, image_url, badge, stock, featured, category_id, categories!inner(slug, name)")
      .order("created_at", { ascending: false });

    if (data.featured) q = q.eq("featured", true);
    if (data.limit) q = q.limit(data.limit);

    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);

    let products = (rows ?? []).map((r: any) => ({
      ...r,
      category_slug: r.categories?.slug ?? null,
      category_name: r.categories?.name ?? null,
    })) as DBProduct[];

    if (data.categorySlug) {
      products = products.filter((p) => p.category_slug === data.categorySlug);
    }
    return products;
  });

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("products")
      .select("id, slug, name, brand, description, price, old_price, image_url, badge, stock, featured, category_id, categories(slug, name)")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return null;
    return {
      ...row,
      category_slug: (row as any).categories?.slug ?? null,
      category_name: (row as any).categories?.name ?? null,
    } as DBProduct;
  });

// ─────────── Place an order (guest or authenticated) ───────────

const OrderItemSchema = z.object({
  product_id: z.string().uuid().nullable().optional(),
  product_name: z.string().min(1).max(255),
  product_slug: z.string().max(255).nullable().optional(),
  unit_price: z.number().min(0),
  quantity: z.number().int().min(1).max(99),
});

const CreateOrderSchema = z.object({
  contact_name: z.string().min(1).max(120),
  contact_phone: z.string().min(7).max(30),
  contact_email: z.string().email().optional().nullable(),
  address_line1: z.string().min(3).max(255),
  address_line2: z.string().max(255).optional().nullable(),
  city: z.string().min(1).max(100),
  province: z.string().min(1).max(100),
  postal_code: z.string().max(20).optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
  shipping: z.number().min(0).default(0),
  items: z.array(OrderItemSchema).min(1).max(50),
});

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => CreateOrderSchema.parse(input))
  .handler(async ({ data }) => {
    // recompute totals server-side; never trust client
    const items = data.items.map((it) => ({
      ...it,
      line_total: Number((it.unit_price * it.quantity).toFixed(2)),
    }));
    const subtotal = items.reduce((s, it) => s + it.line_total, 0);
    const shipping = subtotal >= 2500 ? 0 : data.shipping ?? 200;
    const total = subtotal + shipping;

    // Try to attach user_id if a bearer token was provided
    let userId: string | null = null;
    try {
      const { getRequest } = await import("@tanstack/react-start/server");
      const auth = getRequest()?.headers.get("authorization");
      const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
      if (token) {
        const { data: claims } = await supabaseAdmin.auth.getClaims(token);
        userId = claims?.claims?.sub ?? null;
      }
    } catch {
      /* anonymous order */
    }

    const { data: order, error: orderErr } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: userId,
        contact_name: data.contact_name,
        contact_phone: data.contact_phone,
        contact_email: data.contact_email ?? null,
        address_line1: data.address_line1,
        address_line2: data.address_line2 ?? null,
        city: data.city,
        province: data.province,
        postal_code: data.postal_code ?? null,
        notes: data.notes ?? null,
        subtotal,
        shipping,
        total,
        payment_method: "cod",
        status: "pending",
      })
      .select("id, order_number, total, status, created_at")
      .single();
    if (orderErr || !order) throw new Error(orderErr?.message ?? "Order failed");

    const { error: itemsErr } = await supabaseAdmin.from("order_items").insert(
      items.map((it) => ({
        order_id: order.id,
        product_id: it.product_id ?? null,
        product_name: it.product_name,
        product_slug: it.product_slug ?? null,
        unit_price: it.unit_price,
        quantity: it.quantity,
        line_total: it.line_total,
      }))
    );
    if (itemsErr) throw new Error(itemsErr.message);

    return {
      id: order.id,
      order_number: order.order_number as string,
      total: Number(order.total),
      status: order.status as string,
      created_at: order.created_at as string,
    };
  });

// ─────────── Authenticated order reads ───────────

export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("orders")
      .select("id, order_number, total, status, created_at, contact_name, city")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getMyOrder = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: order, error } = await context.supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return order;
  });
