import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const links = [
  { to: "/petal-search", label: "Petal Search" },
  { to: "/greenhouse", label: "Greenhouse" },
  { to: "/garden", label: "Garden" },
];

const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const onWallet = () => {
    toast("Wallet sign-in is being cultivated.", {
      description: "For now, plant your seed with email.",
    });
    navigate("/auth");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl">
      <div className="absolute bottom-0 left-0 right-0 hairline" />
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="font-serif text-2xl tracking-tightest">
          Blumes<span className="text-muted-foreground">.</span>
        </Link>
        <ul className="hidden md:flex items-center gap-10 text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  "transition-opacity " + (isActive || pathname === l.to ? "opacity-100" : "opacity-60 hover:opacity-100")
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:inline text-xs text-muted-foreground truncate max-w-[140px]">
                {user.email}
              </span>
              <button
                onClick={async () => {
                  await signOut();
                  navigate("/");
                }}
                className="h-10 px-5 inline-flex items-center text-sm rounded-full hover:bg-accent transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="hidden sm:inline-flex h-10 px-5 items-center text-sm rounded-full hover:bg-accent transition-colors"
              >
                Sign in
              </Link>
              <button
                onClick={onWallet}
                className="h-10 px-5 inline-flex items-center text-sm rounded-full bg-primary text-primary-foreground shadow-stone shadow-stone-hover"
              >
                Connect wallet
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
