import { motion } from "framer-motion";

export interface Nft {
  id: string;
  title: string;
  artist: string;
  edition: string;
  price: string;
  image: string;
}

interface Props {
  nft: Nft;
  index?: number;
}

const NftCard = ({ nft, index = 0 }: Props) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      className="group relative bg-card rounded-lg p-5 transition-shadow duration-500 ease-out shadow-soft hover:shadow-lift cursor-pointer"
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

      {/* hover-only CTA */}
      <div className="mt-4 overflow-hidden">
        <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <button className="w-full h-10 rounded-full bg-primary text-primary-foreground text-xs tracking-wide hover:opacity-90 transition-opacity">
            Place a bid
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default NftCard;
