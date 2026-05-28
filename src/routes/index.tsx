import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Hero } from "@/components/landing/Hero";
import { Categories } from "@/components/landing/Categories";
import { Products } from "@/components/landing/Products";
import { Testimonials } from "@/components/landing/Testimonials";
import { Newsletter } from "@/components/landing/Newsletter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kifayat — Smart Shopping for Karachi" },
      { name: "description", content: "Kifayat.co — curated electronics, fashion, beauty and home essentials at honest prices, delivered across Karachi." },
      { property: "og:title", content: "Kifayat — Smart Shopping for Karachi" },
      { property: "og:description", content: "Trending products, fair prices, fast delivery and easy 7-day returns across Karachi." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Hero />
      <Categories />
      <Products />
      <Testimonials />
      <Newsletter />
    </PageShell>
  );
}
