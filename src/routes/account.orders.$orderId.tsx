import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMyOrder } from "@/lib/shop.functions";
import { useAuth } from "@/lib/auth-store";
import { Check, Package, Truck, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/account/orders/$orderId")({
  head: ({ params }) => ({ meta: [{ title: `Order ${params.orderId} — Kifayat` }] }),
  component: OrderDetail,
});

const tone: Record<string, string> = {
  delivered: "bg-green-100 text-green-900",
  shipped: "bg-blue-100 text-blue-900",
  confirmed: "bg-brass/20 text-coal",
  pending: "bg-yellow-100 text-yellow-900",
  cancelled: "bg-red-100 text-red-900",
};

const TIMELINE = ["pending", "confirmed", "shipped", "delivered"] as const;

function OrderDetail() {
  const { orderId } = Route.useParams();
  const { user, loading } = useAuth();
  const fetchOrder = useServerFn(getMyOrder);
  const { data: order, isLoading } = useQuery({
    queryKey: ["my-order", orderId],
    queryFn: () => fetchOrder({ data: { id: orderId } }),
    enabled: !!user,
  });

  if (loading || isLoading) return <p className="eyebrow text-muted-foreground">Loading order…</p>;
  if (!user) {
    return (
      <div className="border border-border rounded-2xl p-8 text-center">
        <p className="text-muted-foreground mb-4">Sign in to view your order.</p>
        <Link to="/auth" className="inline-flex items-center gap-2 bg-coal text-bone eyebrow px-5 py-3 hover:bg-brass hover:text-coal transition">Sign in →</Link>
      </div>
    );
  }
  if (!order) {
    return (
      <div className="border border-border rounded-2xl p-8 text-center">
        <p className="text-muted-foreground">Order not found.</p>
        <Link to="/account/orders" className="inline-block mt-4 eyebrow link-draw">← Back to orders</Link>
      </div>
    );
  }

  const items: any[] = (order as any).order_items ?? [];
  const currentIdx = order.status === "cancelled" ? -1 : TIMELINE.indexOf(order.status as any);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <Link to="/account/orders" className="text-xs text-muted-foreground hover:text-primary">← Back to orders</Link>
          <h2 className="text-2xl font-display font-semibold mt-1">Order {order.order_number}</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Placed {new Date(order.created_at).toLocaleString()}</p>
        </div>
        <span className={`px-3 py-1 rounded-pill text-xs font-semibold capitalize ${tone[order.status] ?? ""}`}>{order.status}</span>
      </div>

      {order.status !== "cancelled" && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-5">Tracking</h3>
          <ol className="relative pl-7 space-y-5">
            <span className="absolute left-3 top-1 bottom-1 w-px bg-border" />
            {TIMELINE.map((s, i) => {
              const done = i <= currentIdx;
              const Icon = s === "shipped" ? Truck : s === "delivered" ? Check : Package;
              return (
                <li key={s} className="relative">
                  <span className={`absolute -left-7 top-0 size-6 rounded-full grid place-items-center ${done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                    <Icon className="size-3" />
                  </span>
                  <div className="text-sm font-medium capitalize">{s}</div>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-4">Items</h3>
        <ul className="divide-y divide-border">
          {items.map((i: any) => (
            <li key={i.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium line-clamp-1">{i.product_name}</div>
                <div className="text-xs text-muted-foreground">Qty {i.quantity} · Rs {Number(i.unit_price).toLocaleString()} each</div>
              </div>
              <span className="font-medium text-sm">Rs {Number(i.line_total).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-border mt-4 pt-4 space-y-1 text-sm">
          <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>Rs {Number(order.subtotal).toLocaleString()}</span></div>
          <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>{Number(order.shipping) === 0 ? "Free" : `Rs ${Number(order.shipping).toLocaleString()}`}</span></div>
          <div className="flex justify-between font-display font-bold pt-2"><span>Total</span><span className="text-primary-dark">Rs {Number(order.total).toLocaleString()}</span></div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 grid sm:grid-cols-2 gap-6 text-sm">
        <div>
          <div className="eyebrow text-muted-foreground mb-2 flex items-center gap-2"><MapPin className="size-3.5" /> Shipping to</div>
          <p className="font-medium">{order.contact_name}</p>
          <p className="text-muted-foreground">{order.address_line1}{order.address_line2 ? `, ${order.address_line2}` : ""}</p>
          <p className="text-muted-foreground">{order.city}, {order.province} {order.postal_code ?? ""}</p>
        </div>
        <div>
          <div className="eyebrow text-muted-foreground mb-2 flex items-center gap-2"><Phone className="size-3.5" /> Contact</div>
          <p>{order.contact_phone}</p>
          {order.contact_email && <p className="text-muted-foreground">{order.contact_email}</p>}
          <p className="text-muted-foreground mt-2">Payment: {order.payment_method?.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}
