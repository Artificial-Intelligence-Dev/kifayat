import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminListOrders, adminUpdateOrderStatus } from "@/lib/admin.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/orders")({
  component: AdminOrders,
});

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;
const tone: Record<(typeof STATUSES)[number], string> = {
  pending: "bg-coal/10 text-coal",
  confirmed: "bg-brass/20 text-coal",
  shipped: "bg-blue-100 text-blue-900",
  delivered: "bg-green-100 text-green-900",
  cancelled: "bg-red-100 text-red-900",
};

function AdminOrders() {
  const list = useServerFn(adminListOrders);
  const update = useServerFn(adminUpdateOrderStatus);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin", "orders"], queryFn: () => list() });
  const mut = useMutation({
    mutationFn: (vars: { id: string; status: (typeof STATUSES)[number] }) => update({ data: vars }),
    onSuccess: () => {
      toast.success("Status updated.");
      qc.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed."),
  });

  if (isLoading) return <p className="eyebrow text-muted-foreground">Loading orders…</p>;

  if (!data || data.length === 0) {
    return (
      <div className="border border-coal/10 p-12 text-center bg-paper">
        <p className="eyebrow text-muted-foreground mb-3">§ Empty</p>
        <h2 className="font-display italic text-3xl">No orders yet.</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-px bg-coal/10 mb-10">
        {[
          { k: "Total orders", v: data.length },
          { k: "Pending", v: data.filter((o: any) => o.status === "pending").length },
          { k: "Revenue (PKR)", v: data.reduce((s: number, o: any) => s + Number(o.total), 0).toLocaleString() },
        ].map((s) => (
          <div key={s.k} className="bg-bone p-5">
            <p className="eyebrow text-muted-foreground">{s.k}</p>
            <p className="font-display italic text-3xl mt-1">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="border border-coal/10">
        <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1.5fr] gap-4 px-5 py-3 eyebrow text-muted-foreground border-b border-coal/10 bg-paper">
          <span>Order</span>
          <span>Customer</span>
          <span>Total</span>
          <span>Placed</span>
          <span>Status</span>
        </div>
        <ul className="divide-y divide-coal/10">
          {data.map((o: any) => (
            <li key={o.id} className="grid grid-cols-[1fr_2fr_1fr_1fr_1.5fr] gap-4 px-5 py-4 items-center text-sm">
              <span className="font-mono">{o.order_number}</span>
              <span>
                <p className="font-display italic text-lg leading-tight">{o.contact_name}</p>
                <p className="eyebrow text-muted-foreground mt-1">{o.city} · {o.contact_phone}</p>
              </span>
              <span className="font-mono">Rs {Number(o.total).toLocaleString()}</span>
              <span className="text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</span>
              <span>
                <select
                  value={o.status}
                  disabled={mut.isPending}
                  onChange={(e) => mut.mutate({ id: o.id, status: e.target.value as any })}
                  className={`eyebrow px-3 py-1.5 border-0 outline-none cursor-pointer ${tone[o.status as (typeof STATUSES)[number]]}`}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
