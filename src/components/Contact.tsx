import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Mail, MessageCircle, Send, Check } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);

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
          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            <a
              href="https://wa.me/0000000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-5 py-3 text-[11px] uppercase tracking-luxe text-ink shadow-glow transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href="https://instagram.com/zyra_by_anna"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-5 py-3 text-[11px] uppercase tracking-luxe text-ink transition-all hover:bg-gold/10"
            >
              <Instagram className="h-4 w-4 text-gold" />
              Instagram
            </a>
            <a
              href="mailto:hello@zyrabyanna.com"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-[11px] uppercase tracking-luxe text-ink transition-all hover:border-gold"
            >
              <Mail className="h-4 w-4 text-gold" />
              Email
            </a>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 3500);
              (e.target as HTMLFormElement).reset();
            }}
            className="space-y-7"
          >
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
            ].map((f) => (
              <div key={f.id} className="relative">
                <input
                  required
                  id={f.id}
                  type={f.type}
                  className="peer w-full border-0 border-b border-ink/20 bg-transparent px-0 pb-2 pt-5 text-ink outline-none transition-colors placeholder:text-transparent focus:border-gold"
                  placeholder={f.label}
                />
                <label
                  htmlFor={f.id}
                  className="absolute left-0 top-0 text-[10px] uppercase tracking-luxe text-ink-soft transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[13px] peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink-soft/70 peer-focus:top-0 peer-focus:text-[10px] peer-focus:tracking-luxe peer-focus:text-gold"
                >
                  {f.label}
                </label>
              </div>
            ))}

            <div className="relative">
              <textarea
                required
                id="message"
                rows={4}
                className="peer w-full resize-none border-0 border-b border-ink/20 bg-transparent px-0 pb-2 pt-5 text-ink outline-none transition-colors placeholder:text-transparent focus:border-gold"
                placeholder="Message"
              />
              <label
                htmlFor="message"
                className="absolute left-0 top-0 text-[10px] uppercase tracking-luxe text-ink-soft transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[13px] peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink-soft/70 peer-focus:top-0 peer-focus:text-[10px] peer-focus:tracking-luxe peer-focus:text-gold"
              >
                Message
              </label>
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-[11px] uppercase tracking-luxe text-background transition-all hover:bg-gradient-gold hover:text-ink hover:shadow-glow"
            >
              {sent ? (
                <>
                  <Check className="h-4 w-4" />
                  Message sent
                </>
              ) : (
                <>
                  Send Message
                  <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
