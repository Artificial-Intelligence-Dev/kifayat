import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { ProductCard } from "@/components/shop/ProductCard";
import { categories, products } from "@/lib/shop-data";
import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "All Products — Kifayat" },
      { name: "description", content: "Browse all products at Kifayat. Filter by category, price and rating." },
    ],
  }),
  component: ProductsPage,
});

const sorts = [
  { id: "popular", label: "Most popular" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
];

function ProductsPage() {
  const [selectedCats, setCats] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("popular");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const list = products.filter((p) =>
      (selectedCats.length === 0 || selectedCats.includes(p.category)) &&
      p.price <= maxPrice &&
      p.rating >= minRating
    );
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [selectedCats, maxPrice, minRating, sort]);

  const toggleCat = (slug: string) =>
    setCats((cs) => (cs.includes(slug) ? cs.filter((c) => c !== slug) : [...cs, slug]));

  const Filters = (
    <aside className="space-y-6">
      <div>
        <h3 className="font-display font-semibold mb-3 text-sm uppercase tracking-wider">Category</h3>
        <ul className="space-y-2 text-sm">
          {categories.map((c) => (
            <li key={c.slug}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedCats.includes(c.slug)} onChange={() => toggleCat(c.slug)}
                  className="size-4 accent-[color:var(--color-primary)]" />
                <span>{c.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">{c.count}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-display font-semibold mb-3 text-sm uppercase tracking-wider">Max price</h3>
        <input type="range" min={500} max={10000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-[color:var(--color-primary)]" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Rs 500</span><span className="text-foreground font-medium">Up to Rs {maxPrice.toLocaleString()}</span>
        </div>
      </div>
      <div>
        <h3 className="font-display font-semibold mb-3 text-sm uppercase tracking-wider">Rating</h3>
        <div className="flex flex-wrap gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button key={r} onClick={() => setMinRating(r)}
              className={`px-3 h-8 rounded-pill text-xs border transition ${minRating === r ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
              {r === 0 ? "All" : `${r}+ ★`}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );

  return (
    <PageShell>
      <PageHeader title="All products" subtitle="Honest prices on the things you actually want."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Products" }]} />

      <section className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[260px_1fr] gap-8">
        <div className="hidden lg:block">{Filters}</div>

        <div>
          <div className="flex items-center justify-between gap-3 mb-5">
            <button onClick={() => setOpen(true)} className="lg:hidden inline-flex items-center gap-2 h-10 px-4 rounded-pill border border-border text-sm">
              <SlidersHorizontal className="size-4" /> Filters
            </button>
            <p className="text-sm text-muted-foreground hidden sm:block">{filtered.length} products</p>
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="h-10 px-3 rounded-md border border-border bg-background text-sm">
              {sorts.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 border border-dashed rounded-2xl">
              <p className="text-muted-foreground">No products match your filters.</p>
              <button onClick={() => { setCats([]); setMaxPrice(10000); setMinRating(0); }}
                className="mt-3 text-primary text-sm font-medium hover:underline">Reset filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          )}

          <div className="mt-10 flex justify-center gap-2">
            <button className="h-10 px-4 rounded-pill border border-border text-sm hover:bg-secondary">Previous</button>
            <button className="h-10 px-4 rounded-pill bg-primary text-primary-foreground text-sm font-medium">Next</button>
          </div>
        </div>
      </section>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display font-semibold">Filters</h2>
              <button onClick={() => setOpen(false)}><X className="size-5" /></button>
            </div>
            {Filters}
            <button onClick={() => setOpen(false)} className="w-full mt-6 h-11 rounded-pill bg-primary text-primary-foreground font-semibold">
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
      <SubLink />
    </PageShell>
  );
}

function SubLink() {
  return (
    <p className="text-center text-xs text-muted-foreground pb-8">
      Looking for a specific item? <Link to="/search" className="text-primary hover:underline">Search the catalogue</Link>.
    </p>
  );
}
