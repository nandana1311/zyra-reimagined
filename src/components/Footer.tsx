import { Instagram } from "lucide-react";
import logo from "@/assets/zyra-logo.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative bg-gradient-dark text-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3 md:px-10">
        <div>
          <img
            src={logo}
            alt="Zyra by Anna"
            width={300}
            height={120}
            loading="lazy"
            className="h-16 w-auto brightness-0 invert-[0.85] sepia hue-rotate-[10deg] saturate-200"
          />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-background/60">
            Handcrafted fine jewelry, composed slowly — for the woman who wants
            to feel quietly herself.
          </p>
        </div>

        <div>
          <p className="mb-5 text-[10px] uppercase tracking-luxe text-gold">Navigation</p>
          <ul className="space-y-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-background/70 transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 text-[10px] uppercase tracking-luxe text-gold">Follow</p>
          <a
            href="https://instagram.com/zyra_by_anna"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-5 py-2.5 text-[11px] uppercase tracking-luxe text-background transition-all hover:bg-gold/10"
          >
            <Instagram className="h-3.5 w-3.5 text-gold" />
            @zyra_by_anna
          </a>
          <p className="mt-6 text-sm text-background/60">hello@zyrabyanna.com</p>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] uppercase tracking-luxe text-background/50 md:flex-row md:px-10">
          <p>© 2026 Zyra by Anna. All rights reserved.</p>
          <p className="font-display italic normal-case tracking-normal text-gold/80">
            Elegance in Every Detail
          </p>
        </div>
      </div>
    </footer>
  );
}
