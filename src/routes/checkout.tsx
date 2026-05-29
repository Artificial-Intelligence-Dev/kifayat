import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { products } from "@/lib/shop-data";
import {
  Check, CreditCard, Truck, Wallet, MapPin, Lock, ShieldCheck,
  ArrowUpRight, ArrowLeft, Sparkles, Package,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Kifayat" }, { name: "description", content: "A quiet, secure checkout for considered objects." }] }),
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

  if (done) return <Confirmed />;

  return (
    <PageShell>
      {/* ── Editorial header ────────────────────────────────────── */}
      <section className="bg-coal text-bone">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 pt-12 lg:pt-20 pb-12 lg:pb-16">
          <div className="flex items-center justify-between eyebrow text-bone/60 mb-10">
            <span className="flex items-center gap-3"><span className="h-px w-8 bg-bone/40" /> Chapter 05 · Checkout</span>
            <span className="flex items-center gap-2"><Lock className="size-3" strokeWidth={1.5} /> Secure · Encrypted</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <h1 className="lg:col-span-8 font-display italic text-6xl sm:text-7xl lg:text-[8.5rem] leading-[0.85]">
              The final<br />gesture<span className="not-italic">.</span>
            </h1>
            <p className="lg:col-span-4 text-bone/70 text-sm lg:text-base leading-relaxed max-w-sm">
              Four short steps. No hidden fees, no surprises — just a careful handover from our hub to your door.
            </p>
          </div>

          {/* stepper */}
          <ol className="mt-14 lg:mt-20 grid grid-cols-4 gap-px bg-bone/10">
            {steps.map((s, i) => {
              const active = i === step;
              const past = i < step;
              return (
                <li key={s} className={`bg-coal p-5 lg:p-6 ${active ? "border-b-2 border-bone" : "border-b border-transparent"}`}>
                  <div className="flex items-center gap-3">
                    <span className={`eyebrow font-mono ${active ? "text-bone" : past ? "text-bone/60" : "text-bone/30"}`}>
                      {past ? <Check className="size-3.5" strokeWidth={1.8} /> : `0${i + 1}`}
                    </span>
                    <span className={`eyebrow ${active ? "text-bone" : "text-bone/40"}`}>{s}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── Main grid ──────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-5 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_440px] gap-12 lg:gap-20">
          <div>
            <div className="border-t border-coal/15 pt-10">
              {step === 0 && <AddressStep />}
              {step === 1 && <ShippingStep />}
              {step === 2 && <PaymentStep />}
              {step === 3 && <ReviewStep items={items} />}
            </div>

            <div className="mt-16 pt-8 border-t border-coal/15 flex justify-between items-center">
              <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
                className="inline-flex items-center gap-2 eyebrow disabled:opacity-30 hover:gap-3 transition-all">
                <ArrowLeft className="size-4" strokeWidth={1.5} /> Back
              </button>
              {step < steps.length - 1 ? (
                <button onClick={() => setStep((s) => s + 1)}
                  className="group inline-flex items-center gap-3 bg-coal text-bone eyebrow px-8 py-4 hover:bg-coal/90 transition">
                  Continue
                  <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" strokeWidth={1.5} />
                </button>
              ) : (
                <button onClick={() => setDone(true)}
                  className="group inline-flex items-center gap-3 bg-coal text-bone eyebrow px-10 py-5 hover:bg-coal/90 transition">
                  Place order · Rs {total.toLocaleString()}
                  <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>

          {/* summary */}
          <aside className="lg:sticky lg:top-28 h-fit">
            <div className="border border-coal/15 p-8 lg:p-10 bg-paper">
              <div className="eyebrow text-muted-foreground mb-6">§ Order summary</div>
              <ul className="space-y-5">
                {items.map((i, idx) => (
                  <li key={i.id} className="grid grid-cols-[auto_1fr_auto] gap-4 items-start">
                    <div className="relative size-16 bg-bone overflow-hidden">
                      <img src={i.image} alt="" className="size-full object-cover" />
                      <span className="absolute -top-1 -right-1 size-5 rounded-full bg-coal text-bone text-[10px] grid place-items-center font-mono">{i.qty}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="eyebrow text-muted-foreground">No. {String(idx + 1).padStart(2, "0")} · {i.brand}</div>
                      <div className="font-display italic text-lg leading-tight mt-0.5 line-clamp-2">{i.name}</div>
                    </div>
                    <span className="text-sm font-mono whitespace-nowrap">Rs {(i.price * i.qty).toLocaleString()}</span>
                  </li>
                ))}
              </ul>

              <dl className="mt-8 pt-6 border-t border-coal/15 space-y-2.5 text-sm">
                <div className="flex justify-between"><dt className="eyebrow text-muted-foreground">Subtotal</dt><dd>Rs {subtotal.toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt className="eyebrow text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Complimentary" : `Rs ${shipping}`}</dd></div>
                <div className="flex justify-between"><dt className="eyebrow text-muted-foreground">Tax</dt><dd>Included</dd></div>
              </dl>
              <div className="mt-6 pt-6 border-t border-coal/15 flex items-baseline justify-between">
                <span className="eyebrow text-muted-foreground">Total · PKR</span>
                <span className="font-display italic text-4xl">Rs {total.toLocaleString()}</span>
              </div>

              <div className="mt-8 pt-6 border-t border-coal/15 space-y-3">
                <Reassure Icon={ShieldCheck} text="Verified merchants only" />
                <Reassure Icon={Truck} text="2–4 business days · Karachi" />
                <Reassure Icon={Package} text="7-day no-question returns" />
                <Reassure Icon={Lock} text="256-bit encrypted payment" />
              </div>
            </div>

            <p className="mt-6 eyebrow text-muted-foreground text-center">
              Need help? <Link to="/contact" className="text-coal hover:underline">Speak to a curator ↗</Link>
            </p>
          </aside>
        </div>
      </section>
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

/* ── Step components ─────────────────────────────────────── */

function StepHeader({ n, eyebrow, title, lede }: { n: string; eyebrow: string; title: string; lede: string }) {
  return (
    <div className="grid lg:grid-cols-12 gap-6 mb-10">
      <div className="lg:col-span-3">
        <div className="eyebrow text-muted-foreground">Step {n}</div>
        <div className="eyebrow text-muted-foreground mt-1">{eyebrow}</div>
      </div>
      <div className="lg:col-span-9">
        <h2 className="font-display italic text-4xl lg:text-5xl leading-[0.95]">{title}</h2>
        <p className="mt-3 text-muted-foreground max-w-xl text-sm">{lede}</p>
      </div>
    </div>
  );
}

const Field = ({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="block">
    <span className="eyebrow text-muted-foreground mb-2 block">{label}</span>
    <input {...rest} className="w-full h-12 px-4 bg-paper border border-coal/15 outline-none focus:border-coal text-sm transition" />
  </label>
);

function AddressStep() {
  return (
    <div>
      <StepHeader n="01" eyebrow="§ Where it goes" title="Tell us where to send it." lede="Your address is encrypted end-to-end and only shared with the dispatch courier." />
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" placeholder="Ali Khan" />
        <Field label="Phone number" placeholder="+92 300 1234567" />
        <div className="sm:col-span-2"><Field label="Email" type="email" placeholder="you@example.com" /></div>
        <div className="sm:col-span-2"><Field label="Street address" placeholder="House 12, Street 5, DHA Phase 6" /></div>
        <Field label="Area" placeholder="DHA Phase 6" />
        <Field label="Postal code" placeholder="75500" />
        <div className="sm:col-span-2"><Field label="City" defaultValue="Karachi" /></div>
      </div>
      <label className="mt-6 flex items-center gap-3 cursor-pointer">
        <input type="checkbox" className="size-4 accent-coal" defaultChecked />
        <span className="eyebrow text-muted-foreground">Save this address for future orders</span>
      </label>
    </div>
  );
}

function ShippingStep() {
  const [opt, setOpt] = useState("standard");
  const options = [
    { id: "standard", label: "Standard delivery", sub: "2–4 business days · door handover", price: "Complimentary", note: "Recommended" },
    { id: "express", label: "Express · Karachi only", sub: "Same-day before 5pm, next-day after", price: "Rs 350", note: null },
    { id: "pickup", label: "Studio pickup", sub: "Collect from our HHC warehouse", price: "Free", note: null },
  ];
  return (
    <div>
      <StepHeader n="02" eyebrow="§ How it travels" title="Choose the journey." lede="Three considered ways to receive your selection — each handled by named couriers, not anonymous fleets." />
      <div className="space-y-px bg-coal/10">
        {options.map((o, i) => (
          <label key={o.id}
            className={`group flex items-center gap-6 p-6 lg:p-8 bg-bone cursor-pointer transition border-l-2 ${opt === o.id ? "border-coal" : "border-transparent hover:border-coal/30"}`}>
            <input type="radio" checked={opt === o.id} onChange={() => setOpt(o.id)} className="size-4 accent-coal" />
            <span className="eyebrow text-muted-foreground font-mono w-8">0{i + 1}</span>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="font-display italic text-xl lg:text-2xl">{o.label}</span>
                {o.note && <span className="eyebrow border border-coal/20 px-2 py-0.5">{o.note}</span>}
              </div>
              <div className="eyebrow text-muted-foreground mt-1.5">{o.sub}</div>
            </div>
            <span className="font-mono text-sm">{o.price}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function PaymentStep() {
  const [opt, setOpt] = useState("card");
  const methods = [
    { id: "card", label: "Card", Icon: CreditCard, sub: "Visa, Master, Amex" },
    { id: "cod", label: "Cash on delivery", Icon: Wallet, sub: "Pay the courier" },
    { id: "wallet", label: "Easypaisa / JazzCash", Icon: Wallet, sub: "Mobile wallet" },
  ];
  return (
    <div>
      <StepHeader n="03" eyebrow="§ How it's paid" title="Settle, securely." lede="Every transaction is encrypted at 256-bit. We never store full card details on our servers." />
      <div className="grid sm:grid-cols-3 gap-px bg-coal/10 mb-8">
        {methods.map(({ id, label, sub, Icon }) => (
          <button key={id} onClick={() => setOpt(id)}
            className={`bg-bone p-6 text-left transition border-t-2 ${opt === id ? "border-coal" : "border-transparent hover:border-coal/30"}`}>
            <Icon className="size-5 mb-4" strokeWidth={1.5} />
            <div className="font-display italic text-xl">{label}</div>
            <div className="eyebrow text-muted-foreground mt-1">{sub}</div>
          </button>
        ))}
      </div>
      {opt === "card" && (
        <div className="grid sm:grid-cols-2 gap-5 pt-6 border-t border-coal/15">
          <div className="sm:col-span-2"><Field label="Card number" placeholder="1234  5678  9012  3456" /></div>
          <Field label="Expiry" placeholder="MM / YY" />
          <Field label="CVC" placeholder="•••" />
          <div className="sm:col-span-2"><Field label="Cardholder name" placeholder="Ali Khan" /></div>
        </div>
      )}
      {opt === "cod" && (
        <div className="pt-6 border-t border-coal/15 flex items-start gap-4">
          <Wallet className="size-5 text-coal/60 shrink-0 mt-0.5" strokeWidth={1.5} />
          <p className="text-sm text-muted-foreground max-w-lg">Pay in cash directly to the courier upon delivery. A nominal Rs 50 handling fee applies for cash orders.</p>
        </div>
      )}
      {opt === "wallet" && (
        <div className="pt-6 border-t border-coal/15 flex items-start gap-4">
          <Sparkles className="size-5 text-coal/60 shrink-0 mt-0.5" strokeWidth={1.5} />
          <p className="text-sm text-muted-foreground max-w-lg">A payment prompt will arrive on your registered mobile number moments after order placement.</p>
        </div>
      )}
    </div>
  );
}

function ReviewStep({ items }: { items: { id: string; name: string; qty: number; price: number; image: string; brand: string }[] }) {
  return (
    <div>
      <StepHeader n="04" eyebrow="§ The final look" title="One last review." lede="Confirm the details below. You can amend any step before placing the order." />
      <div className="grid sm:grid-cols-2 gap-px bg-coal/10">
        {[
          { Icon: MapPin, t: "Shipping to", d: "Ali Khan · House 12, Street 5, DHA Phase 6, Karachi 75500" },
          { Icon: Truck, t: "Delivery", d: "Standard · 2–4 business days · complimentary" },
          { Icon: CreditCard, t: "Payment", d: "Card ending •••• 3456" },
          { Icon: Package, t: "Items", d: `${items.length} considered objects` },
        ].map(({ Icon, t, d }) => (
          <div key={t} className="bg-bone p-6">
            <div className="flex items-center gap-2 eyebrow text-muted-foreground mb-3">
              <Icon className="size-3.5" strokeWidth={1.5} /> {t}
            </div>
            <p className="text-sm leading-relaxed">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 border border-coal/15">
        <div className="eyebrow p-5 border-b border-coal/10 text-muted-foreground">§ Itemised</div>
        <ul className="divide-y divide-coal/10">
          {items.map((i, idx) => (
            <li key={i.id} className="flex items-center gap-5 p-5">
              <span className="eyebrow font-mono text-muted-foreground w-8">{String(idx + 1).padStart(2, "0")}</span>
              <div className="size-14 bg-paper overflow-hidden"><img src={i.image} alt="" className="size-full object-cover" /></div>
              <div className="flex-1 min-w-0">
                <div className="eyebrow text-muted-foreground">{i.brand}</div>
                <div className="font-display italic text-lg leading-tight">{i.name} <span className="text-muted-foreground not-italic font-sans text-sm">× {i.qty}</span></div>
              </div>
              <span className="font-mono text-sm">Rs {(i.price * i.qty).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Confirmed() {
  const orderId = `KFY-${Math.floor(Math.random() * 90000 + 10000)}`;
  return (
    <PageShell>
      <section className="bg-coal text-bone">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 py-20 lg:py-32">
          <div className="eyebrow text-bone/60 mb-10 flex items-center gap-3">
            <span className="h-px w-8 bg-bone/40" /> Chapter 06 · Confirmation
          </div>
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow text-bone/60 mb-6">{orderId} · sealed & dispatched</p>
              <h1 className="font-display italic text-6xl sm:text-7xl lg:text-[9rem] leading-[0.85]">
                Thank you<span className="not-italic">.</span><br />
                It's on its way.
              </h1>
            </div>
            <p className="lg:col-span-4 text-bone/70 text-sm lg:text-base leading-relaxed max-w-sm">
              A confirmation has landed in your inbox. Expect dispatch within 24 hours, and arrival in 2–4 business days.
            </p>
          </div>

          <div className="mt-16 grid sm:grid-cols-3 gap-px bg-bone/10 max-w-3xl">
            {[
              { n: "01", t: "Order placed", on: true },
              { n: "02", t: "Dispatched", on: false },
              { n: "03", t: "Delivered", on: false },
            ].map((s) => (
              <div key={s.n} className={`bg-coal p-6 border-t-2 ${s.on ? "border-bone" : "border-bone/20"}`}>
                <div className={`eyebrow font-mono ${s.on ? "text-bone" : "text-bone/40"}`}>{s.n}</div>
                <div className={`mt-2 ${s.on ? "text-bone" : "text-bone/40"} font-display italic text-xl`}>{s.t}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link to="/account/orders" className="bg-bone text-coal eyebrow px-8 py-4 inline-flex items-center gap-3 hover:bg-bone/90 transition">
              Track this order <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </Link>
            <Link to="/products" className="border border-bone/30 eyebrow px-8 py-4 hover:bg-bone/10 transition">Continue shopping</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
