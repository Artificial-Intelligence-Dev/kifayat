import { createFileRoute, Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { User, Package, MapPin, Heart, CreditCard, Star, LogOut } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMyProfile, updateMyProfile } from "@/lib/shop.functions";
import { useAuth, signOut } from "@/lib/auth-store";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — Kifayat" }] }),
  component: AccountLayout,
});

const nav = [
  { to: "/account", label: "Profile", icon: User, exact: true as boolean },
  { to: "/account/orders", label: "Orders", icon: Package },
  { to: "/account/addresses", label: "Addresses", icon: MapPin },
  { to: "/account/wishlist", label: "Wishlist", icon: Heart },
  { to: "/account/payment-methods", label: "Payment methods", icon: CreditCard },
  { to: "/account/reviews", label: "Reviews", icon: Star },
];

function AccountLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isIndex = path === "/account";
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <PageShell>
        <section className="max-w-7xl mx-auto px-4 py-24 eyebrow text-muted-foreground">
          {loading ? "Checking session…" : "Redirecting to sign in…"}
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader title="My account" subtitle="Manage your profile, orders and preferences."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Account" }]} />
      <section className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="bg-card border border-border rounded-2xl p-3 h-fit">
          <nav className="space-y-1">
            {nav.map(({ to, label, icon: Icon, exact }) => {
              const isExact = exact ?? false;
              const active = isExact ? path === to : path.startsWith(to);
              return (
                <Link key={to} to={to as never}
                  className={`flex items-center gap-3 px-3.5 h-11 rounded-lg text-sm transition ${active ? "bg-primary-soft text-primary-dark font-semibold" : "hover:bg-secondary text-foreground"}`}>
                  <Icon className="size-4" /> {label}
                </Link>
              );
            })}
            <button
              onClick={async () => { await signOut(); navigate({ to: "/" }); }}
              className="w-full flex items-center gap-3 px-3.5 h-11 rounded-lg text-sm hover:bg-secondary text-muted-foreground"
            >
              <LogOut className="size-4" /> Sign out
            </button>
          </nav>
        </aside>
        <div>{isIndex ? <ProfileView /> : <Outlet />}</div>
      </section>
    </PageShell>
  );
}

function ProfileView() {
  const fetchProfile = useServerFn(getMyProfile);
  const updateProfile = useServerFn(updateMyProfile);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["my-profile"], queryFn: () => fetchProfile() });
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (data?.profile) {
      setFullName(data.profile.full_name ?? "");
      setPhone(data.profile.phone ?? "");
    }
  }, [data]);

  const save = useMutation({
    mutationFn: () => updateProfile({ data: { full_name: fullName, phone: phone || null } }),
    onSuccess: () => {
      toast.success("Profile saved.");
      qc.invalidateQueries({ queryKey: ["my-profile"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Save failed."),
  });

  if (isLoading) return <p className="eyebrow text-muted-foreground">Loading profile…</p>;

  const initial = (fullName || data?.email || "?").charAt(0).toUpperCase();
  const memberSince = data?.profile?.created_at ? new Date(data.profile.created_at).getFullYear() : "—";

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground font-display font-bold text-2xl">{initial}</div>
          <div>
            <h2 className="text-xl font-display font-semibold">{fullName || "Welcome"}</h2>
            <p className="text-sm text-muted-foreground">{data?.email} · Member since {memberSince}</p>
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-4">Personal details</h3>
        <form className="grid sm:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); save.mutate(); }}>
          <label className="block">
            <span className="block text-sm font-medium mb-1.5">Full name</span>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full h-11 px-3.5 rounded-md border border-border outline-none focus:border-primary text-sm" required />
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1.5">Email</span>
            <input value={data?.email ?? ""} disabled className="w-full h-11 px-3.5 rounded-md border border-border bg-muted text-muted-foreground text-sm" />
          </label>
          <label className="block sm:col-span-2">
            <span className="block text-sm font-medium mb-1.5">Phone</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 300 1234567" className="w-full h-11 px-3.5 rounded-md border border-border outline-none focus:border-primary text-sm" />
          </label>
          <div className="sm:col-span-2 flex justify-end">
            <button disabled={save.isPending} className="h-11 px-6 rounded-pill bg-primary text-primary-foreground font-semibold disabled:opacity-60">
              {save.isPending ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
