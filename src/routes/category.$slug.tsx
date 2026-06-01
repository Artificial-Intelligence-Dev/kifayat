import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/landing/PageShell";
import { ProductCard } from "@/components/shop/ProductCard";
import { getCategory, productsByCategory } from "@/lib/shop-data";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const cat = getCategory(params.slug);
    if (!cat) throw notFound();
    return { cat, products: productsByCategory(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.cat.name} — Kifayat` },
      { name: "description", content: `Shop ${loaderData.cat.name} at Kifayat — curated picks at honest prices, delivered in Karachi.` },
    ] : [],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <PageShell><div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl mb-3">Category not found</h1>
      <Link to="/products" className="text-primary hover:underline">Browse all products</Link>
    </div></PageShell>
  ),
  errorComponent: () => <PageShell><div className="px-4 py-24 text-center">Something went wrong.</div></PageShell>,
});

function CategoryPage() {
  const { cat, products } = Route.useLoaderData();
  return (
    <PageShell>
      <PageHeader title={cat.name} subtitle={`${cat.count.toLocaleString()}+ curated products in ${cat.name}.`}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Categories", to: "/products" }, { label: cat.name }]} />
      <section className="max-w-7xl mx-auto px-4 py-10">
        {products.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No products yet in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {products.map((p: import("@/lib/shop-data").Product) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </section>
    </PageShell>
  );
}
