import Nav from "@/components/blumes/Nav";
import Footer from "@/components/blumes/Footer";
import LiveTicker from "@/components/blumes/LiveTicker";
import PlantingZone from "@/components/blumes/PlantingZone";
import WalletPanel from "@/components/blumes/WalletPanel";
import SmartPreviewModal from "@/components/blumes/SmartPreviewModal";
import { nfts, VIBE_LABEL, Vibe, Nft } from "@/data/nfts";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Mode = "vibe" | "color";

const colorOf = (v: Vibe) => `hsl(var(--vibe-${v}))`;

const Garden = () => {
  const [mode, setMode] = useState<Mode>("vibe");
  const [active, setActive] = useState<Nft | null>(null);

  const owned = nfts.slice(0, 7);

  const groups = useMemo(() => {
    const by: Record<string, Nft[]> = {};
    owned.forEach((n) => {
      const key = n.vibe;
      (by[key] ||= []).push(n);
    });
    return by;
  }, [owned]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="container pt-32 pb-12">
        <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Personal · Garden
        </span>
        <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h1 className="font-serif text-6xl md:text-7xl tracking-tightest leading-[0.95]">
            Your Garden
          </h1>
          <p className="md:max-w-sm text-muted-foreground">
            A living index of what you've collected — sorted by feeling, not by date.
          </p>
        </div>
      </section>

      <section className="container grid lg:grid-cols-[1fr_360px] gap-10 pb-24">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="inline-flex rounded-full p-1 shadow-hairline">
              {(["vibe", "color"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={
                    "h-9 px-5 rounded-full text-xs uppercase tracking-[0.2em] transition-colors " +
                    (mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent")
                  }
                >
                  By {m}
                </button>
              ))}
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">
              {owned.length} blooms
            </span>
          </div>

          <div className="space-y-12">
            {Object.entries(groups).map(([vibe, items]) => (
              <div key={vibe}>
                <div className="flex items-center gap-4 mb-5">
                  <span
                    className="h-3 w-3 rounded-full shadow-hairline"
                    style={{ background: colorOf(vibe as Vibe) }}
                  />
                  <h3 className="font-serif text-2xl tracking-tightest">
                    {VIBE_LABEL[vibe as Vibe]}
                  </h3>
                  <span className="text-xs text-muted-foreground">{items.length}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                  {items.map((n, i) => (
                    <motion.button
                      key={n.id}
                      onClick={() => setActive(n)}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.5 }}
                      className="text-left group rounded-[var(--radius)] p-3 bg-background shadow-stone shadow-stone-hover"
                    >
                      <div
                        className="aspect-square w-full rounded-md overflow-hidden mb-3"
                        style={{ background: mode === "color" ? colorOf(n.vibe) : undefined }}
                      >
                        <img
                          src={n.image}
                          alt={n.title}
                          className={
                            "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] " +
                            (mode === "color" ? "mix-blend-multiply" : "")
                          }
                        />
                      </div>
                      <p className="font-serif text-sm leading-tight tracking-tight truncate">{n.title}</p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1 truncate">
                        {n.species}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <PlantingZone />
          </div>
        </div>

        <div className="lg:sticky lg:top-24 self-start">
          <WalletPanel />
        </div>
      </section>

      <Footer />
      <LiveTicker />
      <SmartPreviewModal nft={active} onOpenChange={(o) => !o && setActive(null)} />
    </main>
  );
};

export default Garden;
