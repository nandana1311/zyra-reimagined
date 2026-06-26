import { motion } from "framer-motion";
import bangle1 from "@/assets/floating-bangle-1.png";
import bangle2 from "@/assets/floating-bangle-2.png";
import bangle3 from "@/assets/floating-bangle-3.png";
import ring1 from "@/assets/floating-ring-1.png";
import ring2 from "@/assets/floating-ring-2.png";

type Piece = {
  src: string;
  alt: string;
  // Position as percent
  top: string;
  left: string;
  size: string; // e.g. "44%"
  rotate: number;
  duration: number;
  floatY: number;
  flip?: boolean;
  delay?: number;
  z?: number;
};

const pieces: Piece[] = [
  { src: bangle1, alt: "Polished gold bangle", top: "8%",  left: "18%", size: "62%", rotate: 360, duration: 38, floatY: 18, delay: 0, z: 2 },
  { src: bangle2, alt: "Hammered gold bangle", top: "46%", left: "8%",  size: "54%", rotate: -360, duration: 46, floatY: 22, flip: true, delay: 0.6, z: 1 },
  { src: bangle3, alt: "Twisted gold bangle", top: "55%", left: "44%", size: "58%", rotate: 360, duration: 52, floatY: 16, delay: 1.2, z: 3 },
  { src: ring1,   alt: "Gold solitaire ring", top: "6%",  left: "52%", size: "34%", rotate: -360, duration: 30, floatY: 24, flip: true, delay: 0.3, z: 4 },
  { src: ring2,   alt: "Rose gold eternity rings", top: "32%", left: "58%", size: "32%", rotate: 360, duration: 34, floatY: 20, delay: 0.9, z: 4 },
];

export function HeroJewelry() {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[2rem]"
      style={{
        background:
          "radial-gradient(120% 80% at 60% 30%, #2a2522 0%, #181513 55%, #0b0908 100%)",
      }}
      aria-hidden={false}
    >
      {/* soft gold ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 -right-16 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, #d4af37 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 h-80 w-80 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #cfa18d 0%, transparent 70%)" }}
        />
      </div>

      {/* sparkle particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-[#f5e1a8]"
            style={{
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
            }}
            animate={{ opacity: [0.15, 0.9, 0.15], scale: [1, 1.4, 1] }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* floating jewelry */}
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            zIndex: p.z ?? 1,
            filter: "drop-shadow(0 30px 35px rgba(0,0,0,0.55)) drop-shadow(0 0 25px rgba(212,175,55,0.25))",
          }}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: [0, -p.floatY, 0],
            scale: 1,
          }}
          transition={{
            opacity: { duration: 1.2, delay: 0.3 + i * 0.15 },
            scale: { duration: 1.2, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] },
            y: {
              duration: 6 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            },
          }}
        >
          <motion.img
            src={p.src}
            alt={p.alt}
            width={768}
            height={768}
            loading={i === 0 ? "eager" : "lazy"}
            className="block h-auto w-full select-none"
            draggable={false}
            animate={
              p.flip
                ? { rotateY: [0, 180, 360], rotateZ: [0, p.rotate / 6, 0] }
                : { rotate: [0, p.rotate] }
            }
            transition={
              p.flip
                ? {
                    rotateY: { duration: p.duration, repeat: Infinity, ease: "linear" },
                    rotateZ: { duration: p.duration / 2, repeat: Infinity, ease: "easeInOut" },
                  }
                : { duration: p.duration, repeat: Infinity, ease: "linear" }
            }
            style={{ transformStyle: "preserve-3d", backfaceVisibility: "visible" as const }}
          />
        </motion.div>
      ))}

      {/* fine gold frame */}
      <div className="pointer-events-none absolute inset-3 rounded-[1.8rem] border border-[#d4af37]/15" />
    </div>
  );
}
