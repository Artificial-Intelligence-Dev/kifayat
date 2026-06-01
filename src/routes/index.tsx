import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Hero } from "@/components/landing/Hero";
import { Categories } from "@/components/landing/Categories";
import { EditStory } from "@/components/landing/EditStory";
import { Products } from "@/components/landing/Products";
import { ValueStrip } from "@/components/landing/ValueStrip";
import { PressStrip } from "@/components/landing/PressStrip";
import { Testimonials } from "@/components/landing/Testimonials";
import { Journal } from "@/components/landing/Journal";
import { Newsletter } from "@/components/landing/Newsletter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kifayat — Smart Shopping for Karachi" },
      { name: "description", content: "Kifayat.co — a curated marketplace of electronics, fashion, beauty and home essentials, delivered across Karachi with editorial care." },
      { property: "og:title", content: "Kifayat — Smart Shopping for Karachi" },
      { property: "og:description", content: "Considered objects. Honest prices. Karachi-speed delivery." },
    ],
    links: [],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Hero />
      <Categories />
      <EditStory />
      <Products />
      <ValueStrip />
      <PressStrip />
      <Testimonials />
      <Journal />
      <Newsletter />
    </PageShell>
  );
}
