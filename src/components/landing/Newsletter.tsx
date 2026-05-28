import { Mail } from "lucide-react";

export function Newsletter() {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl p-8 lg:p-14" style={{ background: "var(--gradient-brand)" }}>
          <div className="absolute -top-16 -right-16 size-64 rounded-full bg-white/10 blur-2xl" aria-hidden />
          <div className="absolute -bottom-12 -left-12 size-48 rounded-full bg-white/10 blur-2xl" aria-hidden />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center text-primary-foreground">
            <div>
              <h2 className="text-2xl lg:text-3xl text-primary-foreground">Save more, every week.</h2>
              <p className="mt-2 text-primary-foreground/85 max-w-md text-sm lg:text-base">
                Join our newsletter for exclusive Karachi deals, early access to drops, and Rs 200 off your first order.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Mail className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full h-12 pl-11 pr-4 rounded-pill bg-background text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>
              <button className="h-12 px-6 rounded-pill bg-foreground text-background font-semibold hover:opacity-90 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
