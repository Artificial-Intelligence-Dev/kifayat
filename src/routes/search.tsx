import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Search as SearchIcon, SlidersHorizontal, Star, ArrowUpRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { searchProducts, trendingSearches } from "@/lib/search.functions";

const SORT_LABELS: Record<string, string> = {
  relevance: "Relevance",
  newest: "Newest",
  price_asc: "Price: Low → High",
  price_desc: "Price: High → Low",
  rating: "Highest rated",
};

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({
    q: (s.q as string) ?? "",
    sort: (s.sort as string) ?? "relevance",
    brand: (s.brand as string) ?? "",
    min_price: s.min_price ? Number(s.min_price) : undefined,
    max_price: s.max_price ? Number(s.max_price) : undefined,
    min_rating: s.min_rating ? Number(s.min_rating) : undefined,
    page: s.page ? Number(s.page) : 1,
  }),
  head: ({ loaderData: _ld, params: _p }) => ({
    meta: [
      { title: "Search — Kifayat" },
      { name: "description", content: "Search the Kifayat edit — full-text, fuzzy-tolerant, faceted." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [query, setQuery] = useState(search.q);
  const fn = useServerFn(searchProducts);
  const trendFn = useServerFn(trendingSearches);

  useEffect(() => setQuery(search.q), [search.q]);

  const { data, isFetching } = useQuery({
    queryKey: ["search", search],
    queryFn: () =>
      fn({
        data: {
          q: search.q,
          sort: search.sort as any,
          brand: search.brand || null,
          min_price: search.min_price ?? null,
          max_price: search.max_price ?? null,
          min_rating: search.min_rating ?? null,
          page: search.page,
        },
      }),
  });

  const { data: trending } = useQuery({
    queryKey: ["trending-searches"],
    queryFn: () => trendFn(),
    enabled: !search.q,
  });

  const updateSearch = (next: Partial<typeof search>) => {
    navigate({ to: "/search", search: (prev: any) => ({ ...prev, ...next, page: next.page ?? 1 }) });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearch({ q: query.trim(), page: 1 });
  };

  const results = data?.items ?? [];
  const facets = data?.facets;
  const totalPages = data?.total_pages ?? 1;

  return (
    <PageShell>
      {/* Editorial hero */}
      <section className="bg-coal text-bone">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 pt-10 lg:pt-16 pb-10 lg:pb-14">
          <p className="eyebrow text-bone/60 mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-bone/40" /> The Index · Search
          </p>
          <h1 className="font-display italic text-5xl sm:text-6xl lg:text-8xl leading-[0.88] mb-8">
            {search.q ? <>"<span className="text-brass">{search.q}</span>"</> : <>Find the object<span className="text-brass">.</span></>}
          </h1>
          <form onSubmit={submit} className="relative max-w-2xl">
            <SearchIcon className="size-5 absolute left-5 top-1/2 -translate-y-1/2 text-bone/50" strokeWidth={1.4} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands, categories…"
              className="w-full h-14 pl-14 pr-32 bg-bone/5 border border-bone/20 outline-none focus:border-brass text-bone placeholder:text-bone/40 text-base transition"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-brass text-coal eyebrow px-5 h-10 hover:bg-bone transition">
              Search
            </button>
          </form>
          {!search.q && trending && trending.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="eyebrow text-bone/40 mr-2">Trending</span>
              {trending.map((t) => (
                <button
                  key={t.query}
                  onClick={() => updateSearch({ q: t.query })}
                  className="text-xs px-3 py-1.5 border border-bone/20 hover:bg-brass hover:text-coal hover:border-brass transition"
                >
                  {t.query}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-5 lg:px-10 py-10 lg:py-16">
        <div className="grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-14">
          {/* Filters */}
          <aside className="space-y-8">
            <div className="flex items-center justify-between">
              <p className="eyebrow flex items-center gap-2"><SlidersHorizontal className="size-3.5" strokeWidth={1.4} /> Refine</p>
              {(search.brand || search.min_price || search.max_price || search.min_rating) && (
                <button onClick={() => updateSearch({ brand: "", min_price: undefined, max_price: undefined, min_rating: undefined })}
                  className="text-xs text-coal/60 hover:text-brass transition flex items-center gap-1">
                  <X className="size-3" /> Clear
                </button>
              )}
            </div>

            <FilterBlock title="Brand">
              <div className="space-y-2 max-h-60 overflow-auto">
                {(facets?.brands ?? []).map((b) => (
                  <label key={b.name} className="flex items-center justify-between text-sm cursor-pointer hover:text-brass transition">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={search.brand === b.name}
                        onChange={() => updateSearch({ brand: search.brand === b.name ? "" : b.name })}
                        className="accent-brass"
                      />
                      {b.name}
                    </span>
                    <span className="text-xs text-coal/40">{b.count}</span>
                  </label>
                ))}
                {(!facets?.brands || facets.brands.length === 0) && <p className="text-xs text-coal/40">No brands yet.</p>}
              </div>
            </FilterBlock>

            <FilterBlock title="Price (Rs)">
              <div className="flex gap-2">
                <input
                  type="number" placeholder="Min" defaultValue={search.min_price ?? ""}
                  onBlur={(e) => updateSearch({ min_price: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full h-10 px-3 bg-paper border border-coal/15 text-sm outline-none focus:border-coal"
                />
                <input
                  type="number" placeholder="Max" defaultValue={search.max_price ?? ""}
                  onBlur={(e) => updateSearch({ max_price: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full h-10 px-3 bg-paper border border-coal/15 text-sm outline-none focus:border-coal"
                />
              </div>
            </FilterBlock>

            <FilterBlock title="Customer rating">
              <div className="space-y-1">
                {[4, 3, 2, 1].map((r) => (
                  <button
                    key={r}
                    onClick={() => updateSearch({ min_rating: search.min_rating === r ? undefined : r })}
                    className={`w-full text-left px-2 py-1.5 flex items-center gap-2 text-sm transition ${
                      search.min_rating === r ? "bg-coal text-bone" : "hover:bg-paper"
                    }`}
                  >
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className={`size-3.5 ${i <= r ? "fill-brass text-brass" : "text-coal/20"}`} strokeWidth={1.2} />
                    ))}
                    <span className="ml-1 text-xs">& up</span>
                  </button>
                ))}
              </div>
            </FilterBlock>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-coal/10">
              <p className="text-sm text-coal/70">
                {isFetching ? "Searching…" : `${data?.total ?? 0} results`}
              </p>
              <div className="flex items-center gap-3">
                <label className="eyebrow text-coal/60">Sort</label>
                <select
                  value={search.sort}
                  onChange={(e) => updateSearch({ sort: e.target.value })}
                  className="h-10 px-3 bg-paper border border-coal/15 text-sm outline-none focus:border-coal"
                >
                  {Object.entries(SORT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>

            {results.length === 0 && !isFetching ? (
              <div className="text-center py-24 border border-dashed border-coal/15">
                <p className="font-display text-3xl italic mb-2">Nothing found<span className="text-brass">.</span></p>
                <p className="text-sm text-coal/60">Try a different search, or remove a filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {results.map((p: any) => (
                  <Link
                    key={p.id}
                    to="/products/$productId"
                    params={{ productId: p.slug }}
                    className="group block"
                  >
                    <div className="aspect-[4/5] bg-paper overflow-hidden mb-3 relative">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name} className="size-full object-cover transition duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="size-full grid place-items-center text-coal/30 text-xs">No image</div>
                      )}
                      {p.badge && (
                        <span className="absolute top-3 left-3 bg-coal text-bone eyebrow px-2 py-1 text-[10px]">{p.badge}</span>
                      )}
                    </div>
                    <p className="eyebrow text-coal/40 text-[10px]">{p.brand}</p>
                    <h3 className="font-display text-lg leading-tight mt-1 group-hover:text-brass transition">{p.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium text-sm">Rs {Number(p.price).toLocaleString()}</span>
                      {p.review_count > 0 && (
                        <span className="flex items-center gap-1 text-xs text-coal/60">
                          <Star className="size-3 fill-brass text-brass" strokeWidth={1.2} />
                          {Number(p.avg_rating).toFixed(1)} ({p.review_count})
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => updateSearch({ page: p })}
                    className={`size-10 eyebrow border transition ${
                      p === search.page ? "bg-coal text-bone border-coal" : "border-coal/15 hover:border-coal"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-coal/10 pt-5">
      <p className="eyebrow text-coal/60 mb-3">{title}</p>
      {children}
    </div>
  );
}
