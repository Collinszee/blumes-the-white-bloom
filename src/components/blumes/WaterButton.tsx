import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  count: number;
  onWater: () => void;
}

const WaterButton = ({ count, onWater }: Props) => {
  const [pulse, setPulse] = useState(0);
  const [petals, setPetals] = useState<number[]>([]);

  const handle = () => {
    onWater();
    setPulse((p) => p + 1);
    const ids = [Date.now(), Date.now() + 1, Date.now() + 2];
    setPetals((p) => [...p, ...ids]);
    setTimeout(() => {
      setPetals((p) => p.filter((id) => !ids.includes(id)));
    }, 1500);
  };

  return (
    <div className="relative inline-flex">
      <button
        key={pulse}
        onClick={handle}
        className="relative h-10 px-5 inline-flex items-center gap-2 rounded-full bg-background text-sm shadow-stone shadow-stone-hover animate-pearl"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3s6 7 6 12a6 6 0 11-12 0c0-5 6-12 6-12z" />
        </svg>
        <span>Water</span>
        <span className="text-muted-foreground tabular-nums">{count}</span>
      </button>

      <AnimatePresence>
        {petals.map((id, i) => (
          <motion.span
            key={id}
            className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
            style={{
              background:
                i % 2 === 0
                  ? "hsl(var(--vibe-soft))"
                  : "hsl(var(--vibe-electric))",
              ["--tx" as string]: `${(i - 1) * 24}px`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="block h-full w-full rounded-full animate-petal" />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WaterButton;
