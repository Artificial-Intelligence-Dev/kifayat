import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, User } from "lucide-react";
import { uiStore } from "@/lib/ui-store";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="bg-coal text-bone">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 h-9 flex items-center justify-between eyebrow">
          <span className="hidden sm:inline opacity-80">Pakistan-wide dispatch · Free over Rs 2,500</span>
          <span className="sm:hidden opacity-80">Free over Rs 2,500</span>
          <div className="flex items-center gap-5 opacity-80">
            <Link to="/account/orders" className="hover:opacity-100 transition link-draw">Track</Link>
            <span className="hidden sm:inline">EN · PKR</span>
            <Link to="/contact" className="hover:opacity-100 transition link-draw">Help</Link>
          </div>
        </div>
      </div>

      {/* Main nav — centered logo, drawer trigger left */}
      <div className="bg-bone/85 backdrop-blur-xl border-b border-coal/8">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 h-16 lg:h-20 grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => uiStore.toggleDrawer()}
              className="group flex items-center gap-3 -ml-1 p-1 eyebrow text-coal/70 hover:text-coal transition"
              aria-label="Open menu"
            >
              <Menu className="size-5" strokeWidth={1.2} />
              <span className="hidden sm:inline link-draw">Index</span>
            </button>
          </div>

          <Link to="/" className="font-display italic text-3xl lg:text-4xl tracking-tight leading-none text-center">
            Kifayat<span className="text-brass">.</span>
          </Link>

          <div className="flex items-center justify-end gap-5 lg:gap-6">
            <button aria-label="Search" className="p-1 hover:text-brass transition">
              <Search className="size-5" strokeWidth={1.2} />
            </button>
            <Link to="/account" aria-label="Account" className="hidden sm:block p-1 hover:text-brass transition">
              <User className="size-5" strokeWidth={1.2} />
            </Link>
            <Link to="/cart" aria-label="Cart" data-cart-icon className="group p-1 relative hover:text-brass transition">
              <ShoppingBag className="size-5" strokeWidth={1.2} />
              <span className="absolute -top-1 -right-1.5 size-4 rounded-full bg-brass text-coal text-[9px] font-semibold grid place-items-center">3</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
