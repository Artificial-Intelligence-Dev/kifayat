import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { getProduct, products } from "@/lib/shop-data";
import {
  Heart, Minus, Plus, Star, Truck, RotateCcw, ShieldCheck,
  Check, Package, Sparkles, Lock, ArrowUpRight, MapPin,
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
        <h1 className="font-display text-6xl mb-4">Not found.</h1>
        <p className="text-muted-foreground mb-8">This object may have been removed or is no longer in our edit.</p>
        <Link to="/products" className="bg-coal text-bone eyebrow px-8 py-4 inline-block hover:bg-coal/90 transition">Browse the catalogue ↗</Link>
      </div>
    </PageShell>
  ),
  errorComponent: () => (
    <PageShell><div className="px-5 py-32 text-center text-muted-foreground">Something went wrong.</div></PageShell>
  ),
});

function Cell({ className = "", children, pad = true }: { className?: string; children: React.ReactNode; pad?: boolean }) {
  return (
    <div className={`bg-card border border-coal/10 ${pad ? "p-6 lg:p-8" : ""} ${className}`}>
      {children}
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const pairings = products.filter((p) => p.id !== product.id).slice(0, 3);
  const savings = product.oldPrice ? product.oldPrice - product.price : 0;
  const images = product.images ?? [product.image, product.image, product.image, product.image];

  return (
    <PageShell>
      {/* Breadcrumb ribbon */}
      <div className="bg-coal text-bone">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 py-4 flex items-center justify-between eyebrow text-bone/60">
          <nav className="flex gap-2 flex-wrap">
            <Link to="/" className="hover:text-bone">Home</Link><span>/</span>
            <Link to="/products" className="hover:text-bone">Catalogue</Link><span>/</span>
            <span className="text-bone capitalize">{product.category.replace("-", " ")}</span>
          </nav>
          <span className="hidden sm:inline">Object № {product.id}</span>
        </div>
      </div>

      {/* ─── Editorial header ─── */}
      <section className="max-w-[1600px] mx-auto px-5 lg:px-10 pt-10 lg:pt-16 pb-6">
        <p className="eyebrow text-coal/50 mb-4">{product.brand} — A Considered Object</p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-[8rem] leading-[0.92] tracking-tight max-w-5xl">
          {product.name.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="italic text-brass">{product.name.split(" ").slice(-1)}.</span>
        </h1>
      </section>

      {/* ─── BENTO CANVAS ─── */}
      <section className="max-w-[1600px] mx-auto px-5 lg:px-10 pb-20 lg:pb-32">
        <div className="grid grid-cols-12 grid-flow-row-dense gap-3 lg:gap-4 auto-rows-[minmax(160px,auto)]">

          {/* HERO GALLERY — big tile */}
          <Cell pad={false} className="col-span-12 lg:col-span-8 lg:row-span-3 relative overflow-hidden p-0">
            <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full bg-paper">
              <img src={images[active]} alt={product.name}
                className="absolute inset-0 size-full object-cover" />
              {product.badge && (
                <span className="absolute top-5 left-5 bg-coal text-bone eyebrow px-3 py-1.5">{product.badge}</span>
              )}
              <span className="absolute top-5 right-5 eyebrow text-coal/60 bg-bone/80 px-2 py-1">
                {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <div className="absolute bottom-5 left-5 right-5 flex gap-2">
                {images.map((img: string, i: number) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`size-14 lg:size-16 shrink-0 overflow-hidden border-2 transition ${active === i ? "border-coal" : "border-bone/60 hover:border-coal/50"}`}>
                    <img src={img} alt="" className="size-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </Cell>

          {/* BUY PANEL — sticky right column */}
          <Cell className="col-span-12 lg:col-span-4 lg:row-span-3 flex flex-col justify-between bg-bone">
            <div>
              <p className="eyebrow text-coal/50 mb-2">The Price</p>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-display text-5xl lg:text-6xl">Rs {product.price.toLocaleString()}</span>
                {product.oldPrice && (
                  <span className="text-coal/40 line-through text-lg">Rs {product.oldPrice.toLocaleString()}</span>
                )}
              </div>
              {savings > 0 && (
                <p className="text-brass text-sm">You save Rs {savings.toLocaleString()} — limited edit.</p>
              )}

              <div className="flex items-center gap-1.5 mt-5 text-sm">
                <Star className="size-4 fill-brass text-brass" strokeWidth={1.4} />
                <span className="font-medium">{product.rating}</span>
                <span className="text-coal/50">— {product.reviews} reviews</span>
              </div>

              <div className="my-6 h-px bg-coal/10" />

              <p className="eyebrow text-coal/50 mb-3">Quantity</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-coal/15">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="size-11 grid place-items-center hover:bg-paper transition">
                    <Minus className="size-4" strokeWidth={1.4} />
                  </button>
                  <span className="w-12 text-center font-mono">{qty}</span>
                  <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="size-11 grid place-items-center hover:bg-paper transition">
                    <Plus className="size-4" strokeWidth={1.4} />
                  </button>
                </div>
                <p className="text-xs text-coal/50">
                  <Check className="inline size-3.5 text-brass" /> {product.stock} in atelier
                </p>
              </div>

              <button className="w-full h-14 bg-coal text-bone eyebrow flex items-center justify-center gap-3 hover:bg-ink transition group">
                Add to bag — Rs {(product.price * qty).toLocaleString()}
                <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" strokeWidth={1.5} />
              </button>
              <button className="w-full h-12 mt-2 border border-coal/15 eyebrow flex items-center justify-center gap-2 hover:bg-paper transition">
                <Heart className="size-3.5" strokeWidth={1.5} /> Save to wishlist
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-coal/10 grid grid-cols-3 gap-3 text-[10px] eyebrow text-coal/60">
              <div className="flex flex-col items-start gap-1"><Truck className="size-4 text-coal" strokeWidth={1.4}/>Karachi-speed</div>
              <div className="flex flex-col items-start gap-1"><RotateCcw className="size-4 text-coal" strokeWidth={1.4}/>14-day returns</div>
              <div className="flex flex-col items-start gap-1"><ShieldCheck className="size-4 text-coal" strokeWidth={1.4}/>Authenticated</div>
            </div>
          </Cell>

          {/* THE STORY */}
          <Cell className="col-span-12 lg:col-span-5">
            <p className="eyebrow text-coal/50 mb-3">Notes — 01</p>
            <h3 className="font-display text-3xl mb-3">On the object.</h3>
            <p className="text-coal/75 leading-relaxed text-[15px]">{product.description}</p>
          </Cell>

          {/* SPECIFICATIONS */}
          <Cell className="col-span-12 lg:col-span-7 bg-paper">
            <p className="eyebrow text-coal/50 mb-3">Notes — 02 — Specification</p>
            <ul className="divide-y divide-coal/10">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center justify-between py-3">
                  <span className="font-mono text-[10px] text-coal/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 px-4 text-[15px]">{f}</span>
                  <Check className="size-4 text-brass" strokeWidth={1.5} />
                </li>
              ))}
            </ul>
          </Cell>

          {/* TRUST TRIPLET */}
          <Cell className="col-span-6 lg:col-span-3 flex flex-col justify-between min-h-[180px]">
            <Package className="size-6 text-brass" strokeWidth={1.3} />
            <div>
              <p className="font-display text-2xl">Free delivery</p>
              <p className="text-xs text-coal/55 mt-1">On orders above Rs 2,500 across Karachi.</p>
            </div>
          </Cell>
          <Cell className="col-span-6 lg:col-span-3 flex flex-col justify-between min-h-[180px]">
            <Lock className="size-6 text-brass" strokeWidth={1.3} />
            <div>
              <p className="font-display text-2xl">Secure payment</p>
              <p className="text-xs text-coal/55 mt-1">Cards, wallets and cash on delivery.</p>
            </div>
          </Cell>
          <Cell className="col-span-12 lg:col-span-6 bg-coal text-bone flex flex-col justify-between min-h-[180px]">
            <Sparkles className="size-6 text-brass" strokeWidth={1.3} />
            <div>
              <p className="font-display text-3xl">Curated, never crowded.</p>
              <p className="text-sm text-bone/60 mt-2 max-w-md">Eight to twelve pieces per week — every object inspected, photographed and packed by our Karachi studio.</p>
            </div>
          </Cell>

          {/* CARE / RATING SUMMARY */}
          <Cell className="col-span-12 lg:col-span-4 bg-bone">
            <p className="eyebrow text-coal/50 mb-3">Notes — 03 — Care</p>
            <p className="text-coal/75 text-[15px] leading-relaxed">
              Store in its original packaging when not in use. Handle with clean hands; avoid contact with perfumes, oils and direct sunlight to preserve finish.
            </p>
          </Cell>
          <Cell className="col-span-6 lg:col-span-4">
            <p className="eyebrow text-coal/50 mb-4">Customer voice</p>
            <p className="font-display text-7xl text-brass">{product.rating}</p>
            <div className="flex gap-0.5 mt-2">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className={`size-4 ${s <= Math.round(product.rating) ? "fill-brass text-brass" : "text-coal/20"}`} strokeWidth={1.4} />
              ))}
            </div>
            <p className="text-xs text-coal/55 mt-3">Average across {product.reviews} verified buyers.</p>
          </Cell>
          <Cell className="col-span-6 lg:col-span-4 bg-paper flex flex-col gap-3">
            <p className="eyebrow text-coal/50">Shipping window</p>
            <div className="flex items-center gap-2 text-sm"><MapPin className="size-4 text-brass" strokeWidth={1.4}/> Karachi metro · 1–2 days</div>
            <div className="flex items-center gap-2 text-sm"><Truck className="size-4 text-brass" strokeWidth={1.4}/> Pakistan-wide · 3–5 days</div>
            <div className="flex items-center gap-2 text-sm"><RotateCcw className="size-4 text-brass" strokeWidth={1.4}/> Return within 14 days</div>
          </Cell>

          {/* TWO PRESS-STYLE REVIEWS */}
          {[
            { who: "Ayesha K.", city: "Clifton", text: "Photography did it justice — and then the packaging surprised me. Feels like unboxing something from a quiet little gallery in Tokyo." },
            { who: "Bilal R.", city: "DHA Phase 6", text: "I've been burned by online shopping in Karachi before. This was the first time the object actually matched the listing — and arrived in 30 hours." },
          ].map((r, i) => (
            <Cell key={i} className="col-span-12 lg:col-span-6">
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map((s) => <Star key={s} className="size-3.5 fill-brass text-brass" strokeWidth={1.4} />)}
              </div>
              <p className="font-display text-2xl lg:text-3xl leading-snug mb-4">"{r.text}"</p>
              <p className="eyebrow text-coal/50">— {r.who}, {r.city}</p>
            </Cell>
          ))}
        </div>
      </section>

      {/* ─── Pairings ─── */}
      <section className="border-t border-coal/10 bg-bone py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10">
          <div className="flex items-end justify-between mb-10 lg:mb-16">
            <div>
              <p className="eyebrow text-coal/50 mb-3">The Pairing</p>
              <h2 className="font-display text-4xl lg:text-7xl leading-[0.95]">Goes well<br/>with <span className="italic text-brass">these.</span></h2>
            </div>
            <Link to="/products" className="hidden md:inline-flex items-center gap-2 eyebrow border border-coal/15 px-6 py-3 hover:bg-coal hover:text-bone transition">
              See all <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pairings.map((p) => (
              <Link key={p.id} to="/products/$productId" params={{ productId: p.slug }}
                className="group block">
                <div className="aspect-[4/5] bg-paper overflow-hidden mb-4">
                  <img src={p.image} alt={p.name} className="size-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                </div>
                <p className="eyebrow text-coal/40 mb-1">{p.brand}</p>
                <h3 className="font-display text-2xl lg:text-3xl leading-tight">{p.name}</h3>
                <p className="text-sm mt-1">Rs {p.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
