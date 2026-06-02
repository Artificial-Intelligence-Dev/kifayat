import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import hero from "@/assets/editorial-hero.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.2 });
  const y = useTransform(smoothProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(smoothProgress, [0, 1], [1.03, 1.12]);
  const titleY = useTransform(smoothProgress, [0, 1], ["0%", "-16%"]);
  const overlay = useTransform(smoothProgress, [0, 1], [0.58, 0.82]);

  const headline = "Smart Shopping";
  const words = useMemo(() => headline.split(" "), []);

  return (
    <section className="relative bg-coal text-bone">
      <div ref={ref} className="relative h-[92vh] min-h-[640px] lg:min-h-[820px] overflow-hidden">
        <motion.div style={reduceMotion ? undefined : { y, scale }} className="absolute inset-0 will-change-transform transform-gpu">
          <img
            src={hero}
            alt="Kifayat — Karachi editorial"
            width={1280}
            height={1600}
            fetchPriority="high"
            decoding="async"
            className="size-full object-cover object-center"
          />
        </motion.div>
        <motion.div
          style={reduceMotion ? undefined : { opacity: overlay }}
          className="absolute inset-0 bg-gradient-to-b from-coal/30 via-coal/10 to-coal"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-coal/40 via-transparent to-transparent" />

        {/* top eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-0 inset-x-0 p-5 lg:p-10 flex items-center justify-between eyebrow text-bone/70"
        >
          <span className="flex items-center gap-3">
            <span className="h-px w-8 bg-bone/40" /> Volume 03 · Autumn Edit
          </span>
          <span className="hidden sm:inline">Karachi · 24.86° N</span>
        </motion.div>

        {/* main */}
        <motion.div
          style={reduceMotion ? undefined : { y: titleY }}
          className="relative h-full max-w-[1600px] mx-auto px-5 lg:px-10 flex flex-col justify-end pb-16 lg:pb-24"
        >
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="eyebrow text-bone/70 mb-5 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-bone/40" /> Season 01 — Edition
            </motion.p>
            <h1 className="font-display italic text-6xl sm:text-8xl lg:text-[10rem] leading-[0.85] tracking-tight">
              <span className="block">
                {words.map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.18em]">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "115%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1.05, delay: 0.35 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
              </span>
              <span className="block">
                <span className="inline-block overflow-hidden align-bottom mr-[0.18em]">
                  <motion.span
                    className="inline-block not-italic"
                    initial={{ y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.05, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    for
                  </motion.span>
                </span>
                <span className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.05, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Karachi
                  </motion.span>
                </span>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              className="mt-8 max-w-md text-bone/75 text-sm lg:text-base leading-relaxed"
            >
              A curated marketplace of considered objects — electronics, fashion, beauty and home — delivered with the precision Karachi deserves.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link to="/products" className="group inline-flex items-center gap-3 bg-bone text-coal px-7 py-4 eyebrow hover:bg-bone/90 transition">
                Shop the edit
                <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" strokeWidth={1.5} />
              </Link>
              <Link to="/products" className="inline-flex items-center gap-2 border border-bone/30 backdrop-blur-sm px-7 py-4 eyebrow hover:bg-bone/10 transition">
                Browse all
              </Link>
            </motion.div>
          </div>

          {/* corner stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="absolute right-5 lg:right-10 bottom-16 lg:bottom-24 hidden md:flex flex-col items-end text-right"
          >
            <p className="font-display italic text-6xl lg:text-7xl leading-none">12k+</p>
            <p className="eyebrow text-bone/60 mt-3">Karachi shoppers<br/>this month</p>
          </motion.div>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 eyebrow text-bone/60 flex flex-col items-center gap-2"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-bone/40"
          />
        </motion.div>
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
