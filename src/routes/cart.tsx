import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { products } from "@/lib/shop-data";
import { Minus, Plus, Trash2, ShoppingBag, Tag } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Kifayat" }, { name: "description", content: "Review the items in your Kifayat cart." }] }),
  component: CartPage,
});

function CartPage() {
  const [items, setItems] = useState(
    products.slice(0, 3).map((p) => ({ ...p, qty: 1 }))
  );
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState<number | null>(null);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const shipping = subtotal === 0 ? 0 : subtotal >= 2500 ? 0 : 200;
  const discount = applied ?? 0;
  const total = Math.max(0, subtotal + shipping - discount);

  const update = (id: string, qty: number) =>
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const remove = (id: string) => setItems((arr) => arr.filter((i) => i.id !== id));

  return (
    <PageShell>
      <PageHeader title="Your cart" subtitle={`${items.length} item${items.length !== 1 ? "s" : ""} in your bag`}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Cart" }]} />

      <section className="max-w-7xl mx-auto px-4 py-10">
        {items.length === 0 ? (
          <div className="text-center py-24 border border-dashed rounded-2xl">
            <ShoppingBag className="size-10 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add a few items to get started.</p>
            <Link to="/products" className="inline-flex items-center h-11 px-6 rounded-pill bg-primary text-primary-foreground font-semibold">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            <div className="space-y-4">
              {items.map((i) => (
                <div key={i.id} className="flex gap-4 p-4 bg-card border border-border rounded-2xl">
                  <Link to="/products/$productId" params={{ productId: i.slug }} className="size-24 sm:size-28 rounded-xl bg-secondary overflow-hidden shrink-0">
                    <img src={i.image} alt={i.name} className="size-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground">{i.brand}</div>
                    <Link to="/products/$productId" params={{ productId: i.slug }} className="font-medium hover:text-primary line-clamp-2">{i.name}</Link>
                    <div className="mt-2 flex items-center justify-between flex-wrap gap-3">
                      <div className="inline-flex items-center border border-border rounded-pill">
                        <button onClick={() => update(i.id, i.qty - 1)} className="size-9 grid place-items-center"><Minus className="size-3.5" /></button>
                        <span className="w-8 text-center text-sm font-medium">{i.qty}</span>
                        <button onClick={() => update(i.id, i.qty + 1)} className="size-9 grid place-items-center"><Plus className="size-3.5" /></button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-primary-dark">Rs {(i.price * i.qty).toLocaleString()}</span>
                        <button onClick={() => remove(i.id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive p-1">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-card border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-28">
              <h2 className="font-display font-semibold text-lg mb-4">Order summary</h2>
              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>Rs {subtotal.toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? <span className="text-success">Free</span> : `Rs ${shipping}`}</dd></div>
                {discount > 0 && <div className="flex justify-between"><dt className="text-muted-foreground">Discount</dt><dd className="text-success">− Rs {discount.toLocaleString()}</dd></div>}
              </dl>
              <div className="border-t border-border my-4" />
              <div className="flex justify-between font-display font-bold text-lg">
                <span>Total</span><span className="text-primary-dark">Rs {total.toLocaleString()}</span>
              </div>

              <div className="mt-5">
                <label className="text-xs font-medium text-muted-foreground">Promo code</label>
                <div className="mt-1.5 flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="KIFAYAT200"
                      className="w-full h-10 pl-9 pr-3 rounded-md border border-border bg-background text-sm outline-none focus:border-primary" />
                  </div>
                  <button onClick={() => setApplied(promo.toUpperCase() === "KIFAYAT200" ? 200 : null)}
                    className="h-10 px-4 rounded-md bg-secondary hover:bg-primary-soft text-sm font-medium">Apply</button>
                </div>
                {applied !== null && <p className="text-xs text-success mt-1.5">Promo applied — Rs {applied} off</p>}
              </div>

              <Link to="/checkout" className="mt-5 w-full h-12 rounded-pill bg-primary text-primary-foreground font-semibold grid place-items-center hover:bg-primary-dark transition">
                Checkout
              </Link>
              <Link to="/products" className="mt-2 w-full h-11 rounded-pill border border-border grid place-items-center text-sm hover:bg-secondary">
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </section>
    </PageShell>
  );
}
