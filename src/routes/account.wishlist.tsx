import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/shop/ProductCard";
import { products, type Product } from "@/lib/shop-data";

export const Route = createFileRoute("/account/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Kifayat" }] }),
  component: Wishlist,
});

function Wishlist() {
  const items = products.slice(0, 4);
  if (items.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed rounded-2xl">
        <p className="text-muted-foreground mb-4">Your wishlist is empty.</p>
        <Link to="/products" className="text-primary font-medium hover:underline">Discover products →</Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {items.map((p: Product) => <ProductCard key={p.id} p={p} />)}
    </div>
  );
}
