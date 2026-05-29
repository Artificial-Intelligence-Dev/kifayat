import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-coal text-bone">
      <div className="px-5 lg:px-10 pt-20 lg:pt-32 pb-12 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-12 lg:gap-16 pb-20 border-b border-bone/10">
          <div className="space-y-8">
            <h2 className="font-display italic text-5xl lg:text-6xl leading-none">Kifayat</h2>
            <p className="text-bone/60 max-w-xs leading-relaxed text-sm">
              Karachi&apos;s premier curated marketplace. Considered objects, honest prices, delivered with care.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="size-10 border border-bone/15 grid place-items-center hover:bg-bone hover:text-coal transition">
                  <Icon className="size-4" strokeWidth={1.4} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="eyebrow text-bone/50 mb-6">Discovery</h4>
            <ul className="space-y-4 font-display italic text-xl lg:text-2xl">
              <li><Link to="/products" className="text-bone/85 hover:text-bone transition">All Items</Link></li>
              <li><Link to="/category/$slug" params={{ slug: "electronics" }} className="text-bone/85 hover:text-bone transition">Electronics</Link></li>
              <li><Link to="/category/$slug" params={{ slug: "fashion" }} className="text-bone/85 hover:text-bone transition">Fashion</Link></li>
              <li><Link to="/category/$slug" params={{ slug: "home-kitchen" }} className="text-bone/85 hover:text-bone transition">Home & Kitchen</Link></li>
              <li><Link to="/category/$slug" params={{ slug: "beauty" }} className="text-bone/85 hover:text-bone transition">Beauty</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-bone/50 mb-6">Service</h4>
            <ul className="space-y-4 font-display italic text-xl lg:text-2xl">
              <li><Link to="/shipping-policy" className="text-bone/85 hover:text-bone transition">Shipping</Link></li>
              <li><Link to="/return-policy" className="text-bone/85 hover:text-bone transition">Returns</Link></li>
              <li><Link to="/account/orders" className="text-bone/85 hover:text-bone transition">Track Order</Link></li>
              <li><Link to="/contact" className="text-bone/85 hover:text-bone transition">Contact</Link></li>
              <li><Link to="/faq" className="text-bone/85 hover:text-bone transition">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-bone/50 mb-6">Company</h4>
            <ul className="space-y-4 font-display italic text-xl lg:text-2xl">
              <li><Link to="/about" className="text-bone/85 hover:text-bone transition">Our Story</Link></li>
              <li><Link to="/blog" className="text-bone/85 hover:text-bone transition">Journal</Link></li>
              <li><Link to="/privacy" className="text-bone/85 hover:text-bone transition">Privacy</Link></li>
              <li><Link to="/terms" className="text-bone/85 hover:text-bone transition">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="py-16 lg:py-24 text-center">
          <p className="eyebrow text-bone/40 mb-6">Made with care in</p>
          <p className="font-display italic text-[18vw] lg:text-[14rem] leading-[0.85] tracking-tight">
            Karachi.
          </p>
        </div>

        <div className="pt-10 border-t border-bone/10 flex flex-col sm:flex-row gap-4 justify-between items-center eyebrow text-bone/40">
          <span>© 2026 Kifayat Co. — All rights reserved</span>
          <a href="#top" className="inline-flex items-center gap-2 hover:text-bone transition">
            Back to top <ArrowUpRight className="size-3" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
