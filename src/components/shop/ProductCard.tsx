import { Link } from "@tanstack/react-router";
import { Heart, ArrowUpRight, Star } from "lucide-react";
import type { Product } from "@/lib/shop-data";

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group">
      <Link to="/products/$productId" params={{ productId: p.slug }} className="block">
        <div className="relative aspect-[3/4] bg-paper overflow-hidden mb-5">
          <img src={p.image} alt={p.name} loading="lazy" width={900} height={1200}
            className="size-full object-cover transition duration-700 group-hover:scale-[1.04]" />
          {p.badge && (
            <span className="absolute top-4 left-4 bg-coal text-bone eyebrow px-2.5 py-1">{p.badge}</span>
          )}
          <span role="button" aria-label="Wishlist"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute top-4 right-4 size-10 grid place-items-center text-coal/60 hover:text-coal hover:bg-bone/80 rounded-full transition cursor-pointer">
            <Heart className="size-4" strokeWidth={1.4} />
          </span>
          <span className="absolute inset-x-4 bottom-4 h-12 bg-coal text-bone eyebrow flex items-center justify-center gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition">
            View object <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
          </span>
        </div>
      </Link>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="eyebrow text-coal/40 mb-1.5">{p.brand}</p>
          <Link to="/products/$productId" params={{ productId: p.slug }}
            className="block font-display text-2xl lg:text-3xl leading-[1.05] hover:text-brass transition line-clamp-2">
            {p.name}
          </Link>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-coal/55">
            <Star className="size-3.5 fill-brass text-brass" strokeWidth={1.4} />
            <span className="text-coal font-medium">{p.rating}</span>
            <span>· {p.reviews} reviews</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display text-xl">Rs {p.price.toLocaleString()}</p>
          {p.oldPrice && <p className="text-[11px] text-coal/40 line-through mt-0.5">Rs {p.oldPrice.toLocaleString()}</p>}
        </div>
      </div>
    </article>
  );
}
