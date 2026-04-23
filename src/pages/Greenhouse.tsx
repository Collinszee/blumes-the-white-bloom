import Nav from "@/components/blumes/Nav";
import Footer from "@/components/blumes/Footer";
import LiveTicker from "@/components/blumes/LiveTicker";
import WaterButton from "@/components/blumes/WaterButton";
import BeforeAfter from "@/components/blumes/BeforeAfter";
import { nfts } from "@/data/nfts";
import { useState } from "react";
import { motion } from "framer-motion";

interface Story {
  id: string;
  artist: string;
  handle: string;
  time: string;
  caption: string;
  image: string;
  type: "story" | "wip";
  before?: string;
  after?: string;
  waters: number;
}

const initial: Story[] = [
  { id: "s1", artist: "Aiko Mori", handle: "@aiko", time: "2h", caption: "Morning light through the studio. New petals forming.", image: nfts[0].image, type: "story", waters: 124 },
  { id: "s2", artist: "Sora Lin", handle: "@sora", time: "5h", caption: "Reworking the gradient pass. Curious how this lands.", image: nfts[1].image, before: nfts[2].image, after: nfts[1].image, type: "wip", waters: 67 },
  { id: "s3", artist: "Noor Hassan", handle: "@noor", time: "yesterday", caption: "Drop opens Friday. Open edition for the field.", image: nfts[4].image, type: "story", waters: 412 },
  { id: "s4", artist: "Imogen Reed", handle: "@imogen", time: "2d", caption: "Iteration 04 → 05. Same memory, softer hand.", image: nfts[3].image, before: nfts[5].image, after: nfts[3].image, type: "wip", waters: 89 },
];

const Greenhouse = () => {
  const [stories, setStories] = useState(initial);

  const water = (id: string) =>
    setStories((s) => s.map((x) => (x.id === id ? { ...x, waters: x.waters + 1 } : x)));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="container pt-32 pb-12 max-w-2xl">
        <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Social · Greenhouse
        </span>
        <h1 className="font-serif text-5xl md:text-6xl tracking-tightest leading-[0.95] mt-4">
          The Greenhouse
        </h1>
        <p className="text-muted-foreground mt-4">
          Micro-stories from artists you cultivate. Quiet, slow, alive.
        </p>
      </section>

      <section className="container max-w-2xl space-y-10 pb-32">
        {stories.map((s, i) => (
          <motion.article
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="rounded-[var(--radius)] bg-background p-6 shadow-soft"
          >
            <header className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-muted shadow-hairline" />
                <div>
                  <p className="text-sm">{s.artist}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {s.handle} · {s.time}
                  </p>
                </div>
              </div>
              {s.type === "wip" && (
                <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground px-3 py-1 rounded-full shadow-hairline">
                  Work in progress
                </span>
              )}
            </header>

            {s.type === "wip" && s.before && s.after ? (
              <BeforeAfter before={s.before} after={s.after} alt={s.caption} />
            ) : (
              <div className="aspect-[4/5] w-full overflow-hidden rounded-[var(--radius)] bg-muted">
                <img src={s.image} alt={s.caption} className="h-full w-full object-cover" />
              </div>
            )}

            <p className="mt-5 text-sm leading-relaxed">{s.caption}</p>

            <div className="mt-5 flex items-center justify-between">
              <WaterButton count={s.waters} onWater={() => water(s.id)} />
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Reply · Share
              </button>
            </div>
          </motion.article>
        ))}
      </section>

      <Footer />
      <LiveTicker />
    </main>
  );
};

export default Greenhouse;
