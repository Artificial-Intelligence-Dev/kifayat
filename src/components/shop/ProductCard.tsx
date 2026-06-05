import { Link } from "@tanstack/react-router";
import { Heart, ArrowUpRight } from "lucide-react";

export type CardProduct = {
  slug: string;
  name: string;
  brand?: string | null;
  price: number;
  oldPrice?: number | null;
  image: string;
  badge?: string | null;
};

export function ProductCard({ p, index }: { p: CardProduct; index?: number }) {
  return (
    <article className="group relative">
      <Link
        to="/products/$productId"
        params={{ productId: p.slug }}
        className="block"
        data-cursor="view"
      >
        <div className="relative aspect-[3/4] bg-paper overflow-hidden img-bone-grade">
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            decoding="async"
            width={900}
            height={1200}
            className="size-full object-cover img-breathe transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />

          {/* top meta — index + badge */}
          {typeof index === "number" && (
            <span className="absolute top-4 left-4 eyebrow text-coal/80 bg-bone/85 px-2 py-1 font-mono">
              N° {String(index + 1).padStart(2, "0")}
            </span>
          )}
          {p.badge && (
            <span className="absolute top-4 right-4 bg-brass text-coal eyebrow px-2.5 py-1">{p.badge}</span>
          )}

          {/* wishlist — bottom-left, reveal on hover */}
          <button
            aria-label="Save to wishlist"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute bottom-4 left-4 size-10 grid place-items-center bg-bone/85 text-coal hover:bg-coal hover:text-bone rounded-full transition opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 duration-500"
          >
            <Heart className="size-4" strokeWidth={1.4} />
          </button>

          {/* slide-up info panel — title + price reveal on hover */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] bg-coal/95 text-bone backdrop-blur-sm">
            <div className="px-5 py-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="eyebrow text-bone/50 mb-1">{p.brand}</p>
                <p className="font-display italic text-lg lg:text-xl leading-tight line-clamp-2">{p.name}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-lg lg:text-xl text-brass">Rs {p.price.toLocaleString()}</p>
                {p.oldPrice && <p className="text-[10px] text-bone/40 line-through">Rs {p.oldPrice.toLocaleString()}</p>}
              </div>
            </div>
            <div className="px-5 pb-4 flex items-center justify-between eyebrow text-bone/60">
              <span>View object</span>
              <ArrowUpRight className="size-3.5 text-brass" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </Link>

      {/* always-visible quiet caption — title + price (sparse-editorial baseline) */}
      <div className="mt-4 flex items-start justify-between gap-4 group-hover:opacity-0 transition-opacity duration-300">
        <div className="min-w-0">
          <p className="eyebrow text-coal/40 mb-1">{p.brand}</p>
          <Link
            to="/products/$productId"
            params={{ productId: p.slug }}
            className="block font-display text-lg lg:text-xl leading-tight line-clamp-1 hover:text-brass transition"
          >
            {p.name}
          </Link>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display text-base lg:text-lg">Rs {p.price.toLocaleString()}</p>
        </div>
      </div>
    </article>
  );
}
