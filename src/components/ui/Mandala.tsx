type MandalaProps = {
  className?: string;
};

export function Mandala({ className }: MandalaProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.15" strokeLinecap="round">
        <circle cx="200" cy="200" r="22" />
        <circle cx="200" cy="200" r="38" />
        <circle cx="200" cy="200" r="56" opacity="0.75" />
        <circle cx="200" cy="200" r="82" opacity="0.65" />

        {Array.from({ length: 16 }).map((_, index) => {
          const angle = index * 22.5;
          return (
            <g key={angle} transform={`rotate(${angle} 200 200)`}>
              <path d="M200 42C188 64 182 84 182 106C182 124 188 142 200 164C212 142 218 124 218 106C218 84 212 64 200 42Z" />
              <path d="M200 72C193 84 190 96 190 108C190 120 193 132 200 144C207 132 210 120 210 108C210 96 207 84 200 72Z" />
              <path d="M200 8L200 42" opacity="0.6" />
            </g>
          );
        })}

        {Array.from({ length: 12 }).map((_, index) => {
          const angle = index * 30 + 15;
          return (
            <g key={`inner-${angle}`} transform={`rotate(${angle} 200 200)`}>
              <path d="M200 112C194 122 191 132 191 144C191 156 194 167 200 178C206 167 209 156 209 144C209 132 206 122 200 112Z" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
