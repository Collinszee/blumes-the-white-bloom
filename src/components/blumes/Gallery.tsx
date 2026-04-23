import { useState } from "react";
import { motion } from "framer-motion";
import { nfts, Nft } from "@/data/nfts";
import SmartPreviewModal from "./SmartPreviewModal";

const filters = ["All", "Photography", "Generative", "Sculpture", "Botanical", "1/1"];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<Nft | null>(null);

  const visible = filter === "All" ? nfts : nfts.filter((n) => n.tags.includes(filter));

  return (
    <section id="explore" className="relative bg-background py-32">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Curated · Spring drop
            </span>
            <h2 className="font-serif mt-4 text-5xl md:text-6xl tracking-tightest leading-[1.02]">
              The Gallery
            </h2>
          </div>
          <p className="md:max-w-sm text-muted-foreground text-balance">
            A rotating selection of works from emerging and established
            digital artists, refreshed each Friday.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "h-10 px-5 rounded-full text-sm transition-all " +
                (filter === f
                  ? "bg-primary text-primary-foreground shadow-stone"
                  : "shadow-hairline hover:bg-accent")
              }
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {visible.map((nft, i) => (
            <motion.button
              key={nft.id}
              onClick={() => setActive(nft)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="text-left group relative bg-card rounded-lg p-5 transition-shadow duration-500 ease-out shadow-soft hover:shadow-lift cursor-pointer"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-muted">
                <img
                  src={nft.image}
                  alt={`${nft.title} by ${nft.artist}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-[10px] uppercase tracking-[0.2em] text-foreground shadow-hairline">
                  {nft.edition}
                </div>
              </div>

              <div className="pt-5 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-serif text-xl leading-tight tracking-tight truncate">
                    {nft.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground truncate">
                    by {nft.artist}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Floor
                  </p>
                  <p className="font-sans text-sm font-medium tabular-nums">
                    {nft.price}
                  </p>
                </div>
              </div>

              <div className="mt-4 overflow-hidden">
                <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <span className="block w-full h-10 rounded-full bg-primary text-primary-foreground text-xs tracking-wide leading-10 text-center shadow-stone">
                    Smart Preview
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button className="h-12 px-8 inline-flex items-center text-sm rounded-full shadow-hairline hover:bg-accent transition-colors">
            Load more works
          </button>
        </div>
      </div>

      <SmartPreviewModal nft={active} onOpenChange={(o) => !o && setActive(null)} />
    </section>
  );
};

export default Gallery;
