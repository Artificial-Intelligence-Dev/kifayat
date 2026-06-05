import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import {
  Check, CreditCard, Truck, Wallet, MapPin, Lock, ShieldCheck,
  ArrowUpRight, ArrowLeft, Package,
} from "lucide-react";
import { useState } from "react";
import { useCart, cart, cartTotals } from "@/lib/cart-store";
import { useServerFn } from "@tanstack/react-start";
import { createOrder } from "@/lib/shop.functions";
import { useAuth } from "@/lib/auth-store";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Kifayat" }, { name: "description", content: "A quiet, secure checkout for considered objects." }] }),
  component: Checkout,
});

const steps = ["Address", "Shipping", "Payment", "Review"] as const;

type Address = {
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  address_line1: string;
  address_line2: string;
  city: string;
  province: string;
  postal_code: string;
};

function Checkout() {
  const items = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const submit = useServerFn(createOrder);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [confirmed, setConfirmed] = useState<{ order_number: string; total: number } | null>(null);
  const [address, setAddress] = useState<Address>({
    contact_name: "",
    contact_phone: "",
    contact_email: user?.email ?? "",
    address_line1: "",
    address_line2: "",
    city: "",
    province: "Sindh",
    postal_code: "",
  });

  const { subtotal, shipping, total, count } = cartTotals(items);

  if (confirmed) return <Confirmed order={confirmed} />;

  if (items.length === 0 && !confirmed) {
    return (
      <PageShell>
        <section className="max-w-3xl mx-auto px-5 py-32 text-center">
          <p className="eyebrow text-muted-foreground mb-4">§ Your bag is empty</p>
          <h1 className="font-display italic text-5xl lg:text-7xl leading-[0.9]">Nothing to check out<span className="text-brass">.</span></h1>
          <Link to="/products" className="inline-flex items-center gap-2 mt-10 bg-coal text-bone eyebrow px-6 py-4 hover:bg-brass hover:text-coal transition">
            Browse the edit <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </Link>
        </section>
      </PageShell>
    );
  }

  async function placeOrder() {
    setBusy(true);
    try {
      const res = await submit({
        data: {
          contact_name: address.contact_name,
          contact_phone: address.contact_phone,
          contact_email: address.contact_email || null,
          address_line1: address.address_line1,
          address_line2: address.address_line2 || null,
          city: address.city,
          province: address.province,
          postal_code: address.postal_code || null,
          shipping,
          items: items.map((i) => ({
            product_id: i.product_id,
            product_name: i.name,
            product_slug: i.slug,
            unit_price: i.price,
            quantity: i.qty,
          })),
        },
      });
      cart.clear();
      setConfirmed({ order_number: res.order_number, total: res.total });
      toast.success("Order placed.");
    } catch (e: any) {
      toast.error(e?.message ?? "Order failed.");
    } finally {
      setBusy(false);
    }
  }

  const addrValid = address.contact_name && address.contact_phone && address.address_line1 && address.city;

  return (
    <PageShell>
      <section className="bg-coal text-bone">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 pt-12 lg:pt-20 pb-12 lg:pb-16">
          <div className="flex items-center justify-between eyebrow text-bone/60 mb-10">
            <span className="flex items-center gap-3"><span className="h-px w-8 bg-bone/40" /> Chapter 05 · Checkout</span>
            <span className="flex items-center gap-2"><Lock className="size-3" strokeWidth={1.5} /> Secure</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <h1 className="lg:col-span-8 font-display italic text-6xl sm:text-7xl lg:text-[8rem] leading-[0.85]">
              The final<br />gesture<span className="text-brass">.</span>
            </h1>
            <p className="lg:col-span-4 text-bone/70 text-sm lg:text-base leading-relaxed max-w-sm">
              Four short steps. No hidden fees — Cash on Delivery, anywhere in Pakistan, from our hub to your door.
            </p>
          </div>

          <ol className="mt-14 lg:mt-20 grid grid-cols-4 gap-px bg-bone/10">
            {steps.map((s, i) => {
              const active = i === step;
              const past = i < step;
              return (
                <li key={s} className={`bg-coal p-5 lg:p-6 ${active ? "border-b-2 border-brass" : "border-b border-transparent"}`}>
                  <div className="flex items-center gap-3">
                    <span className={`eyebrow font-mono ${active ? "text-brass" : past ? "text-bone/60" : "text-bone/30"}`}>
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

      <section className="max-w-[1600px] mx-auto px-5 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_440px] gap-12 lg:gap-20">
          <div>
            <div className="border-t border-coal/15 pt-10">
              {step === 0 && <AddressStep value={address} onChange={setAddress} />}
              {step === 1 && <ShippingStep />}
              {step === 2 && <PaymentStep />}
              {step === 3 && <ReviewStep items={items} address={address} />}
            </div>
            <div className="mt-16 pt-8 border-t border-coal/15 flex justify-between items-center">
              <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
                className="inline-flex items-center gap-2 eyebrow disabled:opacity-30 hover:gap-3 transition-all">
                <ArrowLeft className="size-4" strokeWidth={1.5} /> Back
              </button>
              {step < steps.length - 1 ? (
                <button onClick={() => setStep((s) => s + 1)} disabled={step === 0 && !addrValid}
                  className="group inline-flex items-center gap-3 bg-coal text-bone eyebrow px-8 py-4 hover:bg-brass hover:text-coal transition disabled:opacity-50">
                  Continue
                  <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" strokeWidth={1.5} />
                </button>
              ) : (
                <button onClick={placeOrder} disabled={busy || !addrValid}
                  className="group inline-flex items-center gap-3 bg-coal text-bone eyebrow px-10 py-5 hover:bg-brass hover:text-coal transition disabled:opacity-60">
                  {busy ? "Placing…" : `Place order · Rs ${total.toLocaleString()}`}
                  <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 h-fit">
            <div className="border border-coal/15 p-8 lg:p-10 bg-paper">
              <div className="eyebrow text-muted-foreground mb-6">§ Order summary · {count} objects</div>
              <ul className="space-y-5">
                {items.map((i, idx) => (
                  <li key={i.slug} className="grid grid-cols-[auto_1fr_auto] gap-4 items-start">
                    <div className="relative size-16 bg-bone overflow-hidden">
                      <img src={i.image} alt="" className="size-full object-cover" />
                      <span className="absolute -top-1 -right-1 size-5 rounded-full bg-coal text-bone text-[10px] grid place-items-center font-mono">{i.qty}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="eyebrow text-muted-foreground">N° {String(idx + 1).padStart(2, "0")} · {i.brand}</div>
                      <div className="font-display italic text-lg leading-tight mt-0.5 line-clamp-2">{i.name}</div>
                    </div>
                    <span className="text-sm font-mono whitespace-nowrap">Rs {(i.price * i.qty).toLocaleString()}</span>
                  </li>
                ))}
              </ul>

              <dl className="mt-8 pt-6 border-t border-coal/15 space-y-2.5 text-sm">
                <div className="flex justify-between"><dt className="eyebrow text-muted-foreground">Subtotal</dt><dd>Rs {subtotal.toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt className="eyebrow text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Complimentary" : `Rs ${shipping}`}</dd></div>
              </dl>
              <div className="mt-6 pt-6 border-t border-coal/15 flex items-baseline justify-between">
                <span className="eyebrow text-muted-foreground">Total · PKR</span>
                <span className="font-display italic text-4xl text-brass">Rs {total.toLocaleString()}</span>
              </div>

              <div className="mt-8 pt-6 border-t border-coal/15 space-y-3">
                <Reassure Icon={ShieldCheck} text="Verified merchants only" />
                <Reassure Icon={Truck} text="2–5 business days · Pakistan-wide" />
                <Reassure Icon={Wallet} text="Cash on Delivery accepted" />
                <Reassure Icon={Lock} text="Encrypted data transfer" />
              </div>
            </div>
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

const Field = ({ label, value, onChange, ...rest }: { label: string; value: string; onChange: (v: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) => (
  <label className="block">
    <span className="eyebrow text-muted-foreground mb-2 block">{label}</span>
    <input {...rest} value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-12 px-4 bg-paper border border-coal/15 outline-none focus:border-coal text-sm transition" />
  </label>
);

function AddressStep({ value, onChange }: { value: Address; onChange: (a: Address) => void }) {
  const set = (k: keyof Address) => (v: string) => onChange({ ...value, [k]: v });
  return (
    <div>
      <StepHeader n="01" eyebrow="§ Where it goes" title="Tell us where to send it." lede="Your address is used only by the courier. No marketing, no sharing." />
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name *" value={value.contact_name} onChange={set("contact_name")} placeholder="Ali Khan" required />
        <Field label="Phone number *" value={value.contact_phone} onChange={set("contact_phone")} placeholder="+92 300 1234567" required />
        <div className="sm:col-span-2"><Field label="Email" type="email" value={value.contact_email} onChange={set("contact_email")} placeholder="you@example.com" /></div>
        <div className="sm:col-span-2"><Field label="Street address *" value={value.address_line1} onChange={set("address_line1")} placeholder="House 12, Street 5" required /></div>
        <div className="sm:col-span-2"><Field label="Area / Apartment" value={value.address_line2} onChange={set("address_line2")} placeholder="DHA Phase 6" /></div>
        <Field label="City *" value={value.city} onChange={set("city")} placeholder="Karachi" required />
        <label className="block">
          <span className="eyebrow text-muted-foreground mb-2 block">Province *</span>
          <select value={value.province} onChange={(e) => onChange({ ...value, province: e.target.value })} className="w-full h-12 px-4 bg-paper border border-coal/15 outline-none focus:border-coal text-sm">
            {["Sindh", "Punjab", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad Capital Territory", "Gilgit-Baltistan", "Azad Kashmir"].map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <Field label="Postal code" value={value.postal_code} onChange={set("postal_code")} placeholder="75500" />
      </div>
    </div>
  );
}

function ShippingStep() {
  return (
    <div>
      <StepHeader n="02" eyebrow="§ How it travels" title="Standard delivery, Pakistan-wide." lede="2–5 business days, anywhere — Karachi to Skardu, by named courier." />
      <div className="border border-coal/15 p-6 lg:p-8 bg-paper flex items-center gap-6">
        <Truck className="size-8 text-brass" strokeWidth={1.2} />
        <div className="flex-1">
          <p className="font-display italic text-2xl">Standard nationwide</p>
          <p className="eyebrow text-muted-foreground mt-1">Door handover, full tracking</p>
        </div>
        <span className="font-mono text-sm">{"Free over Rs 2,500"}</span>
      </div>
    </div>
  );
}

function PaymentStep() {
  return (
    <div>
      <StepHeader n="03" eyebrow="§ How it's paid" title="Cash on Delivery." lede="Pay the courier in cash when your order arrives. No card needed." />
      <div className="border border-coal/15 p-6 lg:p-8 bg-paper flex items-center gap-6">
        <Wallet className="size-8 text-brass" strokeWidth={1.2} />
        <div className="flex-1">
          <p className="font-display italic text-2xl">Cash on Delivery</p>
          <p className="eyebrow text-muted-foreground mt-1">Pay when your order arrives at your door</p>
        </div>
      </div>
    </div>
  );
}

function ReviewStep({ items, address }: { items: ReturnType<typeof useCart>; address: Address }) {
  return (
    <div>
      <StepHeader n="04" eyebrow="§ The final look" title="One last review." lede="Confirm the details below before placing the order." />
      <div className="grid sm:grid-cols-2 gap-px bg-coal/10">
        {[
          { Icon: MapPin, t: "Shipping to", d: `${address.contact_name} · ${address.address_line1}${address.address_line2 ? ", " + address.address_line2 : ""}, ${address.city} ${address.postal_code}` },
          { Icon: Truck, t: "Delivery", d: "Standard · 2–5 business days · Pakistan-wide" },
          { Icon: CreditCard, t: "Payment", d: "Cash on Delivery" },
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
    </div>
  );
}

function Confirmed({ order }: { order: { order_number: string; total: number } }) {
  return (
    <PageShell>
      <section className="bg-coal text-bone">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 py-20 lg:py-32">
          <div className="eyebrow text-bone/60 mb-10 flex items-center gap-3">
            <span className="h-px w-8 bg-bone/40" /> Chapter 06 · Confirmation
          </div>
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow text-bone/60 mb-6">{order.order_number} · sealed</p>
              <h1 className="font-display italic text-6xl sm:text-7xl lg:text-[9rem] leading-[0.85]">
                Thank you<span className="text-brass">.</span><br />
                It's on its way.
              </h1>
            </div>
            <p className="lg:col-span-4 text-bone/70 text-sm lg:text-base leading-relaxed max-w-sm">
              Expect a call from our team to confirm dispatch within 24 hours. Pay the courier in cash when your order arrives.
            </p>
          </div>
          <div className="mt-16 flex flex-wrap gap-4">
            <Link to="/account/orders" className="inline-flex items-center gap-2 bg-brass text-coal eyebrow px-7 py-4 hover:bg-bone transition">
              View order history <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </Link>
            <Link to="/products" className="inline-flex items-center gap-2 border border-bone/30 text-bone eyebrow px-7 py-4 hover:border-bone transition">
              Continue browsing
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
