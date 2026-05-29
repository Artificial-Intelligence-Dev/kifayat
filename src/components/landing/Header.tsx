import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, User } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/shop-data";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="bg-coal text-bone">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 h-9 flex items-center justify-between eyebrow">
          <span className="hidden sm:inline opacity-80">Karachi Delivery · Free over Rs 2,500</span>
          <span className="sm:hidden opacity-80">Free over Rs 2,500</span>
          <div className="flex items-center gap-5 opacity-80">
            <Link to="/account/orders" className="hover:opacity-100 transition">Track</Link>
            <span className="hidden sm:inline">EN · PKR</span>
            <Link to="/contact" className="hover:opacity-100 transition">Help</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-bone/85 backdrop-blur-xl border-b border-coal/8">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 h-16 lg:h-20 grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center gap-6">
            <button onClick={() => setOpen((v) => !v)} className="lg:hidden -ml-1 p-1" aria-label="Menu">
              <Menu className="size-5" strokeWidth={1.2} />
            </button>
            <nav className="hidden lg:flex items-center gap-7 eyebrow text-coal/70">
              {categories.slice(0, 5).map((c) => (
                <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="hover:text-coal transition">
                  {c.name}
                </Link>
              ))}
              <Link to="/blog" className="hover:text-coal transition">Journal</Link>
            </nav>
          </div>

          <Link to="/" className="font-display italic text-3xl lg:text-4xl tracking-tight leading-none">
            Kifayat
          </Link>

          <div className="flex items-center justify-end gap-5 lg:gap-6">
            <button aria-label="Search" className="p-1 hover:opacity-60 transition">
              <Search className="size-5" strokeWidth={1.2} />
            </button>
            <Link to="/account" aria-label="Account" className="hidden sm:block p-1 hover:opacity-60 transition">
              <User className="size-5" strokeWidth={1.2} />
            </Link>
            <Link to="/cart" aria-label="Cart" className="p-1 relative hover:opacity-60 transition">
              <ShoppingBag className="size-5" strokeWidth={1.2} />
              <span className="absolute -top-1 -right-1.5 size-4 rounded-full bg-coal text-bone text-[9px] font-semibold grid place-items-center">3</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-bone border-b border-coal/8 animate-fade-up">
          <div className="px-5 py-6 flex flex-col gap-4">
            {categories.map((c) => (
              <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }}
                onClick={() => setOpen(false)}
                className="font-display italic text-2xl text-coal">
                {c.name}
              </Link>
            ))}
            <Link to="/blog" onClick={() => setOpen(false)} className="font-display italic text-2xl text-coal">Journal</Link>
          </div>
        </div>
      )}
    </header>
  );
}
