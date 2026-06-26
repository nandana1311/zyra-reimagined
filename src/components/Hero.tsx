import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroScene } from "./HeroScene";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate min-h-screen overflow-hidden bg-gradient-hero pt-24"
    >
      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-[3px] w-[3px] rounded-full bg-gold/70"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-12 md:grid-cols-2 md:px-10 md:pb-32 md:pt-20"
      >
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-[11px] uppercase tracking-luxe text-ink-soft"
          >
            ✦  Maison Zyra · Est. 2024
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[40px] leading-[0.95] text-ink md:text-[54px] lg:text-[72px]"
          >
            Zyra
            <span className="block italic text-gradient-gold">by Anna</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 font-display text-2xl italic text-ink-soft md:text-3xl"
          >
            Elegance in Every Detail
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft md:text-[17px]"
          >
            Handcrafted fine jewelry composed with quiet luxury — heirloom
            metals, ethically sourced stones, and a couturier's eye for the
            details that endure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#products"
              className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-gold px-7 py-3.5 text-[11px] uppercase tracking-luxe text-ink shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Explore Collection
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="https://wa.me/0000000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-3.5 text-[11px] uppercase tracking-luxe text-ink transition-all hover:border-gold hover:text-gold"
            >
              Order on WhatsApp
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square w-full"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(0.92_0.06_75)] via-transparent to-[oklch(0.85_0.07_45)] opacity-70 blur-3xl" />
          <div className="relative h-full w-full">
            <HeroScene />
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-luxe text-ink-soft">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span>Scroll</span>
          <span className="h-8 w-px bg-gold/50" />
        </motion.div>
      </div>
    </section>
  );
}
