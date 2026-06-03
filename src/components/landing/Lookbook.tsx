import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import a from "@/assets/p-headphones.jpg";
import b from "@/assets/p-watch.jpg";
import c from "@/assets/p-sneakers.jpg";
import d from "@/assets/p-serum.jpg";

const scenes = [
  { img: a, no: "01", title: "Desk, late evening.", note: "The over-ear, paired with quiet light.", slug: "wireless-over-ear-headphones" },
  { img: b, no: "02", title: "Wrist, mid-morning.", note: "Steel — read at a glance.", slug: "classic-steel-smartwatch" },
  { img: c, no: "03", title: "Hallway, Sunday.", note: "Low-tops, unhurried.", slug: "minimal-white-sneakers" },
  { img: d, no: "04", title: "Vanity, first light.", note: "Three drops — a small ritual.", slug: "vitamin-c-glow-serum-30ml" },
];

export function Lookbook() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const sp = useSpring(scrollYProgress, { stiffness: 60, damping: 24 });
  const yA = useTransform(sp, [0, 1], ["6%", "-6%"]);
  const yB = useTransform(sp, [0, 1], ["-4%", "4%"]);

  return (
    <section ref={ref} className="bg-paper py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16 lg:mb-24">
          <div className="lg:col-span-8">
            <p className="eyebrow text-coal/50 mb-4">§ Lookbook · Volume 03</p>
            <h2 className="font-display italic text-5xl md:text-7xl lg:text-[8rem] leading-[0.88] tracking-tight">
              In <span className="text-brass">situ</span>.<br />Around the house.
            </h2>
          </div>
          <p className="lg:col-span-4 text-coal/65 leading-relaxed max-w-md lg:text-lg">
            Four small scenes — the way these objects actually sit in a day. No stylists, no perfect light. Just where they belong.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {scenes.map((s, i) => {
            const isLarge = i === 0 || i === 3;
            const colSpan = isLarge ? "col-span-12 lg:col-span-8" : "col-span-12 lg:col-span-4";
            const offset = i % 2 === 0 ? "lg:mt-0" : "lg:mt-16";
            const y = i % 2 === 0 ? yA : yB;
            return (
              <motion.div
                key={s.no}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`${colSpan} ${offset}`}
              >
                <Link to="/products/$productId" params={{ productId: s.slug }} className="group block" data-cursor="view">
                  <motion.div
                    style={reduce ? undefined : { y }}
                    className={`relative overflow-hidden bg-bone img-bone-grade ${isLarge ? "aspect-[16/10]" : "aspect-[3/4]"}`}
                  >
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover img-breathe transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-4 left-4 eyebrow bg-bone/85 text-coal px-2 py-1 font-mono">N° {s.no}</span>
                    <span className="absolute top-4 right-4 eyebrow text-bone bg-coal/70 backdrop-blur-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                      View ↗
                    </span>
                  </motion.div>
                  <div className="mt-5 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-display italic text-2xl lg:text-3xl leading-tight">{s.title}</h3>
                      <p className="text-coal/55 mt-2 text-sm">{s.note}</p>
                    </div>
                    <ArrowUpRight className="size-5 text-coal/40 group-hover:text-brass group-hover:translate-x-1 group-hover:-translate-y-1 transition shrink-0" strokeWidth={1.3} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
