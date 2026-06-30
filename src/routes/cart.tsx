import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageCircle, Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useCart, FREE_SHIPPING_THRESHOLD, WHATSAPP_NUMBER } from "@/lib/cart";
import { formatRupees } from "@/lib/format";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Zyra by Anna" },
      { name: "description", content: "Review your selected pieces and complete your order via WhatsApp." },
    ],
  }),
  component: CartPage,
});

function buildWhatsAppMessage(items: ReturnType<typeof useCart>["items"], subtotal: number) {
  const lines: string[] = [];
  lines.push("*WhatsApp Order Inquiry*");
  lines.push("");
  lines.push("Hi, I'm interested in purchasing the following items:");
  lines.push("");
  items.forEach((it, i) => {
    lines.push(`${i + 1}. ${it.name} – Qty: ${it.qty} (${formatRupees(it.price_inr * it.qty)})`);
  });
  lines.push("");
  lines.push(`*Total Amount:* ${formatRupees(subtotal)}`);
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    lines.push("✅ Eligible for Free Shipping (Orders Above ₹499)");
  } else {
    lines.push(`Add ${formatRupees(FREE_SHIPPING_THRESHOLD - subtotal)} more for Free Shipping`);
  }
  return encodeURIComponent(lines.join("\n"));
}

function CartPage() {
  const { items, subtotal, setQty, remove, count } = useCart();
  const eligible = subtotal >= FREE_SHIPPING_THRESHOLD;
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(items, subtotal)}`;

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:px-10 md:pt-36">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-ink-soft hover:text-ink"
        >
          <ArrowLeft className="h-3 w-3" /> Continue Shopping
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl text-ink md:text-5xl"
        >
          Your Cart
        </motion.h1>
        <p className="mt-2 text-sm text-ink-soft">
          {count === 0 ? "Your cart is empty." : `${count} piece${count > 1 ? "s" : ""} selected.`}
        </p>

        <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/5 px-5 py-3 text-center text-[12px] uppercase tracking-luxe text-ink">
          ✦ Free Shipping on Orders Above ₹499
        </div>

        {items.length === 0 ? (
          <div className="mt-16 text-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-6 py-3.5 text-[11px] uppercase tracking-luxe text-ink shadow-glow"
            >
              Browse the Collection
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-5">
              {items.map((it) => (
                <motion.li
                  key={it.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4 rounded-2xl border border-border bg-surface/40 p-4 shadow-soft md:gap-6 md:p-5"
                >
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface md:h-28 md:w-28">
                    <img src={it.image_url} alt={it.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-[10px] uppercase tracking-luxe text-ink-soft">{it.category}</p>
                    <h3 className="font-display text-xl text-ink">{it.name}</h3>
                    <p className="text-sm text-gold">{formatRupees(it.price_inr)}</p>
                    <div className="mt-auto flex items-center justify-between gap-4 pt-3">
                      <div className="inline-flex items-center rounded-full border border-ink/15">
                        <button
                          aria-label="Decrease"
                          onClick={() => setQty(it.id, it.qty - 1)}
                          className="p-2 text-ink hover:text-gold"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[2ch] text-center text-sm text-ink">{it.qty}</span>
                        <button
                          aria-label="Increase"
                          onClick={() => setQty(it.id, it.qty + 1)}
                          className="p-2 text-ink hover:text-gold"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(it.id)}
                        className="inline-flex items-center gap-1 text-[11px] uppercase tracking-luxe text-ink-soft hover:text-ink"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="hidden text-right font-display text-lg text-ink md:block">
                    {formatRupees(it.price_inr * it.qty)}
                  </div>
                </motion.li>
              ))}
            </ul>

            <aside className="h-fit rounded-2xl border border-border bg-surface/40 p-6 shadow-soft lg:sticky lg:top-28">
              <h2 className="font-display text-2xl text-ink">Order Summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-ink-soft">
                  <dt>Subtotal</dt>
                  <dd className="text-ink">{formatRupees(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <dt>Shipping</dt>
                  <dd className="text-ink">{eligible ? "Free" : "Calculated at checkout"}</dd>
                </div>
              </dl>
              <div className="my-5 h-px bg-border" />
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-luxe text-ink-soft">Total</span>
                <span className="font-display text-2xl text-gradient-gold">{formatRupees(subtotal)}</span>
              </div>
              {!eligible && (
                <p className="mt-3 text-[11px] text-ink-soft">
                  Add {formatRupees(FREE_SHIPPING_THRESHOLD - subtotal)} more to unlock free shipping.
                </p>
              )}
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-[11px] uppercase tracking-luxe text-ink shadow-glow transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" /> Buy via WhatsApp
              </a>
              <p className="mt-3 text-center text-[10px] uppercase tracking-luxe text-ink-soft">
                Auto-generated order message
              </p>
            </aside>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
