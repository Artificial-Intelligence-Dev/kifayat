import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminListReviews, adminSetReviewStatus } from "@/lib/admin.functions";
import { Check, X, Star, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/reviews")({
  component: AdminReviews,
});

function AdminReviews() {
  const listFn = useServerFn(adminListReviews);
  const setStatusFn = useServerFn(adminSetReviewStatus);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-reviews", filter],
    queryFn: () => listFn({ data: { status: filter } }),
  });
  const mut = useMutation({
    mutationFn: (vars: { id: string; status: "pending" | "approved" | "rejected" }) =>
      setStatusFn({ data: vars }),
    onSuccess: () => { toast.success("Updated."); qc.invalidateQueries({ queryKey: ["admin-reviews"] }); },
    onError: (e: any) => toast.error(e?.message ?? "Failed."),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow text-muted-foreground">{data.length} reviews</p>
        <div className="flex gap-px bg-coal/10">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`eyebrow px-4 py-2 capitalize transition ${filter === f ? "bg-coal text-bone" : "bg-bone hover:bg-paper"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <p className="eyebrow text-muted-foreground">Loading…</p>
      ) : data.length === 0 ? (
        <div className="border border-dashed border-coal/15 p-12 text-center text-sm text-muted-foreground">No reviews.</div>
      ) : (
        <ul className="space-y-3">
          {data.map((r: any) => (
            <li key={r.id} className="border border-coal/15 p-5 bg-bone">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className={`size-4 ${i <= r.rating ? "fill-brass text-brass" : "text-coal/20"}`} strokeWidth={1.2} />
                      ))}
                    </div>
                    <span className="eyebrow text-muted-foreground text-[10px]">
                      {r.profiles?.full_name || "Anonymous"} · {r.products?.name} · {new Date(r.created_at).toLocaleDateString()}
                    </span>
                    {r.verified_purchase && <span className="eyebrow text-[10px] px-2 py-0.5 bg-brass/20 text-coal">Verified</span>}
                    <StatusBadge status={r.status} />
                  </div>
                  {r.title && <p className="font-display italic text-lg mb-1">{r.title}</p>}
                  <p className="text-sm text-coal/80 leading-relaxed">{r.body}</p>
                </div>
                <div className="flex gap-2">
                  {r.status !== "approved" && (
                    <button onClick={() => mut.mutate({ id: r.id, status: "approved" })} className="size-9 grid place-items-center border border-coal/15 hover:bg-brass hover:text-coal transition" title="Approve">
                      <Check className="size-4" strokeWidth={1.6} />
                    </button>
                  )}
                  {r.status !== "rejected" && (
                    <button onClick={() => mut.mutate({ id: r.id, status: "rejected" })} className="size-9 grid place-items-center border border-coal/15 hover:bg-destructive hover:text-destructive-foreground transition" title="Reject">
                      <X className="size-4" strokeWidth={1.6} />
                    </button>
                  )}
                  {r.status !== "pending" && (
                    <button onClick={() => mut.mutate({ id: r.id, status: "pending" })} className="size-9 grid place-items-center border border-coal/15 hover:bg-paper transition" title="Mark pending">
                      <Clock className="size-4" strokeWidth={1.6} />
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "approved" ? "bg-green-100 text-green-900" :
    status === "rejected" ? "bg-red-100 text-red-900" :
    "bg-coal/10 text-coal";
  return <span className={`eyebrow text-[10px] px-2 py-0.5 ${tone}`}>{status}</span>;
}
