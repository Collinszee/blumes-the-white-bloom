import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type Vibe = "grounded" | "soft" | "electric" | "misty" | "sunlit";
const VIBES: Vibe[] = ["grounded", "soft", "electric", "misty", "sunlit"];

interface Props {
  onPlanted?: () => void;
}

const PlantingZone = ({ onPlanted }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isOver, setIsOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [species, setSpecies] = useState("");
  const [vibe, setVibe] = useState<Vibe>("soft");
  const [planting, setPlanting] = useState(false);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  }, []);

  const plant = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (!file || !title.trim()) {
      toast.error("Add an image and a title to plant.");
      return;
    }
    setPlanting(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("nft-images")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from("nft-images").getPublicUrl(path);

      const { error: insErr } = await supabase.from("nft_metadata").insert({
        owner_id: user.id,
        title: title.trim(),
        artist: user.email?.split("@")[0] ?? "Anonymous",
        edition: "1/1",
        image_url: pub.publicUrl,
        storage_path: path,
        vibe,
        mood: vibe === "electric" ? 88 : vibe === "grounded" ? 12 : 50,
        species: species.trim() || "Untitled Series",
        tags: [],
      });
      if (insErr) throw insErr;

      toast.success("Planted. Your bloom is in the garden.");
      setFile(null);
      setTitle("");
      setSpecies("");
      setVibe("soft");
      onPlanted?.();
    } catch (err: any) {
      toast.error(err.message ?? "Could not plant. Try again.");
    } finally {
      setPlanting(false);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={onDrop}
      className={
        "relative w-full rounded-[var(--radius)] bg-background p-12 md:p-16 transition-all duration-500 " +
        (isOver ? "scale-[1.01]" : "")
      }
      style={{
        border: "1px dashed hsl(var(--border))",
        boxShadow: isOver ? "var(--shadow-float)" : "var(--shadow-soft)",
      }}
    >
      <div className="text-center">
        <motion.div
          animate={{ y: isOver ? -4 : 0 }}
          className="mx-auto mb-6 h-12 w-12 rounded-full flex items-center justify-center shadow-stone"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" />
          </svg>
        </motion.div>
        <h3 className="font-serif text-3xl tracking-tightest">The Planting Zone</h3>
        <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
          Drop your image to plant a new bloom. We'll handle the rest —
          no chains, no gas, no friction.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <label className="h-11 px-6 inline-flex items-center text-sm rounded-full bg-primary text-primary-foreground cursor-pointer shadow-stone shadow-stone-hover">
            Choose a file
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          <span className="text-xs text-muted-foreground">or drag & drop</span>
        </div>
      </div>

      <AnimatePresence>
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-10 max-w-md mx-auto space-y-5"
          >
            <div className="flex items-center gap-4 px-4 h-12 rounded-full shadow-hairline">
              <span className="h-2 w-2 rounded-full bg-foreground" />
              <span className="text-sm truncate flex-1">{file.name}</span>
              <button
                onClick={() => setFile(null)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Remove
              </button>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Lumen no. 05"
                className="mt-2 w-full h-12 px-4 rounded-full bg-background shadow-hairline focus:outline-none focus:shadow-stone text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Species</label>
              <input
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                placeholder="Lumen Series"
                className="mt-2 w-full h-12 px-4 rounded-full bg-background shadow-hairline focus:outline-none focus:shadow-stone text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Vibe</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {VIBES.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVibe(v)}
                    className={
                      "h-9 px-4 rounded-full text-xs capitalize transition-all " +
                      (vibe === v
                        ? "bg-primary text-primary-foreground shadow-stone"
                        : "shadow-hairline hover:shadow-soft text-muted-foreground")
                    }
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={plant}
              disabled={planting}
              className="h-12 w-full rounded-full bg-primary text-primary-foreground text-sm shadow-stone shadow-stone-hover disabled:opacity-60"
            >
              {planting ? "Planting…" : user ? "Plant bloom" : "Sign in to plant"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlantingZone;
