import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { isAdmin, claimAdminIfFirst } from "@/lib/admin.functions";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    // Soft check; the page itself re-validates via isAdmin
    return {};
  },
  component: AdminLayout,
});

function AdminLayout() {
  const isAdminFn = useServerFn(isAdmin);
  const claimFn = useServerFn(claimAdminIfFirst);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin", "is-admin"],
    queryFn: () => isAdminFn(),
  });
  const [claiming, setClaiming] = useState(false);

  if (isLoading) {
    return <div className="max-w-[1600px] mx-auto px-5 lg:px-10 py-24 eyebrow text-muted-foreground">Checking access…</div>;
  }

  if (!data?.isAdmin) {
    async function claim() {
      setClaiming(true);
      try {
        const res = await claimFn();
        if (res.claimed) {
          toast.success("You are now the admin.");
          await refetch();
        } else {
          toast.error(res.reason ?? "Cannot claim admin.");
        }
      } catch (e: any) {
        toast.error(e?.message ?? "Failed.");
      } finally {
        setClaiming(false);
      }
    }
    return (
      <section className="max-w-3xl mx-auto px-5 lg:px-10 py-24">
        <p className="eyebrow text-muted-foreground mb-6">§ Restricted</p>
        <h1 className="font-display italic text-5xl lg:text-7xl leading-[0.9]">Admin only<span className="text-brass">.</span></h1>
        <p className="text-muted-foreground mt-6 max-w-md">
          If you're the first user (the founder), you can claim admin access here. Otherwise, ask an existing admin to grant you the role.
        </p>
        <button
          onClick={claim}
          disabled={claiming}
          className="mt-8 inline-flex items-center gap-3 bg-coal text-bone eyebrow px-7 py-4 hover:bg-brass hover:text-coal transition disabled:opacity-60"
        >
          {claiming ? "Claiming…" : "Claim admin (first user only)"}
        </button>
      </section>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-5 lg:px-10 py-12 lg:py-16">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-coal/10 pb-6 mb-10">
        <div>
          <p className="eyebrow text-muted-foreground mb-2">§ Atelier · admin</p>
          <h1 className="font-display italic text-5xl lg:text-7xl leading-[0.9]">The Ledger<span className="text-brass">.</span></h1>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 eyebrow">
          <Link to="/admin/orders" activeProps={{ className: "text-brass" }} className="link-draw hover:text-brass transition">Orders</Link>
          <Link to="/admin/products" activeProps={{ className: "text-brass" }} className="link-draw hover:text-brass transition">Products</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
