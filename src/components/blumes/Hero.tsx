import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SplineFlower from "./SplineFlower";

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Headline fades & lifts away as the user scrolls
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  // Flower scales up as the user scrolls
  const flowerScale = useTransform(scrollYProgress, [0, 1], [1, 1.9]);
  const flowerOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative h-[180vh] w-full"
      aria-label="Blumes hero"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {/* 3D / Spline stage — sized to never overflow on mobile */}
        <motion.div
          style={{ scale: flowerScale, opacity: flowerOpacity }}
          className="absolute inset-0 flex items-center justify-center will-change-transform"
        >
          <div className="w-[min(72vw,820px)] h-[min(72vw,820px)] sm:w-[min(82vw,820px)] sm:h-[min(82vw,820px)]">
            <SplineFlower />
          </div>
        </motion.div>

        {/* Centered headline overlay */}
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 sm:px-6 will-change-transform"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.32em] text-muted-foreground mb-6 sm:mb-8 animate-fade-in">
            A curated marketplace · Edition 01
          </span>

          <h1 className="font-serif text-foreground text-balance leading-[0.95] tracking-tightest text-[11vw] sm:text-[10vw] md:text-[8.5vw] lg:text-[7.5vw] max-w-[14ch]">
            <span className="block">Where digital</span>
            <span className="block italic font-light">art blooms.</span>
          </h1>

          <p className="mt-6 sm:mt-8 max-w-md text-sm sm:text-base text-muted-foreground text-balance">
            Blumes is a quiet, considered space for collecting the most
            singular pieces in contemporary digital art.
          </p>

          <div className="mt-8 sm:mt-10 w-full max-w-md flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
            <a
              href="#explore"
              className="w-full sm:w-auto py-4 sm:py-0 sm:h-12 sm:px-7 inline-flex items-center justify-center text-sm rounded-full bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Connect Wallet
            </a>
            <a
              href="#artists"
              className="hidden sm:inline-flex h-12 px-7 items-center text-sm rounded-full hover:bg-accent transition-colors shadow-hairline"
            >
              Meet the artists
            </a>
          </div>

          {/* Scroll cue — hide on small screens to clear bottom nav */}
          <div className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll
            <span className="h-10 w-px bg-border" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
