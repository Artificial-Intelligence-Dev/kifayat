import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/lib/shop-data";

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-[var(--shadow-e2)] transition">
      <Link to="/products/$productId" params={{ productId: p.slug }} className="block">
        <div className="relative aspect-square bg-secondary overflow-hidden">
          <img src={p.image} alt={p.name} loading="lazy" width={800} height={800}
            className="size-full object-cover transition duration-500 group-hover:scale-105" />
          {p.badge && (
            <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-primary text-primary-foreground text-[10px] font-semibold">
              {p.badge}
            </span>
          )}
          <button aria-label="Add to wishlist" onClick={(e) => e.preventDefault()}
            className="absolute top-3 right-3 size-9 rounded-full bg-background/90 backdrop-blur grid place-items-center hover:bg-background hover:text-primary transition">
            <Heart className="size-4" />
          </button>
          <span className="absolute inset-x-3 bottom-3 h-10 rounded-pill bg-foreground text-background text-sm font-semibold flex items-center justify-center gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition">
            <ShoppingCart className="size-4" /> Quick add
          </span>
        </div>
      </Link>
      <div className="p-4">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{p.brand}</div>
        <Link to="/products/$productId" params={{ productId: p.slug }}
          className="block font-medium text-sm leading-snug line-clamp-2 min-h-[2.6em] mt-0.5 hover:text-primary">
          {p.name}
        </Link>
        <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-warning text-warning" />
          <span className="text-foreground font-medium">{p.rating}</span>
          <span>({p.reviews})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-primary-dark font-display font-bold">Rs {p.price.toLocaleString()}</span>
          {p.oldPrice && <span className="text-xs text-muted-foreground line-through">Rs {p.oldPrice.toLocaleString()}</span>}
        </div>
      </div>
    </article>
  );
}
