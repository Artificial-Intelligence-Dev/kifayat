import { createFileRoute, Link } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listMyOrders } from "@/lib/shop.functions";
import { useAuth } from "@/lib/auth-store";

export const Route = createFileRoute("/account/orders")({
  head: () => ({ meta: [{ title: "Orders — Kifayat" }] }),
  component: Orders,
});

const tone: Record<string, string> = {
  delivered: "bg-green-100 text-green-900",
  shipped: "bg-blue-100 text-blue-900",
  confirmed: "bg-brass/20 text-coal",
  pending: "bg-yellow-100 text-yellow-900",
  cancelled: "bg-red-100 text-red-900",
};

function Orders() {
  const { user, loading } = useAuth();
  const fetchOrders = useServerFn(listMyOrders);
  const { data, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => fetchOrders(),
    enabled: !!user,
  });

  if (loading || isLoading) {
    return <p className="eyebrow text-muted-foreground">Loading your orders…</p>;
  }

  if (!user) {
    return (
      <div className="border border-border rounded-2xl p-8 text-center">
        <p className="text-muted-foreground mb-4">Sign in to see your order history.</p>
        <Link to="/auth" className="inline-flex items-center gap-2 bg-coal text-bone eyebrow px-5 py-3 hover:bg-brass hover:text-coal transition">Sign in →</Link>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="border border-border rounded-2xl p-12 text-center">
        <Package className="size-10 mx-auto mb-4 text-muted-foreground" strokeWidth={1.2} />
        <p className="font-display italic text-2xl">No orders yet.</p>
        <p className="text-muted-foreground mt-2">When you place an order, it'll appear here.</p>
        <Link to="/products" className="inline-flex items-center gap-2 mt-6 bg-coal text-bone eyebrow px-5 py-3 hover:bg-brass hover:text-coal transition">Browse the edit →</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((o: any) => (
        <Link
          key={o.id}
          to="/account/orders/$orderId"
          params={{ orderId: o.id }}
          className="flex items-center gap-4 bg-card border border-border rounded-2xl p-5 hover:border-primary transition"
        >
          <div className="size-12 rounded-xl bg-primary-soft grid place-items-center">
            <Package className="size-5 text-primary-dark" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-semibold">{o.order_number}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-pill font-medium ${tone[o.status] ?? ""}`}>{o.status}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {new Date(o.created_at).toLocaleDateString()} · {o.city}
            </div>
          </div>
          <span className="font-display font-bold text-primary-dark">Rs {Number(o.total).toLocaleString()}</span>
        </Link>
      ))}
    </div>
  );
}
