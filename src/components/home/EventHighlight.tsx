import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Countdown } from "@/components/events/Countdown";

type EventHighlightProps = {
  locale: string;
};

function getFestivalSeasonDate() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const seasonDate = new Date(Date.UTC(year, 7, 1, 12, 0, 0));
  return seasonDate.getTime() > now.getTime()
    ? seasonDate
    : new Date(Date.UTC(year + 1, 7, 1, 12, 0, 0));
}

export function EventHighlight({ locale }: EventHighlightProps) {
  const t = useTranslations("eventHighlight");
  const festivalSeason = getFestivalSeasonDate();

  return (
    <section className="relative overflow-hidden bg-primary-light py-24 text-accent">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_25%,rgba(210,187,178,0.2),transparent_42%),radial-gradient(circle_at_78%_70%,rgba(106,139,91,0.18),transparent_45%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="luxury-label text-[10px] text-accent-muted">
            {t("label")}
          </p>
          <h2 className="mt-4 font-heading text-4xl font-light leading-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-accent/86">
            {t("description")}
          </p>
          <p className="mt-3 text-sm text-accent-muted">
            {t("countdown")}
          </p>
          <div className="mt-5 max-w-xl">
            <Countdown target={festivalSeason} />
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href={`/${locale}/events`}
              className="inline-flex min-h-11 items-center rounded-full border border-accent/65 bg-transparent px-6 py-2 font-display text-[11px] font-light uppercase tracking-[0.22em] text-accent transition-colors duration-300 hover:border-accent-light hover:text-accent-light"
            >
              {t("exploreCta")}
            </Link>
            <Link
              href={`/${locale}/community`}
              className="inline-flex min-h-11 items-center rounded-full border border-sage/65 px-6 py-2 font-display text-[11px] font-light uppercase tracking-[0.22em] text-sage-light transition-colors duration-300 hover:border-sage-light hover:text-sage-light"
            >
              {t("collaborateCta")}
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-accent/20">
          <Image
            src="https://saudadevoces.com/wp-content/uploads/2025/08/fest-1.jpg"
            alt={t("imageAlt")}
            width={1200}
            height={900}
            className="h-[300px] w-full object-cover md:h-full"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/65 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
