import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Menu, X } from "lucide-react";
import logo from "@/assets/zyra-logo.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-soft"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#home" aria-label="Zyra by Anna home" className="flex items-center">
          <img
            src={logo}
            alt="Zyra by Anna"
            className="h-10 w-auto md:h-12"
            width={200}
            height={80}
          />
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="gold-underline font-sans text-[12px] uppercase tracking-luxe text-ink hover:text-ink/80"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="https://instagram.com/zyra_by_anna"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-[11px] uppercase tracking-luxe text-ink transition-all hover:bg-gold/10 hover:shadow-glow"
          >
            <Instagram className="h-3.5 w-3.5 text-gold" />
            @zyra_by_anna
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-full border border-gold/40 p-2 text-ink"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden glass border-t border-gold/20"
          >
            <ul className="flex flex-col gap-1 px-8 py-6">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    onClick={() => setOpen(false)}
                    href={l.href}
                    className="block py-3 text-[13px] uppercase tracking-luxe text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href="https://instagram.com/zyra_by_anna"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-[11px] uppercase tracking-luxe text-ink"
                >
                  <Instagram className="h-3.5 w-3.5 text-gold" />
                  @zyra_by_anna
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
