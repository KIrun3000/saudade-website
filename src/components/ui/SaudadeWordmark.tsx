"use client";

/**
 * SAUDADE wordmark — pure inline SVG so the mandala can be placed with
 * pixel-perfect accuracy on the letter "D" (4th of 7 characters).
 *
 * Alignment maths
 * ───────────────
 * SVG textAnchor="end" at x=MX means the anchor sits AFTER the trailing
 * letter-spacing of the last glyph. So for "SAUD":
 *
 *   right edge of D glyph  =  MX - ls
 *   centre of D glyph      =  MX - ls - halfD
 *
 * where ls = letter-spacing value and halfD ≈ 0.29 × fontSize.
 */

// ── Mandala geometry ──────────────────────────────────────────────────────────
// petal pointing straight up, centred at (cx, cy)
function petal(cx: number, cy: number, R: number, w: number): string {
  // Wider, more organic petal — control handles at 50% of R give a rounder belly
  return (
    `M ${cx} ${cy - R} ` +
    `C ${cx - w} ${cy - R * 0.5} ${cx - w} ${cy + R * 0.5} ${cx} ${cy + R} ` +
    `C ${cx + w} ${cy + R * 0.5} ${cx + w} ${cy - R * 0.5} ${cx} ${cy - R} Z`
  );
}

// [R, w, count, rotationOffset°]  — R and w are in SVG user-units
const RINGS: [number, number, number, number][] = [
  [195, 85,  8,  0   ],  // outer ring A
  [195, 85,  8,  22.5],  // outer ring B (offset)
  [138, 60,  8,  0   ],  // mid ring A
  [138, 60,  8,  22.5],  // mid ring B
  [ 88, 38,  8,  11.25], // inner ring
  [ 48, 16, 16,  0   ],  // core (16 tiny petals)
];

function InlineMandala({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round" fill="none" opacity="0.32">
      {RINGS.map(([R, w, count, offset], ri) =>
        Array.from({ length: count }).map((_, i) => {
          const angle = i * (360 / count) + offset;
          return (
            <g key={`${ri}-${i}`} transform={`rotate(${angle}, ${cx}, ${cy})`}>
              <path d={petal(cx, cy, R, w)} />
            </g>
          );
        })
      )}
      <circle cx={cx} cy={cy} r="25" />
      <circle cx={cx} cy={cy} r="10" fill="currentColor" stroke="none" opacity="1" />
    </g>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
type Props = { size?: "nav" | "hero"; className?: string };

export function SaudadeWordmark({ size = "hero", className = "" }: Props) {
  const fontSize = size === "nav" ? 100 : 175;
  const ls       = size === "nav" ?  26 :  46;   // letter-spacing in SVG units

  // Josefin Sans cap-width for D ≈ 0.58 × fontSize (measured from font metrics)
  const halfD = fontSize * 0.29;

  // Anchor x for both text halves
  const MX = 700;

  // Correct D-centre: subtract the trailing letter-spacing AND half the D glyph
  const mandalaX = MX - ls - halfD;
  const mandalaY = size === "nav" ? 200 : 300;

  const textY = mandalaY + fontSize * 0.35;

  const vb = size === "nav" ? "0 0 1400 400" : "0 0 1400 600";

  const fontStyle: React.CSSProperties = {
    fontFamily: "var(--font-wordmark), sans-serif",
    fontWeight: 200,
  };

  return (
    <svg viewBox={vb} className={className} aria-label="SAUDADE" overflow="visible">
      {/* Petal mandala centred on letter D */}
      <InlineMandala cx={mandalaX} cy={mandalaY} />

      {/* "SAUD" — right-anchored so D's right edge lands at MX */}
      <text x={MX} y={textY} textAnchor="end"
        style={fontStyle} fontSize={fontSize} letterSpacing={ls} fill="currentColor">
        SAUD
      </text>

      {/* "ADE" — left-anchored from MX (one letter-spacing gap after D) */}
      <text x={MX} y={textY} textAnchor="start"
        style={fontStyle} fontSize={fontSize} letterSpacing={ls} fill="currentColor">
        ADE
      </text>
    </svg>
  );
}
