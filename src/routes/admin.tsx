import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Eye, EyeOff, Pencil, Plus, Trash2, LogOut, Save, X, Image as ImageIcon, Search,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { formatRupees } from "@/lib/format";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin · Zyra by Anna" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

type Product = {
  id: string;
  name: string;
  category: string;
  price_inr: number;
  description: string;
  materials: string;
  colors: string[];
  image_url: string;
  hidden: boolean;
  inventory: number;
  sort_order: number;
};

const empty: Omit<Product, "id"> = {
  name: "",
  category: "Rings",
  price_inr: 0,
  description: "",
  materials: "",
  colors: [],
  image_url: "",
  hidden: false,
  inventory: 0,
  sort_order: 99,
};

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Product | "new" | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!data.user) {
        navigate({ to: "/auth" });
        return;
      }
      setUserEmail(data.user.email ?? null);
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id);
      setIsAdmin((roles ?? []).some((r) => r.role === "admin"));
    })();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ["products", "admin"],
    enabled: isAdmin === true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Product[];
    },
  });

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
    );
  }, [products, search]);

  async function toggleHidden(p: Product) {
    const { error } = await supabase.from("products").update({ hidden: !p.hidden }).eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success(p.hidden ? "Visible" : "Hidden");
    refetch();
    qc.invalidateQueries({ queryKey: ["products", "public"] });
  }

  async function remove(p: Product) {
    if (!confirm(`Delete "${p.name}"?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    refetch();
    qc.invalidateQueries({ queryKey: ["products", "public"] });
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (isAdmin === null) {
    return (
      <main className="min-h-screen grid place-items-center bg-background text-ink-soft">
        Loading…
      </main>
    );
  }

  if (isAdmin === false) {
    return (
      <main className="min-h-screen grid place-items-center bg-background px-6 text-center">
        <div>
          <h1 className="font-display text-3xl text-ink">Access restricted</h1>
          <p className="mt-3 text-ink-soft">
            Your account ({userEmail}) does not have admin privileges.
          </p>
          <button
            onClick={signOut}
            className="mt-6 rounded-full border border-ink/20 px-6 py-3 text-[11px] uppercase tracking-luxe text-ink hover:border-gold"
          >
            Sign out
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-gold/20 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-display text-xl text-ink">
              Zyra <span className="italic text-gradient-gold">Atelier</span>
            </Link>
            <span className="hidden text-[10px] uppercase tracking-luxe text-ink-soft md:inline">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-[11px] text-ink-soft md:inline">{userEmail}</span>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-[11px] uppercase tracking-luxe text-ink hover:border-gold"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-gold">Catalog</p>
            <h1 className="mt-2 font-display text-4xl text-ink">Manage Products</h1>
            <p className="mt-2 text-ink-soft">
              {products.length} pieces · {products.filter((p) => p.hidden).length} hidden
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-soft" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="w-56 rounded-full border border-ink/15 bg-surface/60 py-2.5 pl-9 pr-4 text-sm text-ink outline-none focus:border-gold"
              />
            </div>
            <button
              onClick={() => setEditing("new")}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-[11px] uppercase tracking-luxe text-ink shadow-glow hover:-translate-y-0.5 transition-transform"
            >
              <Plus className="h-3.5 w-3.5" /> New product
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-gold/15 bg-surface/40">
          <div className="grid grid-cols-[60px_1fr_140px_120px_100px_180px] gap-4 border-b border-gold/10 bg-background/60 px-6 py-3 text-[10px] uppercase tracking-luxe text-ink-soft">
            <span></span>
            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
            <span className="text-right">Actions</span>
          </div>
          {isLoading ? (
            <div className="p-12 text-center text-ink-soft">Loading catalog…</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-ink-soft">No products.</div>
          ) : (
            <ul>
              {filtered.map((p) => (
                <li
                  key={p.id}
                  className={`grid grid-cols-[60px_1fr_140px_120px_100px_180px] items-center gap-4 border-b border-gold/5 px-6 py-4 text-sm transition-colors hover:bg-background/40 ${
                    p.hidden ? "opacity-50" : ""
                  }`}
                >
                  <div className="h-12 w-12 overflow-hidden rounded-lg bg-background">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-ink-soft">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-display text-base text-ink">{p.name}</p>
                    <p className="text-[11px] text-ink-soft truncate max-w-md">{p.materials}</p>
                  </div>
                  <span className="text-ink-soft">{p.category}</span>
                  <span className="text-gold">{formatRupees(p.price_inr)}</span>
                  <span className={p.inventory <= 0 ? "text-red-500" : "text-ink"}>{p.inventory}</span>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => toggleHidden(p)}
                      title={p.hidden ? "Show" : "Hide"}
                      className="rounded-full border border-ink/10 p-2 text-ink-soft hover:border-gold hover:text-gold"
                    >
                      {p.hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => setEditing(p)}
                      title="Edit"
                      className="rounded-full border border-ink/10 p-2 text-ink-soft hover:border-gold hover:text-gold"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => remove(p)}
                      title="Delete"
                      className="rounded-full border border-ink/10 p-2 text-ink-soft hover:border-red-500 hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <AnimatePresence>
        {editing && (
          <EditorModal
            initial={editing === "new" ? { ...empty } : editing}
            isNew={editing === "new"}
            onClose={() => setEditing(null)}
            onSaved={() => {
              setEditing(null);
              refetch();
              qc.invalidateQueries({ queryKey: ["products", "public"] });
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function EditorModal({
  initial,
  isNew,
  onClose,
  onSaved,
}: {
  initial: Product | Omit<Product, "id">;
  isNew: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const colorsStr = (form.colors ?? []).join(", ");

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm({ ...form, [k]: v });
  }

  async function save() {
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        category: form.category.trim(),
        price_inr: Number(form.price_inr) || 0,
        description: form.description,
        materials: form.materials,
        colors: form.colors,
        image_url: form.image_url.trim(),
        hidden: form.hidden,
        inventory: Number(form.inventory) || 0,
        sort_order: Number(form.sort_order) || 99,
      };
      if (!payload.name) throw new Error("Name is required");
      if (isNew) {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        toast.success("Product created");
      } else {
        const id = (form as Product).id;
        const { error } = await supabase.from("products").update(payload).eq("id", id);
        if (error) throw error;
        toast.success("Product updated");
      }
      onSaved();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] grid place-items-center bg-ink/50 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid max-h-[92vh] w-full max-w-3xl gap-6 overflow-y-auto rounded-3xl bg-background p-8 shadow-glow md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-surface p-2 text-ink hover:bg-gold/20"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div>
          <p className="text-[10px] uppercase tracking-luxe text-gold">
            {isNew ? "New piece" : "Editing"}
          </p>
          <h2 className="mt-1 font-display text-3xl text-ink">
            {isNew ? "Add a Product" : form.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Name">
            <input className="lux-input" value={form.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <Field label="Category">
            <input className="lux-input" value={form.category} onChange={(e) => set("category", e.target.value)} />
          </Field>
          <Field label="Price (₹)">
            <input
              type="number"
              className="lux-input"
              value={form.price_inr}
              onChange={(e) => set("price_inr", Number(e.target.value))}
            />
          </Field>
          <Field label="Inventory">
            <input
              type="number"
              className="lux-input"
              value={form.inventory}
              onChange={(e) => set("inventory", Number(e.target.value))}
            />
          </Field>
          <Field label="Sort order">
            <input
              type="number"
              className="lux-input"
              value={form.sort_order}
              onChange={(e) => set("sort_order", Number(e.target.value))}
            />
          </Field>
          <Field label="Status">
            <button
              type="button"
              onClick={() => set("hidden", !form.hidden)}
              className="lux-input flex items-center justify-between text-left"
            >
              {form.hidden ? "Hidden" : "Visible"}
              {form.hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </Field>
          <Field label="Image URL" wide>
            <input
              className="lux-input"
              value={form.image_url}
              placeholder="https://… or /__l5e/assets-v1/…"
              onChange={(e) => set("image_url", e.target.value)}
            />
            {form.image_url && (
              <img
                src={form.image_url}
                alt=""
                className="mt-3 h-32 w-32 rounded-xl object-cover ring-1 ring-gold/20"
              />
            )}
          </Field>
          <Field label="Materials" wide>
            <input className="lux-input" value={form.materials} onChange={(e) => set("materials", e.target.value)} />
          </Field>
          <Field label="Colors (comma separated)" wide>
            <input
              className="lux-input"
              value={colorsStr}
              onChange={(e) =>
                set(
                  "colors",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                )
              }
            />
          </Field>
          <Field label="Description" wide>
            <textarea
              rows={4}
              className="lux-input resize-none"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>
        </div>

        <div className="flex justify-end gap-3 border-t border-gold/10 pt-6">
          <button
            onClick={onClose}
            className="rounded-full border border-ink/15 px-5 py-2.5 text-[11px] uppercase tracking-luxe text-ink hover:border-gold"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-2.5 text-[11px] uppercase tracking-luxe text-ink shadow-glow disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" /> {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({
  label,
  children,
  wide,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={`block ${wide ? "md:col-span-2" : ""}`}>
      <span className="mb-2 block text-[10px] uppercase tracking-luxe text-ink-soft">{label}</span>
      {children}
    </label>
  );
}
