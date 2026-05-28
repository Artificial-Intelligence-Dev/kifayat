import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { Heart, Sparkles, Truck, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Kifayat — Honest shopping in Karachi" },
      { name: "description", content: "Kifayat is built for everyday Karachi shoppers — curated products, honest prices and reliable delivery from a local team." },
    ],
  }),
  component: About,
});

const values = [
  { Icon: Heart, title: "Built for Karachi", text: "From DHA to Gulshan, we know what local shoppers need and how fast they need it." },
  { Icon: Sparkles, title: "Curated, not cluttered", text: "We hand-pick every product so you don't waste hours scrolling through duplicates." },
  { Icon: Truck, title: "Reliable delivery", text: "Most orders arrive within 2–4 days, with COD and easy returns across the city." },
  { Icon: Users, title: "Local team", text: "A small Karachi team answers your messages — no scripts, no run-arounds." },
];

function About() {
  return (
    <PageShell>
      <PageHeader title="About Kifayat" subtitle="A modern Karachi storefront built on honest prices and reliable service."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About" }]} />
      <section className="max-w-4xl mx-auto px-4 py-14 prose-like">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Kifayat began with a simple frustration: shopping online in Karachi often meant paying more for less, dealing with fakes, or waiting weeks for delivery. We thought it could be better — so we built it.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed mt-5">
          Today, Kifayat partners with the HHC virtual warehouse network to deliver curated electronics, fashion, beauty and home essentials at honest prices — backed by a 7-day return promise and a real local team.
        </p>
      </section>
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map(({ Icon, title, text }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-6">
              <div className="size-11 rounded-xl bg-primary-soft grid place-items-center mb-4"><Icon className="size-5 text-primary-dark" /></div>
              <h3 className="font-display font-semibold mb-1.5">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
