import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listWishlist, toggleWishlist } from "@/lib/account.functions";
import { Heart, Trash2, ArrowUpRight, Star } from "lucide-react";
import { toast } from "sonner";
import { cart } from "@/lib/cart-store";

export const Route = createFileRoute("/account/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Kifayat" }] }),
  component: Wishlist,
});

function Wishlist() {
  const fn = useServerFn(listWishlist);
  const toggleFn = useServerFn(toggleWishlist);
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery({ queryKey: ["wishlist"], queryFn: () => fn() });

  async function remove(product_id: string) {
    try { await toggleFn({ data: { product_id } }); qc.invalidateQueries({ queryKey: ["wishlist"] }); toast.success("Removed from wishlist."); }
    catch (e: any) { toast.error(e?.message ?? "Failed."); }
  }

  function addToBag(p: any) {
    cart.add({
      product_id: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      price: Number(p.price),
      image: p.image_url || "",
    });
    toast.success(`Added to bag.`);
  }

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  if (data.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-coal/15">
        <Heart className="size-8 mx-auto text-coal/30 mb-4" strokeWidth={1.2} />
        <p className="text-muted-foreground mb-6">Your wishlist is empty.</p>
        <Link to="/products" className="inline-flex items-center gap-2 bg-coal text-bone eyebrow px-6 py-3 hover:bg-brass hover:text-coal transition">
          Discover the edit <ArrowUpRight className="size-4" strokeWidth={1.5} />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow text-muted-foreground">§ Saved for later</p>
        <h2 className="font-display italic text-3xl lg:text-4xl mt-1">Wishlist<span className="text-brass">.</span></h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {data.map((w: any) => w.product && (
          <div key={w.wishlist_id} className="group">
            <Link to="/products/$productId" params={{ productId: w.product.slug }} className="block">
              <div className="aspect-[4/5] bg-paper overflow-hidden mb-3 relative">
                {w.product.image_url ? (
                  <img src={w.product.image_url} alt={w.product.name} className="size-full object-cover transition duration-700 group-hover:scale-105" />
                ) : (
                  <div className="size-full grid place-items-center text-coal/30 text-xs">No image</div>
                )}
              </div>
              <p className="eyebrow text-coal/40 text-[10px]">{w.product.brand}</p>
              <h3 className="font-display text-lg leading-tight mt-1">{w.product.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="font-medium text-sm">Rs {Number(w.product.price).toLocaleString()}</span>
                {w.product.review_count > 0 && (
                  <span className="flex items-center gap-1 text-xs text-coal/60">
                    <Star className="size-3 fill-brass text-brass" strokeWidth={1.2} />
                    {Number(w.product.avg_rating).toFixed(1)}
                  </span>
                )}
              </div>
            </Link>
            <div className="mt-3 flex gap-2">
              <button onClick={() => addToBag(w.product)} className="flex-1 eyebrow text-xs bg-coal text-bone py-2.5 hover:bg-brass hover:text-coal transition">
                Add to bag
              </button>
              <button onClick={() => remove(w.product.id)} className="size-10 border border-coal/15 grid place-items-center hover:bg-paper transition" aria-label="Remove">
                <Trash2 className="size-4 text-coal/60" strokeWidth={1.4} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
