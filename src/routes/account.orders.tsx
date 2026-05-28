import { createFileRoute, Link } from "@tanstack/react-router";
import { Package } from "lucide-react";

export const Route = createFileRoute("/account/orders")({
  head: () => ({ meta: [{ title: "Orders — Kifayat" }] }),
  component: Orders,
});

const orders = [
  { id: "KFY-48201", date: "May 22, 2026", status: "Delivered", total: 8499, items: 3 },
  { id: "KFY-48104", date: "May 10, 2026", status: "Shipped", total: 1499, items: 1 },
  { id: "KFY-47988", date: "Apr 28, 2026", status: "Processing", total: 4499, items: 1 },
];
const tone: Record<string, string> = {
  Delivered: "bg-primary-soft text-primary-dark",
  Shipped: "bg-blue-50 text-info",
  Processing: "bg-yellow-50 text-warning",
  Cancelled: "bg-red-50 text-destructive",
};

function Orders() {
  return (
    <div className="space-y-4">
      {orders.map((o) => (
        <Link key={o.id} to="/account/orders/$orderId" params={{ orderId: o.id }}
          className="flex items-center gap-4 bg-card border border-border rounded-2xl p-5 hover:border-primary transition">
          <div className="size-12 rounded-xl bg-primary-soft grid place-items-center"><Package className="size-5 text-primary-dark" /></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-semibold">#{o.id}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-pill font-medium ${tone[o.status]}`}>{o.status}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">{o.date} · {o.items} item{o.items > 1 ? "s" : ""}</div>
          </div>
          <span className="font-display font-bold text-primary-dark">Rs {o.total.toLocaleString()}</span>
        </Link>
      ))}
    </div>
  );
}
