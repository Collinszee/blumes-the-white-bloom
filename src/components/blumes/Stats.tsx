const stats = [
  { k: "1,240", v: "Curated works" },
  { k: "318", v: "Resident artists" },
  { k: "12.4k", v: "Collectors" },
  { k: "8,902 ETH", v: "Volume traded" },
];

const Stats = () => (
  <section className="bg-background py-24">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden shadow-soft">
        {stats.map((s) => (
          <div key={s.v} className="bg-background p-10 text-center">
            <p className="font-serif text-4xl md:text-5xl tracking-tightest">{s.k}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              {s.v}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
