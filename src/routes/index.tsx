import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zyra by Anna — Elegance in Every Detail" },
      {
        name: "description",
        content:
          "Handcrafted luxury fine jewelry — rings, necklaces, earrings. Composed slowly in a small atelier by Anna.",
      },
      { property: "og:title", content: "Zyra by Anna — Elegance in Every Detail" },
      {
        property: "og:description",
        content: "Luxury, editorial fine jewelry — timeless pieces, crafted with intention.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Products />
      <Contact />
      <Footer />
    </main>
  );
}
