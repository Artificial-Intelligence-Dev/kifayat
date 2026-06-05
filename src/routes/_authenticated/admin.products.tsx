import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminListProducts, adminUpsertProduct, adminDeleteProduct } from "@/lib/admin.functions";
import { listCategories } from "@/lib/shop.functions";
import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: AdminProducts,
});

type FormState = {
  id?: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  old_price: number | "";
  image_url: string;
  badge: string;
  stock: number;
  featured: boolean;
  category_id: string | null;
};

const blank: FormState = {
  slug: "",
  name: "",
  brand: "",
  description: "",
  price: 0,
  old_price: "",
  image_url: "",
  badge: "",
  stock: 0,
  featured: false,
  category_id: null,
};

function AdminProducts() {
  const list = useServerFn(adminListProducts);
  const upsert = useServerFn(adminUpsertProduct);
  const del = useServerFn(adminDeleteProduct);
  const cats = useServerFn(listCategories);
  const qc = useQueryClient();
  const { data: products, isLoading } = useQuery({ queryKey: ["admin", "products"], queryFn: () => list() });
  const { data: categories } = useQuery({ queryKey: ["categories"], queryFn: () => cats() });
  const [editing, setEditing] = useState<FormState | null>(null);

  const save = useMutation({
    mutationFn: (v: FormState) =>
      upsert({
        data: {
          id: v.id,
          slug: v.slug,
          name: v.name,
          brand: v.brand || null,
          description: v.description || null,
          price: Number(v.price),
          old_price: v.old_price === "" ? null : Number(v.old_price),
          image_url: v.image_url || null,
          badge: v.badge || null,
          stock: Number(v.stock),
          featured: v.featured,
          category_id: v.category_id,
        },
      }),
    onSuccess: () => {
      toast.success("Saved.");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Save failed."),
  });

  const remove = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Deleted.");
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Delete failed."),
  });

  if (isLoading) return <p className="eyebrow text-muted-foreground">Loading…</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <p className="eyebrow text-muted-foreground">{products?.length ?? 0} objects</p>
        <button onClick={() => setEditing({ ...blank })} className="inline-flex items-center gap-2 bg-coal text-bone eyebrow px-5 py-3 hover:bg-brass hover:text-coal transition">
          <Plus className="size-4" strokeWidth={1.5} /> New product
        </button>
      </div>

      <div className="border border-coal/10">
        <div className="grid grid-cols-[60px_2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 eyebrow text-muted-foreground border-b border-coal/10 bg-paper">
          <span></span><span>Name</span><span>Brand</span><span>Price</span><span>Stock</span><span></span>
        </div>
        <ul className="divide-y divide-coal/10">
          {(products ?? []).map((p: any) => (
            <li key={p.id} className="grid grid-cols-[60px_2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 items-center text-sm">
              <div className="size-12 bg-paper overflow-hidden">
                {p.image_url && <img src={p.image_url} alt="" className="size-full object-cover" />}
              </div>
              <div>
                <p className="font-display italic text-lg leading-tight">{p.name}</p>
                <p className="eyebrow text-muted-foreground mt-0.5">{p.slug} · {p.categories?.name ?? "—"}</p>
              </div>
              <span>{p.brand ?? "—"}</span>
              <span className="font-mono">Rs {Number(p.price).toLocaleString()}</span>
              <span>{p.stock}</span>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setEditing({
                  id: p.id, slug: p.slug, name: p.name,
                  brand: p.brand ?? "", description: "",
                  price: Number(p.price), old_price: p.old_price ?? "",
                  image_url: p.image_url ?? "", badge: p.badge ?? "",
                  stock: p.stock, featured: p.featured,
                  category_id: p.category_id,
                })} className="p-2 hover:text-brass transition" title="Edit">
                  <Pencil className="size-4" strokeWidth={1.5} />
                </button>
                <button onClick={() => confirm(`Delete "${p.name}"?`) && remove.mutate(p.id)} className="p-2 hover:text-red-600 transition" title="Delete">
                  <Trash2 className="size-4" strokeWidth={1.5} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-coal/60 backdrop-blur-sm flex items-center justify-center p-5" onClick={() => setEditing(null)}>
          <div className="bg-bone w-full max-w-2xl p-8 lg:p-10 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="eyebrow text-muted-foreground mb-2">§ {editing.id ? "Edit" : "New"} product</p>
                <h2 className="font-display italic text-4xl">{editing.name || "Untitled"}<span className="text-brass">.</span></h2>
              </div>
              <button onClick={() => setEditing(null)}><X className="size-5" strokeWidth={1.5} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); save.mutate(editing); }} className="grid grid-cols-2 gap-5">
              <Field label="Name *" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} required colSpan={2} />
              <Field label="Slug *" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v.toLowerCase().replace(/[^a-z0-9-]+/g, "-") })} required />
              <Field label="Brand" value={editing.brand} onChange={(v) => setEditing({ ...editing, brand: v })} />
              <Field label="Price (Rs) *" type="number" value={String(editing.price)} onChange={(v) => setEditing({ ...editing, price: Number(v) })} required />
              <Field label="Old price" type="number" value={String(editing.old_price)} onChange={(v) => setEditing({ ...editing, old_price: v === "" ? "" : Number(v) })} />
              <Field label="Stock" type="number" value={String(editing.stock)} onChange={(v) => setEditing({ ...editing, stock: Number(v) })} />
              <Field label="Badge" value={editing.badge} onChange={(v) => setEditing({ ...editing, badge: v })} />
              <Field label="Image URL" value={editing.image_url} onChange={(v) => setEditing({ ...editing, image_url: v })} colSpan={2} placeholder="/p-headphones.jpg or https://…" />
              <label className="col-span-2 block">
                <span className="eyebrow text-muted-foreground mb-2 block">Category</span>
                <select value={editing.category_id ?? ""} onChange={(e) => setEditing({ ...editing, category_id: e.target.value || null })} className="w-full h-12 px-4 bg-paper border border-coal/15 outline-none focus:border-coal text-sm">
                  <option value="">— none —</option>
                  {(categories ?? []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </label>
              <label className="col-span-2 block">
                <span className="eyebrow text-muted-foreground mb-2 block">Description</span>
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={4} className="w-full p-4 bg-paper border border-coal/15 outline-none focus:border-coal text-sm resize-none" />
              </label>
              <label className="col-span-2 flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="size-4 accent-coal" />
                <span className="eyebrow text-muted-foreground">Featured on homepage</span>
              </label>
              <div className="col-span-2 flex gap-3 justify-end pt-4 border-t border-coal/10">
                <button type="button" onClick={() => setEditing(null)} className="eyebrow px-5 py-3 border border-coal/15 hover:border-coal transition">Cancel</button>
                <button type="submit" disabled={save.isPending} className="bg-coal text-bone eyebrow px-7 py-3 hover:bg-brass hover:text-coal transition disabled:opacity-60">{save.isPending ? "Saving…" : "Save object"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, colSpan = 1, ...rest }: { label: string; value: string; onChange: (v: string) => void; colSpan?: 1 | 2 } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <label className={colSpan === 2 ? "col-span-2 block" : "block"}>
      <span className="eyebrow text-muted-foreground mb-2 block">{label}</span>
      <input {...rest} value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-12 px-4 bg-paper border border-coal/15 outline-none focus:border-coal text-sm transition" />
    </label>
  );
}
