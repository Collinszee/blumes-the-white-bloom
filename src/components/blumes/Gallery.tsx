import NftCard, { Nft } from "./NftCard";
import nft1 from "@/assets/nft-1.jpg";
import nft2 from "@/assets/nft-2.jpg";
import nft3 from "@/assets/nft-3.jpg";
import nft4 from "@/assets/nft-4.jpg";
import nft5 from "@/assets/nft-5.jpg";
import nft6 from "@/assets/nft-6.jpg";

const nfts: Nft[] = [
  { id: "1", title: "Lumen no. 04", artist: "Aiko Mori", edition: "Edition 1/8", price: "3.20 ETH", image: nft1 },
  { id: "2", title: "Quiet Bloom", artist: "Henrik Vass", edition: "1/1", price: "8.40 ETH", image: nft2 },
  { id: "3", title: "Soft Body", artist: "Sora Lin", edition: "Edition 2/12", price: "1.95 ETH", image: nft3 },
  { id: "4", title: "Pressed Memory", artist: "Imogen Reed", edition: "1/1", price: "5.10 ETH", image: nft4 },
  { id: "5", title: "Gradient Field", artist: "Noor Hassan", edition: "Open", price: "0.42 ETH", image: nft5 },
  { id: "6", title: "Porcelain Study", artist: "Yves Caron", edition: "Edition 3/8", price: "2.75 ETH", image: nft6 },
];

const filters = ["All", "Photography", "Generative", "Sculpture", "Botanical", "1/1"];

const Gallery = () => {
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

        {/* Filter row */}
        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((f, i) => (
            <button
              key={f}
              className={
                "h-10 px-5 rounded-full text-sm transition-all " +
                (i === 0
                  ? "bg-primary text-primary-foreground"
                  : "shadow-hairline hover:bg-accent")
              }
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {nfts.map((nft, i) => (
            <NftCard key={nft.id} nft={nft} index={i} />
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button className="h-12 px-8 inline-flex items-center text-sm rounded-full shadow-hairline hover:bg-accent transition-colors">
            Load more works
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
