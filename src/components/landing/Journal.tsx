import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import j1 from "@/assets/journal-1.jpg";
import j2 from "@/assets/journal-2.jpg";
import j3 from "@/assets/journal-3.jpg";

const posts = [
  { id: "smart-shopping-karachi", title: "Smart shopping, slow living: a Karachi guide", date: "May 14, 2026", read: "5 min", cover: j1, tag: "Style" },
  { id: "wardrobe-essentials", title: "The unboxing standard we hold ourselves to", date: "May 03, 2026", read: "6 min", cover: j2, tag: "Inside" },
  { id: "kitchen-upgrades", title: "On delivery: the last mile, the first impression", date: "Apr 22, 2026", read: "4 min", cover: j3, tag: "Logistics" },
];

export function Journal() {
  return (
    <section className="bg-bone py-20 lg:py-32">
      <div className="max-w-[1600px] mx-auto px-5 lg:px-10">
        <div className="flex items-end justify-between mb-12 lg:mb-16">
          <div>
            <p className="eyebrow text-coal/50 mb-3">N° 03 · The Journal</p>
            <h2 className="font-display italic text-5xl lg:text-7xl leading-[0.95]">Read & wander.</h2>
          </div>
          <Link to="/blog" className="hidden sm:inline-flex items-center gap-2 eyebrow border-b border-coal pb-1 hover:opacity-60 transition">
            All entries <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-8">
          {posts.map((p, i) => (
            <Link key={p.id} to="/blog/$postId" params={{ postId: p.id }} className="group block">
              <div className={"relative overflow-hidden mb-6 " + (i === 0 ? "aspect-[4/5]" : "aspect-[4/5] lg:aspect-[3/4]")}>
                <img src={p.cover} alt={p.title} loading="lazy" width={1024} height={1280}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute top-4 left-4 eyebrow bg-bone/90 px-2 py-1 text-coal">{p.tag}</span>
              </div>
              <p className="eyebrow text-coal/40 mb-3">{p.date} · {p.read}</p>
              <h3 className="font-display italic text-3xl lg:text-4xl leading-tight group-hover:opacity-60 transition">{p.title}</h3>
              <span className="mt-5 inline-flex items-center gap-2 eyebrow border-b border-coal/40 pb-0.5">
                Read entry <ArrowUpRight className="size-3" strokeWidth={1.5} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
