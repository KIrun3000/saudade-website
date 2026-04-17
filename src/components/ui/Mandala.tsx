type MandalaProps = { className?: string };

function petal(cx: number, cy: number, R: number, w: number): string {
  return (
    `M ${cx} ${cy - R} ` +
    `C ${cx - w} ${cy - R * 0.5} ${cx - w} ${cy + R * 0.5} ${cx} ${cy + R} ` +
    `C ${cx + w} ${cy + R * 0.5} ${cx + w} ${cy - R * 0.5} ${cx} ${cy - R} Z`
  );
}

const CX = 100, CY = 100;

// [R, w, count, rotationOffset°]
const RINGS: [number, number, number, number][] = [
  [46, 20,  8,  0   ],
  [46, 20,  8,  22.5],
  [33, 14,  8,  0   ],
  [33, 14,  8,  22.5],
  [22,  9,  8,  11.25],
  [12,  4, 16,  0   ],
];

export function Mandala({ className }: MandalaProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
        {RINGS.map(([R, w, count, offset], ri) =>
          Array.from({ length: count }).map((_, i) => (
            <g key={`${ri}-${i}`} transform={`rotate(${i * (360 / count) + offset}, ${CX}, ${CY})`}>
              <path d={petal(CX, CY, R, w)} />
            </g>
          ))
        )}
        <circle cx={CX} cy={CY} r="6" />
        <circle cx={CX} cy={CY} r="2.8" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
