import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  count: number;
  onWater: () => void;
}

const WaterButton = ({ count, onWater }: Props) => {
  const [pulse, setPulse] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bursts, setBursts] = useState<number[]>([]);

  const handle = () => {
    onWater();
    setLiked(true);
    setPulse((p) => p + 1);
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => {
      setBursts((b) => b.filter((x) => x !== id));
    }, 900);
  };

  return (
    <div className="relative inline-flex">
      <button
        key={pulse}
        onClick={handle}
        aria-pressed={liked}
        aria-label="Like"
        className="relative h-10 px-5 inline-flex items-center gap-2 rounded-full bg-background text-sm shadow-stone shadow-stone-hover animate-pearl active:scale-[0.97] transition-transform"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
        <span>Like</span>
        <span className="text-muted-foreground tabular-nums">{count}</span>
      </button>

      <AnimatePresence>
        {bursts.map((id) => (
          <motion.span
            key={id}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.6, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -18 }}
            exit={{ opacity: 0, y: -28 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-foreground"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WaterButton;
