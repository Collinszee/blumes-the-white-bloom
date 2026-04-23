const artists = [
  { name: "Aiko Mori", city: "Tokyo", works: 24 },
  { name: "Henrik Vass", city: "Copenhagen", works: 11 },
  { name: "Sora Lin", city: "Taipei", works: 36 },
  { name: "Imogen Reed", city: "London", works: 9 },
  { name: "Noor Hassan", city: "Cairo", works: 18 },
];

const Artists = () => (
  <section id="artists" className="bg-background py-32">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
        <div>
          <span className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
            In residence
          </span>
          <h2 className="font-serif mt-4 text-5xl md:text-6xl tracking-tightest leading-[1.02]">
            Featured artists
          </h2>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden shadow-soft">
        {artists.map((a, i) => (
          <a
            key={a.name}
            href="#"
            className="group flex items-center justify-between gap-6 px-6 md:px-10 py-8 bg-background hover:bg-muted transition-colors"
            style={{ borderTop: i === 0 ? "none" : "1px solid hsl(var(--border))" }}
          >
            <div className="flex items-center gap-6 min-w-0">
              <span className="text-xs tabular-nums text-muted-foreground w-8">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-3xl md:text-5xl tracking-tightest truncate transition-transform duration-500 group-hover:translate-x-2">
                {a.name}
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-10 text-sm text-muted-foreground shrink-0">
              <span>{a.city}</span>
              <span className="tabular-nums">{a.works} works</span>
              <span aria-hidden className="text-foreground">→</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Artists;
