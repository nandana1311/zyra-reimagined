import { motion } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <p className="mb-4 text-[11px] uppercase tracking-luxe text-gold">Get in Touch</p>
          <h2 className="font-display text-4xl text-ink md:text-5xl">
            Begin a Conversation
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft md:text-[17px]">
            For bespoke commissions, private viewings, or to order a piece —
            Anna replies to every message personally.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="glass mt-14 rounded-3xl p-8 shadow-soft md:p-12"
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/0000000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-8 py-4 text-[12px] uppercase tracking-luxe text-ink shadow-glow transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
            <a
              href="https://instagram.com/zyra_by_anna"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/50 px-8 py-4 text-[12px] uppercase tracking-luxe text-ink transition-all hover:bg-gold/10 sm:w-auto"
            >
              <Instagram className="h-5 w-5 text-gold" />
              Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
