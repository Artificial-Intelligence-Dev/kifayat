import { useEffect, useState } from "react";

export type CartItem = {
  product_id: string | null;
  slug: string;
  name: string;
  brand: string | null;
  price: number;
  image: string;
  qty: number;
};

const KEY = "kifayat.cart.v1";
type Listener = (items: CartItem[]) => void;
const listeners = new Set<Listener>();
let items: CartItem[] = [];
let hydrated = false;

function load() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) items = JSON.parse(raw);
  } catch {
    /* ignore */
  }
}
function persist() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l(items));
}

export const cart = {
  get items() {
    load();
    return items;
  },
  add(item: Omit<CartItem, "qty"> & { qty?: number }) {
    load();
    const qty = item.qty ?? 1;
    const existing = items.find((i) => i.slug === item.slug);
    if (existing) existing.qty = Math.min(99, existing.qty + qty);
    else items = [...items, { ...item, qty }];
    persist();
  },
  updateQty(slug: string, qty: number) {
    load();
    items = items.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i));
    persist();
  },
  remove(slug: string) {
    load();
    items = items.filter((i) => i.slug !== slug);
    persist();
  },
  clear() {
    items = [];
    persist();
  },
};

export function useCart() {
  const [s, setS] = useState<CartItem[]>(() => {
    load();
    return items;
  });
  useEffect(() => {
    load();
    setS(items);
    const l: Listener = (next) => setS(next);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return s;
}

export function cartTotals(arr: CartItem[]) {
  const subtotal = arr.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = arr.length === 0 ? 0 : subtotal >= 2500 ? 0 : 200;
  const total = subtotal + shipping;
  const count = arr.reduce((s, i) => s + i.qty, 0);
  return { subtotal, shipping, total, count };
}
