import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { ProductCard } from "@/components/shop/ProductCard";
import { getProduct, products } from "@/lib/shop-data";
import { Heart, Minus, Plus, ShoppingCart, Star, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const p = getProduct(params.productId);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} — Kifayat` },
      { name: "description", content: loaderData.product.description },
      { property: "og:title", content: loaderData.product.name },
      { property: "og:description", content: loaderData.product.description },
      { property: "og:image", content: loaderData.product.image },
    ] : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <PageShell><div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl mb-2">Product not found</h1>
      <p className="text-muted-foreground mb-6">It may have been removed or sold out.</p>
      <Link to="/products" className="text-primary hover:underline">Browse all products</Link>
    </div></PageShell>
  ),
  errorComponent: () => (
    <PageShell><div className="px-4 py-24 text-center text-muted-foreground">Something went wrong loading this product.</div></PageShell>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-16">
        <nav className="text-xs text-muted-foreground mb-6 flex gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-primary">Home</Link><span>/</span>
          <Link to="/products" className="hover:text-primary">Products</Link><span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
              <img src={product.images?.[active] ?? product.image} alt={product.name} className="size-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4">
              {product.images?.map((img, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`aspect-square rounded-lg overflow-hidden bg-secondary border-2 transition ${active === i ? "border-primary" : "border-transparent"}`}>
                  <img src={img} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{product.brand}</div>
            <h1 className="text-3xl lg:text-4xl mt-2">{product.name}</h1>
            <div className="flex items-center gap-3 mt-3 text-sm">
              <div className="flex items-center gap-1"><Star className="size-4 fill-warning text-warning" /><span className="font-medium">{product.rating}</span></div>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{product.reviews} reviews</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-success font-medium">{product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}</span>
            </div>

            <div className="flex items-baseline gap-3 mt-5">
              <span className="text-3xl font-display font-bold text-primary-dark">Rs {product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">Rs {product.oldPrice.toLocaleString()}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-primary-soft text-primary-dark">
                    Save Rs {(product.oldPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary" />{f}</li>
              ))}
            </ul>

            <div className="mt-7 flex items-center gap-3">
              <div className="inline-flex items-center border border-border rounded-pill">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="size-11 grid place-items-center"><Minus className="size-4" /></button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="size-11 grid place-items-center"><Plus className="size-4" /></button>
              </div>
              <button className="flex-1 h-12 rounded-pill bg-primary text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 hover:bg-primary-dark transition">
                <ShoppingCart className="size-4" /> Add to cart
              </button>
              <button aria-label="Wishlist" className="size-12 rounded-pill border border-border grid place-items-center hover:border-primary hover:text-primary transition">
                <Heart className="size-5" />
              </button>
            </div>

            <Link to="/checkout" className="mt-3 block w-full h-12 rounded-pill bg-foreground text-background font-semibold grid place-items-center hover:opacity-90">
              Buy now
            </Link>

            <div className="mt-8 grid grid-cols-3 gap-4 text-xs">
              {[
                { Icon: Truck, label: "Free delivery", sub: "Above Rs 2,500" },
                { Icon: RotateCcw, label: "7-day returns", sub: "Easy refunds" },
                { Icon: ShieldCheck, label: "Secure pay", sub: "COD available" },
              ].map(({ Icon, label, sub }) => (
                <div key={label} className="rounded-xl border border-border p-3">
                  <Icon className="size-4 text-primary mb-1.5" />
                  <div className="font-semibold">{label}</div>
                  <div className="text-muted-foreground">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl mb-6">You might also like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </section>
        )}
      </div>
    </PageShell>
  );
}
