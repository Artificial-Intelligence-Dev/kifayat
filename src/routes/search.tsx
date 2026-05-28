import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/lib/shop-data";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: (s.q as string) ?? "" }),
  head: () => ({ meta: [{ title: "Search — Kifayat" }, { name: "description", content: "Find products on Kifayat." }] }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const [query, setQuery] = useState(q);
  const results = products.filter((p) =>
    !query ? true : p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageShell>
      <PageHeader title={query ? `Results for "${query}"` : "Search"} subtitle={`${results.length} matches`}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Search" }]} />
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative max-w-2xl mb-8">
          <SearchIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, brands…"
            className="w-full h-12 pl-11 pr-4 rounded-pill bg-secondary outline-none border border-transparent focus:border-primary focus:bg-background" />
        </div>
        {results.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No products match your search.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {results.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </section>
    </PageShell>
  );
}
