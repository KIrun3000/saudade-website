import Image from "next/image";

type LeafDecorationProps = {
  position: "top-left" | "bottom-right";
};

export function LeafDecoration({ position }: LeafDecorationProps) {
  const placement =
    position === "top-left"
      ? "left-0 top-0 -translate-x-[16%] -translate-y-[16%] md:-translate-x-1/4 md:-translate-y-1/4"
      : "bottom-0 right-0 translate-x-[16%] translate-y-[16%] md:translate-x-1/4 md:translate-y-1/4";

  return (
    <div
      className={`pointer-events-none absolute ${placement} h-[120px] w-[80px] opacity-50 md:h-[260px] md:w-[170px] md:opacity-60`}
      aria-hidden="true"
    >
      <Image
        src="https://saudadevoces.com/wp-content/uploads/2025/08/pexels-photo-1353938-1353938-scaled-e1772064748884.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100px, 170px"
      />
    </div>
  );
}
