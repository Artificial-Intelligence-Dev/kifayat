import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { getProduct, products } from "@/lib/shop-data";
import {
  Heart, Minus, Plus, Star, Truck, RotateCcw, ShieldCheck,
  ArrowUpRight, Check, Package, Award, Sparkles, MessageCircle, Lock,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const p = getProduct(params.productId);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} — Kifayat` },
      { name: "description", content: loaderData.product.description },
      { property: "og:title", content: loaderData.product.name },
      { property: "og:description", content: loaderData.product.description },
      { property: "og:image", content: loaderData.product.image },
    ] : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <PageShell>
      <div className="max-w-3xl mx-auto px-5 py-32 text-center">
        <h1 className="font-display italic text-6xl mb-4">Not found.</h1>
        <p className="text-muted-foreground mb-8">This object may have been removed or is no longer in our edit.</p>
        <Link to="/products" className="bg-coal text-bone eyebrow px-8 py-4 inline-block hover:bg-coal/90 transition">Browse the catalogue ↗</Link>
      </div>
    </PageShell>
  ),
  errorComponent: () => (
    <PageShell><div className="px-5 py-32 text-center text-muted-foreground">Something went wrong loading this object.</div></PageShell>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"details" | "specs" | "shipping">("details");
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const allProducts = products.filter((p) => p.id !== product.id).slice(0, 4);
  const savings = product.oldPrice ? product.oldPrice - product.price : 0;

  return (
    <PageShell>
      {/* ── Editorial breadcrumb bar ────────────────────────── */}
      <div className="bg-coal text-bone">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 py-5 flex items-center justify-between eyebrow text-bone/60">
          <nav className="flex gap-2 flex-wrap">
            <Link to="/" className="hover:text-bone">Home</Link><span>/</span>
            <Link to="/products" className="hover:text-bone">Catalogue</Link><span>/</span>
            <span className="text-bone">{product.category}</span>
          </nav>
          <span className="hidden sm:inline">Object № {product.id}</span>
        </div>
      </div>

      {/* ── Hero: gallery + detail ──────────────────────────── */}
      <section className="bg-bone">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 py-12 lg:py-20 grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-[80px_1fr] lg:grid-cols-[100px_1fr] gap-4">
              <div className="flex flex-col gap-3">
                {product.images?.map((img: string, i: number) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`aspect-square bg-paper overflow-hidden border transition ${active === i ? "border-coal" : "border-transparent hover:border-coal/30"}`}>
                    <img src={img} alt="" className="size-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="relative aspect-[4/5] bg-paper overflow-hidden group">
                <img src={product.images?.[active] ?? product.image} alt={product.name}
                  className="size-full object-cover transition duration-700 group-hover:scale-[1.02]" />
                <span className="absolute top-5 left-5 eyebrow text-muted-foreground">
                  {String(active + 1).padStart(2, "0")} / {String(product.images?.length ?? 1).padStart(2, "0")}
                </span>
                {product.badge && (
                  <span className="absolute top-5 right-5 bg-coal text-bone eyebrow px-3 py-1.5">{product.badge}</span>
                )}
              </div>
            </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-5 lg:pt-8">
            <div className="flex items-center gap-3 eyebrow text-muted-foreground">
              <span>§ {product.brand}</span>
              <span className="h-px w-8 bg-coal/30" />
              <span>{product.category}</span>
            </div>

            <h1 className="font-display italic text-5xl lg:text-7xl leading-[0.9] mt-5">{product.name}</h1>

            <div className="mt-6 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className={`size-3.5 ${n <= Math.round(product.rating) ? "fill-coal text-coal" : "text-coal/20"}`} strokeWidth={1.2} />
                ))}
                <span className="eyebrow ml-2">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground">·</span>
              <a href="#reviews" className="eyebrow text-muted-foreground hover:text-coal">{product.reviews} reviews</a>
              <span className="text-muted-foreground">·</span>
              <span className="eyebrow text-emerald-700 flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-emerald-700 animate-pulse" /> In stock</span>
            </div>

            <div className="mt-8 pt-8 border-t border-coal/15 flex items-baseline gap-4">
              <span className="font-display italic text-6xl">Rs {product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <div className="flex flex-col">
                  <span className="text-muted-foreground line-through text-sm">Rs {product.oldPrice.toLocaleString()}</span>
                  <span className="eyebrow text-emerald-700">Save Rs {savings.toLocaleString()}</span>
                </div>
              )}
            </div>
            <p className="mt-2 eyebrow text-muted-foreground">Inclusive of tax · Free delivery above Rs 2,500</p>

            <p className="mt-8 text-base leading-relaxed text-foreground/80 max-w-md">{product.description}</p>

            {/* Quantity + CTA */}
            <div className="mt-10 grid grid-cols-[auto_1fr] gap-3">
              <div className="inline-flex items-center border border-coal/20 h-14">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="size-14 grid place-items-center hover:bg-paper transition"><Minus className="size-4" strokeWidth={1.5} /></button>
                <span className="w-12 text-center font-mono">{String(qty).padStart(2, "0")}</span>
                <button onClick={() => setQty((q) => q + 1)} className="size-14 grid place-items-center hover:bg-paper transition"><Plus className="size-4" strokeWidth={1.5} /></button>
              </div>
              <button className="group h-14 bg-coal text-bone eyebrow inline-flex items-center justify-center gap-3 hover:bg-coal/90 transition">
                Add to bag — Rs {(product.price * qty).toLocaleString()}
                <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" strokeWidth={1.5} />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
              <Link to="/checkout" className="h-14 border border-coal/20 eyebrow inline-flex items-center justify-center gap-3 hover:bg-paper transition">
                Buy now · express checkout
              </Link>
              <button aria-label="Wishlist" className="size-14 border border-coal/20 grid place-items-center hover:bg-paper transition">
                <Heart className="size-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Trust ribbon */}
            <ul className="mt-10 pt-8 border-t border-coal/15 grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
              {[
                { Icon: ShieldCheck, t: "Authenticated", d: "Verified at our warehouse" },
                { Icon: Truck, t: "Free delivery", d: "Above Rs 2,500" },
                { Icon: RotateCcw, t: "7-day returns", d: "No questions asked" },
                { Icon: Lock, t: "Secure payment", d: "256-bit encrypted" },
              ].map(({ Icon, t, d }) => (
                <li key={t} className="flex items-start gap-3">
                  <Icon className="size-4 mt-0.5 text-coal/60" strokeWidth={1.5} />
                  <div>
                    <div className="text-sm">{t}</div>
                    <div className="eyebrow text-muted-foreground">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Editorial split: notes on the object ─────────────── */}
      <section className="border-t border-coal/10 bg-paper">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 py-20 lg:py-32 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow text-muted-foreground mb-6">§ Notes on the object</p>
            <h2 className="font-display italic text-5xl lg:text-7xl leading-[0.9]">
              Considered<br />in every<br />detail.
            </h2>
            <p className="mt-8 text-muted-foreground max-w-sm leading-relaxed">
              {product.brand} is one of a small handful of houses we keep in permanent rotation — each piece earning its shelf space.
            </p>
          </div>

          {/* Tabs */}
          <div className="lg:col-span-8">
            <div className="flex gap-px bg-coal/10 mb-8">
              {([
                ["details", "Details"],
                ["specs", "Specifications"],
                ["shipping", "Shipping & Returns"],
              ] as const).map(([id, label]) => (
                <button key={id} onClick={() => setTab(id)}
                  className={`bg-paper px-5 py-4 eyebrow transition border-b-2 ${tab === id ? "border-coal" : "border-transparent text-muted-foreground hover:text-coal"}`}>
                  {label}
                </button>
              ))}
            </div>

            {tab === "details" && (
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-foreground/85">{product.description}</p>
                <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-8 mt-6">
                  {product.features.map((f: string) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="size-4 mt-0.5 text-emerald-700" strokeWidth={2} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === "specs" && (
              <dl className="border-t border-coal/15">
                {[
                  ["Brand", product.brand],
                  ["Category", product.category],
                  ["SKU", product.id],
                  ["In stock", `${product.stock} units`],
                  ["Country of dispatch", "Pakistan · Karachi hub"],
                  ["Warranty", "12 months · seller warranty"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[200px_1fr] gap-6 py-4 border-b border-coal/10">
                    <dt className="eyebrow text-muted-foreground">{k}</dt>
                    <dd className="text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
            )}

            {tab === "shipping" && (
              <div className="grid sm:grid-cols-2 gap-px bg-coal/10">
                {[
                  { Icon: Truck, t: "Standard · 2–4 days", d: "Complimentary above Rs 2,500. Tracked door-to-door." },
                  { Icon: Sparkles, t: "Express · same-day", d: "Karachi only. Order before 5pm." },
                  { Icon: RotateCcw, t: "Returns · 7 days", d: "No questions, no restocking fee. Free pickup from your address." },
                  { Icon: Package, t: "Packaging", d: "Recycled kraft, plastic-free padding, monochrome ribbon." },
                ].map(({ Icon, t, d }) => (
                  <div key={t} className="bg-paper p-6">
                    <Icon className="size-5 mb-3" strokeWidth={1.5} />
                    <div className="font-display italic text-xl">{t}</div>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Trust manifesto strip ─────────────────────────────── */}
      <section className="bg-coal text-bone">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow text-bone/60 mb-6">§ Why Kifayat</p>
            <h2 className="font-display italic text-5xl lg:text-7xl leading-[0.9]">
              A marketplace<br />without<br />the noise.
            </h2>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-bone/10">
            {[
              { Icon: Award, n: "01", t: "Curated, not crowded", d: "Less than 2% of submitted products make it onto our shelves." },
              { Icon: ShieldCheck, n: "02", t: "Verified merchants", d: "Every seller passes a six-week onboarding before their first listing." },
              { Icon: MessageCircle, n: "03", t: "Human support", d: "Real people in Karachi, replying within four working hours." },
              { Icon: Lock, n: "04", t: "Buyer protection", d: "Full refund if your object doesn't match its photograph." },
            ].map(({ Icon, n, t, d }) => (
              <div key={n} className="bg-coal p-8">
                <div className="flex items-center justify-between eyebrow text-bone/40 mb-4">
                  <span>{n}</span> <Icon className="size-4" strokeWidth={1.5} />
                </div>
                <h3 className="font-display italic text-2xl">{t}</h3>
                <p className="text-sm text-bone/60 mt-3 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ─────────────────────────────────────────── */}
      <section id="reviews" className="border-t border-coal/10">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-muted-foreground mb-4">§ Words from buyers</p>
              <h2 className="font-display italic text-5xl lg:text-6xl leading-[0.9]">What others<br />have said.</h2>
              <div className="mt-8 flex items-baseline gap-4">
                <span className="font-display italic text-7xl">{product.rating.toFixed(1)}</span>
                <div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className={`size-4 ${n <= Math.round(product.rating) ? "fill-coal text-coal" : "text-coal/20"}`} strokeWidth={1.2} />
                    ))}
                  </div>
                  <div className="eyebrow text-muted-foreground mt-1">based on {product.reviews} reviews</div>
                </div>
              </div>
              <button className="mt-8 eyebrow border border-coal/20 px-6 py-3 hover:bg-paper transition">Write a review</button>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-coal/10">
              {[
                { name: "Hira N.", city: "Karachi · DHA", rating: 5, title: "Better than expected.", body: "Arrived in beautiful packaging, the quality is genuine — exactly as photographed. The courier was polite and on time.", date: "12 May 2026" },
                { name: "Bilal R.", city: "Karachi · Clifton", rating: 5, title: "Refreshingly honest shopping.", body: "No exaggeration in the listing, no surprise charges. Will buy from Kifayat again — easily the smoothest experience this year.", date: "04 May 2026" },
                { name: "Ayesha K.", city: "Lahore · Gulberg", rating: 4, title: "Lovely, with one note.", body: "The product is wonderful. Delivery to Lahore took 4 days instead of 2, but everything arrived intact and well-protected.", date: "28 Apr 2026" },
                { name: "Zain F.", city: "Karachi · Bahria", rating: 5, title: "Worth every rupee.", body: "I've been hesitant to buy this category online. Kifayat changed my mind — the authenticity check is genuinely reassuring.", date: "16 Apr 2026" },
              ].map((r) => (
                <article key={r.name} className="bg-bone p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className={`size-3.5 ${n <= r.rating ? "fill-coal text-coal" : "text-coal/20"}`} strokeWidth={1.2} />
                      ))}
                    </div>
                    <span className="eyebrow text-muted-foreground">{r.date}</span>
                  </div>
                  <h4 className="font-display italic text-2xl mt-3 leading-tight">"{r.title}"</h4>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{r.body}</p>
                  <div className="mt-5 pt-4 border-t border-coal/10 flex items-center justify-between eyebrow text-muted-foreground">
                    <span>— {r.name}</span><span>{r.city}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related ─────────────────────────────────────────── */}
      <section className="border-t border-coal/10 bg-paper">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 py-20 lg:py-28">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow text-muted-foreground mb-4">§ Curator's pairing</p>
              <h2 className="font-display italic text-5xl lg:text-6xl leading-[0.9]">Pairs<br />beautifully with.</h2>
            </div>
            <Link to="/products" className="eyebrow hover:underline underline-offset-4 hidden sm:inline">View full edit ↗</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-coal/10">
            {(related.length ? related : allProducts).map((p, i) => (
              <Link key={p.id} to="/products/$productId" params={{ productId: p.slug }} className="bg-paper p-6 group">
                <div className="aspect-[4/5] bg-bone overflow-hidden mb-5">
                  <img src={p.image} alt={p.name} className="size-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-baseline justify-between eyebrow text-muted-foreground">
                  <span>No. {String(i + 1).padStart(2, "0")}</span>
                  <span>{p.brand}</span>
                </div>
                <h3 className="font-display italic text-xl mt-2 leading-tight line-clamp-2 group-hover:underline underline-offset-4 decoration-1">{p.name}</h3>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="font-display text-lg">Rs {p.price.toLocaleString()}</span>
                  <span className="eyebrow text-muted-foreground">★ {p.rating.toFixed(1)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
