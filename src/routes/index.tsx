import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Hero } from "@/components/landing/Hero";
import { KineticWordmark } from "@/components/motion/KineticWordmark";
import { Categories } from "@/components/landing/Categories";
import { Lookbook } from "@/components/landing/Lookbook";
import { Products } from "@/components/landing/Products";
import { FounderLetter } from "@/components/landing/FounderLetter";
import { ValueStrip } from "@/components/landing/ValueStrip";
import { PressStrip } from "@/components/landing/PressStrip";
import { LiveStats } from "@/components/landing/LiveStats";
import { Testimonials } from "@/components/landing/Testimonials";
import { Journal } from "@/components/landing/Journal";
import { Newsletter } from "@/components/landing/Newsletter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kifayat — Objects, considered. Pakistan-wide." },
      { name: "description", content: "Kifayat.co — a curated marketplace of electronics, fashion, beauty and home essentials, dispatched with editorial care across Pakistan." },
      { property: "og:title", content: "Kifayat — Objects, considered." },
      { property: "og:description", content: "Considered objects. Honest prices. Dispatched anywhere in Pakistan." },
    ],
    links: [],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Hero />
      <KineticWordmark text="The catalogue" eyebrow="Chapter 01 · Browse" tone="bone" align="left" />
      <Categories />
      <Lookbook />
      <KineticWordmark text="The edit" eyebrow="Chapter 02 · This week" tone="coal" align="right" />
      <Products />
      <FounderLetter />
      <ValueStrip />
      <KineticWordmark text="Trusted, quietly" eyebrow="Chapter 03 · The ledger" tone="bone" align="left" />
      <LiveStats />
      <PressStrip />
      <Testimonials />
      <Journal />
      <Newsletter />
    </PageShell>
  );
}
