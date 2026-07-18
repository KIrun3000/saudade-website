/* Certification badge components — transparent background logos */

type BadgeProps = {
  className?: string;
};

function Badge({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`shrink-0 object-contain ${className ?? ""}`}
    />
  );
}

export function Gotsbadge({ className }: BadgeProps) {
  return (
    <Badge
      src="/GOTS_personalized-removebg-preview.png"
      alt="GOTS – Global Organic Textile Standard certified"
      className={className}
    />
  );
}

export function GrsBadge({ className }: BadgeProps) {
  return (
    <Badge
      src="/global_recycled_standard_certificate-removebg-preview.png"
      alt="GRS – Global Recycled Standard certified"
      className={className}
    />
  );
}

export function MadeWithLoveBadge({ className }: BadgeProps) {
  return (
    <Badge
      src="/madewithlovelogo-removebg-preview.png"
      alt="Made with Love"
      className={className}
    />
  );
}
