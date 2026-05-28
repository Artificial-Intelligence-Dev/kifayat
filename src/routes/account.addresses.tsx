import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/account/addresses")({
  head: () => ({ meta: [{ title: "Addresses — Kifayat" }] }),
  component: Addresses,
});

const list = [
  { id: 1, label: "Home", name: "Ali Khan", line: "House 12, Street 5, DHA Phase 6, Karachi 75500", phone: "+92 300 1234567", primary: true },
  { id: 2, label: "Office", name: "Ali Khan", line: "Plot 22, Korangi Industrial Area, Karachi 74900", phone: "+92 300 1234567", primary: false },
];

function Addresses() {
  return (
    <div className="space-y-4">
      <button className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-pill bg-primary text-primary-foreground font-semibold">
        <Plus className="size-4" /> Add new address
      </button>
      <div className="grid sm:grid-cols-2 gap-4">
        {list.map((a) => (
          <div key={a.id} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                <span className="font-semibold">{a.label}</span>
                {a.primary && <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-soft text-primary-dark font-semibold">Default</span>}
              </div>
              <div className="flex gap-1 text-muted-foreground">
                <button className="p-1.5 hover:text-primary" aria-label="Edit"><Pencil className="size-4" /></button>
                <button className="p-1.5 hover:text-destructive" aria-label="Delete"><Trash2 className="size-4" /></button>
              </div>
            </div>
            <div className="text-sm space-y-1">
              <div className="font-medium">{a.name}</div>
              <div className="text-muted-foreground">{a.line}</div>
              <div className="text-muted-foreground">{a.phone}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
