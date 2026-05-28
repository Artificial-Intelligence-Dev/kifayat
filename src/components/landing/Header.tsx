import { Search, ShoppingCart, Heart, User, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";

const categories = [
  "Electronics", "Fashion", "Home & Kitchen", "Beauty", "Sports", "Toys", "Baby"
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      {/* Top utility bar */}
      <div className="bg-primary-dark text-primary-foreground text-xs">
        <div className="max-w-7xl mx-auto px-4 h-8 flex items-center justify-between">
          <span>Free delivery on orders above Rs 2,500 in Karachi</span>
          <div className="hidden sm:flex gap-4 opacity-90">
            <a href="#" className="hover:opacity-100">Track Order</a>
            <a href="#" className="hover:opacity-100">Help</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        <button className="md:hidden p-2 -ml-2" aria-label="Menu" onClick={() => setOpen(!open)}>
          <Menu className="size-5" />
        </button>

        <a href="/" className="flex items-center gap-2">
          <div className="size-9 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground font-display font-bold">K</div>
          <span className="font-display font-bold text-xl tracking-tight">Kifayat</span>
        </a>

        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products, brands, categories…"
              className="w-full h-10 pl-10 pr-4 rounded-pill bg-secondary border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
            />
          </div>
        </div>

        <nav className="ml-auto flex items-center gap-1 text-foreground">
          <button className="hidden sm:flex items-center gap-2 px-3 h-10 rounded-md hover:bg-secondary text-sm">
            <User className="size-4" /> <span className="hidden lg:inline">Account</span>
          </button>
          <button className="p-2.5 rounded-md hover:bg-secondary relative" aria-label="Wishlist">
            <Heart className="size-5" />
          </button>
          <button className="p-2.5 rounded-md hover:bg-secondary relative" aria-label="Cart">
            <ShoppingCart className="size-5" />
            <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold grid place-items-center">3</span>
          </button>
        </nav>
      </div>

      {/* Categories nav */}
      <div className="hidden md:block border-t border-border">
        <div className="max-w-7xl mx-auto px-4 h-11 flex items-center gap-1 text-sm">
          <button className="flex items-center gap-1.5 px-3 h-9 rounded-md bg-primary-soft text-primary-dark font-medium">
            <Menu className="size-4" /> All Categories <ChevronDown className="size-3.5" />
          </button>
          {categories.map((c) => (
            <a key={c} href="#" className="px-3 h-9 grid place-items-center rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition">{c}</a>
          ))}
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="search" placeholder="Search Kifayat…" className="w-full h-10 pl-10 pr-4 rounded-pill bg-secondary outline-none text-sm" />
        </div>
      </div>
    </header>
  );
}
