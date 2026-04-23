/**
 * Placeholder for a 3D Spline scene of a blooming flower.
 * Swap the inner SVG/markup with a <Spline scene="..." /> from @splinetool/react-spline.
 *
 * The visual here is an SVG bloom that mimics the look of a soft-lit
 * 3D flower — petals, gradient core, ground shadow.
 */
const SplineFlower = () => {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      data-spline-placeholder="blooming-flower"
      aria-hidden
    >
      {/* soft ground shadow */}
      <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[55%] h-10 rounded-full blur-2xl bg-foreground/10" />

      <svg
        viewBox="0 0 600 600"
        className="w-[78%] h-[78%] animate-bloom"
        style={{ filter: "drop-shadow(0 30px 40px hsl(0 0% 0% / 0.08))" }}
      >
        <defs>
          <radialGradient id="petal" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="hsl(0 0% 100%)" />
            <stop offset="60%" stopColor="hsl(0 0% 97%)" />
            <stop offset="100%" stopColor="hsl(0 0% 88%)" />
          </radialGradient>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(0 0% 12%)" />
            <stop offset="100%" stopColor="hsl(0 0% 30%)" />
          </radialGradient>
          <linearGradient id="stroke" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(0 0% 85%)" />
            <stop offset="100%" stopColor="hsl(0 0% 95%)" />
          </linearGradient>
        </defs>

        {/* 8 petals around center */}
        <g transform="translate(300 300)">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (360 / 8) * i;
            return (
              <ellipse
                key={i}
                cx="0"
                cy="-130"
                rx="70"
                ry="135"
                fill="url(#petal)"
                stroke="url(#stroke)"
                strokeWidth="1"
                transform={`rotate(${angle})`}
                opacity="0.96"
              />
            );
          })}
          {/* inner petals */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (360 / 6) * i + 30;
            return (
              <ellipse
                key={`i-${i}`}
                cx="0"
                cy="-70"
                rx="44"
                ry="80"
                fill="url(#petal)"
                stroke="url(#stroke)"
                strokeWidth="1"
                transform={`rotate(${angle})`}
              />
            );
          })}
          <circle r="42" fill="url(#core)" />
          <circle r="42" fill="none" stroke="hsl(0 0% 100% / 0.2)" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};

export default SplineFlower;
