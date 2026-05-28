import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/shop-data";
import { Star } from "lucide-react";

export const Route = createFileRoute("/account/reviews")({
  head: () => ({ meta: [{ title: "My reviews — Kifayat" }] }),
  component: Reviews,
});

const myReviews = products.slice(0, 3).map((p, i) => ({
  product: p,
  rating: 5 - (i % 2),
  text: ["Exactly as described, fast delivery!", "Great quality for the price.", "Works well, would recommend."][i],
  date: ["May 15, 2026", "May 03, 2026", "Apr 18, 2026"][i],
}));

function Reviews() {
  return (
    <div className="space-y-4">
      {myReviews.map((r) => (
        <div key={r.product.id} className="bg-card border border-border rounded-2xl p-5 flex gap-4">
          <div className="size-16 rounded-xl bg-secondary overflow-hidden shrink-0"><img src={r.product.image} alt={r.product.name} className="size-full object-cover" /></div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm">{r.product.name}</div>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`size-3.5 ${i < r.rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
              ))}
              <span className="text-xs text-muted-foreground ml-2">{r.date}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{r.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
