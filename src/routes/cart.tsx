import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { products } from "@/lib/shop-data";
import {
  Minus, Plus, Trash2, ShoppingBag, Tag, ArrowUpRight,
  Truck, ShieldCheck, RotateCcw, Lock, Heart, Gift,
} from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "The Bag — Kifayat" }, { name: "description", content: "Your considered selection from Kifayat — Karachi's editorial marketplace." }] }),
  component: CartPage,
});

function CartPage() {
  const [items, setItems] = useState(products.slice(0, 3).map((p) => ({ ...p, qty: 1 })));
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState<number | null>(null);
  const [gift, setGift] = useState(false);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const shipping = subtotal === 0 ? 0 : subtotal >= 2500 ? 0 : 200;
  const discount = applied ?? 0;
  const total = Math.max(0, subtotal + shipping - discount);
  const saved = items.reduce((s, i) => s + ((i.oldPrice ?? i.price) - i.price) * i.qty, 0);

  const update = (id: string, qty: number) =>
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const remove = (id: string) => setItems((arr) => arr.filter((i) => i.id !== id));

  return (
    <PageShell>
      {/* ── Editorial header ────────────────────────────────────── */}
      <section className="bg-coal text-bone">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 pt-12 lg:pt-20 pb-16 lg:pb-24">
          <div className="flex items-center justify-between eyebrow text-bone/60 mb-10">
            <span className="flex items-center gap-3"><span className="h-px w-8 bg-bone/40" /> Chapter 04 · The Bag</span>
            <span className="hidden sm:inline">{items.length} {items.length === 1 ? "object" : "objects"} · reviewed</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <h1 className="lg:col-span-8 font-display italic text-6xl sm:text-7xl lg:text-[9rem] leading-[0.85]">
              Your<br />selection<span className="not-italic">.</span>
            </h1>
            <p className="lg:col-span-4 text-bone/70 text-sm lg:text-base leading-relaxed max-w-sm">
              A quiet pause before purchase. Review the objects you've considered — adjust, refine, or set aside for later.
            </p>
          </div>
        </div>
      </section>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {/* ── Main grid ─────────────────────────────────────── */}
          <section className="max-w-[1600px] mx-auto px-5 lg:px-10 py-16 lg:py-24">
            <div className="grid lg:grid-cols-[1fr_440px] gap-12 lg:gap-20">
              {/* line items */}
              <div>
                <div className="flex items-baseline justify-between border-b border-coal/15 pb-4 mb-2">
                  <h2 className="eyebrow">§ Line items</h2>
                  <span className="eyebrow text-muted-foreground">{items.length}/{items.length}</span>
                </div>
                <ul className="divide-y divide-coal/10">
                  {items.map((i, idx) => (
                    <li key={i.id} className="grid grid-cols-[auto_1fr_auto] gap-5 lg:gap-8 py-8 group">
                      <Link to="/products/$productId" params={{ productId: i.slug }}
                        className="size-28 lg:size-36 bg-paper overflow-hidden shrink-0 relative">
                        <img src={i.image} alt={i.name} className="size-full object-cover transition duration-700 group-hover:scale-105" />
                        <span className="absolute top-2 left-2 eyebrow text-coal/60">No. {String(idx + 1).padStart(2, "0")}</span>
                      </Link>
                      <div className="min-w-0 flex flex-col">
                        <div className="eyebrow text-muted-foreground">{i.brand}</div>
                        <Link to="/products/$productId" params={{ productId: i.slug }}
                          className="font-display italic text-2xl lg:text-3xl leading-tight mt-1 hover:underline underline-offset-4 decoration-1">
                          {i.name}
                        </Link>
                        <div className="mt-2 eyebrow text-muted-foreground">{i.category} · in stock</div>
                        <div className="mt-auto pt-5 flex flex-wrap items-center gap-5">
                          <div className="inline-flex items-center border border-coal/20">
                            <button onClick={() => update(i.id, i.qty - 1)} className="size-10 grid place-items-center hover:bg-paper"><Minus className="size-3.5" strokeWidth={1.5} /></button>
                            <span className="w-10 text-center text-sm font-mono">{String(i.qty).padStart(2, "0")}</span>
                            <button onClick={() => update(i.id, i.qty + 1)} className="size-10 grid place-items-center hover:bg-paper"><Plus className="size-3.5" strokeWidth={1.5} /></button>
                          </div>
                          <button className="eyebrow text-muted-foreground hover:text-coal flex items-center gap-1.5">
                            <Heart className="size-3.5" strokeWidth={1.5} /> Save for later
                          </button>
                          <button onClick={() => remove(i.id)} className="eyebrow text-muted-foreground hover:text-destructive flex items-center gap-1.5">
                            <Trash2 className="size-3.5" strokeWidth={1.5} /> Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-2xl lg:text-3xl">Rs {(i.price * i.qty).toLocaleString()}</div>
                        {i.oldPrice && (
                          <div className="eyebrow text-muted-foreground line-through mt-1">Rs {(i.oldPrice * i.qty).toLocaleString()}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* gift note */}
                <div className="mt-10 border border-coal/15 p-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="size-4 accent-coal" />
                    <Gift className="size-4" strokeWidth={1.5} />
                    <span className="eyebrow">Add a complimentary gift note</span>
                  </label>
                  {gift && (
                    <textarea placeholder="Write your note — handwritten, on cotton card."
                      className="w-full mt-4 p-3 border border-coal/15 bg-paper text-sm outline-none focus:border-coal min-h-24" />
                  )}
                </div>

                <Link to="/products" className="inline-flex items-center gap-2 mt-10 eyebrow hover:gap-3 transition-all">
                  ← Continue browsing the edit
                </Link>
              </div>

              {/* summary */}
              <aside className="lg:sticky lg:top-28 h-fit">
                <div className="bg-coal text-bone p-8 lg:p-10">
                  <div className="eyebrow text-bone/60 mb-6">§ Order summary</div>
                  <dl className="space-y-3 text-sm">
                    <Row label="Subtotal" value={`Rs ${subtotal.toLocaleString()}`} />
                    <Row label="Shipping" value={shipping === 0 ? "Complimentary" : `Rs ${shipping}`} />
                    {discount > 0 && <Row label="Promotion" value={`− Rs ${discount.toLocaleString()}`} />}
                    {saved > 0 && <Row label="You save" value={`Rs ${saved.toLocaleString()}`} muted />}
                  </dl>
                  <div className="border-t border-bone/15 mt-6 pt-6 flex items-baseline justify-between">
                    <span className="eyebrow text-bone/60">Total · PKR</span>
                    <span className="font-display italic text-4xl lg:text-5xl">Rs {total.toLocaleString()}</span>
                  </div>

                  <div className="mt-8">
                    <label className="eyebrow text-bone/60">Promotion code</label>
                    <div className="mt-2 flex">
                      <div className="relative flex-1">
                        <Tag className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-bone/40" strokeWidth={1.5} />
                        <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="KIFAYAT200"
                          className="w-full h-12 pl-10 pr-3 bg-bone/5 border border-bone/15 text-sm outline-none focus:border-bone text-bone placeholder:text-bone/30" />
                      </div>
                      <button onClick={() => setApplied(promo.toUpperCase() === "KIFAYAT200" ? 200 : null)}
                        className="h-12 px-5 eyebrow border border-bone/15 border-l-0 hover:bg-bone hover:text-coal transition">Apply</button>
                    </div>
                    {applied !== null && <p className="eyebrow text-emerald-300/80 mt-2">✓ Applied — Rs {applied} off</p>}
                  </div>

                  <Link to="/checkout"
                    className="group mt-8 w-full h-14 bg-bone text-coal eyebrow flex items-center justify-center gap-3 hover:bg-bone/90 transition">
                    Proceed to checkout
                    <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" strokeWidth={1.5} />
                  </Link>
                  <p className="mt-4 eyebrow text-bone/40 flex items-center justify-center gap-2">
                    <Lock className="size-3" strokeWidth={1.5} /> Secured · 256-bit encryption
                  </p>
                </div>

                {/* trust mini */}
                <div className="mt-6 grid grid-cols-3 gap-px bg-coal/15">
                  {[
                    { Icon: Truck, label: "Free over 2,500" },
                    { Icon: RotateCcw, label: "7-day returns" },
                    { Icon: ShieldCheck, label: "COD available" },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="bg-bone p-4 text-center">
                      <Icon className="size-4 mx-auto mb-2" strokeWidth={1.5} />
                      <div className="eyebrow text-muted-foreground">{label}</div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>

          {/* ── Trust manifesto ───────────────────────────────── */}
          <section className="border-t border-coal/10 bg-paper">
            <div className="max-w-[1600px] mx-auto px-5 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <p className="eyebrow text-muted-foreground mb-6">§ The Kifayat promise</p>
                <h2 className="font-display italic text-4xl lg:text-6xl leading-[0.95]">
                  Care<br />before<br />commerce.
                </h2>
              </div>
              <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-coal/10">
                {[
                  { n: "01", t: "Authenticated", d: "Every object verified at our Karachi warehouse before dispatch — no counterfeits, ever." },
                  { n: "02", t: "Honest pricing", d: "No phantom MRPs. The price you see is the price the market should pay." },
                  { n: "03", t: "Tracked dispatch", d: "Real-time updates from our hub to your door, with named couriers — not strangers." },
                  { n: "04", t: "Effortless returns", d: "Seven days, no questions, no restocking fee. Pickup arranged from your address." },
                ].map((b) => (
                  <div key={b.n} className="bg-paper p-8">
                    <span className="eyebrow text-muted-foreground">{b.n}</span>
                    <h3 className="font-display italic text-2xl mt-3">{b.t}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">{b.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── You may also consider ─────────────────────────── */}
          <section className="border-t border-coal/10">
            <div className="max-w-[1600px] mx-auto px-5 lg:px-10 py-20 lg:py-28">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="eyebrow text-muted-foreground mb-4">§ Curator's pairing</p>
                  <h2 className="font-display italic text-4xl lg:text-6xl leading-[0.95]">You may also<br />consider.</h2>
                </div>
                <Link to="/products" className="eyebrow hover:underline underline-offset-4 hidden sm:inline">View full edit ↗</Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-coal/10">
                {products.slice(3, 7).map((p, i) => (
                  <Link key={p.id} to="/products/$productId" params={{ productId: p.slug }} className="bg-bone p-6 group">
                    <div className="aspect-[4/5] bg-paper overflow-hidden mb-4">
                      <img src={p.image} alt={p.name} className="size-full object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex items-baseline justify-between eyebrow text-muted-foreground">
                      <span>No. {String(i + 1).padStart(2, "0")}</span>
                      <span>{p.brand}</span>
                    </div>
                    <h3 className="font-display italic text-xl mt-2 leading-tight line-clamp-2">{p.name}</h3>
                    <div className="mt-3 font-display">Rs {p.price.toLocaleString()}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </PageShell>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex justify-between items-baseline">
      <dt className="eyebrow text-bone/60">{label}</dt>
      <dd className={muted ? "text-bone/70 text-sm" : "text-sm"}>{value}</dd>
    </div>
  );
}

function EmptyCart() {
  return (
    <section className="max-w-3xl mx-auto px-5 py-32 text-center">
      <ShoppingBag className="size-10 mx-auto mb-8 text-muted-foreground" strokeWidth={1.2} />
      <h2 className="font-display italic text-5xl lg:text-7xl leading-[0.9]">An empty<br />bag, for now.</h2>
      <p className="mt-6 text-muted-foreground max-w-md mx-auto">The shelves are stocked. Begin with the season's edit, or browse the full catalogue.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/products" className="bg-coal text-bone eyebrow px-8 py-4 hover:bg-coal/90 transition">Shop the edit</Link>
        <Link to="/" className="border border-coal/20 eyebrow px-8 py-4 hover:bg-paper transition">Return home</Link>
      </div>
    </section>
  );
}
