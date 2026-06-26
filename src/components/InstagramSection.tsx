import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import grid from "@/assets/insta-grid.jpg";

// Slice the 3x2 grid image into 6 tiles via background-position.
const tiles = Array.from({ length: 6 }).map((_, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  return {
    bgPos: `${(col / 2) * 100}% ${(row / 1) * 100}%`,
  };
});

export function InstagramSection() {
  return (
    <section className="relative bg-background py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="mb-14 text-center"
        >
          <p className="mb-4 text-[11px] uppercase tracking-luxe text-gold">@zyra_by_anna</p>
          <h2 className="font-display text-4xl text-ink md:text-5xl">Follow Our Journey</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {tiles.map((t, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/zyra_by_anna"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.07 }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-surface"
              aria-label="View on Instagram"
            >
              <div
                className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                style={{
                  backgroundImage: `url(${grid})`,
                  backgroundSize: "300% 200%",
                  backgroundPosition: t.bgPos,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-500 group-hover:bg-ink/30 group-hover:opacity-100">
                <Instagram className="h-7 w-7 text-background" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="https://instagram.com/zyra_by_anna"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-7 py-3.5 text-[11px] uppercase tracking-luxe text-ink transition-all hover:bg-gold/10 hover:shadow-glow"
          >
            <Instagram className="h-3.5 w-3.5 text-gold" />
            Follow @zyra_by_anna
          </a>
        </div>
      </div>
    </section>
  );
}
