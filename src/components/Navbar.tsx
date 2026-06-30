import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Menu, X, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Products", href: "/#products" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();

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
      <nav className="mx-auto flex max-w-7xl items-center justify-end px-6 py-4 md:px-10">
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-10">
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
          <a
            href="https://instagram.com/zyra_by_anna"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-[11px] uppercase tracking-luxe text-ink transition-all hover:bg-gold/10"
          >
            <Instagram className="h-4 w-4 text-gold" />
            Instagram
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
              <li>
                <a
                  onClick={() => setOpen(false)}
                  href="https://instagram.com/zyra_by_anna"
                  target="_blank"
                  rel="noreferrer"
                  className="block py-3 text-[13px] uppercase tracking-luxe text-ink"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
