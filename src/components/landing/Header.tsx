import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, User, LogOut, ShieldCheck, X, Star } from "lucide-react";
import { uiStore } from "@/lib/ui-store";
import { useAuth, signOut } from "@/lib/auth-store";
import { useCart, cartTotals } from "@/lib/cart-store";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { searchSuggest } from "@/lib/search.functions";

export function Header() {
  const { user } = useAuth();
  const items = useCart();
  const { count } = cartTotals(items);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="p-1 hover:text-brass transition">
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
                      <Link to="/account/wishlist" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-paper transition">Wishlist</Link>
                      <Link to="/account/addresses" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-paper transition">Addresses</Link>
                      <Link to="/account" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-paper transition">Account</Link>
                      <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-paper transition">
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

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </header>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const fn = useServerFn(searchSuggest);
  const { data } = useQuery({
    queryKey: ["suggest", q],
    queryFn: () => fn({ data: { q } }),
    enabled: q.length > 0,
  });

  useEffect(() => {
    function key(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [onClose]);

  function go(term: string) {
    navigate({ to: "/search", search: { q: term } as any });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] bg-coal/60 backdrop-blur-md" onClick={onClose}>
      <div className="bg-bone border-b border-coal/10" onClick={(e) => e.stopPropagation()}>
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10 pt-8 pb-6">
          <div className="flex items-center justify-between mb-6">
            <p className="eyebrow text-coal/60">§ Search the index</p>
            <button onClick={onClose} className="p-1 hover:text-brass transition"><X className="size-5" /></button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) go(q.trim()); }} className="relative">
            <Search className="size-5 absolute left-5 top-1/2 -translate-y-1/2 text-coal/40" strokeWidth={1.4} />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full h-14 pl-14 pr-5 bg-paper border border-coal/15 outline-none focus:border-coal text-base"
            />
          </form>

          {q.length > 0 && (data?.queries.length || data?.products.length) ? (
            <div className="mt-5 grid lg:grid-cols-2 gap-6">
              {data.queries.length > 0 && (
                <div>
                  <p className="eyebrow text-coal/40 mb-3">Popular searches</p>
                  <ul className="space-y-1">
                    {data.queries.map((s) => (
                      <li key={s}>
                        <button onClick={() => go(s)} className="w-full text-left py-2 px-3 hover:bg-paper transition flex items-center gap-2 text-sm">
                          <Search className="size-3.5 text-coal/40" strokeWidth={1.4} />
                          {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {data.products.length > 0 && (
                <div>
                  <p className="eyebrow text-coal/40 mb-3">Products</p>
                  <ul className="space-y-1">
                    {data.products.map((p: any) => (
                      <li key={p.slug}>
                        <Link
                          to="/products/$productId"
                          params={{ productId: p.slug }}
                          onClick={onClose}
                          className="flex items-center gap-3 py-2 px-3 hover:bg-paper transition"
                        >
                          {p.image_url ? (
                            <img src={p.image_url} alt="" className="size-10 object-cover bg-paper" />
                          ) : (
                            <div className="size-10 bg-paper" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate">{p.name}</p>
                            <p className="eyebrow text-coal/40 text-[10px]">{p.brand} · Rs {Number(p.price).toLocaleString()}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : q.length > 0 ? (
            <p className="mt-5 text-sm text-coal/50">No suggestions — press Enter to search anyway.</p>
          ) : (
            <p className="mt-5 text-sm text-coal/50 flex items-center gap-2"><Star className="size-3.5 text-brass" strokeWidth={1.4} /> Start typing to see suggestions.</p>
          )}
        </div>
      </div>
    </div>
  );
}
