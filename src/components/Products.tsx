import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import p6 from "@/assets/product-6.jpg";
import p7 from "@/assets/product-7.jpg";
import p8 from "@/assets/product-8.jpg";
import p9 from "@/assets/product-9.jpg";
import p10 from "@/assets/product-10.jpg";
import p11 from "@/assets/product-11.jpg";
import p12 from "@/assets/product-12.jpg";

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  materials: string;
  colors: string[];
  description: string;
};

const products: Product[] = [
  { id: 1, name: "Aurore Solitaire", category: "Rings", price: "$2,480", image: p1, materials: "18k yellow gold · 1.2ct diamond", colors: ["Champagne Gold", "Rose Gold"], description: "A timeless solitaire, hand-set in heirloom gold — designed to be worn every day, treasured for a lifetime." },
  { id: 2, name: "Lumière Layered Chain", category: "Necklaces", price: "$890", image: p2, materials: "14k gold-filled, hand-linked", colors: ["Champagne Gold"], description: "A trio of weightless chains that catch the light with every movement." },
  { id: 3, name: "Pearl Étoile Drops", category: "Earrings", price: "$420", image: p3, materials: "Freshwater pearls · 14k gold", colors: ["Ivory", "Champagne"], description: "Sculptural pearl drops that frame the face with quiet sophistication." },
  { id: 4, name: "Éternité Tennis", category: "Bracelets", price: "$1,650", image: p4, materials: "Rose gold · pavé diamonds", colors: ["Rose Gold"], description: "A continuous line of pavé stones — an heirloom in the making." },
  { id: 5, name: "Émeraude Pendant", category: "Necklaces", price: "$1,980", image: p5, materials: "18k gold · 0.8ct emerald", colors: ["Champagne Gold"], description: "A single emerald, suspended on a whisper of gold." },
  { id: 6, name: "Trio Stack", category: "Rings", price: "$680", image: p6, materials: "14k gold · micro pavé", colors: ["Champagne Gold", "Rose Gold"], description: "Three delicate bands designed to be worn together or apart." },
  { id: 7, name: "Saphir Royale", category: "Rings", price: "$3,200", image: p7, materials: "18k gold · 1.5ct sapphire", colors: ["Champagne Gold"], description: "A statement sapphire, set in our signature heritage mount." },
  { id: 8, name: "Halo Hoops", category: "Earrings", price: "$760", image: p8, materials: "14k gold · diamond pavé", colors: ["Champagne Gold"], description: "Architectural hoops with a halo of light at every angle." },
  { id: 9, name: "Signature Cuff", category: "Bracelets", price: "$1,120", image: p9, materials: "18k gold · hand-engraved", colors: ["Champagne Gold"], description: "A sculptural cuff, finished with our atelier's signature engraving." },
  { id: 10, name: "Maison Solitaire", category: "Rings", price: "$4,500", image: p10, materials: "Rose gold · 2ct brilliant", colors: ["Rose Gold"], description: "The Maison Solitaire — our most exacting expression of light." },
  { id: 11, name: "Rubis Drop", category: "Necklaces", price: "$1,420", image: p11, materials: "18k gold · 1ct ruby", colors: ["Champagne Gold"], description: "A pear-cut ruby suspended on a delicate cable chain." },
  { id: 12, name: "Étoile Anklet", category: "Bracelets", price: "$340", image: p12, materials: "Rose gold-fill · star charms", colors: ["Rose Gold"], description: "A whisper of stars to wear at the ankle — summer, made permanent." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Products() {
  const [active, setActive] = useState<Product | null>(null);

  return (
    <section id="products" className="relative bg-background py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <p className="mb-4 text-[11px] uppercase tracking-luxe text-gold">The Collection</p>
          <h2 className="font-display text-4xl text-ink md:text-5xl">
            Composed with Intention
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft md:text-[17px]">
            Twelve pieces, each made by hand in our atelier — designed to be
            inherited, not replaced.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p, i) => (
            <motion.button
              key={p.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              onClick={() => setActive(p)}
              className="group text-left"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface shadow-soft transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-glow">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 text-background opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-[10px] uppercase tracking-luxe">View piece →</span>
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-luxe text-ink-soft">{p.category}</p>
                  <h3 className="mt-1 font-display text-xl text-ink">{p.name}</h3>
                </div>
                <p className="mt-1 font-sans text-[13px] text-gold">{p.price}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-md"
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
                  src={active.image}
                  alt={active.name}
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-5 overflow-y-auto p-8 md:p-12">
                <p className="text-[10px] uppercase tracking-luxe text-gold">
                  {active.category}
                </p>
                <h3 className="font-display text-3xl text-ink md:text-4xl">{active.name}</h3>
                <p className="font-display text-2xl text-gradient-gold">{active.price}</p>
                <p className="text-[15px] leading-relaxed text-ink-soft">{active.description}</p>
                <div className="border-t border-border pt-5">
                  <p className="text-[10px] uppercase tracking-luxe text-ink-soft">Materials</p>
                  <p className="mt-2 text-sm text-ink">{active.materials}</p>
                </div>
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
                <a
                  href={`https://wa.me/0000000000?text=I%27d%20like%20to%20order%20the%20${encodeURIComponent(active.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-[11px] uppercase tracking-luxe text-ink shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4" />
                  Order on WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
