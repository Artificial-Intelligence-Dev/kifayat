import { Link } from "@tanstack/react-router";
import { Heart, ArrowUpRight } from "lucide-react";
import { products } from "@/lib/shop-data";

export function Products() {
  const featured = products.slice(0, 6);
  return (
    <section className="bg-paper py-20 lg:py-32">
      <div className="max-w-[1600px] mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end mb-12 lg:mb-20">
          <div>
            <p className="eyebrow text-coal/50 mb-3">The Weekly Edit</p>
            <h2 className="font-display italic text-5xl lg:text-8xl leading-[0.9]">Trending<br/>Now.</h2>
          </div>
          <p className="max-w-md text-coal/70 leading-relaxed lg:text-lg lg:justify-self-end">
            Eight pieces chosen this week — selected for craft, value, and the way they fit into everyday life across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-16 lg:gap-x-10 lg:gap-y-24">
          {featured.map((p, i) => (
            <article key={p.id} className="group">
              <Link to="/products/$productId" params={{ productId: p.slug }} className="block">
                <div className="relative aspect-[3/4] bg-bone overflow-hidden mb-4 lg:mb-5">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={600}
                    height={800}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-coal text-bone eyebrow px-2 py-1">{p.badge}</span>
                  )}
                  <span
                    role="button"
                    aria-label="Wishlist"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    className="absolute top-3 right-3 size-9 grid place-items-center text-coal/60 hover:text-coal hover:bg-bone/80 rounded-full transition cursor-pointer"
                  >
                    <Heart className="size-4" strokeWidth={1.4} />
                  </span>
                  <span className="absolute inset-x-3 bottom-3 h-11 bg-coal text-bone eyebrow flex items-center justify-center gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition">
                    Quick view <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                  </span>
                  <span className="absolute bottom-3 left-3 font-mono text-[10px] text-coal/60 bg-bone/80 px-1.5 py-0.5">
                    {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                  </span>
                </div>
              </Link>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="eyebrow text-coal/40 mb-1.5">{p.brand}</p>
                  <Link to="/products/$productId" params={{ productId: p.slug }}
                    className="block font-display italic text-xl lg:text-2xl leading-tight hover:opacity-60 transition line-clamp-2">
                    {p.name}
                  </Link>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium">Rs {p.price.toLocaleString()}</p>
                  {p.oldPrice && <p className="text-[10px] text-coal/40 line-through mt-0.5">Rs {p.oldPrice.toLocaleString()}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 lg:mt-28 flex justify-center">
          <Link to="/products"
            className="group inline-flex items-center gap-3 border border-coal/15 px-10 py-5 eyebrow hover:bg-coal hover:text-bone transition-colors duration-500">
            Explore All Drops
            <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
