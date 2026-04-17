type MandalaProps = { className?: string };

// Rounded leaf / almond petal — two quadratic bezier arcs, both ends pointed
function petal(cx: number, cy: number, R: number, w: number): string {
  return (
    `M ${cx} ${cy - R} ` +
    `Q ${cx + w} ${cy} ${cx} ${cy + R} ` +
    `Q ${cx - w} ${cy} ${cx} ${cy - R} Z`
  );
}

const CX = 100, CY = 100;

// [R, w, count, rotationOffset°]
const RINGS: [number, number, number, number][] = [
  [78, 39, 8,  0   ],   // outer A
  [78, 39, 8, 22.5 ],   // outer B
  [55, 28, 8,  0   ],   // mid A
  [55, 28, 8, 22.5 ],   // mid B
  [35, 18, 8,  0   ],   // inner A
  [35, 18, 8, 22.5 ],   // inner B
  [20, 10, 8,  0   ],   // core
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
        <circle cx={CX} cy={CY} r="7" />
        <circle cx={CX} cy={CY} r="3" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
