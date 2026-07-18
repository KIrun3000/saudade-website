import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/ui/Reveal";

type PillarsSectionProps = {
  locale: string;
};

export function PillarsSection({ locale }: PillarsSectionProps) {
  const t = useTranslations("pillars");

  const pillars = [
    {
      title: t("fashion.title"),
      body: t("fashion.description"),
      image: "/wp-content/uploads/2023/09/volha-flaxeco-L8QuQqL1ZJ8-unsplash-1.jpeg",
      href: "/shop/fashion",
    },
    {
      title: t("art.title"),
      body: t("art.description"),
      image: "/adairartbirds-266x300.jpg",
      href: "/shop/art",
    },
    {
      title: t("community.title"),
      body: t("community.description"),
      image: "/unity.webp",
      href: "/community",
    },
    {
      title: t("land.title"),
      body: t("land.description"),
      image: "/saudade-land-1.jpg",
      href: "/saudade-land",
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-28 text-accent md:py-36"
      style={{ borderTop: "1px solid rgba(216,207,196,0.08)" }}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="luxury-label text-[10px] text-accent-muted">{t("label")}</p>
          <h2 className="mt-5 max-w-4xl font-heading text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.15] text-accent">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-24">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.06}>
              <Link
                href={`/${locale}${pillar.href}`}
                className="group block border-t border-accent/12 py-8 transition-colors duration-500 hover:border-accent/35 md:py-10"
              >
                <div className="grid items-center gap-6 md:grid-cols-[auto_minmax(0,1fr)_auto_auto] md:gap-8">
                  <span
                    className="font-heading text-[2.5rem] font-light leading-none text-accent/25 transition-colors duration-500 group-hover:text-accent/55 md:text-[3.5rem]"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-heading text-[clamp(1.8rem,4vw,2.9rem)] font-light leading-tight text-accent transition-transform duration-500 group-hover:translate-x-1">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-accent-muted md:text-base">
                      {pillar.body}
                    </p>
                  </div>

                  <div className="hidden md:flex items-center justify-end">
                    <span className="luxury-label text-[10px] text-accent-muted transition-all duration-300 group-hover:text-accent group-hover:tracking-[0.28em]">
                      {t("cta")}
                    </span>
                  </div>

                  <div className="relative mx-auto aspect-square h-28 w-28 overflow-hidden rounded-full md:mx-0 md:h-28 md:w-28 md:opacity-0 md:transition-all md:duration-500 md:group-hover:opacity-100">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 112px, 160px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent" />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between md:hidden">
                  <span className="luxury-label text-[10px] text-accent-muted transition-colors duration-300 group-hover:text-accent">
                    {t("cta")}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          <div className="border-t border-accent/12" />
        </div>
      </div>
    </section>
  );
}