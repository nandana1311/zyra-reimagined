import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aboutImg from "@/assets/about-jewelry.jpg";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-surface py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2 md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft"
        >
          <motion.img
            src={aboutImg}
            alt="A delicate gold piece resting on cream silk"
            loading="lazy"
            width={1280}
            height={1600}
            className="h-full w-full object-cover"
            style={{ y }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 text-[11px] uppercase tracking-luxe text-gold">Our Story</p>
          <h2 className="font-display text-4xl text-ink md:text-5xl">
            About Zyra by Anna
          </h2>

          <div className="my-8 flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <span className="font-display italic text-gold">✦</span>
            <span className="h-px w-12 bg-gold" />
          </div>

          <div className="space-y-5 text-[15px] leading-relaxed text-ink-soft md:text-[17px]">
            <p>
              Zyra was founded by Anna with one quiet promise — to make jewelry
              that feels like a private letter. Each piece is shaped slowly, in
              a small atelier, by hands that have spent decades with gold.
            </p>
            <p>
              We work in 14k and 18k golds, freshwater pearls, and ethically
              sourced stones. Our designs are intentionally restrained — meant
              to outlive trends, and to be passed forward.
            </p>
            <p>
              Every order is finished and inspected by Anna herself. It is
              jewelry made in the old way, for the woman who wants to feel
              quietly, completely herself.
            </p>
          </div>

          <p className="mt-10 font-display text-2xl italic text-gradient-gold">
            — Anna
          </p>
        </motion.div>
      </div>
    </section>
  );
}
