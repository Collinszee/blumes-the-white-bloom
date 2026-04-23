import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PlantingZone = () => {
  const [isOver, setIsOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  }, []);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={onDrop}
      className={
        "relative w-full rounded-[var(--radius)] bg-background p-12 md:p-16 text-center transition-all duration-500 " +
        (isOver ? "scale-[1.01]" : "")
      }
      style={{
        border: "1px dashed hsl(var(--border))",
        boxShadow: isOver ? "var(--shadow-float)" : "var(--shadow-soft)",
      }}
    >
      <motion.div
        animate={{ y: isOver ? -4 : 0 }}
        className="mx-auto mb-6 h-12 w-12 rounded-full flex items-center justify-center shadow-stone"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" />
        </svg>
      </motion.div>
      <h3 className="font-serif text-3xl tracking-tightest">The Planting Zone</h3>
      <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
        Drop your image, video, or 3D file to plant a new bloom. We'll handle the rest —
        no chains, no gas, no friction.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <label className="h-11 px-6 inline-flex items-center text-sm rounded-full bg-primary text-primary-foreground cursor-pointer shadow-stone shadow-stone-hover">
          Choose a file
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
        <span className="text-xs text-muted-foreground">or drag & drop</span>
      </div>

      <AnimatePresence>
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 inline-flex items-center gap-3 px-4 h-10 rounded-full shadow-hairline"
          >
            <span className="h-2 w-2 rounded-full bg-foreground" />
            <span className="text-sm">{file.name}</span>
            <span className="text-xs text-muted-foreground">ready to plant</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlantingZone;
