import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { X, MessageCircle, Sparkles, ShoppingBag, Truck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCart, WHATSAPP_NUMBER } from "@/lib/cart";
import { formatRupees } from "@/lib/format";
import bangle1 from "@/assets/floating-bangle-1.png";
import bangle2 from "@/assets/floating-bangle-2.png";
import bangle3 from "@/assets/floating-bangle-3.png";
import ring1 from "@/assets/floating-ring-1.png";
import ring2 from "@/assets/floating-ring-2.png";
import earring from "@/assets/floating-earring-1.png";
import gem from "@/assets/floating-gem-1.png";

const PRODUCT_IMAGE_FALLBACKS = [ring1, bangle1, earring, ring2, bangle2, gem, bangle3];

function resolveProductImage(url: string, index: number): string {
  const fallback = PRODUCT_IMAGE_FALLBACKS[index % PRODUCT_IMAGE_FALLBACKS.length];
  if (!url.trim()) return fallback;
  if (import.meta.env.DEV && url.includes("/__l5e/")) return fallback;
  return url;
}

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

async function fetchProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("hidden", false)
      .order("sort_order", { ascending: true });
    if (error) {
      console.error("Supabase fetchProducts error:", error);
      return [];
    }
    return (data ?? []) as Product[];
  } catch (err) {
    console.error("fetchProducts unexpected error:", err);
    return [];
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Products() {
  const [active, setActive] = useState<Product | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [displayCount, setDisplayCount] = useState(8);
  const { add } = useCart();
  const navigate = useNavigate();

  const { data: products = [], error, isLoading } = useQuery({
    queryKey: ["products", "public"],
    queryFn: fetchProducts,
  });

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const filtered = useMemo(
    () => (filter === "" ? products : products.filter((p) => p.category === filter)),
    [products, filter],
  );

  const visible = useMemo(
    () => filtered.slice(0, displayCount),
    [filtered, displayCount],
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="products" className="relative bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-gold">
            <Sparkles className="h-3 w-3" /> The Collection
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-2"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`relative rounded-full border px-5 py-2 text-[11px] uppercase tracking-luxe transition-all ${
                filter === c
                  ? "border-gold bg-gold/10 text-ink shadow-glow"
                  : "border-ink/15 text-ink-soft hover:border-gold/50 hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
          {filter && (
            <button
              type="button"
              onClick={() => setFilter("")}
              className="relative rounded-full border border-ink/15 bg-background px-5 py-2 text-[11px] uppercase tracking-luxe text-ink-soft hover:border-gold/50 hover:text-ink"
            >
              Reset
            </button>
          )}
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-surface" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="mb-4 text-ink-soft">Unable to load the collection right now.</p>
            <p className="mb-6 text-ink-soft">
              {error instanceof Error ? error.message : "Unexpected fetch error."}
            </p>
            <a
              href="https://wa.me/0000000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-[11px] uppercase tracking-luxe text-ink shadow-glow transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              Contact on WhatsApp
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {visible.map((p, i) => (
                  <motion.button
                    key={p.id}
                    layout
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                    viewport={{ once: true, margin: "-80px" }}
                    onClick={() => setActive(p)}
                    className="group text-left"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface shadow-soft transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-glow">
                      <img
                        src={resolveProductImage(p.image_url, i)}
                        alt={p.name}
                        loading="lazy"
                        width={1024}
                        height={1024}
                        onError={(e) => {
                          e.currentTarget.src = PRODUCT_IMAGE_FALLBACKS[i % PRODUCT_IMAGE_FALLBACKS.length];
                        }}
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 text-background opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="text-[10px] uppercase tracking-luxe">View piece →</span>
                      </div>
                      {p.inventory <= 0 && (
                        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[9px] uppercase tracking-luxe text-background">
                          Sold out
                        </span>
                      )}
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-luxe text-ink-soft">{p.category}</p>
                        <h3 className="mt-1 font-display text-xl text-ink">{p.name}</h3>
                      </div>
                      <p className="mt-1 font-sans text-[13px] text-gold">{formatRupees(p.price_inr)}</p>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            {filtered.length > visible.length && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setDisplayCount((count) => count + 8)}
                  className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3.5 text-[11px] uppercase tracking-luxe text-ink transition-all hover:bg-gold/90"
                >
                  View More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-background shadow-glow md:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 text-ink backdrop-blur transition-colors hover:bg-gold/20"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="aspect-square overflow-hidden bg-surface md:aspect-auto">
                <img
                  src={resolveProductImage(
                    active.image_url,
                    visible.findIndex((p) => p.id === active.id),
                  )}
                  alt={active.name}
                  width={1024}
                  height={1024}
                  onError={(e) => {
                    const index = Math.max(
                      visible.findIndex((p) => p.id === active.id),
                      0,
                    );
                    e.currentTarget.src = PRODUCT_IMAGE_FALLBACKS[index % PRODUCT_IMAGE_FALLBACKS.length];
                  }}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-5 overflow-y-auto p-8 md:p-12">
                <p className="text-[10px] uppercase tracking-luxe text-gold">{active.category}</p>
                <h3 className="font-display text-3xl text-ink md:text-4xl">{active.name}</h3>
                <p className="font-display text-2xl text-gradient-gold">{formatRupees(active.price_inr)}</p>
                <p className="text-[15px] leading-relaxed text-ink-soft">{active.description}</p>
                {active.materials && (
                  <div className="border-t border-border pt-5">
                    <p className="text-[10px] uppercase tracking-luxe text-ink-soft">Materials</p>
                    <p className="mt-2 text-sm text-ink">{active.materials}</p>
                  </div>
                )}
                {active.colors.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-luxe text-ink-soft">Available in</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {active.colors.map((c) => (
                        <span
                          key={c}
                          className="rounded-full border border-gold/40 px-3 py-1 text-[11px] uppercase tracking-luxe text-ink"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <a
                  href={`https://wa.me/0000000000?text=Hi%2C%20I%27d%20like%20to%20buy%20the%20${encodeURIComponent(active.name)}%20for%20${encodeURIComponent(formatRupees(active.price_inr))}.%20Please%20share%20payment%20details.`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-[11px] uppercase tracking-luxe text-ink shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4" />
                  Buy Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
