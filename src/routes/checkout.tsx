import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { products } from "@/lib/shop-data";
import { Check, CreditCard, Truck, Wallet, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Kifayat" }] }),
  component: Checkout,
});

const steps = ["Address", "Shipping", "Payment", "Review"] as const;

function Checkout() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const items = products.slice(0, 3).map((p) => ({ ...p, qty: 1 }));
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 2500 ? 0 : 200;
  const total = subtotal + shipping;

  if (done) {
    return (
      <PageShell>
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="size-16 mx-auto rounded-full bg-primary-soft grid place-items-center mb-5">
            <Check className="size-8 text-primary-dark" />
          </div>
          <h1 className="text-3xl mb-3">Order confirmed!</h1>
          <p className="text-muted-foreground mb-1">Order #KFY-{Math.floor(Math.random() * 90000 + 10000)}</p>
          <p className="text-muted-foreground mb-8">We've emailed your receipt. Expect delivery in 2–4 business days.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/account/orders" className="h-11 px-6 rounded-pill bg-primary text-primary-foreground font-semibold grid place-items-center">View order</Link>
            <Link to="/products" className="h-11 px-6 rounded-pill border border-border grid place-items-center">Keep shopping</Link>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader title="Checkout" breadcrumbs={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]} />

      <section className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr_380px] gap-8">
        <div>
          <ol className="flex items-center gap-2 mb-8 text-xs font-medium">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className={`size-7 rounded-full grid place-items-center ${i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                  {i < step ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className={i <= step ? "text-foreground" : "text-muted-foreground"}>{s}</span>
                {i < steps.length - 1 && <span className="w-6 h-px bg-border" />}
              </li>
            ))}
          </ol>

          <div className="bg-card border border-border rounded-2xl p-6">
            {step === 0 && <AddressStep />}
            {step === 1 && <ShippingStep />}
            {step === 2 && <PaymentStep />}
            {step === 3 && <ReviewStep items={items} />}

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
                className="h-11 px-5 rounded-pill border border-border text-sm disabled:opacity-40">Back</button>
              {step < steps.length - 1 ? (
                <button onClick={() => setStep((s) => s + 1)}
                  className="h-11 px-6 rounded-pill bg-primary text-primary-foreground font-semibold">Continue</button>
              ) : (
                <button onClick={() => setDone(true)}
                  className="h-11 px-6 rounded-pill bg-primary text-primary-foreground font-semibold">Place order</button>
              )}
            </div>
          </div>
        </div>

        <aside className="bg-card border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-28">
          <h2 className="font-display font-semibold mb-4">Order summary</h2>
          <ul className="space-y-3 mb-5">
            {items.map((i) => (
              <li key={i.id} className="flex gap-3 text-sm">
                <div className="size-12 rounded-md bg-secondary overflow-hidden shrink-0"><img src={i.image} alt="" className="size-full object-cover" /></div>
                <div className="flex-1 min-w-0">
                  <div className="line-clamp-1">{i.name}</div>
                  <div className="text-xs text-muted-foreground">Qty {i.qty}</div>
                </div>
                <span className="font-medium">Rs {(i.price * i.qty).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <dl className="space-y-2 text-sm border-t border-border pt-4">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>Rs {subtotal.toLocaleString()}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? <span className="text-success">Free</span> : `Rs ${shipping}`}</dd></div>
            <div className="flex justify-between font-display font-bold text-lg pt-2 border-t border-border"><dt>Total</dt><dd className="text-primary-dark">Rs {total.toLocaleString()}</dd></div>
          </dl>
        </aside>
      </section>
    </PageShell>
  );
}

const Field = ({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="block">
    <span className="block text-sm font-medium mb-1.5">{label}</span>
    <input {...rest} className="w-full h-11 px-3.5 rounded-md border border-border bg-background outline-none focus:border-primary text-sm" />
  </label>
);

function AddressStep() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5"><MapPin className="size-5 text-primary" /><h2 className="font-display font-semibold text-lg">Shipping address</h2></div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" placeholder="Ali Khan" />
        <Field label="Phone" placeholder="+92 300 1234567" />
        <Field label="Email" type="email" placeholder="you@example.com" />
        <Field label="City" defaultValue="Karachi" />
        <div className="sm:col-span-2"><Field label="Street address" placeholder="House 12, Street 5, DHA Phase 6" /></div>
        <Field label="Area" placeholder="DHA Phase 6" />
        <Field label="Postal code" placeholder="75500" />
      </div>
    </div>
  );
}

function ShippingStep() {
  const [opt, setOpt] = useState("standard");
  const options = [
    { id: "standard", label: "Standard delivery", sub: "2–4 business days", price: "Free" },
    { id: "express", label: "Express delivery", sub: "1 business day in Karachi", price: "Rs 350" },
    { id: "pickup", label: "Store pickup", sub: "Collect from HHC warehouse", price: "Free" },
  ];
  return (
    <div>
      <div className="flex items-center gap-2 mb-5"><Truck className="size-5 text-primary" /><h2 className="font-display font-semibold text-lg">Shipping method</h2></div>
      <div className="space-y-3">
        {options.map((o) => (
          <label key={o.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${opt === o.id ? "border-primary bg-primary-soft/40" : "border-border"}`}>
            <input type="radio" checked={opt === o.id} onChange={() => setOpt(o.id)} className="size-4 accent-[color:var(--color-primary)]" />
            <div className="flex-1"><div className="font-medium">{o.label}</div><div className="text-xs text-muted-foreground">{o.sub}</div></div>
            <span className="font-medium text-sm">{o.price}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function PaymentStep() {
  const [opt, setOpt] = useState("card");
  return (
    <div>
      <div className="flex items-center gap-2 mb-5"><Wallet className="size-5 text-primary" /><h2 className="font-display font-semibold text-lg">Payment method</h2></div>
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {[
          { id: "card", label: "Card", Icon: CreditCard },
          { id: "cod", label: "Cash on delivery", Icon: Wallet },
          { id: "easypaisa", label: "Easypaisa / Jazzcash", Icon: Wallet },
        ].map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setOpt(id)}
            className={`p-4 rounded-xl border-2 text-left transition ${opt === id ? "border-primary bg-primary-soft/40" : "border-border"}`}>
            <Icon className="size-5 text-primary mb-2" />
            <div className="font-medium text-sm">{label}</div>
          </button>
        ))}
      </div>
      {opt === "card" && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><Field label="Card number" placeholder="1234 5678 9012 3456" /></div>
          <Field label="Expiry" placeholder="MM/YY" />
          <Field label="CVC" placeholder="123" />
          <div className="sm:col-span-2"><Field label="Cardholder name" placeholder="Ali Khan" /></div>
        </div>
      )}
      {opt === "cod" && <p className="text-sm text-muted-foreground">Pay in cash when your order is delivered. A nominal Rs 50 handling fee may apply.</p>}
      {opt === "easypaisa" && <p className="text-sm text-muted-foreground">You'll receive a payment prompt on your mobile after placing the order.</p>}
    </div>
  );
}

function ReviewStep({ items }: { items: { id: string; name: string; qty: number; price: number }[] }) {
  return (
    <div>
      <h2 className="font-display font-semibold text-lg mb-5">Review your order</h2>
      <div className="space-y-4 text-sm">
        <div className="p-4 rounded-xl bg-secondary"><div className="font-medium mb-1">Shipping to</div><div className="text-muted-foreground">Ali Khan · House 12, Street 5, DHA Phase 6, Karachi 75500</div></div>
        <div className="p-4 rounded-xl bg-secondary"><div className="font-medium mb-1">Delivery</div><div className="text-muted-foreground">Standard delivery · 2–4 business days</div></div>
        <div className="p-4 rounded-xl bg-secondary"><div className="font-medium mb-1">Payment</div><div className="text-muted-foreground">Card ending in 3456</div></div>
        <div className="p-4 rounded-xl bg-secondary">
          <div className="font-medium mb-2">Items ({items.length})</div>
          {items.map((i) => <div key={i.id} className="flex justify-between text-muted-foreground"><span>{i.name} × {i.qty}</span><span>Rs {(i.price * i.qty).toLocaleString()}</span></div>)}
        </div>
      </div>
    </div>
  );
}
