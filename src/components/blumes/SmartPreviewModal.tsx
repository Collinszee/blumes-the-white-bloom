import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Nft } from "@/data/nfts";

interface Props {
  nft: Nft | null;
  onOpenChange: (open: boolean) => void;
}

const SmartPreviewModal = ({ nft, onOpenChange }: Props) => {
  return (
    <Dialog open={!!nft} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl border-0 bg-background p-0 shadow-lift overflow-hidden rounded-[var(--radius)]"
        // dim backdrop to 40% — overlay handled via global override below
      >
        <VisuallyHidden>
          <DialogTitle>{nft?.title}</DialogTitle>
          <DialogDescription>{nft?.species}</DialogDescription>
        </VisuallyHidden>
        {nft && (
          <div className="grid md:grid-cols-[1.2fr_1fr]">
            <div className="bg-muted aspect-square md:aspect-auto">
              <img src={nft.image} alt={nft.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-10 flex flex-col justify-between gap-10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                  Collection · {nft.species}
                </span>
                <h2 className="font-serif text-4xl mt-4 tracking-tightest leading-[1.05]">
                  {nft.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-2">by {nft.artist}</p>

                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Edition</p>
                    <p className="mt-1">{nft.edition}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Floor</p>
                    <p className="mt-1 tabular-nums">{nft.price}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Vibe</p>
                    <p className="mt-1 capitalize">{nft.vibe}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Service Fee</p>
                    <p className="mt-1 tabular-nums">0.0021 ETH</p>
                  </div>
                </div>
              </div>

              <button className="h-12 w-full rounded-full bg-primary text-primary-foreground text-sm tracking-wide shadow-stone shadow-stone-hover active:scale-[0.98] transition-transform">
                Buy
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SmartPreviewModal;
