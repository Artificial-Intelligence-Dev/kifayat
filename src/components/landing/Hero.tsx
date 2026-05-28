import { ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import hero from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-7xl mx-auto px-4 py-10 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-primary-soft text-primary-dark text-xs font-semibold tracking-wide uppercase">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" /> New season · Up to 50% off
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight">
            Smart shopping for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              everyday Karachi
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg">
            Thousands of trending products delivered to your door — electronics, fashion, beauty and home essentials at honest prices.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#products" className="inline-flex items-center gap-2 h-12 px-6 rounded-pill bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-glow)] hover:bg-primary-dark transition">
              Shop now <ArrowRight className="size-4" />
            </a>
            <a href="#categories" className="inline-flex items-center h-12 px-6 rounded-pill border border-border bg-background hover:bg-secondary transition font-medium">
              Browse categories
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 max-w-md">
            {[
              { Icon: Truck, label: "Free delivery", sub: "Above Rs 2,500" },
              { Icon: RotateCcw, label: "7-day returns", sub: "Easy refunds" },
              { Icon: ShieldCheck, label: "Secure pay", sub: "COD available" },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="text-left">
                <Icon className="size-5 text-primary mb-1.5" />
                <div className="text-sm font-semibold">{label}</div>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-primary/20 to-accent/10 blur-2xl" aria-hidden />
          <img
            src={hero}
            alt="Trending products from Kifayat: earbuds, smartwatch, skincare, sneakers"
            width={1600}
            height={1100}
            className="relative rounded-2xl shadow-[var(--shadow-e3)] w-full h-auto object-cover"
          />
          <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-[var(--shadow-e2)] px-4 py-3 flex items-center gap-3 border border-border">
            <div className="flex -space-x-2">
              {["#1ABC9C", "#0E7C7B", "#F39C12"].map((c) => (
                <div key={c} className="size-7 rounded-full border-2 border-card" style={{ background: c }} />
              ))}
            </div>
            <div className="text-xs">
              <div className="font-semibold">12k+ happy shoppers</div>
              <div className="text-muted-foreground">in Karachi this month</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
