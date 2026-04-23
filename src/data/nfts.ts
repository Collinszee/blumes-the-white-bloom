import nft1 from "@/assets/nft-1.jpg";
import nft2 from "@/assets/nft-2.jpg";
import nft3 from "@/assets/nft-3.jpg";
import nft4 from "@/assets/nft-4.jpg";
import nft5 from "@/assets/nft-5.jpg";
import nft6 from "@/assets/nft-6.jpg";

export type Vibe = "grounded" | "soft" | "electric" | "misty" | "sunlit";

export interface Nft {
  id: string;
  title: string;
  artist: string;
  edition: string;
  price: string;
  image: string;
  vibe: Vibe;
  /** 0 = Grounded, 100 = Electric — used by Mood Spectrum */
  mood: number;
  species: string;
  tags: string[];
}

export const VIBE_LABEL: Record<Vibe, string> = {
  grounded: "Grounded",
  soft: "Soft Bloom",
  electric: "Electric",
  misty: "Misty",
  sunlit: "Sunlit",
};

export const nfts: Nft[] = [
  { id: "1", title: "Lumen no. 04", artist: "Aiko Mori", edition: "Edition 1/8", price: "3.20 ETH", image: nft1, vibe: "misty", mood: 22, species: "Lumen Series", tags: ["Photography", "Botanical"] },
  { id: "2", title: "Quiet Bloom", artist: "Henrik Vass", edition: "1/1", price: "8.40 ETH", image: nft2, vibe: "soft", mood: 38, species: "Quiet Studies", tags: ["1/1", "Botanical"] },
  { id: "3", title: "Soft Body", artist: "Sora Lin", edition: "Edition 2/12", price: "1.95 ETH", image: nft3, vibe: "grounded", mood: 12, species: "Body Field", tags: ["Sculpture"] },
  { id: "4", title: "Pressed Memory", artist: "Imogen Reed", edition: "1/1", price: "5.10 ETH", image: nft4, vibe: "sunlit", mood: 58, species: "Memory Index", tags: ["1/1", "Photography"] },
  { id: "5", title: "Gradient Field", artist: "Noor Hassan", edition: "Open", price: "0.42 ETH", image: nft5, vibe: "electric", mood: 88, species: "Field Studies", tags: ["Generative"] },
  { id: "6", title: "Porcelain Study", artist: "Yves Caron", edition: "Edition 3/8", price: "2.75 ETH", image: nft6, vibe: "misty", mood: 30, species: "Porcelain", tags: ["Sculpture", "Botanical"] },
  { id: "7", title: "Ion Drift", artist: "Mira Okafor", edition: "Edition 4/20", price: "0.88 ETH", image: nft5, vibe: "electric", mood: 95, species: "Ion Series", tags: ["Generative"] },
  { id: "8", title: "Stone Hour", artist: "Yves Caron", edition: "1/1", price: "6.20 ETH", image: nft3, vibe: "grounded", mood: 6, species: "Stone Hours", tags: ["Sculpture"] },
  { id: "9", title: "Petal Index", artist: "Aiko Mori", edition: "Edition 2/8", price: "2.10 ETH", image: nft2, vibe: "soft", mood: 44, species: "Petal Index", tags: ["Botanical"] },
];
