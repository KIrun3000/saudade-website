import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FestivalHighlight } from "@/components/events/FestivalHighlight";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore Saudade Festival and conscious events in Portugal with music, dance, art, wellness, and collaborative workshops.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("eventsPage");
  const tNav = await getTranslations("nav");

  return (
    <main className="relative" style={{ backgroundColor: "#0a1f23", color: "#d8cfc4" }}>
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

      {/* ── 4 experience cards ── */}
      <section className="py-20" style={{ borderTop: "1px solid rgba(216,207,196,0.08)" }}>
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2 md:px-8">

          {/* Space */}
          <article className="overflow-hidden rounded-2xl border border-accent/12 bg-[#0a1f23]/40">
            <div className="relative h-56">
              <Image
                src="/wp-content/uploads/2025/08/fest-3.jpg"
                alt={t("spaceImageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
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
          <article className="overflow-hidden rounded-2xl border border-accent/12 bg-[#0a1f23]/40">
            <div className="relative h-56">
              <Image
                src="/wp-content/uploads/2025/08/istockphoto-1141427484-612x612-1.jpg"
                alt={t("musicImageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h4 className="font-heading text-3xl font-light text-accent">{t("musicTitle")}</h4>
              <p className="mt-3 text-sm leading-relaxed text-accent/70">{t("musicText")}</p>
              <p className="mt-4 text-sm text-accent/60">{t("musicCta")}</p>
            </div>
          </article>

          {/* Yoga & Meditation */}
          <article className="overflow-hidden rounded-2xl border border-accent/12 bg-[#0a1f23]/40">
            <div className="relative h-56">
              <Image
                src="/wp-content/uploads/2025/08/yoga_with_nature_at_the_sharpham_trust_1200px_10.jpg"
                alt={t("yogaImageAlt")}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h4 className="font-heading text-3xl font-light text-accent">{t("yogaTitle")}</h4>
              <p className="mt-3 text-sm leading-relaxed text-accent/70">{t("yogaText")}</p>
            </div>
          </article>

          {/* Workshop */}
          <article className="overflow-hidden rounded-2xl border border-accent/12 bg-[#0a1f23]/40">
            <div className="relative h-56">
              <Image
                src="/wp-content/uploads/2025/08/48771295762_d6f7813a78_c-799x460-1.jpg"
                alt={t("workshopImageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h4 className="font-heading text-3xl font-light text-accent">{t("workshopTitle")}</h4>
              <p className="mt-3 text-sm leading-relaxed text-accent/70">{t("workshopText")}</p>
              <p className="mt-4 text-sm text-accent/60">{t("workshopCta")}</p>
            </div>
          </article>

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
