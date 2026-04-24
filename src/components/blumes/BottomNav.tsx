import { NavLink, useLocation } from "react-router-dom";
import { Home, Store, Users, Flower2 } from "lucide-react";

const items = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/petal-search", label: "Market", Icon: Store },
  { to: "/greenhouse", label: "Feed", Icon: Users },
  { to: "/garden", label: "Collection", Icon: Flower2 },
];

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl"
      style={{
        borderTop: "1px solid hsl(var(--border))",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      aria-label="Primary"
    >
      <ul className="grid grid-cols-4 h-16">
        {items.map(({ to, label, Icon }) => {
          const active = pathname === to;
          return (
            <li key={to} className="flex">
              <NavLink
                to={to}
                className={
                  "flex-1 flex flex-col items-center justify-center gap-1 transition-colors active:scale-95 transition-transform " +
                  (active ? "text-foreground" : "text-muted-foreground")
                }
              >
                <Icon
                  size={22}
                  strokeWidth={1}
                  color={active ? "hsl(var(--foreground))" : "hsl(0 0% 40%)"}
                />
                <span className="text-[10px] tracking-[0.18em] uppercase">
                  {label}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
