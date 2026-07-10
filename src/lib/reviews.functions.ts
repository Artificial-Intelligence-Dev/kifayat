import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// ─────────── Reviews ───────────

export const listProductReviews = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ product_id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { data: rows, error } = await supabaseAdmin
      .from("product_reviews")
      .select("id, user_id, rating, title, body, verified_purchase, helpful_count, created_at, profiles(full_name)")
      .eq("product_id", data.product_id)
      .eq("status", "approved")
      .order("helpful_count", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);
    const reviews = (rows ?? []).map((r: any) => ({
      id: r.id,
      rating: r.rating,
      title: r.title,
      body: r.body,
      verified_purchase: r.verified_purchase,
      helpful_count: r.helpful_count,
      created_at: r.created_at,
      author_name: r.profiles?.full_name || "Anonymous",
    }));
    // Rating distribution
    const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>;
    reviews.forEach((r) => {
      dist[r.rating] = (dist[r.rating] ?? 0) + 1;
    });
    return { reviews, distribution: dist };
  });

const ReviewSchema = z.object({
  product_id: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  title: z.string().trim().max(120).optional().nullable(),
  body: z.string().trim().min(3).max(2000),
});

export const submitReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ReviewSchema.parse(input))
  .handler(async ({ data, context }) => {
    // Verified purchase if the user has any delivered order with this product
    const { data: purchase } = await context.supabase
      .from("order_items")
      .select("order_id, orders!inner(user_id, status)")
      .eq("product_id", data.product_id)
      .eq("orders.user_id", context.userId)
      .limit(1)
      .maybeSingle();
    const verified = !!purchase;
    const { error } = await context.supabase
      .from("product_reviews")
      .upsert(
        {
          product_id: data.product_id,
          user_id: context.userId,
          rating: data.rating,
          title: data.title ?? null,
          body: data.body,
          verified_purchase: verified,
          status: "approved",
        },
        { onConflict: "product_id,user_id" }
      );
    if (error) throw new Error(error.message);
    return { ok: true, verified };
  });

export const deleteMyReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("product_reviews")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const voteHelpful = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ review_id: z.string().uuid(), vote: z.union([z.literal(1), z.literal(-1)]) }).parse(input)
  )
  .handler(async ({ data, context }) => {
    await context.supabase
      .from("review_votes")
      .upsert({ review_id: data.review_id, user_id: context.userId, vote: data.vote }, { onConflict: "review_id,user_id" });
    // recompute helpful count
    const { data: votes } = await supabaseAdmin
      .from("review_votes")
      .select("vote")
      .eq("review_id", data.review_id);
    const total = (votes ?? []).reduce((s: number, v: any) => s + v.vote, 0);
    await supabaseAdmin.from("product_reviews").update({ helpful_count: total }).eq("id", data.review_id);
    return { ok: true, helpful_count: total };
  });

// ─────────── Q&A ───────────

export const listProductQA = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ product_id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { data: questions, error } = await supabaseAdmin
      .from("product_questions")
      .select("id, body, created_at, profiles(full_name)")
      .eq("product_id", data.product_id)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(30);
    if (error) throw new Error(error.message);
    const qIds = (questions ?? []).map((q: any) => q.id);
    const { data: answers } = qIds.length
      ? await supabaseAdmin
          .from("product_answers")
          .select("id, question_id, body, is_seller, created_at, profiles(full_name)")
          .in("question_id", qIds)
          .eq("status", "approved")
          .order("is_seller", { ascending: false })
          .order("created_at", { ascending: true })
      : { data: [] as any[] };
    const byQuestion = new Map<string, any[]>();
    (answers ?? []).forEach((a: any) => {
      const list = byQuestion.get(a.question_id) ?? [];
      list.push({
        id: a.id,
        body: a.body,
        is_seller: a.is_seller,
        created_at: a.created_at,
        author_name: a.profiles?.full_name || "Customer",
      });
      byQuestion.set(a.question_id, list);
    });
    return (questions ?? []).map((q: any) => ({
      id: q.id,
      body: q.body,
      created_at: q.created_at,
      author_name: q.profiles?.full_name || "Customer",
      answers: byQuestion.get(q.id) ?? [],
    }));
  });

export const submitQuestion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ product_id: z.string().uuid(), body: z.string().trim().min(3).max(500) }).parse(input)
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("product_questions")
      .insert({ product_id: data.product_id, user_id: context.userId, body: data.body });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const submitAnswer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ question_id: z.string().uuid(), body: z.string().trim().min(3).max(500) }).parse(input)
  )
  .handler(async ({ data, context }) => {
    // Is the user an admin? Then mark as seller answer
    const { data: roleRow } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    const { error } = await context.supabase.from("product_answers").insert({
      question_id: data.question_id,
      user_id: context.userId,
      body: data.body,
      is_seller: !!roleRow,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
