import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { MapPin, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { listAddresses, upsertAddress, deleteAddress, setDefaultAddress } from "@/lib/account.functions";

export const Route = createFileRoute("/account/addresses")({
  head: () => ({ meta: [{ title: "Addresses — Kifayat" }] }),
  component: Addresses,
});

const PROVINCES = ["Sindh", "Punjab", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad Capital Territory", "Gilgit-Baltistan", "Azad Kashmir"];

type AddrForm = {
  id?: string;
  label: string;
  full_name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  province: string;
  postal_code: string;
  is_default: boolean;
};

const EMPTY: AddrForm = {
  label: "Home", full_name: "", phone: "", line1: "", line2: "",
  city: "", province: "Sindh", postal_code: "", is_default: false,
};

function Addresses() {
  const listFn = useServerFn(listAddresses);
  const saveFn = useServerFn(upsertAddress);
  const delFn = useServerFn(deleteAddress);
  const defFn = useServerFn(setDefaultAddress);
  const qc = useQueryClient();
  const { data: addresses = [], isLoading } = useQuery({ queryKey: ["addresses"], queryFn: () => listFn() });
  const [editing, setEditing] = useState<AddrForm | null>(null);

  async function save() {
    if (!editing) return;
    try {
      await saveFn({
        data: {
          id: editing.id,
          label: editing.label,
          full_name: editing.full_name,
          phone: editing.phone,
          line1: editing.line1,
          line2: editing.line2 || null,
          city: editing.city,
          province: editing.province,
          postal_code: editing.postal_code || null,
          is_default: editing.is_default,
        },
      });
      toast.success("Address saved.");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["addresses"] });
    } catch (e: any) { toast.error(e?.message ?? "Failed."); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this address?")) return;
    try { await delFn({ data: { id } }); toast.success("Removed."); qc.invalidateQueries({ queryKey: ["addresses"] }); }
    catch (e: any) { toast.error(e?.message ?? "Failed."); }
  }
  async function makeDefault(id: string) {
    try { await defFn({ data: { id } }); toast.success("Set as default."); qc.invalidateQueries({ queryKey: ["addresses"] }); }
    catch (e: any) { toast.error(e?.message ?? "Failed."); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow text-muted-foreground">§ Where it goes</p>
          <h2 className="font-display italic text-3xl lg:text-4xl mt-1">Address book<span className="text-brass">.</span></h2>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="inline-flex items-center gap-2 bg-coal text-bone eyebrow px-5 py-3 hover:bg-brass hover:text-coal transition"
        >
          <Plus className="size-4" /> Add address
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : addresses.length === 0 ? (
        <div className="border border-dashed border-coal/15 p-12 text-center">
          <p className="text-muted-foreground">No addresses saved yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((a: any) => (
            <div key={a.id} className="border border-coal/15 p-5 bg-paper">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-brass" strokeWidth={1.4} />
                  <span className="font-display italic text-lg">{a.label}</span>
                  {a.is_default && <span className="eyebrow text-[10px] px-2 py-0.5 bg-coal text-bone">Default</span>}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setEditing({ ...EMPTY, ...a, line2: a.line2 ?? "", postal_code: a.postal_code ?? "" })}
                    className="p-1.5 hover:text-brass transition" aria-label="Edit"><Pencil className="size-4" strokeWidth={1.4} /></button>
                  <button onClick={() => remove(a.id)} className="p-1.5 hover:text-destructive transition" aria-label="Delete">
                    <Trash2 className="size-4" strokeWidth={1.4} />
                  </button>
                </div>
              </div>
              <div className="text-sm space-y-1">
                <div className="font-medium">{a.full_name}</div>
                <div className="text-muted-foreground">{a.line1}{a.line2 ? `, ${a.line2}` : ""}</div>
                <div className="text-muted-foreground">{a.city}, {a.province} {a.postal_code ?? ""}</div>
                <div className="text-muted-foreground">{a.phone}</div>
              </div>
              {!a.is_default && (
                <button onClick={() => makeDefault(a.id)} className="mt-3 eyebrow text-xs text-coal/60 hover:text-brass transition">
                  Set as default →
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-coal/40 backdrop-blur-sm z-50 grid place-items-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-bone border border-coal/15 p-6 lg:p-8 max-w-lg w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display italic text-2xl">{editing.id ? "Edit address" : "Add address"}</h3>
              <button onClick={() => setEditing(null)} className="p-1"><X className="size-5" /></button>
            </div>
            <div className="space-y-3">
              <Row label="Label">
                <input value={editing.label} onChange={(e) => setEditing({ ...editing, label: e.target.value })}
                  className="w-full h-11 px-3 bg-paper border border-coal/15 text-sm outline-none focus:border-coal" />
              </Row>
              <Row label="Full name">
                <input value={editing.full_name} onChange={(e) => setEditing({ ...editing, full_name: e.target.value })}
                  className="w-full h-11 px-3 bg-paper border border-coal/15 text-sm outline-none focus:border-coal" />
              </Row>
              <Row label="Phone">
                <input value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                  className="w-full h-11 px-3 bg-paper border border-coal/15 text-sm outline-none focus:border-coal" />
              </Row>
              <Row label="Street address">
                <input value={editing.line1} onChange={(e) => setEditing({ ...editing, line1: e.target.value })}
                  className="w-full h-11 px-3 bg-paper border border-coal/15 text-sm outline-none focus:border-coal" />
              </Row>
              <Row label="Area / Apartment">
                <input value={editing.line2} onChange={(e) => setEditing({ ...editing, line2: e.target.value })}
                  className="w-full h-11 px-3 bg-paper border border-coal/15 text-sm outline-none focus:border-coal" />
              </Row>
              <div className="grid grid-cols-2 gap-3">
                <Row label="City">
                  <input value={editing.city} onChange={(e) => setEditing({ ...editing, city: e.target.value })}
                    className="w-full h-11 px-3 bg-paper border border-coal/15 text-sm outline-none focus:border-coal" />
                </Row>
                <Row label="Province">
                  <select value={editing.province} onChange={(e) => setEditing({ ...editing, province: e.target.value })}
                    className="w-full h-11 px-3 bg-paper border border-coal/15 text-sm outline-none focus:border-coal">
                    {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </Row>
              </div>
              <Row label="Postal code">
                <input value={editing.postal_code} onChange={(e) => setEditing({ ...editing, postal_code: e.target.value })}
                  className="w-full h-11 px-3 bg-paper border border-coal/15 text-sm outline-none focus:border-coal" />
              </Row>
              <label className="flex items-center gap-2 text-sm pt-2">
                <input type="checkbox" checked={editing.is_default} onChange={(e) => setEditing({ ...editing, is_default: e.target.checked })} className="accent-brass" />
                Set as default
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setEditing(null)} className="px-5 py-2.5 eyebrow border border-coal/15 hover:bg-paper transition">Cancel</button>
              <button onClick={save} className="px-5 py-2.5 eyebrow bg-coal text-bone hover:bg-brass hover:text-coal transition flex items-center gap-2">
                <Check className="size-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground mb-1 block text-[10px]">{label}</span>
      {children}
    </label>
  );
}
