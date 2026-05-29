import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import hero from "@/assets/editorial-hero.jpg";

export function Hero() {
  return (
    <section className="relative bg-coal text-bone">
      <div className="relative h-[88vh] min-h-[600px] lg:min-h-[760px] overflow-hidden">
        <img
          src={hero}
          alt="Kifayat — Karachi editorial"
          width={1280}
          height={1600}
          className="absolute inset-0 size-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coal/30 via-coal/10 to-coal/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-coal/40 via-transparent to-transparent" />

        {/* top eyebrow */}
        <div className="absolute top-0 inset-x-0 p-5 lg:p-10 flex items-center justify-between eyebrow text-bone/70">
          <span className="flex items-center gap-3"><span className="h-px w-8 bg-bone/40" /> Volume 03 · Autumn Edit</span>
          <span className="hidden sm:inline">Karachi · 24.86° N</span>
        </div>

        {/* main */}
        <div className="relative h-full max-w-[1600px] mx-auto px-5 lg:px-10 flex flex-col justify-end pb-16 lg:pb-24">
          <div className="max-w-3xl animate-fade-up">
            <p className="eyebrow text-bone/70 mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-bone/40" /> Season 01 — Edition
            </p>
            <h1 className="font-display italic text-6xl sm:text-8xl lg:text-[10rem] leading-[0.85] tracking-tight">
              Smart Shopping<br />
              <span className="not-italic">for</span> Karachi
            </h1>
            <p className="mt-8 max-w-md text-bone/75 text-sm lg:text-base leading-relaxed">
              A curated marketplace of considered objects — electronics, fashion, beauty and home — delivered with the precision Karachi deserves.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/products" className="group inline-flex items-center gap-3 bg-bone text-coal px-7 py-4 eyebrow hover:bg-bone/90 transition">
                Shop the edit
                <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" strokeWidth={1.5} />
              </Link>
              <Link to="/products" className="inline-flex items-center gap-2 border border-bone/30 backdrop-blur-sm px-7 py-4 eyebrow hover:bg-bone/10 transition">
                Browse all
              </Link>
            </div>
          </div>

          {/* corner stats */}
          <div className="absolute right-5 lg:right-10 bottom-16 lg:bottom-24 hidden md:flex flex-col items-end text-right">
            <p className="font-display italic text-6xl lg:text-7xl leading-none">12k+</p>
            <p className="eyebrow text-bone/60 mt-3">Karachi shoppers<br/>this month</p>
          </div>
        </div>
      </div>

      {/* marquee */}
      <div className="bg-coal text-bone py-5 overflow-hidden border-y border-bone/10">
        <div className="flex gap-12 whitespace-nowrap animate-marquee font-display italic text-3xl lg:text-5xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0 pr-12">
              {["Electronics", "★", "Fashion", "★", "Home & Kitchen", "★", "Beauty", "★", "Sports", "★", "New Arrivals", "★"].map((w, i) => (
                <span key={i} className={w === "★" ? "text-bone/40 text-2xl self-center" : ""}>{w}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
