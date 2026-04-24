import Nav from "@/components/blumes/Nav";
import Footer from "@/components/blumes/Footer";
import LiveTicker from "@/components/blumes/LiveTicker";
import PlantingZone from "@/components/blumes/PlantingZone";
import WalletPanel from "@/components/blumes/WalletPanel";
import SmartPreviewModal from "@/components/blumes/SmartPreviewModal";
import { VIBE_LABEL, Vibe, Nft, nfts as fallbackNfts } from "@/data/nfts";
import { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type Mode = "vibe" | "color";

const colorOf = (v: Vibe) => `hsl(var(--vibe-${v}))`;

const Garden = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>("vibe");
  const [active, setActive] = useState<Nft | null>(null);
  const [owned, setOwned] = useState<Nft[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("nft_metadata")
      .select("*")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

    if (error || !data) {
      setOwned([]);
    } else {
      setOwned(
        data.map((row) => ({
          id: row.id,
          title: row.title,
          artist: row.artist,
          edition: row.edition,
          price: row.price ?? "—",
          image: row.image_url,
          vibe: row.vibe as Vibe,
          mood: row.mood,
          species: row.species ?? "Untitled",
          tags: row.tags ?? [],
        }))
      );
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const groups = useMemo(() => {
    const by: Record<string, Nft[]> = {};
    owned.forEach((n) => {
      const key = n.vibe;
      (by[key] ||= []).push(n);
    });
    return by;
  }, [owned]);

  if (authLoading || !user) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <span className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
          Cultivating…
        </span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="container pt-28 md:pt-32 pb-8 md:pb-12">
        <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Personal · Collection
        </span>
        <div className="mt-3 md:mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tightest leading-[0.95]">
            My Collection
          </h1>
          <p className="md:max-w-sm text-sm md:text-base text-muted-foreground">
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

          {loading ? (
            <div className="py-20 text-center text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Loading garden…
            </div>
          ) : owned.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-serif text-3xl tracking-tightest">An empty garden.</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Plant your first bloom below to begin.
              </p>
            </div>
          ) : (
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

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                    {items.map((n, i) => (
                      <motion.button
                        key={n.id}
                        onClick={() => setActive(n)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ delay: i * 0.04, duration: 0.5 }}
                        className="text-center sm:text-left group rounded-[var(--radius)] p-3 bg-background shadow-stone shadow-stone-hover active:shadow-float"
                      >
                        <div
                          className="aspect-square w-full rounded-md overflow-hidden mb-3"
                          style={{ background: mode === "color" ? colorOf(n.vibe) : undefined }}
                        >
                          <img
                            src={n.image}
                            alt={n.title}
                            className={
                              "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] group-active:scale-[1.02] " +
                              (mode === "color" ? "mix-blend-multiply" : "")
                            }
                          />
                        </div>
                        <p className="font-serif text-[13px] sm:text-sm leading-tight tracking-tight truncate">{n.title}</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1 truncate">
                          {n.species}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-20">
            <PlantingZone onPlanted={load} />
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
