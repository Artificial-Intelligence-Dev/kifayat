import { ArrowUpRight } from "lucide-react";
import el from "@/assets/cat-electronics.jpg";
import fa from "@/assets/cat-fashion.jpg";
import ho from "@/assets/cat-home.jpg";
import be from "@/assets/cat-beauty.jpg";

const cats = [
  { name: "Electronics", count: "1,240+ products", img: el },
  { name: "Fashion", count: "2,800+ products", img: fa },
  { name: "Home & Kitchen", count: "960+ products", img: ho },
  { name: "Beauty", count: "740+ products", img: be },
];

export function Categories() {
  return (
    <section id="categories" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Shop by category</span>
            <h2 className="text-3xl lg:text-4xl mt-2">Find what you need</h2>
          </div>
          <a href="#" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark">
            View all <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {cats.map((c) => (
            <a key={c.name} href="#" className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
              <img src={c.img} alt={c.name} loading="lazy" width={800} height={800}
                className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                <div className="font-display text-xl font-semibold">{c.name}</div>
                <div className="text-xs opacity-80">{c.count}</div>
              </div>
              <div className="absolute top-4 right-4 size-9 rounded-full bg-background/95 text-foreground grid place-items-center translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition">
                <ArrowUpRight className="size-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
