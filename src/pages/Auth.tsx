import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/garden", { replace: true });
  }, [user, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/garden` },
        });
        if (error) throw error;
        toast.success("Welcome to Blumes. Your garden is ready.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back.");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const connectWallet = async () => {
    toast("Wallet sign-in is being cultivated. For now, plant your seed with email.", {
      description: "Privy/Dynamic integration coming soon.",
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="font-serif text-2xl tracking-tightest block text-center">
          Blumes<span className="text-muted-foreground">.</span>
        </Link>

        <div className="mt-12 rounded-[var(--radius)] bg-background p-10 shadow-soft">
          <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            {mode === "signup" ? "Plant a seed" : "Return to garden"}
          </span>
          <h1 className="font-serif text-4xl tracking-tightest mt-3">
            {mode === "signup" ? "Begin." : "Welcome back."}
          </h1>
          <p className="text-sm text-muted-foreground mt-3">
            {mode === "signup"
              ? "An email is all you need. No wallets, no gas, no friction."
              : "Sign in to tend your garden."}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full h-12 px-4 rounded-full bg-background shadow-hairline focus:outline-none focus:shadow-stone text-sm"
                placeholder="you@studio.com"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full h-12 px-4 rounded-full bg-background shadow-hairline focus:outline-none focus:shadow-stone text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="h-12 w-full rounded-full bg-primary text-primary-foreground text-sm shadow-stone shadow-stone-hover disabled:opacity-60"
            >
              {submitting ? "Cultivating…" : mode === "signup" ? "Begin" : "Sign in"}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 hairline" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">or</span>
            <div className="flex-1 hairline" />
          </div>

          <button
            onClick={connectWallet}
            className="h-12 w-full rounded-full bg-background text-sm shadow-hairline hover:shadow-soft transition-shadow"
          >
            Connect wallet
          </button>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            {mode === "signup" ? "Already growing? " : "New here? "}
            <button
              onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {mode === "signup" ? "Sign in" : "Plant a seed"}
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          One tap. No signatures shown.
        </p>
      </motion.div>
    </main>
  );
};

export default Auth;
