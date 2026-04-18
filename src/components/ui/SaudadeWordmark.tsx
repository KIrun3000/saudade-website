"use client";

/**
 * SAUDADE wordmark — pure inline SVG so the mandala can be placed with
 * pixel-perfect accuracy on the letter "D" (4th of 7 characters).
 *
 * Font: Cocomat Pro Extralight (200) — geometric, minimal, editorial.
 *
 * Alignment maths
 * ───────────────
 * SVG textAnchor="end" at x=MX means the anchor sits AFTER the trailing
 * letter-spacing of the last glyph. So for "SAUD":
 *
 *   right edge of D glyph  =  MX - ls
 *   centre of D glyph      =  MX - ls - halfD
 *
 * Logo mandala
 * ─────────────
 * Extracted from the official Saudade business card SVG (public/saudade logo.svg).
 * Original center in SVG coordinate space: (310.7, 493.7)
 * Bounding clippath: x=187.6, y=381.8, w=245.9, h=223.5  → half-width ≈ 123
 */

// ── Mandala — transparent PNG, background already removed ────────────────────

function LogoMandala({ cx, cy, radius, id }: { cx: number; cy: number; radius: number; id: string }) {
  const filterId = `mandala-glow-${id}`;

  return (
    <>
      <defs>
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
          {/* Soft halo behind the mandala lines */}
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feColorMatrix type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 0.3 0"
            in="blur" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Low opacity — sits behind SAUDADE text without competing */}
      <image
        href="/mandala11-transparent.png"
        x={cx - radius}
        y={cy - radius}
        width={radius * 2}
        height={radius * 2}
        opacity="0.32"
        filter={`url(#${filterId})`}
      />
    </>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
type Props = { size?: "nav" | "hero"; className?: string };

export function SaudadeWordmark({ size = "hero", className = "" }: Props) {
  const fontSize = size === "nav" ? 100 : 175;
  const ls       = size === "nav" ?  26 :  46;   // letter-spacing in SVG units

  // Cocomat Pro cap-width for D ≈ 0.27 × fontSize
  const halfD = fontSize * 0.27;

  // Centre of SVG — SAUDADE is centred here
  const MX = 700;

  // Centre the mandala at the SVG midpoint (x=700), which corresponds to the
  // visual centre of "SAUDADE". Different browsers handle trailing letter-spacing
  // differently inside textAnchor="middle"; using MX directly keeps the mandala
  // correctly aligned on both desktop and mobile (Safari/WebKit).
  const mandalaX = MX;
  const mandalaY = size === "nav" ? 193 : 292;

  // Mandala radius scaled to context
  const mandalaRadius = size === "nav" ? 118 : 265;

  // Baseline sits so cap-height centre aligns with mandala centre
  // cap-height ≈ 0.70 × fontSize  →  baseline = mandalaY + 0.35 × fontSize
  const textY = mandalaY + fontSize * 0.35;

  const vb = size === "nav" ? "0 0 1400 400" : "0 0 1400 600";

  const fontStyle: React.CSSProperties = {
    fontFamily: "var(--font-wordmark), 'Cocomat Pro', sans-serif",
    fontWeight: 200,
  };

  // Stroke thickness: adds weight without changing the letterform shape
  const strokeW = size === "nav" ? 0.6 : 1.4;

  return (
    <svg viewBox={vb} className={className} aria-label="SAUDADE" overflow="visible">
      {/* Official Saudade logo mandala centred on letter D */}
      <LogoMandala cx={mandalaX} cy={mandalaY} radius={mandalaRadius} id={size} />

      {/* Full SAUDADE — paintOrder stroke ensures stroke widens outward only */}
      <text x={MX} y={textY} textAnchor="middle"
        style={fontStyle} fontSize={fontSize} letterSpacing={ls}
        fill="currentColor" stroke="currentColor" strokeWidth={strokeW}
        paintOrder="stroke">
        SAUDADE
      </text>
    </svg>
  );
}
