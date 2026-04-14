import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LeafDecoration } from "@/components/ui/LeafDecoration";

export const metadata: Metadata = {
  title: "Saudade Land",
  description:
    "Saudade Land is a regenerative vision rooted in Brazil, building conscious living sanctuaries for community, nature, and future generations.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SaudadeLandPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("saudadeLand");
  const tNav = await getTranslations("nav");

  return (
    <main>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Image
          src="https://saudadevoces.com/wp-content/uploads/2026/01/mateus-campos-felipe-_fzl2PQH6kw-unsplash-scaled.jpg"
          alt={t("heroImageAlt")}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/60 via-primary/55 to-primary/85" />
        <div className="relative px-5 text-center text-accent md:px-8">
          <p className="luxury-label text-sm text-accent-muted md:text-[11px]">{t("heroLabel")}</p>
          <h1 className="mt-4 font-display text-[2.25rem] font-light uppercase tracking-[0.2em] md:mt-6 md:text-7xl md:tracking-[0.3em]">
            {t("heroTitle")}
          </h1>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bg-light py-20">
        <LeafDecoration position="top-left" />
        <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
          <p className="luxury-label text-[10px] text-accent-muted">
            {t("consciousTitle")}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-text-on-light/88">
            {t("consciousText")}
          </p>
        </div>
      </section>

      <section className="bg-primary py-20 text-accent">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:px-8 lg:grid-cols-[58%_42%] lg:items-start">
          <article className="order-2 lg:order-1">
            <p className="luxury-label text-[10px] text-accent-muted">
              {t("visionLabel")}
            </p>
            <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
              {t("visionTitle")}
            </h2>
            <p className="mt-6 leading-relaxed text-accent/86">
              {t("visionText")}
            </p>
            <ul className="mt-8 list-disc space-y-3 pl-5 text-accent/88">
              <li>{t("bullet1")}</li>
              <li>{t("bullet2")}</li>
              <li>{t("bullet3")}</li>
            </ul>
          </article>
          <div className="relative order-1 overflow-hidden rounded-[1.7rem] border border-accent/25 lg:order-2">
            <Image
              src="https://saudadevoces.com/wp-content/uploads/2026/01/mateus-pontes-x2TDul-JMl8-unsplash-scaled.jpg"
              alt={t("visionImageAlt")}
              width={1200}
              height={900}
              className="h-[300px] w-full object-cover sm:h-[380px] lg:h-full"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-bg-alt py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="luxury-label text-[10px] text-accent-muted">
            {t("thriveTitle")}
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-primary-light/15 bg-bg-light p-6">
              <h3 className="font-heading text-3xl font-light text-text-on-light">
                {t("thrive1Title")}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-text-on-light/78">
                {t("thrive1Text")}
              </p>
            </article>
            <article className="rounded-2xl border border-primary-light/15 bg-bg-light p-6">
              <h3 className="font-heading text-3xl font-light text-text-on-light">
                {t("thrive2Title")}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-text-on-light/78">
                {t("thrive2Text")}
              </p>
            </article>
            <article className="rounded-2xl border border-primary-light/15 bg-bg-light p-6">
              <h3 className="font-heading text-3xl font-light text-text-on-light">
                {t("thrive3Title")}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-text-on-light/78">
                {t("thrive3Text")}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-primary-dark px-5 py-20 text-center text-accent md:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="font-heading text-3xl font-light leading-relaxed md:text-4xl">
            {t("quoteTitle")}
          </p>
          <p className="mt-8 text-sm text-accent-muted">
            {t("hashtags")}
          </p>
          <p className="mt-8 text-base text-accent">
            {t("contactLabel")} {t("contactEmail")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <Link
              href={`/${locale}/community`}
              className="font-display text-[11px] font-light uppercase tracking-[0.22em] text-accent/90 transition-colors duration-300 hover:text-accent-light"
            >
              {tNav("community")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="font-display text-[11px] font-light uppercase tracking-[0.22em] text-accent/90 transition-colors duration-300 hover:text-accent-light"
            >
              {tNav("contact")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
