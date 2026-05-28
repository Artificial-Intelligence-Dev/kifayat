import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, LayoutGrid, Heart, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/products", label: "Shop", icon: LayoutGrid },
  { to: "/account/wishlist", label: "Wishlist", icon: Heart },
  { to: "/account", label: "Account", icon: User },
] as const;

export function MobileNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border h-16 grid grid-cols-5">
      {items.map(({ to, label, icon: Icon }) => {
        const active = to === "/" ? path === "/" : path.startsWith(to);
        return (
          <Link key={to} to={to} className="flex flex-col items-center justify-center gap-1 text-[10px] font-medium">
            <Icon className={`size-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
            <span className={active ? "text-primary" : "text-muted-foreground"}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
