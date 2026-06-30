import { motion, useScroll, useTransform } from "framer-motion";

import { useRef } from "react";

import { HeroJewelryBackdrop } from "./HeroJewelry";



export function Hero() {

  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({

    target: ref,

    offset: ["start start", "end start"],

  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);



  return (

    <section

      id="home"

      ref={ref}

      className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-gradient-hero pt-14 md:pt-16"

    >

      <HeroJewelryBackdrop />



      <motion.div

        style={{ y, opacity }}

        className="relative z-10 mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-[1440px] flex-col items-center justify-center px-6 md:px-10 lg:px-14"

      >

        <div className="relative z-20 mx-auto w-full max-w-4xl">

          
          <div className="flex flex-col items-center text-center">

          <motion.h1

            initial={{ opacity: 0, y: 24 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}

            className="font-display text-[clamp(4.5rem,16vw,10.5rem)] leading-[0.88] tracking-[-0.03em]"

          >

            <span className="text-ink">Zyr</span>

            <span className="text-gold">a</span>

          </motion.h1>



          <motion.p

            initial={{ opacity: 0, y: 16 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.7, delay: 0.3 }}

            className="mt-4 font-display text-[clamp(1.125rem,2.8vw,2rem)] italic leading-snug text-ink-soft md:mt-5"

          >

            Elegance in Every Detail.

          </motion.p>



          <motion.div

            initial={{ opacity: 0, y: 16 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.7, delay: 0.45 }}

            className="mt-5 md:mt-6"

          >

            <a

              href="#products"

              className="group relative inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-[11px] uppercase tracking-luxe text-background transition-transform hover:-translate-y-0.5"

            >

              Explore the Collection

              <span className="transition-transform group-hover:translate-x-1">→</span>

            </a>

          </motion.div>

          </div>

        </div>



        <motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}

          className="relative z-10 mt-8 min-h-[min(58vh,560px)] w-full overflow-hidden md:absolute md:inset-y-0 md:right-0 md:mt-0 md:w-[min(52%,640px)] md:min-h-0"

        >

          <HeroPortrait />

        </motion.div>

      </motion.div>



      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[10px] uppercase tracking-luxe text-ink-soft/80">

        <motion.div

          animate={{ y: [0, 6, 0] }}

          transition={{ duration: 2, repeat: Infinity }}

          className="flex flex-col items-center gap-1.5"

        >

          <span>Scroll</span>

          <span className="h-6 w-px bg-gold/50" />

        </motion.div>

      </div>

    </section>

  );

}

