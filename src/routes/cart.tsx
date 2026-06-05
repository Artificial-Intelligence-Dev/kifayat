import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import {
  Minus, Plus, Trash2, ShoppingBag, ArrowUpRight,
  Truck, ShieldCheck, Lock,
} from "lucide-react";
import { useCart, cart, cartTotals } from "@/lib/cart-store";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "The Bag — Kifayat" }, { name: "description", content: "Your considered selection from Kifayat — Pakistan's editorial marketplace." }] }),
  component: CartPage,
});

function CartPage() {
  const items = useCart();
  const { subtotal, shipping, total, count } = cartTotals(items);

  return (
    <PageShell>
      <section className="bg-coal text-bone">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 pt-12 lg:pt-20 pb-16 lg:pb-24">
          <div className="flex items-center justify-between eyebrow text-bone/60 mb-10">
            <span className="flex items-center gap-3"><span className="h-px w-8 bg-bone/40" /> Chapter 04 · The Bag</span>
            <span className="hidden sm:inline">{count} {count === 1 ? "object" : "objects"}</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <h1 className="lg:col-span-8 font-display italic text-6xl sm:text-7xl lg:text-[8.5rem] leading-[0.85]">
              Your<br />selection<span className="text-brass">.</span>
            </h1>
            <p className="lg:col-span-4 text-bone/70 text-sm lg:text-base leading-relaxed max-w-sm">
              A quiet pause before purchase. Review, adjust, or set aside for later — then Cash on Delivery, anywhere in Pakistan.
            </p>
          </div>
        </div>
      </section>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <section className="max-w-[1600px] mx-auto px-5 lg:px-10 py-16 lg:py-24">
          <div className="grid lg:grid-cols-[1fr_440px] gap-12 lg:gap-20">
            <div>
              <div className="grid grid-cols-[60px_1fr_120px_120px_40px] gap-4 px-2 pb-4 mb-2 border-b border-coal/15 eyebrow text-muted-foreground">
                <span></span><span>Object</span><span>Quantity</span><span className="text-right">Total</span><span></span>
              </div>
              <ul className="divide-y divide-coal/10">
                {items.map((i, idx) => (
                  <li key={i.slug} className="grid grid-cols-[60px_1fr_120px_120px_40px] gap-4 items-center py-5">
                    <div className="size-14 bg-paper overflow-hidden">
                      <img src={i.image} alt={i.name} className="size-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="eyebrow text-muted-foreground">N° {String(idx + 1).padStart(2, "0")} · {i.brand}</p>
                      <Link to="/products/$productId" params={{ productId: i.slug }} className="font-display italic text-lg leading-tight line-clamp-2 hover:text-brass transition">
                        {i.name}
                      </Link>
                      <p className="font-mono text-xs text-muted-foreground mt-1">Rs {i.price.toLocaleString()} each</p>
                    </div>
                    <div className="flex items-center gap-2 border border-coal/15 w-fit">
                      <button onClick={() => cart.updateQty(i.slug, i.qty - 1)} className="size-9 grid place-items-center hover:bg-coal hover:text-bone transition" aria-label="Decrease">
                        <Minus className="size-3" strokeWidth={1.5} />
                      </button>
                      <span className="w-8 text-center font-mono text-sm">{i.qty}</span>
                      <button onClick={() => cart.updateQty(i.slug, i.qty + 1)} className="size-9 grid place-items-center hover:bg-coal hover:text-bone transition" aria-label="Increase">
                        <Plus className="size-3" strokeWidth={1.5} />
                      </button>
                    </div>
                    <span className="text-right font-mono">Rs {(i.price * i.qty).toLocaleString()}</span>
                    <button onClick={() => cart.remove(i.slug)} className="size-8 grid place-items-center text-coal/40 hover:text-red-600 transition" aria-label="Remove">
                      <Trash2 className="size-4" strokeWidth={1.5} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="border border-coal/15 p-8 lg:p-10 bg-paper">
                <div className="eyebrow text-muted-foreground mb-6">§ Summary</div>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between"><dt className="eyebrow text-muted-foreground">Subtotal</dt><dd className="font-mono">Rs {subtotal.toLocaleString()}</dd></div>
                  <div className="flex justify-between"><dt className="eyebrow text-muted-foreground">Shipping</dt><dd className="font-mono">{shipping === 0 ? "Free" : `Rs ${shipping}`}</dd></div>
                </dl>
                <div className="mt-6 pt-6 border-t border-coal/15 flex items-baseline justify-between">
                  <span className="eyebrow text-muted-foreground">Total · PKR</span>
                  <span className="font-display italic text-4xl text-brass">Rs {total.toLocaleString()}</span>
                </div>
                <Link to="/checkout" className="group mt-8 w-full inline-flex items-center justify-between gap-3 bg-coal text-bone eyebrow px-6 py-4 hover:bg-brass hover:text-coal transition">
                  Proceed to checkout
                  <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" strokeWidth={1.5} />
                </Link>
                <div className="mt-8 pt-6 border-t border-coal/15 space-y-3">
                  <Reassure Icon={Truck} text="Dispatched Pakistan-wide" />
                  <Reassure Icon={ShieldCheck} text="Cash on Delivery accepted" />
                  <Reassure Icon={Lock} text="Encrypted data" />
                </div>
              </div>
            </aside>
          </div>
        </section>
      )}
    </PageShell>
  );
}

function Reassure({ Icon, text }: { Icon: typeof Lock; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <Icon className="size-4 text-coal/60" strokeWidth={1.5} />
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
}

function EmptyCart() {
  return (
    <section className="max-w-3xl mx-auto px-5 py-24 text-center">
      <ShoppingBag className="size-12 mx-auto text-coal/30 mb-6" strokeWidth={1.2} />
      <h2 className="font-display italic text-4xl lg:text-6xl">Your bag is empty<span className="text-brass">.</span></h2>
      <p className="text-muted-foreground mt-4 max-w-md mx-auto">Browse the edit and pick a few objects to consider.</p>
      <Link to="/products" className="inline-flex items-center gap-2 mt-10 bg-coal text-bone eyebrow px-6 py-4 hover:bg-brass hover:text-coal transition">
        Browse the edit <ArrowUpRight className="size-4" strokeWidth={1.5} />
      </Link>
    </section>
  );
}
