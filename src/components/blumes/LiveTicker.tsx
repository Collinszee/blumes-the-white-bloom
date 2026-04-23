const items = [
  "Aiko Mori minted 'Lumen no. 05'",
  "Quiet Bloom cultivated for 8.40 ETH",
  "Sora Lin watered 'Soft Body' 12 times",
  "New species: Porcelain II opens Friday",
  "Imogen Reed listed 'Pressed Memory'",
  "Noor Hassan released 'Ion Drift' open edition",
  "Petal Index 03 just bloomed in The Garden",
  "Yves Caron is planting now",
];

const LiveTicker = () => {
  const loop = [...items, ...items];
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 h-9 overflow-hidden bg-background/80 backdrop-blur-xl"
      style={{ borderTop: "1px solid hsl(var(--border))" }}
    >
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center gap-2 pr-6 bg-background/90">
        <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: "#A1A1A1" }}>
          Live Greenhouse
        </span>
        <span className="ml-2 h-4 w-px bg-border" />
      </div>
      <div className="h-full flex items-center pl-44">
        <div className="flex gap-12 whitespace-nowrap animate-ticker">
          {loop.map((t, i) => (
            <span key={i} className="text-xs" style={{ color: "#A1A1A1" }}>
              · {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveTicker;
