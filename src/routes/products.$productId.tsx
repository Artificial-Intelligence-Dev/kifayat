import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { getProduct, products } from "@/lib/shop-data";
import {
  Heart, Minus, Plus, Star, Truck, RotateCcw, ShieldCheck,
  Check, Package, Sparkles, Lock, ArrowUpRight, MapPin, Expand,
} from "lucide-react";
import { lazy, Suspense, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ZoomImage } from "@/components/shop/ZoomImage";
import { Reveal } from "@/components/motion/Reveal";
import { flyToCart } from "@/components/motion/fly-to-cart-event";

const Lightbox = lazy(() => import("@/components/shop/Lightbox").then((module) => ({ default: module.Lightbox })));

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

function Cell({ className = "", children, pad = true, delay = 0 }: { className?: string; children: React.ReactNode; pad?: boolean; delay?: number }) {
  return (
    <Reveal delay={delay} className={`bg-card border border-coal/10 ${pad ? "p-6 lg:p-8" : ""} ${className}`}>
      {children}
    </Reveal>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const buyAnchorRef = useRef<HTMLButtonElement>(null);
  const pairings = products.filter((p) => p.id !== product.id).slice(0, 3);
  const savings = product.oldPrice ? product.oldPrice - product.price : 0;
  const images = product.images ?? [product.image, product.image, product.image, product.image];

  const handleAdd = () => {
    if (buyAnchorRef.current) flyToCart(product.image, buyAnchorRef.current);
  };

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
        <Reveal>
          <p className="eyebrow text-coal/50 mb-4">{product.brand} — A Considered Object</p>
        </Reveal>
        <h1 className="font-display text-5xl md:text-7xl lg:text-[8rem] leading-[0.92] tracking-tight max-w-5xl">
          {product.name.split(" ").map((w: string, i: number, arr: string[]) => (
            <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.18em]">
              <motion.span
                className={`inline-block ${i === arr.length - 1 ? "italic text-brass" : ""}`}
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}{i === arr.length - 1 ? "." : ""}
              </motion.span>
            </span>
          ))}
        </h1>
      </section>

      {/* ─── SCROLL-SCRUBBED GALLERY + STICKY BUY PANEL ─── */}
      <section className="max-w-[1600px] mx-auto px-5 lg:px-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-start">
          {/* LEFT: stacked tall images that scroll past */}
          <div className="lg:col-span-8 flex flex-col gap-3 lg:gap-4">
            {images.map((img: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-paper border border-coal/10 group"
              >
                <ZoomImage
                  src={img}
                  alt={`${product.name} — view ${i + 1}`}
                  className="aspect-[4/5] lg:aspect-[5/6]"
                  onClick={() => setLightbox(i)}
                />
                <span className="absolute top-4 left-4 bg-bone/85 text-coal eyebrow px-2 py-1 z-10">
                  {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
                {product.badge && i === 0 && (
                  <span className="absolute top-4 right-4 bg-coal text-bone eyebrow px-3 py-1.5 z-10">{product.badge}</span>
                )}
                <button
                  onClick={() => setLightbox(i)}
                  className="absolute bottom-4 right-4 size-11 grid place-items-center bg-bone/85 text-coal hover:bg-coal hover:text-bone transition rounded-full z-10 opacity-0 group-hover:opacity-100"
                  aria-label="Open lightbox"
                >
                  <Expand className="size-4" strokeWidth={1.4} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: sticky purchase panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <Reveal>
              <div className="bg-bone border border-coal/10 p-6 lg:p-8 flex flex-col">
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

                <motion.button
                  ref={buyAnchorRef}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdd}
                  className="w-full h-14 bg-coal text-bone eyebrow flex items-center justify-center gap-3 hover:bg-ink transition group"
                >
                  Add to bag — Rs {(product.price * qty).toLocaleString()}
                  <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" strokeWidth={1.5} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full h-12 mt-2 border border-coal/15 eyebrow flex items-center justify-center gap-2 hover:bg-paper transition"
                >
                  <Heart className="size-3.5" strokeWidth={1.5} /> Save to wishlist
                </motion.button>

                <div className="mt-6 pt-6 border-t border-coal/10 grid grid-cols-3 gap-3 text-[10px] eyebrow text-coal/60">
                  <div className="flex flex-col items-start gap-1"><Truck className="size-4 text-coal" strokeWidth={1.4}/>Karachi-speed</div>
                  <div className="flex flex-col items-start gap-1"><RotateCcw className="size-4 text-coal" strokeWidth={1.4}/>14-day returns</div>
                  <div className="flex flex-col items-start gap-1"><ShieldCheck className="size-4 text-coal" strokeWidth={1.4}/>Authenticated</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── BENTO NOTES CANVAS ─── */}
      <section className="max-w-[1600px] mx-auto px-5 lg:px-10 pb-20 lg:pb-32">
        <div className="grid grid-cols-12 grid-flow-row-dense gap-3 lg:gap-4 auto-rows-[minmax(160px,auto)]">
          <Cell className="col-span-12 lg:col-span-5">
            <p className="eyebrow text-coal/50 mb-3">Notes — 01</p>
            <h3 className="font-display text-3xl mb-3">On the object.</h3>
            <p className="text-coal/75 leading-relaxed text-[15px]">{product.description}</p>
          </Cell>

          <Cell delay={0.05} className="col-span-12 lg:col-span-7 bg-paper">
            <p className="eyebrow text-coal/50 mb-3">Notes — 02 — Specification</p>
            <ul className="divide-y divide-coal/10">
              {product.features.map((f: string, i: number) => (
                <li key={i} className="flex items-center justify-between py-3">
                  <span className="font-mono text-[10px] text-coal/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 px-4 text-[15px]">{f}</span>
                  <Check className="size-4 text-brass" strokeWidth={1.5} />
                </li>
              ))}
            </ul>
          </Cell>

          <Cell className="col-span-6 lg:col-span-3 flex flex-col justify-between min-h-[180px]">
            <Package className="size-6 text-brass" strokeWidth={1.3} />
            <div>
              <p className="font-display text-2xl">Free delivery</p>
              <p className="text-xs text-coal/55 mt-1">On orders above Rs 2,500 across Karachi.</p>
            </div>
          </Cell>
          <Cell delay={0.05} className="col-span-6 lg:col-span-3 flex flex-col justify-between min-h-[180px]">
            <Lock className="size-6 text-brass" strokeWidth={1.3} />
            <div>
              <p className="font-display text-2xl">Secure payment</p>
              <p className="text-xs text-coal/55 mt-1">Cards, wallets and cash on delivery.</p>
            </div>
          </Cell>
          <Cell delay={0.1} className="col-span-12 lg:col-span-6 bg-coal text-bone flex flex-col justify-between min-h-[180px]">
            <Sparkles className="size-6 text-brass" strokeWidth={1.3} />
            <div>
              <p className="font-display text-3xl">Curated, never crowded.</p>
              <p className="text-sm text-bone/60 mt-2 max-w-md">Eight to twelve pieces per week — every object inspected, photographed and packed by our Karachi studio.</p>
            </div>
          </Cell>

          <Cell className="col-span-12 lg:col-span-4 bg-bone">
            <p className="eyebrow text-coal/50 mb-3">Notes — 03 — Care</p>
            <p className="text-coal/75 text-[15px] leading-relaxed">
              Store in its original packaging when not in use. Handle with clean hands; avoid contact with perfumes, oils and direct sunlight to preserve finish.
            </p>
          </Cell>
          <Cell delay={0.05} className="col-span-6 lg:col-span-4">
            <p className="eyebrow text-coal/50 mb-4">Customer voice</p>
            <p className="font-display text-7xl text-brass">{product.rating}</p>
            <div className="flex gap-0.5 mt-2">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className={`size-4 ${s <= Math.round(product.rating) ? "fill-brass text-brass" : "text-coal/20"}`} strokeWidth={1.4} />
              ))}
            </div>
            <p className="text-xs text-coal/55 mt-3">Average across {product.reviews} verified buyers.</p>
          </Cell>
          <Cell delay={0.1} className="col-span-6 lg:col-span-4 bg-paper flex flex-col gap-3">
            <p className="eyebrow text-coal/50">Shipping window</p>
            <div className="flex items-center gap-2 text-sm"><MapPin className="size-4 text-brass" strokeWidth={1.4}/> Karachi metro · 1–2 days</div>
            <div className="flex items-center gap-2 text-sm"><Truck className="size-4 text-brass" strokeWidth={1.4}/> Pakistan-wide · 3–5 days</div>
            <div className="flex items-center gap-2 text-sm"><RotateCcw className="size-4 text-brass" strokeWidth={1.4}/> Return within 14 days</div>
          </Cell>

          {[
            { who: "Ayesha K.", city: "Clifton", text: "Photography did it justice — and then the packaging surprised me. Feels like unboxing something from a quiet little gallery in Tokyo." },
            { who: "Bilal R.", city: "DHA Phase 6", text: "I've been burned by online shopping in Karachi before. This was the first time the object actually matched the listing — and arrived in 30 hours." },
          ].map((r, i) => (
            <Cell key={i} delay={i * 0.05} className="col-span-12 lg:col-span-6">
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
            <Reveal>
              <p className="eyebrow text-coal/50 mb-3">The Pairing</p>
              <h2 className="font-display text-4xl lg:text-7xl leading-[0.95]">Goes well<br/>with <span className="italic text-brass">these.</span></h2>
            </Reveal>
            <Link to="/products" className="hidden md:inline-flex items-center gap-2 eyebrow border border-coal/15 px-6 py-3 hover:bg-coal hover:text-bone transition">
              See all <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pairings.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <Link to="/products/$productId" params={{ productId: p.slug }} className="group block">
                  <div className="aspect-[4/5] bg-paper overflow-hidden mb-4">
                    <img src={p.image} alt={p.name} className="size-full object-cover transition duration-700 group-hover:scale-[1.06]" />
                  </div>
                  <p className="eyebrow text-coal/40 mb-1">{p.brand}</p>
                  <h3 className="font-display text-2xl lg:text-3xl leading-tight">{p.name}</h3>
                  <p className="text-sm mt-1">Rs {p.price.toLocaleString()}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <Suspense fallback={null}>
          <Lightbox images={images} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
        </Suspense>
      )}
    </PageShell>
  );
}
