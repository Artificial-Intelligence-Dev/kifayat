import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, User, LogOut, ShieldCheck } from "lucide-react";
import { uiStore } from "@/lib/ui-store";
import { useAuth, signOut } from "@/lib/auth-store";
import { useCart, cartTotals } from "@/lib/cart-store";
import { useEffect, useRef, useState } from "react";

export function Header() {
  const { user } = useAuth();
  const items = useCart();
  const { count } = cartTotals(items);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function click(e: MouseEvent) {
      if (open && ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("mousedown", click);
    return () => window.removeEventListener("mousedown", click);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
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

            <div ref={ref} className="relative">
              <button onClick={() => setOpen((o) => !o)} aria-label="Account" className="p-1 hover:text-brass transition">
                <User className="size-5" strokeWidth={1.2} />
              </button>
              {open && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-bone border border-coal/15 shadow-lg z-50 py-2">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-coal/10">
                        <p className="eyebrow text-muted-foreground">Signed in as</p>
                        <p className="font-display italic text-base truncate mt-0.5">{user.email}</p>
                      </div>
                      <Link to="/account/orders" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-paper transition">My orders</Link>
                      <Link to="/account" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-paper transition">Account</Link>
                      <Link to="/admin/orders" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-paper transition">
                        <ShieldCheck className="size-4" strokeWidth={1.4} /> Admin
                      </Link>
                      <button
                        onClick={async () => { setOpen(false); await signOut(); navigate({ to: "/" }); }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-paper transition border-t border-coal/10 mt-1"
                      >
                        <LogOut className="size-4" strokeWidth={1.4} /> Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-paper transition">Sign in</Link>
                      <Link to="/auth" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-paper transition">Create account</Link>
                      <div className="border-t border-coal/10 mt-1 pt-1">
                        <Link to="/account/orders" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-paper transition">Track an order</Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link to="/cart" aria-label="Cart" data-cart-icon className="group p-1 relative hover:text-brass transition">
              <ShoppingBag className="size-5" strokeWidth={1.2} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1.5 size-4 rounded-full bg-brass text-coal text-[9px] font-semibold grid place-items-center">{count}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
