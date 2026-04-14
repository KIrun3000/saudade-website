import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

type PillarsSectionProps = {
  locale: string;
};

export function PillarsSection({ locale }: PillarsSectionProps) {
  const t = useTranslations("pillars");
  const pillars = [
    {
      title: t("fashion.title"),
      body: t("fashion.description"),
      image:
        "https://saudadevoces.com/wp-content/uploads/2023/09/volha-flaxeco-L8QuQqL1ZJ8-unsplash-1.jpeg",
      href: "/shop",
    },
    {
      title: t("community.title"),
      body: t("community.description"),
      image:
        "https://saudadevoces.com/wp-content/uploads/2025/08/yoga_with_nature_at_the_sharpham_trust_1200px_10-1024x681.jpg",
      href: "/community",
    },
    {
      title: t("land.title"),
      body: t("land.description"),
      image:
        "https://saudadevoces.com/wp-content/uploads/2026/01/mateus-pontes-x2TDul-JMl8-unsplash-scaled.jpg",
      href: "/saudade-land",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-primary-light py-24 text-accent">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(210,187,178,0.12),transparent_36%),linear-gradient(180deg,rgba(9,30,34,0.3)_0%,rgba(9,30,34,0)_50%)]" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="luxury-label text-[10px] text-accent-muted">
          {t("label")}
        </p>
        <h2 className="mt-4 max-w-3xl font-heading text-4xl font-light leading-tight text-accent md:text-5xl">
          {t("title")}
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Link
              key={pillar.title}
              href={`/${locale}${pillar.href}`}
              className="group relative overflow-hidden rounded-[1.8rem] border border-accent/45 bg-primary-dark/65 shadow-[0_24px_70px_-45px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/70"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/20 to-transparent" />
              </div>
              <div className="relative p-6">
                <h3 className="font-heading text-3xl font-light leading-tight text-accent">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-accent-muted">
                  {pillar.body}
                </p>
                <span className="mt-6 inline-flex items-center font-display text-[10px] font-light uppercase tracking-[0.26em] text-sage-light transition-transform duration-300 group-hover:translate-x-1">
                  {t("cta")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
