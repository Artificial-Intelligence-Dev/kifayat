import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Kifayat" }] }),
  component: Login,
});

function Login() {
  return (
    <PageShell>
      <div className="max-w-md mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="size-10 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground font-display font-bold">K</div>
            <span className="font-display font-bold text-2xl">Kifayat</span>
          </Link>
        </div>
        <div className="bg-card border border-border rounded-2xl p-8 shadow-[var(--shadow-e1)]">
          <h1 className="text-2xl mb-1">Welcome back</h1>
          <p className="text-sm text-muted-foreground mb-6">Sign in to continue shopping.</p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <label className="block"><span className="block text-sm font-medium mb-1.5">Email</span>
              <input type="email" required placeholder="you@example.com" className="w-full h-11 px-3.5 rounded-md border border-border outline-none focus:border-primary text-sm" />
            </label>
            <label className="block"><span className="block text-sm font-medium mb-1.5 flex justify-between">Password <Link to="/login" className="text-xs text-primary hover:underline">Forgot?</Link></span>
              <input type="password" required placeholder="••••••••" className="w-full h-11 px-3.5 rounded-md border border-border outline-none focus:border-primary text-sm" />
            </label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="size-4 accent-[color:var(--color-primary)]" /> Remember me</label>
            <button className="w-full h-12 rounded-pill bg-primary text-primary-foreground font-semibold hover:bg-primary-dark transition">Sign in</button>
          </form>
          <div className="flex items-center gap-3 my-6 text-xs text-muted-foreground"><span className="flex-1 h-px bg-border" />OR<span className="flex-1 h-px bg-border" /></div>
          <button className="w-full h-11 rounded-pill border border-border font-medium hover:bg-secondary">Continue with Google</button>
          <p className="text-sm text-center text-muted-foreground mt-6">No account? <Link to="/register" className="text-primary font-medium hover:underline">Create one</Link></p>
        </div>
      </div>
    </PageShell>
  );
}
