import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { blogPosts } from "@/lib/shop-data";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Blog — Kifayat" }, { name: "description", content: "Shopping guides, product picks and stories from the Kifayat team in Karachi." }] }),
  component: Blog,
});

function Blog() {
  return (
    <PageShell>
      <PageHeader title="Stories & shopping guides" subtitle="Useful, opinionated picks from our Karachi team."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]} />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((p) => (
            <Link key={p.id} to="/blog/$postId" params={{ postId: p.id }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[var(--shadow-e2)] transition">
              <div className="aspect-[16/10] overflow-hidden bg-secondary">
                <img src={p.cover} alt={p.title} className="size-full object-cover transition group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="text-xs text-muted-foreground">{p.date} · {p.readMins} min read</div>
                <h3 className="font-display font-semibold text-lg mt-1.5 group-hover:text-primary">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
