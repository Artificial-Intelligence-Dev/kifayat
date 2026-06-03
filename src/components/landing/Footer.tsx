import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const sp = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.25 });
  const wordX = useTransform(sp, [0, 1], ["12%", "-12%"]);
  const [email, setEmail] = useState("");

  return (
    <footer ref={ref} className="bg-coal text-bone min-h-screen flex flex-col relative overflow-hidden">
      <div className="max-w-[1600px] w-full mx-auto px-5 lg:px-10 pt-20 lg:pt-32 pb-10 flex-1 flex flex-col">
        {/* Top — newsletter + meta */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 pb-16 lg:pb-24 border-b border-bone/10">
          <div className="lg:col-span-7">
            <p className="eyebrow text-bone/40 mb-6">§ The Quiet Letter</p>
            <h2 className="font-display italic text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight max-w-xl">
              A short note,<br />once a month<span className="text-brass">.</span>
            </h2>
            <p className="mt-6 text-bone/60 max-w-md leading-relaxed">
              Three considered objects, one small story, zero shouting. Unsubscribe with a single tap.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); }}
              className="mt-10 flex max-w-xl border-b border-bone/30 focus-within:border-brass transition"
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="your@inbox.pk"
                className="flex-1 bg-transparent py-4 outline-none text-bone placeholder:text-bone/30"
              />
              <button type="submit" className="eyebrow text-brass hover:text-bone transition flex items-center gap-2 px-2">
                Subscribe <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <h4 className="eyebrow text-bone/40 mb-5">Browse</h4>
              <ul className="space-y-3 font-display italic text-xl">
                <li><Link to="/products" className="link-draw text-bone/85 hover:text-brass transition">All Items</Link></li>
                <li><Link to="/category/$slug" params={{ slug: "electronics" }} className="link-draw text-bone/85 hover:text-brass transition">Electronics</Link></li>
                <li><Link to="/category/$slug" params={{ slug: "fashion" }} className="link-draw text-bone/85 hover:text-brass transition">Fashion</Link></li>
                <li><Link to="/category/$slug" params={{ slug: "home-kitchen" }} className="link-draw text-bone/85 hover:text-brass transition">Home</Link></li>
                <li><Link to="/category/$slug" params={{ slug: "beauty" }} className="link-draw text-bone/85 hover:text-brass transition">Beauty</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="eyebrow text-bone/40 mb-5">Service</h4>
              <ul className="space-y-3 font-display italic text-xl">
                <li><Link to="/shipping-policy" className="link-draw text-bone/85 hover:text-brass transition">Shipping</Link></li>
                <li><Link to="/return-policy" className="link-draw text-bone/85 hover:text-brass transition">Returns</Link></li>
                <li><Link to="/account/orders" className="link-draw text-bone/85 hover:text-brass transition">Track</Link></li>
                <li><Link to="/contact" className="link-draw text-bone/85 hover:text-brass transition">Contact</Link></li>
                <li><Link to="/faq" className="link-draw text-bone/85 hover:text-brass transition">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="eyebrow text-bone/40 mb-5">House</h4>
              <ul className="space-y-3 font-display italic text-xl">
                <li><Link to="/about" className="link-draw text-bone/85 hover:text-brass transition">Story</Link></li>
                <li><Link to="/blog" className="link-draw text-bone/85 hover:text-brass transition">Journal</Link></li>
                <li><Link to="/privacy" className="link-draw text-bone/85 hover:text-brass transition">Privacy</Link></li>
                <li><Link to="/terms" className="link-draw text-bone/85 hover:text-brass transition">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle — address card + socials */}
        <div className="py-12 grid sm:grid-cols-3 gap-10 border-b border-bone/10">
          <div>
            <p className="eyebrow text-bone/40 mb-3">Studio</p>
            <p className="text-bone/85 leading-relaxed">
              Khayaban-e-Shahbaz<br />Karachi, Pakistan
            </p>
          </div>
          <div>
            <p className="eyebrow text-bone/40 mb-3">Dispatch</p>
            <p className="text-bone/85 leading-relaxed">
              Pakistan-wide · 2–5 days<br />Free over Rs 2,500
            </p>
          </div>
          <div>
            <p className="eyebrow text-bone/40 mb-3">Elsewhere</p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="size-10 border border-bone/15 grid place-items-center hover:bg-brass hover:text-coal hover:border-brass transition">
                  <Icon className="size-4" strokeWidth={1.4} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Kinetic giant wordmark */}
        <div className="flex-1 grid place-items-center py-16 lg:py-24 relative overflow-hidden">
          <motion.p
            style={reduce ? undefined : { x: wordX }}
            className="font-display italic text-[22vw] leading-[0.82] tracking-tight text-bone whitespace-nowrap will-change-transform"
          >
            Kifayat<span className="text-brass">.</span>
          </motion.p>
          <p className="absolute bottom-4 inset-x-0 text-center eyebrow text-bone/40">
            Made with care · dispatched across Pakistan
          </p>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-bone/10 flex flex-col sm:flex-row gap-4 justify-between items-center eyebrow text-bone/40">
          <span>© 2026 Kifayat Co.</span>
          <a href="#top" className="link-draw inline-flex items-center gap-2 hover:text-brass transition">
            Back to top <ArrowUpRight className="size-3" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
