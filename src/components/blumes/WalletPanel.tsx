const rows = [
  { label: "Item", value: "Lumen no. 04" },
  { label: "Service Fee", value: "0.0021 ETH" },
  { label: "Total", value: "3.2021 ETH" },
];

const WalletPanel = () => {
  return (
    <aside className="rounded-[var(--radius)] bg-background p-8 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">Wallet</span>
        <span className="h-2 w-2 rounded-full bg-foreground" />
      </div>

      <div className="mt-6">
        <p className="font-serif text-3xl tracking-tightest tabular-nums">12.482 ETH</p>
        <p className="text-xs text-muted-foreground mt-1">Available to cultivate</p>
      </div>

      <div className="mt-8 space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{r.label}</span>
            <span className="tabular-nums">{r.value}</span>
          </div>
        ))}
      </div>

      <button className="mt-8 h-12 w-full rounded-full bg-primary text-primary-foreground text-sm shadow-stone shadow-stone-hover">
        Claim
      </button>
      <p className="mt-3 text-[10px] text-center text-muted-foreground tracking-wide">
        One tap. No networks, no signatures shown.
      </p>
    </aside>
  );
};

export default WalletPanel;
