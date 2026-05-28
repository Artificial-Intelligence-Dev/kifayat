import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/account/payment-methods")({
  head: () => ({ meta: [{ title: "Payment methods — Kifayat" }] }),
  component: PaymentMethods,
});

const cards = [
  { id: 1, brand: "Visa", last4: "3456", exp: "08/28", primary: true },
  { id: 2, brand: "Mastercard", last4: "8821", exp: "11/27", primary: false },
];

function PaymentMethods() {
  return (
    <div className="space-y-4">
      <button className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-pill bg-primary text-primary-foreground font-semibold">
        <Plus className="size-4" /> Add card
      </button>
      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map((c) => (
          <div key={c.id} className="relative rounded-2xl p-6 text-primary-foreground overflow-hidden" style={{ background: "var(--gradient-brand)" }}>
            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl" aria-hidden />
            <div className="flex items-center justify-between mb-10">
              <CreditCard className="size-6" />
              {c.primary && <span className="text-[10px] px-2 py-1 rounded-pill bg-white/15 font-semibold uppercase tracking-wider">Default</span>}
            </div>
            <div className="font-mono text-lg tracking-widest">•••• •••• •••• {c.last4}</div>
            <div className="flex justify-between items-end mt-4 text-xs opacity-90">
              <span>{c.brand}</span><span>Exp {c.exp}</span>
            </div>
            <button aria-label="Remove" className="absolute top-4 right-4 p-1.5 hover:bg-white/10 rounded"><Trash2 className="size-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
