import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import left from "@/assets/p-headphones.jpg";
import right from "@/assets/p-watch.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sp = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.2 });
  const yL = useTransform(sp, [0, 1], ["0%", "-14%"]);
  const yR = useTransform(sp, [0, 1], ["0%", "-22%"]);
  const titleY = useTransform(sp, [0, 1], ["0%", "-18%"]);
  const titleScale = useTransform(sp, [0, 1], [1, 0.95]);

  const words = useMemo(() => ["Objects,", "considered."], []);

  return (
    <section ref={ref} className="relative bg-bone text-coal overflow-hidden">
      {/* TOP META */}
      <div className="max-w-[1600px] mx-auto px-5 lg:px-10 pt-8 lg:pt-12 grid grid-cols-2 gap-4 eyebrow text-coal/55">
        <span className="flex items-center gap-3">
          <span className="h-px w-8 bg-coal/30" /> Volume 03 · Autumn Edit
        </span>
        <span className="text-right hidden sm:inline">Dispatched Pakistan-wide · 24.86° N</span>
      </div>

      {/* DIPTYCH */}
      <div className="relative max-w-[1600px] mx-auto px-5 lg:px-10 pt-6 lg:pt-10 pb-16 lg:pb-24">
        <div className="grid grid-cols-12 gap-3 lg:gap-5 items-end min-h-[78vh] lg:min-h-[86vh]">
          {/* LEFT IMAGE — tall, anchored low */}
          <motion.figure
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-5 lg:col-span-3 aspect-[3/4] lg:aspect-[3/4] bg-paper overflow-hidden relative self-end img-bone-grade"
            data-cursor="view"
          >
            <motion.img
              style={reduce ? undefined : { y: yL }}
              src={left}
              alt="A considered object"
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover img-breathe will-change-transform"
            />
            <span className="absolute top-4 left-4 eyebrow text-bone bg-coal/85 px-2 py-1">01 / Object</span>
          </motion.figure>

          {/* CENTER TYPE BRIDGE */}
          <motion.div
            style={reduce ? undefined : { y: titleY, scale: titleScale }}
            className="col-span-12 lg:col-span-4 order-first lg:order-none text-center will-change-transform relative z-10"
          >
            <p className="eyebrow text-coal/50 mb-6 lg:mb-10">Season 01 — Edition</p>
            <h1 className="font-display italic text-[15vw] sm:text-[12vw] lg:text-[7.5vw] xl:text-[7vw] leading-[0.85] tracking-tight break-words">
              {words.map((w, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className={`inline-block ${i === 1 ? "text-brass" : ""}`}
                    initial={{ y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, delay: 0.25 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.1 }}
              className="mt-8 lg:mt-12 flex flex-col items-center gap-5"
            >
              <p className="max-w-md text-coal/65 text-sm lg:text-base leading-relaxed">
                A curated marketplace of considered objects — electronics, fashion, beauty and home — dispatched with care, anywhere in Pakistan.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-3 bg-coal text-bone px-7 py-4 eyebrow hover:bg-brass hover:text-coal transition"
                  data-cursor="view"
                >
                  <span className="btn-swap min-w-[110px]">
                    <span className="btn-swap-base">Shop the edit</span>
                    <span className="btn-swap-alt">→ Enter</span>
                  </span>
                </Link>
                <Link to="/products" className="inline-flex items-center gap-2 border border-coal/25 px-7 py-4 eyebrow hover:border-coal transition link-draw">
                  Browse all <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE — taller, anchored top, mirrored */}
          <motion.figure
            initial={reduce ? false : { opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-7 lg:col-span-4 aspect-[3/4] lg:aspect-[3/4.4] bg-paper overflow-hidden relative self-start lg:-mt-6 img-bone-grade"
            data-cursor="view"
          >
            <motion.img
              style={reduce ? undefined : { y: yR }}
              src={right}
              alt="A considered object — paired"
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover img-breathe will-change-transform"
            />
            <span className="absolute top-4 right-4 eyebrow text-bone bg-coal/85 px-2 py-1">02 / Pairing</span>
            <span className="absolute bottom-4 right-4 eyebrow bg-brass text-coal px-3 py-1.5">Autumn N° 03</span>
          </motion.figure>
        </div>

        {/* footer stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          className="mt-12 lg:mt-16 grid grid-cols-3 gap-px bg-coal/10 border-y border-coal/10"
        >
          {[
            { k: "12k+", v: "Shoppers · this month" },
            { k: "98%", v: "On-time dispatch · Pakistan-wide" },
            { k: "4.8★", v: "From 6,200 verified buyers" },
          ].map((s) => (
            <div key={s.k} className="bg-bone px-5 py-6 lg:px-8 lg:py-8">
              <p className="font-display italic text-3xl lg:text-5xl">{s.k}</p>
              <p className="eyebrow text-coal/55 mt-2">{s.v}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* marquee strip */}
      <div className="bg-coal text-bone py-5 overflow-hidden border-y border-bone/10">
        <div className="flex gap-12 whitespace-nowrap animate-marquee font-display italic text-3xl lg:text-5xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0 pr-12">
              {["Electronics", "✦", "Fashion", "✦", "Home & Kitchen", "✦", "Beauty", "✦", "Sports", "✦", "New Arrivals", "✦"].map((w, i) => (
                <span key={i} className={w === "✦" ? "text-brass text-2xl self-center" : ""}>{w}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
