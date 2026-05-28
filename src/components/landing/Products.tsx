import { Heart, Star, ShoppingCart } from "lucide-react";
import h from "@/assets/p-headphones.jpg";
import w from "@/assets/p-watch.jpg";
import s from "@/assets/p-sneakers.jpg";
import se from "@/assets/p-serum.jpg";

const products = [
  { name: "Wireless Over-Ear Headphones", price: 4499, old: 6999, rating: 4.7, reviews: 218, img: h, badge: "−35%" },
  { name: "Classic Steel Smartwatch", price: 7899, old: 10999, rating: 4.6, reviews: 142, img: w, badge: "New" },
  { name: "Minimal White Sneakers", price: 3299, old: 4499, rating: 4.8, reviews: 384, img: s, badge: "Bestseller" },
  { name: "Vitamin C Glow Serum 30ml", price: 1499, old: 1999, rating: 4.5, reviews: 96, img: se },
];

export function Products() {
  return (
    <section id="products" className="py-16 lg:py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Featured for you</span>
            <h2 className="text-3xl lg:text-4xl mt-2">Trending this week</h2>
          </div>
          <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">See all →</a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((p) => (
            <article key={p.name} className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-[var(--shadow-e2)] transition">
              <div className="relative aspect-square bg-secondary overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" width={800} height={800}
                  className="size-full object-cover transition duration-500 group-hover:scale-105" />
                {p.badge && (
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-primary text-primary-foreground text-[10px] font-semibold">
                    {p.badge}
                  </span>
                )}
                <button aria-label="Add to wishlist"
                  className="absolute top-3 right-3 size-9 rounded-full bg-background/90 backdrop-blur grid place-items-center hover:bg-background hover:text-primary transition">
                  <Heart className="size-4" />
                </button>
                <button className="absolute inset-x-3 bottom-3 h-10 rounded-pill bg-foreground text-background text-sm font-semibold flex items-center justify-center gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition">
                  <ShoppingCart className="size-4" /> Add to cart
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm leading-snug line-clamp-2 min-h-[2.6em]">{p.name}</h3>
                <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                  <Star className="size-3.5 fill-warning text-warning" />
                  <span className="text-foreground font-medium">{p.rating}</span>
                  <span>({p.reviews})</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-primary-dark font-display font-bold">Rs {p.price.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground line-through">Rs {p.old.toLocaleString()}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
