const Nav = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl">
      <div className="absolute bottom-0 left-0 right-0 hairline" />
      <nav className="container flex items-center justify-between h-16">
        <a href="#" className="font-serif text-2xl tracking-tightest">
          Blumes<span className="text-muted-foreground">.</span>
        </a>
        <ul className="hidden md:flex items-center gap-10 text-sm">
          <li><a href="#explore" className="hover:opacity-60 transition-opacity">Explore</a></li>
          <li><a href="#collections" className="hover:opacity-60 transition-opacity">Collections</a></li>
          <li><a href="#artists" className="hover:opacity-60 transition-opacity">Artists</a></li>
          <li><a href="#journal" className="hover:opacity-60 transition-opacity">Journal</a></li>
        </ul>
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex h-10 px-5 items-center text-sm rounded-full hover:bg-accent transition-colors">
            Sign in
          </button>
          <button className="h-10 px-5 inline-flex items-center text-sm rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Connect wallet
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
