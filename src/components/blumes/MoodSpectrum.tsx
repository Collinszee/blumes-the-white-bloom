import { Slider } from "@/components/ui/slider";

interface Props {
  value: [number, number];
  onChange: (v: [number, number]) => void;
}

const MoodSpectrum = ({ value, onChange }: Props) => {
  return (
    <div className="rounded-[var(--radius)] bg-background p-8 md:p-10 shadow-soft">
      <div className="flex items-end justify-between gap-6 mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            The Mood Spectrum
          </span>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tightest mt-3">
            Slide to feel
          </h2>
        </div>
        <div className="text-right text-xs tabular-nums text-muted-foreground">
          {value[0]}<span className="px-1">—</span>{value[1]}
        </div>
      </div>

      <div
        className="relative h-16 rounded-full overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--vibe-grounded)) 0%, hsl(var(--vibe-soft)) 35%, hsl(var(--vibe-misty)) 60%, hsl(var(--vibe-electric)) 100%)",
          boxShadow: "var(--shadow-hairline)",
        }}
      >
        <div className="absolute inset-0 flex items-center px-6">
          <Slider
            min={0}
            max={100}
            step={1}
            value={value}
            onValueChange={(v) => onChange([v[0], v[1]] as [number, number])}
            className="w-full [&_[role=slider]]:h-7 [&_[role=slider]]:w-7 [&_[role=slider]]:bg-background [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-stone [&>span]:bg-transparent [&_.bg-primary]:bg-foreground/10"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        <span>Grounded</span>
        <span>Soft</span>
        <span>Misty</span>
        <span>Electric</span>
      </div>
    </div>
  );
};

export default MoodSpectrum;
