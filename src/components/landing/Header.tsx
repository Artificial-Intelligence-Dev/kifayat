import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, Heart, User, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/shop-data";

export function Header() {
  const [, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      <div className="bg-primary-dark text-primary-foreground text-xs">
        <div className="max-w-7xl mx-auto px-4 h-8 flex items-center justify-between">
          <span>Free delivery on orders above Rs 2,500 in Karachi</span>
          <div className="hidden sm:flex gap-4 opacity-90">
            <Link to="/account/orders" className="hover:opacity-100">Track Order</Link>
            <Link to="/faq" className="hover:opacity-100">Help</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        <button className="md:hidden p-2 -ml-2" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          <Menu className="size-5" />
        </button>

        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground font-display font-bold">K</div>
          <span className="font-display font-bold text-xl tracking-tight">Kifayat</span>
        </Link>

        <form action="/search" className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input name="q" type="search" placeholder="Search products, brands, categories…"
              className="w-full h-10 pl-10 pr-4 rounded-pill bg-secondary border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition" />
          </div>
        </form>

        <nav className="ml-auto flex items-center gap-1 text-foreground">
          <Link to="/account" className="hidden sm:flex items-center gap-2 px-3 h-10 rounded-md hover:bg-secondary text-sm">
            <User className="size-4" /> <span className="hidden lg:inline">Account</span>
          </Link>
          <Link to="/account/wishlist" className="p-2.5 rounded-md hover:bg-secondary relative" aria-label="Wishlist">
            <Heart className="size-5" />
          </Link>
          <Link to="/cart" className="p-2.5 rounded-md hover:bg-secondary relative" aria-label="Cart">
            <ShoppingCart className="size-5" />
            <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold grid place-items-center">3</span>
          </Link>
        </nav>
      </div>

      <div className="hidden md:block border-t border-border">
        <div className="max-w-7xl mx-auto px-4 h-11 flex items-center gap-1 text-sm">
          <Link to="/products" className="flex items-center gap-1.5 px-3 h-9 rounded-md bg-primary-soft text-primary-dark font-medium">
            <Menu className="size-4" /> All Categories <ChevronDown className="size-3.5" />
          </Link>
          {categories.slice(0, 6).map((c) => (
            <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }}
              className="px-3 h-9 grid place-items-center rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition">
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <form action="/search" className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input name="q" type="search" placeholder="Search Kifayat…"
            className="w-full h-10 pl-10 pr-4 rounded-pill bg-secondary outline-none text-sm" />
        </div>
      </form>
    </header>
  );
}
