import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Countdown } from "@/components/events/Countdown";

type FestivalHighlightProps = {
  locale: string;
  /** When true, drop the solid background so a page texture shows through (home page). */
  transparent?: boolean;
};

function getFestivalSeasonDate() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const seasonDate = new Date(Date.UTC(year, 7, 28, 12, 0, 0));
  return seasonDate.getTime() > now.getTime()
    ? seasonDate
    : new Date(Date.UTC(year + 1, 7, 1, 12, 0, 0));
}

export async function FestivalHighlight({ locale, transparent = false }: FestivalHighlightProps) {
  const t = await getTranslations("eventsPage");
  const festivalSeason = getFestivalSeasonDate();

  return (
    <section
      className={`relative overflow-hidden py-24 text-accent ${transparent ? "" : "bg-primary-light"}`}
      style={transparent ? { borderTop: "1px solid rgba(216,207,196,0.08)" } : undefined}
    >
      {/* Events variant: an atmospheric festival backdrop behind the countdown */}
      {!transparent && (
        <>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0a1f23]" />
          <Image
            src="/images/events-bar-night.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="pointer-events-none select-none object-cover object-[50%_38%]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(9,26,29,0.6) 0%, rgba(9,26,29,0.52) 42%, rgba(9,26,29,0.5) 58%, rgba(9,26,29,0.66) 78%, rgba(9,26,29,0.9) 100%)",
            }}
          />
        </>
      )}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: transparent
            ? "radial-gradient(circle at 16% 25%, rgba(210,187,178,0.06), transparent 42%)"
            : "radial-gradient(circle at 16% 22%, rgba(210,187,178,0.14), transparent 44%), radial-gradient(circle at 82% 74%, rgba(214,150,88,0.16), transparent 48%)",
        }}
      />
      {/* Home variant: a soft luminous glow behind the countdown for drama */}
      {transparent && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[18%] top-1/2 -translate-y-1/2"
          style={{
            width: "min(60vw, 640px)",
            aspectRatio: "1",
            background: "radial-gradient(circle, rgba(20,61,67,0.55) 0%, transparent 65%)",
            filter: "blur(20px)",
          }}
        />
      )}
      <div
        className="relative mx-auto max-w-3xl px-5 md:px-8"
        style={transparent ? undefined : { textShadow: "0 1px 16px rgba(6,18,20,0.82)" }}
      >
          <p className="luxury-label text-[10px] text-accent-muted">
            {t("festivalLabel")}
          </p>
          <h2
            className={`mt-5 font-heading font-light leading-[1.05] ${
              transparent ? "text-[clamp(2.4rem,6vw,4.5rem)]" : "text-4xl md:text-5xl"
            }`}
          >
            {t("festivalTitle")}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-accent/86">
            {t("festivalText")}
          </p>
          <p className={`mt-6 luxury-label text-[10px] ${transparent ? "text-accent-muted" : "text-accent/85"}`}>{t("countdown")}</p>
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
            {/* Second CTA only on the full events page, not the home highlight */}
            {!transparent && (
              <Link
                href={`/${locale}/community`}
                className="inline-flex min-h-11 items-center rounded-full border border-sage/65 px-6 py-2 font-display text-[11px] font-light uppercase tracking-[0.22em] text-sage-light transition-colors duration-300 hover:border-sage-light hover:text-sage-light"
              >
                {t("collaborateCta")}
              </Link>
            )}
          </div>
      </div>
    </section>
  );
}
