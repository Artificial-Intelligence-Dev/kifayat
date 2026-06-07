## Goal
Bring the Kifayat backend from catalog+orders to Daraz/Amazon parity across 6 feature packs. COD-only stays.

## Hardcoded admin (DONE)
- `admin@kifayat.com` / `kifay@yat786` — email confirmed, `admin` role granted. Re-running the migration resets the password.

## 1. Product variants · gallery · inventory
New tables:
- `product_images` (product_id, url, alt, sort_order, is_primary)
- `product_variants` (product_id, sku UNIQUE, name, attributes jsonb {color,size,...}, price_delta, stock, image_url)
- `inventory_log` (variant_id/product_id, delta, reason, actor, created_at) — append-only audit
Server fns: `adminUpsertVariant`, `adminAdjustStock`, gallery CRUD. PDP renders gallery + variant picker; stock decremented on order confirm via trigger.

## 2. Reviews, ratings & Q&A
New tables:
- `product_reviews` (product_id, user_id, order_id NULL, rating 1-5, title, body, verified_purchase bool, status, helpful_count)
- `review_votes` (review_id, user_id, vote) — UNIQUE
- `product_questions` (product_id, user_id, body, status)
- `product_answers` (question_id, user_id, body, is_seller bool)
Materialized rating summary on `products` (avg_rating, review_count) via trigger. RLS: anyone reads approved; users write own; admin moderates.

## 3. Wishlist · recently viewed · recommendations
- `wishlist` (user_id, product_id) UNIQUE — auth required
- `recently_viewed` (user_id OR session_id, product_id, viewed_at) — rolling 20
- "You may also like": same-category fallback + co-purchase from `order_items` join

## 4. Multi-address book + saved checkout
- `addresses` (user_id, label, full_name, phone, line1, line2, city, province, postal_code, is_default)
- Checkout for signed-in users: pick saved address, save new on submit
- `/account/addresses` CRUD page (file exists, will wire up)

## 5. Admin analytics dashboard `/admin`
Server fn `adminDashboardStats` returning:
- Revenue (today / 7d / 30d), orders by status, AOV
- Top 10 products by units & revenue, low-stock alerts (<5)
- New customers, conversion proxy (orders/sessions optional)
Rendered with recharts (already installed) — line + bar + KPI tiles.

## 6. Daraz-level search
- Add `tsvector` column `search_vector` on `products` (name+brand+description+category), GIN index, trigger to maintain
- `pg_trgm` extension + GIN trigram on name for typo tolerance
- `search_queries` table (query, results_count, user_id NULL, created_at) → powers "Trending searches"
- Server fns:
  - `searchProducts({ q, filters, sort, page })` — FTS rank + trigram fallback + facet counts (brand, category, price buckets, rating)
  - `searchSuggest({ q })` — top product names + popular queries, returned <80ms
- `/search` route: faceted sidebar, sort (relevance/price asc/desc/newest/rating), pagination via URL search params
- Header search: live autocomplete dropdown (debounced 150ms)

## Security & ops baked in
- Every new public table: explicit GRANTs + RLS + policies scoped to `auth.uid()` or admin via `has_role`
- All write server fns validate input with Zod, recompute totals server-side
- Stock decrement + rating recompute as DB triggers (atomic, no race)
- Admin-only fns guarded with `requireAdmin()` helper (already exists)

## Build order (single pass)
1. Migration A: variants + images + inventory + addresses + wishlist + recently_viewed + tsvector/trgm + search_queries + reviews/QA + triggers (one big migration, fully GRANTed & RLS'd)
2. Server fns (`shop.functions.ts`, `admin.functions.ts`, new `search.functions.ts`, `reviews.functions.ts`, `account.functions.ts`)
3. UI: PDP (gallery+variants+reviews+QA), `/search` faceted page, header autocomplete, `/account/addresses`, `/account/wishlist`, `/admin` dashboard, admin variant/review/Q&A moderation tabs
4. Wire cart/checkout to variants + saved addresses

## Out of scope (call out if you want them later)
- Real payments (JazzCash/Stripe) — you said COD only
- Returns/refunds workflow
- Multi-vendor / seller accounts
- Email/SMS notifications (status timeline UI yes, real sends no)
- Coupons & flash deals

This is ~4-6 hours of focused work. I'll execute end-to-end without stopping if you approve.