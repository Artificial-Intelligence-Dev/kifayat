import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { User, Package, MapPin, Heart, CreditCard, Star, LogOut } from "lucide-react";

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
] as const;

function AccountLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isIndex = path === "/account";
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
                <Link key={to} to={to}
                  className={`flex items-center gap-3 px-3.5 h-11 rounded-lg text-sm transition ${active ? "bg-primary-soft text-primary-dark font-semibold" : "hover:bg-secondary text-foreground"}`}>
                  <Icon className="size-4" /> {label}
                </Link>
              );
            })}
            <Link to="/login" className="flex items-center gap-3 px-3.5 h-11 rounded-lg text-sm hover:bg-secondary text-muted-foreground">
              <LogOut className="size-4" /> Sign out
            </Link>
          </nav>
        </aside>
        <div>{isIndex ? <ProfileView /> : <Outlet />}</div>
      </section>
    </PageShell>
  );
}

function ProfileView() {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground font-display font-bold text-2xl">A</div>
          <div>
            <h2 className="text-xl font-display font-semibold">Ali Khan</h2>
            <p className="text-sm text-muted-foreground">ali@example.com · Member since 2026</p>
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-4">Personal details</h3>
        <form className="grid sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
          {[
            { label: "Full name", value: "Ali Khan" },
            { label: "Email", value: "ali@example.com", type: "email" },
            { label: "Phone", value: "+92 300 1234567" },
            { label: "Date of birth", value: "1995-04-12", type: "date" },
          ].map((f) => (
            <label key={f.label} className="block">
              <span className="block text-sm font-medium mb-1.5">{f.label}</span>
              <input defaultValue={f.value} type={f.type ?? "text"} className="w-full h-11 px-3.5 rounded-md border border-border outline-none focus:border-primary text-sm" />
            </label>
          ))}
          <div className="sm:col-span-2 flex justify-end">
            <button className="h-11 px-6 rounded-pill bg-primary text-primary-foreground font-semibold">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
