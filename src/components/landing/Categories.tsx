import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/shop-data";

export function Categories() {
  return (
    <section className="bg-bone py-20 lg:py-32">
      <div className="max-w-[1600px] mx-auto">
        <div className="px-5 lg:px-10 flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <p className="eyebrow text-coal/50 mb-3">The Curation</p>
            <h2 className="font-display italic text-5xl lg:text-7xl">By Category</h2>
          </div>
          <Link to="/products" className="hidden sm:inline-flex eyebrow border-b border-coal pb-1 hover:opacity-60 transition">
            View All
          </Link>
        </div>

        <div className="flex gap-5 lg:gap-8 overflow-x-auto snap-x no-scrollbar pb-4 pl-5 lg:pl-10 pr-5 lg:pr-10">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="snap-start group flex-none w-[72%] sm:w-[44%] lg:w-[28%]"
            >
              <div className="relative aspect-[3/4] bg-paper overflow-hidden mb-5">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={600}
                  height={800}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 eyebrow text-bone bg-coal/60 backdrop-blur px-2 py-1">
                  N° {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute bottom-4 right-4 size-10 rounded-full bg-bone grid place-items-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition">
                  <ArrowUpRight className="size-4 text-coal" strokeWidth={1.5} />
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="font-display italic text-2xl lg:text-3xl">{c.name}</h3>
                <p className="eyebrow text-coal/40">{c.count}+ items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
