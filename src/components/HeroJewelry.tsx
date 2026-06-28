import { motion } from "framer-motion";
import portrait from "@/assets/anna-portrait.png";
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
  scale?: number;
};

const backdropPieces: Piece[] = [
  { src: bangle1, alt: "Gold bangle", top: "4%", left: "-4%", size: "32%", duration: 10, floatY: 20, tilt: 14, rotate: 360, delay: 0, z: 1, opacity: 0.55 },
  { src: ring1, alt: "Gold ring", top: "2%", left: "68%", size: "24%", duration: 8, floatY: 18, tilt: 18, delay: 0.3, z: 2 },
  { src: gem, alt: "Champagne gem", top: "18%", left: "42%", size: "14%", duration: 6, floatY: 14, tilt: 22, delay: 0.1, z: 1, opacity: 0.45 },
  { src: earring, alt: "Gold earring", top: "8%", left: "88%", size: "22%", duration: 9, floatY: 22, tilt: -12, delay: 0.6, z: 3 },
  { src: bangle2, alt: "Gold bangle", top: "52%", left: "-6%", size: "30%", duration: 11, floatY: 16, tilt: -16, rotate: -360, delay: 0.9, z: 1, opacity: 0.6 },
  { src: ring2, alt: "Rose gold rings", top: "62%", left: "8%", size: "20%", duration: 8, floatY: 20, tilt: 10, delay: 1.2, z: 2, opacity: 0.7 },
  { src: bangle3, alt: "Gold bangle", top: "72%", left: "78%", size: "28%", duration: 12, floatY: 18, tilt: 8, rotate: 360, delay: 0.5, z: 2 },
  { src: ring1, alt: "Gold ring", top: "38%", left: "92%", size: "18%", duration: 7, floatY: 24, tilt: -20, delay: 1.5, z: 3, opacity: 0.85 },
  { src: earring, alt: "Gold earring", top: "84%", left: "52%", size: "20%", duration: 9, floatY: 16, tilt: 14, delay: 0.8, z: 2, scale: 0.9 },
  { src: gem, alt: "Champagne gem", top: "28%", left: "18%", size: "11%", duration: 5, floatY: 12, tilt: -18, delay: 0.4, z: 1, opacity: 0.5 },
  { src: bangle1, alt: "Gold bangle", top: "46%", left: "58%", size: "26%", duration: 10, floatY: 14, tilt: -8, delay: 1.1, z: 1, opacity: 0.35 },
  { src: ring2, alt: "Rose gold rings", top: "14%", left: "28%", size: "16%", duration: 8, floatY: 18, tilt: 16, delay: 1.8, z: 1, opacity: 0.4 },
  { src: bangle2, alt: "Gold bangle", top: "88%", left: "22%", size: "24%", duration: 11, floatY: 12, tilt: -12, delay: 0.7, z: 2, opacity: 0.65 },
  { src: bangle3, alt: "Gold bangle", top: "32%", left: "74%", size: "22%", duration: 9, floatY: 20, tilt: 20, rotate: -360, delay: 1.3, z: 2, opacity: 0.75 },
  { src: ring1, alt: "Gold ring", top: "56%", left: "36%", size: "15%", duration: 7, floatY: 16, tilt: -14, delay: 2, z: 1, opacity: 0.3 },
  { src: earring, alt: "Gold earring", top: "68%", left: "94%", size: "19%", duration: 8, floatY: 22, tilt: 8, delay: 0.2, z: 3 },
];

const jewelShadow =
  "drop-shadow(0 22px 28px rgba(80,60,30,0.22)) drop-shadow(0 0 24px rgba(212,175,55,0.2))";

export function HeroJewelryBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {backdropPieces.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            zIndex: p.z ?? 1,
            opacity: p.opacity ?? 1,
            scale: p.scale ?? 1,
            filter: jewelShadow,
          }}
          initial={{ opacity: 0, y: 28, scale: (p.scale ?? 1) * 0.8 }}
          animate={{
            opacity: p.opacity ?? 1,
            y: [0, -p.floatY, 0],
            scale: p.scale ?? 1,
          }}
          transition={{
            opacity: { duration: 1.2, delay: 0.4 + i * 0.06 },
            scale: { duration: 1.2, delay: 0.4 + i * 0.06, ease: [0.22, 1, 0.36, 1] },
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
            alt=""
            loading="lazy"
            className="block h-auto w-full select-none"
            draggable={false}
            animate={
              p.rotate
                ? { rotate: [p.tilt, p.tilt + p.rotate] }
                : { rotate: [-p.tilt, p.tilt, -p.tilt] }
            }
            transition={
              p.rotate
                ? { duration: p.duration * 5, repeat: Infinity, ease: "linear" }
                : { duration: p.duration * 1.3, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </motion.div>
      ))}
    </div>
  );
}

export function HeroPortrait() {
  return (
    <div className="relative h-full w-full">
      <div
        className="pointer-events-none absolute inset-x-[-10%] bottom-0 top-[8%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(212,175,55,0.22) 0%, rgba(230,190,160,0.12) 45%, transparent 72%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 flex justify-center"
      >
        <motion.img
          src={portrait}
          alt="Anna, founder of Zyra"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="block w-[min(52vw,680px)] max-w-none select-none md:w-[min(48vw,720px)] lg:w-[min(50vw,780px)]"
          style={{
            filter: "drop-shadow(0 40px 60px rgba(60,40,20,0.25))",
            marginBottom: "-2%",
          }}
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

/** @deprecated Use HeroJewelryBackdrop + HeroPortrait in Hero */
export function HeroJewelry() {
  return (
    <>
      <HeroJewelryBackdrop />
      <HeroPortrait />
    </>
  );
}
