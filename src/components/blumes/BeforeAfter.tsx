import { useRef, useState } from "react";

interface Props {
  before: string;
  after: string;
  alt?: string;
}

const BeforeAfter = ({ before, after, alt = "" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);

  const update = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius)] bg-muted select-none"
      onMouseMove={(e) => drag && update(e.clientX)}
      onMouseUp={() => setDrag(false)}
      onMouseLeave={() => setDrag(false)}
      onTouchMove={(e) => update(e.touches[0].clientX)}
    >
      <img src={after} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={before}
          alt={alt}
          className="h-full object-cover"
          style={{ width: `${ref.current?.clientWidth ?? 0}px`, maxWidth: "none" }}
        />
      </div>

      <div
        className="absolute top-0 bottom-0 w-px bg-background"
        style={{ left: `${pos}%`, boxShadow: "0 0 0 1px hsl(0 0% 0% / 0.06)" }}
      >
        <button
          onMouseDown={() => setDrag(true)}
          onTouchStart={() => setDrag(true)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background shadow-stone cursor-ew-resize flex items-center justify-center"
          aria-label="Drag to compare"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 text-[10px] uppercase tracking-[0.2em] shadow-hairline">
        Before
      </span>
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-background/90 text-[10px] uppercase tracking-[0.2em] shadow-hairline">
        After
      </span>
    </div>
  );
};

export default BeforeAfter;
