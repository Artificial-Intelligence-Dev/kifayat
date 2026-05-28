import { Facebook, Instagram, Twitter } from "lucide-react";

const cols = [
  { title: "Shop", links: ["Electronics", "Fashion", "Home & Kitchen", "Beauty", "Sports"] },
  { title: "Support", links: ["Help Center", "Track Order", "Returns & Refunds", "Shipping Policy", "Contact Us"] },
  { title: "Company", links: ["About Us", "Blog", "Careers", "Privacy Policy", "Terms & Conditions"] },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background/85">
      <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground font-display font-bold">K</div>
            <span className="font-display font-bold text-xl text-background">Kifayat</span>
          </div>
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
                <li key={l}><a href="#" className="hover:text-primary transition">{l}</a></li>
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
