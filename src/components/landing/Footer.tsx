import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";

type LinkRef = { label: string; to: string };
const cols: { title: string; links: LinkRef[] }[] = [
  { title: "Shop", links: [
    { label: "All products", to: "/products" },
    { label: "Electronics", to: "/category/electronics" },
    { label: "Fashion", to: "/category/fashion" },
    { label: "Home & Kitchen", to: "/category/home-kitchen" },
    { label: "Beauty", to: "/category/beauty" },
  ] },
  { title: "Support", links: [
    { label: "Help Center", to: "/faq" },
    { label: "Track Order", to: "/account/orders" },
    { label: "Returns & Refunds", to: "/return-policy" },
    { label: "Shipping Policy", to: "/shipping-policy" },
    { label: "Contact Us", to: "/contact" },
  ] },
  { title: "Company", links: [
    { label: "About Us", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms & Conditions", to: "/terms" },
  ] },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background/85">
      <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground font-display font-bold">K</div>
            <span className="font-display font-bold text-xl text-background">Kifayat</span>
          </Link>
          <p className="text-sm max-w-sm opacity-80">
            Karachi's honest online shop — curated products, fair prices, fast delivery and easy returns.
          </p>
          <div className="flex gap-3 pt-2">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="size-9 rounded-full bg-background/10 hover:bg-primary grid place-items-center transition" aria-label="social">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="font-display font-semibold text-background mb-4">{c.title}</h4>
            <ul className="space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.label}><Link to={l.to as never} className="hover:text-primary transition">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-75">
          <span>© {new Date().getFullYear()} Kifayat.co — All rights reserved.</span>
          <span>Made with care in Karachi 🇵🇰</span>
        </div>
      </div>
    </footer>
  );
}
