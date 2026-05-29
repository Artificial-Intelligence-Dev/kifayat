import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, ArrowUpRight } from "lucide-react";

const shop = [
  { label: "All Items", to: "/products" as const },
  { label: "Electronics", to: "/category/$slug" as const, params: { slug: "electronics" } },
  { label: "Fashion", to: "/category/$slug" as const, params: { slug: "fashion" } },
  { label: "Home & Kitchen", to: "/category/$slug" as const, params: { slug: "home-kitchen" } },
  { label: "Beauty", to: "/category/$slug" as const, params: { slug: "beauty" } },
];

const service = [
  { label: "Shipping", to: "/shipping-policy" as const },
  { label: "Returns", to: "/return-policy" as const },
  { label: "Track Order", to: "/account/orders" as const },
  { label: "Contact", to: "/contact" as const },
  { label: "FAQ", to: "/faq" as const },
];

const company = [
  { label: "Our Story", to: "/about" as const },
  { label: "Journal", to: "/blog" as const },
  { label: "Privacy", to: "/privacy" as const },
  { label: "Terms", to: "/terms" as const },
];

export function Footer() {
  return (
    <footer className="bg-coal text-bone">
      {/* Big wordmark */}
      <div className="px-5 lg:px-10 pt-20 lg:pt-32 pb-16 max-w-[1600px] mx-auto">
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

          {[
            { title: "Discovery", items: shop },
            { title: "Service", items: service },
            { title: "Company", items: company },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow text-bone/50 mb-6">{col.title}</h4>
              <ul className="space-y-4">
                {col.items.map((it) => (
                  <li key={it.label}>
                    {/* @ts-expect-error mixed link params */}
                    <Link to={it.to} params={it.params}
                      className="text-bone/85 hover:text-bone font-display italic text-xl lg:text-2xl transition">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mega type */}
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
