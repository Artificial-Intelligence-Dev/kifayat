import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/landing/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-store";
import { ArrowUpRight, Mail, Lock, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Kifayat" },
      { name: "description", content: "Sign in or create a Kifayat account to track orders across Pakistan." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/account/orders" });
  }, [user, loading, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        toast.success("Account created. Check your inbox to confirm.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back.");
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <section className="bg-coal text-bone">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 pt-12 lg:pt-20 pb-16 lg:pb-24">
          <div className="eyebrow text-bone/60 mb-10 flex items-center gap-3">
            <span className="h-px w-8 bg-bone/40" /> Chapter 00 · Threshold
          </div>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <h1 className="lg:col-span-8 font-display italic text-6xl sm:text-7xl lg:text-[8.5rem] leading-[0.85]">
              {mode === "signin" ? "Welcome" : "Begin"}<span className="not-italic text-brass">.</span>
            </h1>
            <p className="lg:col-span-4 text-bone/70 text-sm lg:text-base leading-relaxed max-w-sm">
              Track every order, save addresses for next time, and keep a quiet archive of every object you've considered.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-5 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_520px] gap-12 lg:gap-24 items-start">
          {/* Editorial column */}
          <div className="space-y-10">
            <div>
              <p className="eyebrow text-muted-foreground mb-3">§ Why an account</p>
              <ul className="space-y-5">
                {[
                  ["01", "Pakistan-wide tracking", "Live status from dispatch to door — Karachi to Skardu."],
                  ["02", "Quiet archive", "Your orders, saved addresses and wishlist in one place."],
                  ["03", "Curator notes", "Occasional letters when a new edit lands. Never spam."],
                ].map(([n, t, d]) => (
                  <li key={n} className="grid grid-cols-[auto_1fr] gap-6 border-t border-coal/10 pt-5">
                    <span className="eyebrow font-mono text-coal/40">{n}</span>
                    <div>
                      <p className="font-display italic text-2xl leading-tight">{t}</p>
                      <p className="text-muted-foreground text-sm mt-1.5 max-w-md">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <p className="eyebrow text-muted-foreground border-t border-coal/10 pt-5">
              Prefer not to sign up? <Link to="/cart" className="text-coal hover:text-brass transition link-draw">Checkout as guest →</Link>
            </p>
          </div>

          {/* Form column */}
          <aside className="border border-coal/15 bg-paper p-8 lg:p-10">
            <div className="flex gap-px bg-coal/10 mb-8">
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-3 eyebrow transition ${mode === m ? "bg-coal text-bone" : "bg-bone text-coal/60 hover:text-coal"}`}
                >
                  {m === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="space-y-5">
              {mode === "signup" && (
                <FormField
                  label="Full name"
                  icon={<UserIcon className="size-4" strokeWidth={1.4} />}
                  value={fullName}
                  onChange={(v) => setFullName(v)}
                  placeholder="Ali Khan"
                  required
                />
              )}
              <FormField
                label="Email"
                type="email"
                icon={<Mail className="size-4" strokeWidth={1.4} />}
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                required
              />
              <FormField
                label="Password"
                type="password"
                icon={<Lock className="size-4" strokeWidth={1.4} />}
                value={password}
                onChange={setPassword}
                placeholder="At least 6 characters"
                minLength={6}
                required
              />

              <button
                type="submit"
                disabled={busy}
                className="group w-full inline-flex items-center justify-between gap-3 bg-coal text-bone eyebrow px-6 py-4 hover:bg-brass hover:text-coal transition disabled:opacity-60"
              >
                <span>{busy ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}</span>
                <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" strokeWidth={1.5} />
              </button>
              <p className="eyebrow text-muted-foreground text-center">
                {mode === "signin" ? "New here?" : "Already with us?"}{" "}
                <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-coal hover:text-brass transition link-draw">
                  {mode === "signin" ? "Create an account →" : "Sign in instead →"}
                </button>
              </p>
            </form>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

function FormField({
  label,
  icon,
  value,
  onChange,
  ...rest
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground mb-2 block">{label}</span>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-coal/40">{icon}</span>
        <input
          {...rest}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 pl-11 pr-4 bg-bone border border-coal/15 outline-none focus:border-coal text-sm transition"
        />
      </div>
    </label>
  );
}
