import { motion } from "framer-motion";
import portrait from "@/assets/anna-portrait.png";
import logo from "@/assets/zyra-logo.png";
import bangle1 from "@/assets/floating-bangle-1.png";
import bangle2 from "@/assets/floating-bangle-2.png";
import bangle3 from "@/assets/floating-bangle-3.png";
import ring1 from "@/assets/floating-ring-1.png";
import ring2 from "@/assets/floating-ring-2.png";
import earring from "@/assets/floating-earring-1.png";
import gem from "@/assets/floating-gem-1.png";

type Piece = {
  src: string;
  alt: string;
  top: string;
  left: string;
  size: string;
  duration: number;
  floatY: number;
  tilt: number;
  rotate?: number;
  delay?: number;
  z?: number;
  opacity?: number;
};

const pieces: Piece[] = [
  { src: bangle1, alt: "Gold bangle", top: "2%",  left: "8%",  size: "26%", duration: 9,  floatY: 18, tilt: 8,  rotate: 360, delay: 0,   z: 2 },
  { src: ring1,   alt: "Gold ring",   top: "12%", left: "78%", size: "16%", duration: 7,  floatY: 22, tilt: 12, delay: 0.4, z: 3 },
  { src: bangle2, alt: "Gold bangle", top: "70%", left: "4%",  size: "22%", duration: 11, floatY: 16, tilt: -10, rotate: -360, delay: 0.8, z: 2 },
  { src: earring, alt: "Gold earring", top: "58%", left: "82%", size: "18%", duration: 8, floatY: 24, tilt: 6, delay: 1.1, z: 3 },
  { src: bangle3, alt: "Gold bangle", top: "82%", left: "60%", size: "20%", duration: 10, floatY: 14, tilt: 10, rotate: 360, delay: 0.6, z: 2 },
  { src: gem,     alt: "Champagne gem", top: "44%", left: "92%", size: "10%", duration: 6, floatY: 18, tilt: 14, delay: 0.2, z: 4, opacity: 0.9 },
  { src: ring2,   alt: "Rose gold rings", top: "88%", left: "20%", size: "16%", duration: 9, floatY: 20, tilt: -8, delay: 1.4, z: 3 },
];

export function HeroJewelry() {
  return (
    <div className="relative h-full w-full">
      {/* soft ambient glow */}
      <div
        className="pointer-events-none absolute inset-[10%] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)" }}
      />

      {/* center composition: logo above portrait */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.img
          src={logo}
          alt="Zyra by Anna"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mb-[-6%] h-auto w-[42%] max-w-[220px] select-none"
          draggable={false}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[62%] max-w-[360px]"
          style={{ filter: "drop-shadow(0 30px 40px rgba(60,40,20,0.18))" }}
        >
          <motion.img
            src={portrait}
            alt="Anna, founder of Zyra"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="block h-auto w-full select-none"
            draggable={false}
          />
        </motion.div>
      </div>

      {/* floating jewelry accents */}
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            zIndex: p.z ?? 1,
            opacity: p.opacity ?? 1,
            filter: "drop-shadow(0 18px 22px rgba(80,60,30,0.18)) drop-shadow(0 0 18px rgba(212,175,55,0.18))",
          }}
          initial={{ opacity: 0, y: 24, scale: 0.85 }}
          animate={{
            opacity: p.opacity ?? 1,
            y: [0, -p.floatY, 0],
            scale: 1,
          }}
          transition={{
            opacity: { duration: 1.2, delay: 0.5 + i * 0.12 },
            scale: { duration: 1.2, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            },
          }}
        >
          <motion.img
            src={p.src}
            alt={p.alt}
            loading="lazy"
            className="block h-auto w-full select-none"
            draggable={false}
            animate={
              p.rotate
                ? { rotate: [0, p.rotate] }
                : { rotate: [-p.tilt, p.tilt, -p.tilt] }
            }
            transition={
              p.rotate
                ? { duration: p.duration * 4, repeat: Infinity, ease: "linear" }
                : { duration: p.duration * 1.4, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </motion.div>
      ))}
    </div>
  );
}
