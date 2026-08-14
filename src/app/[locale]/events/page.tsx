import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FestivalHighlight } from "@/components/events/FestivalHighlight";
import { pageMetadata, SITE_URL } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "eventsPage" });
  return {
    ...pageMetadata({
      locale,
      path: "/events",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: ["/images/events-bar-night.jpg"],
      imageAlt: "The Saudade Launching Event — an intimate evening in Porto, Portugal",
    }),
    keywords: [
      "events in Portugal",
      "Porto events",
      "Saudade Launching Event",
      "conscious events Portugal",
      "festivals in Portugal",
      "things to do in Porto",
      "cultural events Porto",
      "Chaka Arcana launch",
      "high frequency fashion event",
      "August 2026 Porto event",
    ],
  };
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("eventsPage");
  const tNav = await getTranslations("nav");

  // Event structured data — makes the Saudade Launching Event eligible for
  // Google's event rich results / event listings, so searches for "events in
  // Portugal / Porto" can surface it directly. Localized name + description.
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: t("festivalTitle"),
    description: t("festivalText"),
    startDate: "2026-08-28T19:00:00+01:00",
    endDate: "2026-08-28T23:59:00+01:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Porto",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Porto",
        addressCountry: "PT",
      },
    },
    image: [`${SITE_URL}/images/events-bar-night.jpg`],
    organizer: { "@type": "Organization", name: "Saudade", url: SITE_URL },
    performer: { "@type": "Organization", name: "Saudade" },
    inLanguage: locale,
    url: `${SITE_URL}/${locale}/events`,
  };

  return (
    <main className="relative" style={{ backgroundColor: "#0a1f23", color: "#d8cfc4" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      {/* ── Ixchel grain texture ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/ixchel-bg-teal.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat-y",
          opacity: 0.85,
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 78% at 50% 45%, transparent 30%, rgba(0,0,0,0.85) 100%)",
          maskImage:
            "radial-gradient(ellipse 78% 78% at 50% 45%, transparent 30%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      <div className="relative z-10">

      {/* ── Hero ── */}
      <section className="px-5 pb-20 pt-32 text-accent md:px-8 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-5xl">
          <p style={{ fontFamily: "var(--font-display)", fontSize: "10px", letterSpacing: "0.32em", opacity: 0.4 }} className="mb-6 uppercase">
            {t("heroTitle")}
          </p>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "0.01em" }} className="text-[clamp(2.4rem,6vw,4.5rem)]">
            {t("introTitle")}
          </h1>
          <p className="mt-5 max-w-3xl leading-relaxed text-accent/70">
            {t("introText")}
          </p>
        </div>
      </section>

      {/* ── Festival Highlight ── */}
      <FestivalHighlight locale={locale} />

      {/* ── The vision: what the gatherings will hold. Set apart from the launch
             event above (extra top space + its own header) so viewers read it as
             the future shape of Saudade events, not part of the launch. ── */}
      <section className="pb-20 pt-24 md:pt-32" style={{ borderTop: "1px solid rgba(216,207,196,0.08)" }}>
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-16 max-w-2xl">
            <p className="luxury-label text-[10px] text-accent-muted">{t("visionLabel")}</p>
            <h2 className="mt-4 font-heading text-[clamp(2rem,4.5vw,3.2rem)] font-light text-accent">
              {t("visionTitle")}
            </h2>
            <p className="mt-4 leading-relaxed text-accent/70">{t("visionText")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">

          {/* Space */}
          <article className="group overflow-hidden rounded-2xl border border-accent/12 bg-[#0a1f23]/40">
            <div className="relative h-64 overflow-hidden" style={{ borderBottom: "1px solid rgba(216,207,196,0.08)" }}>
              <Image
                src="/images/events-venue.jpg"
                alt={t("spaceImageAlt")}
                fill
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,31,35,0.92) 4%, rgba(10,31,35,0.28) 46%, rgba(10,31,35,0.08) 100%)" }} />
            </div>
            <div className="p-6">
              <h4 className="font-heading text-3xl font-light text-accent">{t("spaceTitle")}</h4>
              <p className="mt-3 text-sm leading-relaxed text-accent/70">{t("spaceText")}</p>
              <Link
                href={`/${locale}/community`}
                className="mt-4 inline-flex text-sm text-accent-light/80 transition-colors duration-300 hover:text-accent-light"
              >
                {t("spaceCta")}
              </Link>
            </div>
          </article>

          {/* Music */}
          <article className="group overflow-hidden rounded-2xl border border-accent/12 bg-[#0a1f23]/40">
            <div className="relative h-64 overflow-hidden" style={{ borderBottom: "1px solid rgba(216,207,196,0.08)" }}>
              <Image
                src="/images/events-music.jpg"
                alt={t("musicImageAlt")}
                fill
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,31,35,0.92) 4%, rgba(10,31,35,0.28) 46%, rgba(10,31,35,0.08) 100%)" }} />
            </div>
            <div className="p-6">
              <h4 className="font-heading text-3xl font-light text-accent">{t("musicTitle")}</h4>
              <p className="mt-3 text-sm leading-relaxed text-accent/70">{t("musicText")}</p>
              <p className="mt-4 text-sm text-accent/60">{t("musicCta")}</p>
            </div>
          </article>

          {/* Movement & Grounding */}
          <article className="group overflow-hidden rounded-2xl border border-accent/12 bg-[#0a1f23]/40">
            <div className="relative h-64 overflow-hidden" style={{ borderBottom: "1px solid rgba(216,207,196,0.08)" }}>
              <Image
                src="/images/events-movement.jpg"
                alt={t("yogaImageAlt")}
                fill
                className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,31,35,0.92) 4%, rgba(10,31,35,0.28) 46%, rgba(10,31,35,0.08) 100%)" }} />
            </div>
            <div className="p-6">
              <h4 className="font-heading text-3xl font-light text-accent">{t("yogaTitle")}</h4>
              <p className="mt-3 text-sm leading-relaxed text-accent/70">{t("yogaText")}</p>
            </div>
          </article>

          {/* Workshop */}
          <article className="group overflow-hidden rounded-2xl border border-accent/12 bg-[#0a1f23]/40">
            <div className="relative h-64 overflow-hidden" style={{ borderBottom: "1px solid rgba(216,207,196,0.08)" }}>
              <Image
                src="/images/events-workshop.jpg"
                alt={t("workshopImageAlt")}
                fill
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,31,35,0.92) 4%, rgba(10,31,35,0.28) 46%, rgba(10,31,35,0.08) 100%)" }} />
            </div>
            <div className="p-6">
              <h4 className="font-heading text-3xl font-light text-accent">{t("workshopTitle")}</h4>
              <p className="mt-3 text-sm leading-relaxed text-accent/70">{t("workshopText")}</p>
              <p className="mt-4 text-sm text-accent/60">{t("workshopCta")}</p>
            </div>
          </article>

          </div>
        </div>
      </section>

      {/* ── Footer nav ── */}
      <section className="py-14" style={{ borderTop: "1px solid rgba(216,207,196,0.08)" }}>
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-8 gap-y-4 px-5 md:px-8">
          <Link
            href={`/${locale}/community`}
            className="font-display text-[11px] font-light uppercase tracking-[0.24em] text-accent/90 transition-colors duration-300 hover:text-accent-light"
          >
            {tNav("community")}
          </Link>
          <Link
            href={`/${locale}/shop/fashion`}
            className="font-display text-[11px] font-light uppercase tracking-[0.24em] text-accent/90 transition-colors duration-300 hover:text-accent-light"
          >
            {tNav("shop")}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="font-display text-[11px] font-light uppercase tracking-[0.24em] text-accent/90 transition-colors duration-300 hover:text-accent-light"
          >
            {tNav("contact")}
          </Link>
        </div>
      </section>

      </div>
    </main>
  );
}
