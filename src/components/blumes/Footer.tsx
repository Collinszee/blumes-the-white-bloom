const Footer = () => (
  <footer className="bg-background pt-24 pb-12">
    <div className="container">
      <div className="rounded-lg shadow-soft p-12 md:p-16 text-center">
        <h2 className="font-serif text-4xl md:text-6xl tracking-tightest leading-[1.02] text-balance max-w-3xl mx-auto">
          Receive new drops in <em className="font-light">quiet</em>.
        </h2>
        <p className="mt-5 text-muted-foreground max-w-md mx-auto">
          One letter, every Friday. Curated works, artist notes, and early access.
        </p>
        <form className="mt-10 mx-auto max-w-md flex items-center gap-2 rounded-full p-2 shadow-hairline">
          <input
            type="email"
            placeholder="you@studio.com"
            className="flex-1 bg-transparent px-5 h-11 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button className="h-11 px-6 rounded-full bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity">
            Subscribe
          </button>
        </form>
      </div>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        <div>
          <p className="font-serif text-2xl tracking-tightest">Blumes.</p>
          <p className="mt-3 text-muted-foreground max-w-[18ch]">
            A quiet place for digital art.
          </p>
        </div>
        {[
          { title: "Marketplace", links: ["Explore", "Drops", "Activity", "Rankings"] },
          { title: "Studio", links: ["Artists", "Submit", "Residencies", "Press"] },
          { title: "About", links: ["Manifesto", "Journal", "Contact", "Terms"] },
        ].map((col) => (
          <div key={col.title}>
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-5">
              {col.title}
            </p>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:opacity-60 transition-opacity">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="hairline mt-16" />
      <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Blumes Atelier. All works belong to their authors.</p>
        <p className="tracking-[0.2em] uppercase">Made with care · Berlin</p>
      </div>
    </div>
  </footer>
);

export default Footer;
