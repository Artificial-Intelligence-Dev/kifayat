import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/shop-data";
import { Check, Package, Truck } from "lucide-react";

export const Route = createFileRoute("/account/orders/$orderId")({
  head: ({ params }) => ({ meta: [{ title: `Order ${params.orderId} — Kifayat` }] }),
  component: OrderDetail,
});

function OrderDetail() {
  const { orderId } = Route.useParams();
  const items = products.slice(0, 3).map((p) => ({ ...p, qty: 1 }));
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const steps = [
    { label: "Order placed", date: "May 22, 10:24 AM", done: true, Icon: Check },
    { label: "Processing", date: "May 22, 02:10 PM", done: true, Icon: Package },
    { label: "Shipped", date: "May 23, 09:00 AM", done: true, Icon: Truck },
    { label: "Delivered", date: "May 24, 04:30 PM", done: true, Icon: Check },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <Link to="/account/orders" className="text-xs text-muted-foreground hover:text-primary">← Back to orders</Link>
          <h2 className="text-2xl font-display font-semibold mt-1">Order #{orderId}</h2>
        </div>
        <span className="px-3 py-1 rounded-pill bg-primary-soft text-primary-dark text-xs font-semibold">Delivered</span>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-5">Tracking</h3>
        <ol className="relative pl-7 space-y-5">
          <span className="absolute left-3 top-1 bottom-1 w-px bg-border" />
          {steps.map((s) => (
            <li key={s.label} className="relative">
              <span className={`absolute -left-7 top-0 size-6 rounded-full grid place-items-center ${s.done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                <s.Icon className="size-3" />
              </span>
              <div className="text-sm font-medium">{s.label}</div>
              <div className="text-xs text-muted-foreground">{s.date}</div>
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-4">Items</h3>
        <ul className="divide-y divide-border">
          {items.map((i) => (
            <li key={i.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
              <div className="size-16 rounded-lg bg-secondary overflow-hidden shrink-0"><img src={i.image} alt={i.name} className="size-full object-cover" /></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium line-clamp-1">{i.name}</div>
                <div className="text-xs text-muted-foreground">Qty {i.qty}</div>
              </div>
              <span className="font-medium text-sm">Rs {(i.price * i.qty).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-border mt-4 pt-4 flex justify-between font-display font-bold">
          <span>Total</span><span className="text-primary-dark">Rs {subtotal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
