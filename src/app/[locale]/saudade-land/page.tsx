import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Saudade Land",
  description:
    "Saudade Land is a regenerative sanctuary rooted in Brazil — a living experiment in conscious community, land stewardship, and a new way of being on Earth.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SaudadeLandPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("saudadeLand");
  const tNav = await getTranslations("nav");

  return (
    <main>

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <Image
          src="/saudade-land-1.jpg"
          alt={t("heroImageAlt")}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/30 via-primary/40 to-primary-dark/90" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-40 text-accent md:px-8">
          <p className="luxury-label text-[10px] text-accent-light/80">{t("heroLabel")}</p>
          <h1 className="mt-5 font-heading text-6xl font-light leading-tight md:text-8xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-accent/80">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* ── The Question ── */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <p className="luxury-label text-[10px] text-accent-muted">{t("questionLabel")}</p>
          <h2 className="mt-6 font-heading text-4xl font-light leading-tight text-text-on-light md:text-5xl">
            {t("questionTitle")}
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-text-on-light/80">
            {t("questionText1")}
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-text-on-light/80">
            {t("questionText2")}
          </p>
        </div>
      </section>

      {/* ── Why Portugal ── */}
      <section className="bg-primary-dark py-20 text-accent">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <article className="space-y-5">
            <p className="luxury-label text-[10px] text-accent-muted">{t("portugalLabel")}</p>
            <h2 className="font-heading text-4xl font-light leading-tight md:text-5xl">
              {t("portugalTitle")}
            </h2>
            <p className="leading-relaxed text-accent/85">{t("portugalText1")}</p>
            <p className="leading-relaxed text-accent/85">{t("portugalText2")}</p>
            <p className="leading-relaxed text-accent/85">{t("portugalText3")}</p>
          </article>
          <div className="overflow-hidden rounded-[1.7rem] border border-accent/20">
            <Image
              src="/images/portugal1.jpg"
              alt={t("portugalImageAlt")}
              width={1800}
              height={1350}
              className="h-[420px] w-full object-cover object-center lg:h-[520px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── Why Brazil ── */}
      <section className="bg-primary py-20 text-accent">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="overflow-hidden rounded-[1.7rem] border border-accent/20">
            <Image
              src="/saudade-land-3.jpg"
              alt={t("brazilImageAlt")}
              width={1800}
              height={1350}
              className="h-[420px] w-full object-cover object-center lg:h-[520px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <article className="space-y-5">
            <p className="luxury-label text-[10px] text-accent-muted">{t("brazilLabel")}</p>
            <h2 className="font-heading text-4xl font-light leading-tight md:text-5xl">
              {t("brazilTitle")}
            </h2>
            <p className="leading-relaxed text-accent/85">{t("brazilText1")}</p>
            <p className="leading-relaxed text-accent/85">{t("brazilText2")}</p>
          </article>
        </div>
      </section>

      {/* ── What We Are Building ── */}
      <section className="bg-bg-alt py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          {/* Section intro — editorial header */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <div>
              {/* Mobile: label sits above the heading */}
              <p className="luxury-label text-[10px] text-accent-muted lg:hidden">{t("buildingTitle")}</p>
              <h2 className="mt-5 font-heading text-5xl font-light leading-[0.95] text-text-on-light md:text-7xl lg:mt-0">
                {t("buildingLabel")}
              </h2>
            </div>
            {/* Desktop: label rides on top of the divider so the two read as one unit */}
            <div className="hidden lg:block">
              <p className="luxury-label text-xs text-accent-muted">{t("buildingTitle")}</p>
              <div
                aria-hidden
                className="mt-4 h-px w-full bg-gradient-to-r from-primary/30 to-transparent"
              />
            </div>
          </div>

          {/* Pillars — numbered editorial entries */}
          <ol className="mt-16 md:mt-20">
            {[
              { title: t("build1Title"), text: t("build1Text") },
              { title: t("build2Title"), text: t("build2Text") },
              { title: t("build3Title"), text: t("build3Text") },
              { title: t("build4Title"), text: t("build4Text") },
              { title: t("build5Title"), text: t("build5Text") },
              { title: t("build6Title"), text: t("build6Text") },
            ].map((item, i) => (
              <li
                key={item.title}
                className="group grid items-baseline gap-x-8 gap-y-4 border-t border-primary/12 py-9 transition-colors duration-500 hover:border-primary/30 md:grid-cols-[auto_minmax(0,18rem)_1fr] md:py-11"
              >
                <span className="font-heading text-2xl font-light tabular-nums text-sage/70 transition-colors duration-500 group-hover:text-sage md:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-3xl font-light leading-tight text-text-on-light transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">
                  {item.title}
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-text-on-light/70">
                  {item.text}
                </p>
              </li>
            ))}
            <li aria-hidden className="border-t border-primary/12" />
          </ol>
        </div>
      </section>

      {/* ── The Vision ── */}
      <section className="bg-primary-light py-20 text-accent">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="overflow-hidden rounded-[1.7rem] border border-accent/20 lg:sticky lg:top-28">
            <Image
              src="/saudade-land-2.jpg"
              alt={t("visionImageAlt")}
              width={1350}
              height={1800}
              className="h-[420px] w-full object-cover object-center lg:h-[620px]"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
          <article className="space-y-8">
            <div>
              <p className="luxury-label text-[10px] text-accent-muted">{t("visionLabel")}</p>
              <h2 className="mt-4 font-heading text-4xl font-light leading-tight md:text-5xl">
                {t("visionTitle")}
              </h2>
              <p className="mt-5 leading-relaxed text-accent/85">{t("visionText")}</p>
            </div>
            <div className="space-y-6 border-t border-accent/20 pt-6">
              {[
                { label: t("vision1Label"), text: t("vision1Text") },
                { label: t("vision2Label"), text: t("vision2Text") },
                { label: t("vision3Label"), text: t("vision3Text") },
              ].map((v) => (
                <div key={v.label}>
                  <p className="font-display text-[11px] uppercase tracking-[0.18em] text-accent-light">
                    {v.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-accent/80">{v.text}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* ── Not Utopia ── */}
      <section className="bg-bg-light py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-20">
            {/* Manifesto statement */}
            <article className="lg:sticky lg:top-28">
              <p className="luxury-label text-[10px] text-accent-muted">{t("realLabel")}</p>
              <h2 className="mt-6 font-heading text-5xl font-light italic leading-[1.02] text-text-on-light md:text-6xl">
                {t("realTitle")}
              </h2>
              <span
                aria-hidden
                className="mt-8 block h-px w-16 bg-sage/60"
              />
              <p className="mt-8 max-w-md text-lg leading-relaxed text-text-on-light/75">
                {t("realText")}
              </p>
            </article>

            {/* Impacts — vows */}
            <ul className="lg:pt-2">
              {[
                t("impact1"),
                t("impact2"),
                t("impact3"),
                t("impact4"),
                t("impact5"),
              ].map((item, i) => (
                <li
                  key={item}
                  className="group flex items-start gap-6 border-b border-primary/12 py-6 first:border-t md:py-7"
                >
                  <span className="mt-1 font-display text-[11px] font-light tracking-[0.2em] text-sage/70 transition-colors duration-500 group-hover:text-sage">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-xl font-light leading-snug text-text-on-light/85 transition-colors duration-500 group-hover:text-text-on-light md:text-2xl">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── The Family ── */}
      <section className="bg-primary py-20 text-accent">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <p className="luxury-label text-[10px] text-accent-muted">{t("familyLabel")}</p>
          <h2 className="mt-6 font-heading text-4xl font-light leading-tight md:text-6xl">
            {t("familyTitle")}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-accent/80">
            {t("familyText2")}
          </p>
          <blockquote className="mx-auto mt-10 max-w-xl font-heading text-2xl font-light italic leading-relaxed text-accent/70 md:text-3xl">
            &ldquo;{t("familyQuote")}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── A Growing Network ── */}
      <section className="bg-primary-dark py-20 text-accent">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <p className="luxury-label text-[10px] text-accent-muted">{t("networkLabel")}</p>
          <h2 className="mt-6 font-heading text-4xl font-light leading-tight md:text-5xl">
            {t("networkTitle")}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-accent/80">
            {t("networkText")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3 text-[11px] font-light tracking-widest text-accent/60">
            <span className="text-accent/90">PORTUGAL</span>
            <span className="text-accent/30">→</span>
            <span className="text-accent/90">BRAZIL</span>
            <span className="text-accent/30">→</span>
            <span>BOLIVIA</span>
            <span className="text-accent/30">→</span>
            <span>COLOMBIA</span>
            <span className="text-accent/30">→</span>
            <span>LATIN AMERICA</span>
            <span className="text-accent/30">→</span>
            <span>EUROPE</span>
            <span className="text-accent/30">→</span>
            <span>WORLD</span>
          </div>
        </div>
      </section>

      {/* ── Closing / CTA ── */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <p className="luxury-label text-[10px] text-accent-muted">{t("closingLabel")}</p>
          <p className="mt-8 font-heading text-3xl font-light leading-relaxed text-text-on-light md:text-4xl">
            &ldquo;{t("closingQuote")}&rdquo;
          </p>
          <p className="mt-10 text-sm leading-relaxed text-text-on-light/70">
            {t("closingText")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/community`}
              className="inline-flex min-h-11 items-center rounded-full border border-primary/50 px-7 py-2.5 font-display text-[10px] font-light uppercase tracking-[0.22em] text-text-on-light transition-all duration-300 hover:border-primary hover:text-primary-dark"
            >
              {tNav("community")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex min-h-11 items-center rounded-full border border-primary/25 px-7 py-2.5 font-display text-[10px] font-light uppercase tracking-[0.22em] text-text-on-light/70 transition-all duration-300 hover:border-primary/50 hover:text-text-on-light"
            >
              {tNav("contact")}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
