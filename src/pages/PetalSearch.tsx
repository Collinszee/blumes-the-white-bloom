import Nav from "@/components/blumes/Nav";
import Footer from "@/components/blumes/Footer";
import LiveTicker from "@/components/blumes/LiveTicker";
import MoodSpectrum from "@/components/blumes/MoodSpectrum";
import SmartPreviewModal from "@/components/blumes/SmartPreviewModal";
import { nfts, Nft } from "@/data/nfts";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PetalSearch = () => {
  const [range, setRange] = useState<[number, number]>([0, 100]);
  const [active, setActive] = useState<Nft | null>(null);

  const filtered = useMemo(
    () => nfts.filter((n) => n.mood >= range[0] && n.mood <= range[1]),
    [range],
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="container pt-32 pb-10">
        <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Discover · Petal Search
        </span>
        <h1 className="font-serif text-6xl md:text-7xl tracking-tightest leading-[0.95] mt-4">
          Find by feeling
        </h1>
        <p className="text-muted-foreground mt-4 max-w-md">
          Skip categories. Pull the spectrum and watch the garden re-arrange in real time.
        </p>
      </section>

      <section className="container pb-12">
        <MoodSpectrum value={range} onChange={setRange} />
      </section>

      <section className="container pb-32">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs text-muted-foreground tabular-nums">
            {filtered.length} works in this mood
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((n, i) => (
              <motion.button
                layout
                key={n.id}
                onClick={() => setActive(n)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="text-left group rounded-[var(--radius)] p-4 bg-background shadow-stone shadow-stone-hover"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-md bg-muted">
                  <img
                    src={n.image}
                    alt={n.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pt-4 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg leading-tight tracking-tight truncate">{n.title}</h3>
                    <p className="text-[11px] text-muted-foreground truncate mt-1">
                      {n.species} · mood {n.mood}
                    </p>
                  </div>
                  <span
                    className="h-2.5 w-2.5 rounded-full shadow-hairline shrink-0"
                    style={{ background: `hsl(var(--vibe-${n.vibe}))` }}
                  />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20 text-sm">
            Nothing in this mood yet. Try widening the spectrum.
          </p>
        )}
      </section>

      <Footer />
      <LiveTicker />
      <SmartPreviewModal nft={active} onOpenChange={(o) => !o && setActive(null)} />
    </main>
  );
};

export default PetalSearch;
