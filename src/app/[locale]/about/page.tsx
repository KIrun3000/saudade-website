import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/about",
    title: "Our Story — Art, Fashion & a Regenerative Dream",
    description:
      "Saudade is about building the bridge — between Portugal and Brazil, between Europe and South America, between the world we live in and the one we know is possible.",
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <main>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-5 pb-16 pt-32 text-accent md:px-8 md:pb-20 md:pt-36" style={{ backgroundColor: "#0a1f23" }}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: "url('/ixchel-bg-teal.webp')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.85, WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 45%, transparent 28%, rgba(0,0,0,0.85) 100%)", maskImage: "radial-gradient(ellipse 80% 90% at 50% 45%, transparent 28%, rgba(0,0,0,0.85) 100%)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(20,55,60,0.45) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="luxury-label text-[10px] text-accent-muted">{t("heroLabel")}</p>
          <h1 className="mt-6 font-heading text-5xl font-light leading-tight md:text-7xl">
            {t("heroSubtitle")}<br />{t("heroBoldSubtitle")}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-accent/70">
            {t("heroDescription")}
          </p>
        </div>
      </section>

      {/* ── The Origin ── */}
      <section className="bg-bg-light py-20">
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[1.7rem] border border-primary-light/15">
            <Image
              src="/siblings.jpg"
              alt={t("originImageAlt")}
              width={1200}
              height={1500}
              priority
              className="h-[420px] w-full object-cover object-top sm:h-[520px] lg:h-[640px]"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
          <article className="max-w-2xl space-y-5">
            <p className="luxury-label text-[10px] text-accent-muted">{t("originLabel")}</p>
            <h2 className="font-heading text-4xl font-light leading-tight text-text-on-light md:text-5xl">
              {t("originTitle")}
            </h2>
            <p className="text-base leading-relaxed text-text-on-light/85">
              {t("originText1")}
            </p>
            <p className="text-base leading-relaxed text-text-on-light/85">
              {t("originText2")}
            </p>
          </article>
        </div>
      </section>

      {/* ── Adair ── */}
      <section className="bg-primary py-20 text-accent">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <article className="space-y-5">
              <p className="luxury-label text-[10px] text-accent-muted">{t("adairLabel")}</p>
              <h2 className="font-heading text-4xl font-light leading-tight md:text-5xl">
                {t("adairTitle")}
              </h2>
              <p className="text-base leading-relaxed text-accent/85">
                {t("adairText1")}
              </p>
              <p className="text-base leading-relaxed text-accent/85">
                {t("adairText2")}
              </p>
              <p className="text-base leading-relaxed text-accent/85">
                {t("adairText3")}
              </p>
              <p className="text-base leading-relaxed text-accent/85">
                {t("adairText4")}
              </p>
              <p className="text-base leading-relaxed text-accent/85">
                {t("adairText5")}
              </p>
              <div className="pt-3">
                <Link
                  href={`/${locale}/shop/art`}
                  className="inline-flex min-h-11 items-center rounded-full border border-accent/50 px-7 py-2.5 font-display text-[10px] font-light uppercase tracking-[0.22em] text-accent transition-all duration-300 hover:border-accent hover:text-accent-light"
                >
                  {t("adairCta")}
                </Link>
              </div>
            </article>
            <div className="relative overflow-hidden rounded-[1.7rem] border border-accent/15 lg:sticky lg:top-28">
              <Image
                src="/mayka-adair-beach.jpg"
                alt={t("adairImageAlt")}
                width={1440}
                height={1800}
                className="h-[420px] w-full object-cover object-center lg:h-[680px]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── Mayka ── */}
      <section className="bg-bg-alt py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-primary-light/15 lg:sticky lg:top-28">
              <Image
                src="/selva-mayka-forest.jpg"
                alt={t("maykaImageAlt")}
                width={933}
                height={1166}
                className="h-[420px] w-full object-cover object-center lg:h-[680px]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <article className="space-y-5">
              <p className="luxury-label text-[10px] text-accent-muted">{t("maykaLabel")}</p>
              <h2 className="font-heading text-4xl font-light leading-tight text-text-on-light md:text-5xl">
                {t("maykaTitle")}
              </h2>
              <p className="text-base leading-relaxed text-text-on-light/85">
                {t("maykaText1")}
              </p>
              <p className="text-base leading-relaxed text-text-on-light/85">
                {t("maykaText2")}
              </p>
              <p className="text-base leading-relaxed text-text-on-light/85">
                {t("maykaText3")}
              </p>
              <p className="text-base leading-relaxed text-text-on-light/85">
                {t("maykaText4")}
              </p>
              <p className="text-base leading-relaxed text-text-on-light/85">
                {t("maykaText5")}
              </p>
              <blockquote className="border-l-2 border-primary-light/40 pl-5 font-heading text-xl font-light italic leading-relaxed text-text-on-light/70">
                &ldquo;{t("maykaQuote")}&rdquo;
              </blockquote>
              <div className="pt-3">
                <Link
                  href={`/${locale}/shop/fashion`}
                  className="inline-flex min-h-11 items-center rounded-full border border-primary/40 px-7 py-2.5 font-display text-[10px] font-light uppercase tracking-[0.22em] text-text-on-light transition-all duration-300 hover:border-primary hover:text-primary-dark"
                >
                  {t("maykaCta")}
                </Link>
              </div>
            </article>
          </div>

        </div>
      </section>

      {/* ── Saudade Land ── */}
      <section className="relative overflow-hidden bg-primary-light py-20 text-accent">
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <article className="space-y-5">
            <p className="luxury-label text-[10px] text-accent-muted">{t("landLabel")}</p>
            <h2 className="font-heading text-4xl font-light leading-tight md:text-5xl">
              {t("landTitle")}
            </h2>
            <p className="leading-relaxed text-accent/85">
              {t("landText1")}
            </p>
            <p className="leading-relaxed text-accent/85">
              {t("landText2")}
            </p>
            <p className="leading-relaxed text-accent/85">
              {t("landText3")}
            </p>
            <div className="pt-3">
              <Link
                href={`/${locale}/saudade-land`}
                className="inline-flex min-h-11 items-center rounded-full border border-accent/50 px-7 py-2.5 font-display text-[10px] font-light uppercase tracking-[0.22em] text-accent transition-all duration-300 hover:border-accent hover:text-accent-light"
              >
                {t("landCta")}
              </Link>
            </div>
          </article>
          <div className="overflow-hidden rounded-[1.7rem] border border-accent/20">
            <Image
              src="/adair-sister-kiss.jpeg"
              alt={t("landImageAlt")}
              width={1440}
              height={1800}
              className="h-[420px] w-full object-cover object-top lg:h-full lg:min-h-[500px]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>

      </section>

      {/* ── Closing ── */}
      <section className="bg-primary-dark px-5 py-24 text-center text-accent md:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="font-heading text-3xl font-light leading-relaxed text-accent/90 md:text-4xl">
            &ldquo;{t("closingQuote")}&rdquo;
          </p>
          <p className="mt-8 font-heading text-lg italic text-accent/50">
            {t("closingQuoteAttribution")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/community`}
              className="inline-flex min-h-11 items-center rounded-full border border-accent/40 px-7 py-2.5 font-display text-[10px] font-light uppercase tracking-[0.22em] text-accent transition-all duration-300 hover:border-accent hover:text-accent-light"
            >
              {t("joinCommunityCta")}
            </Link>
            <Link
              href={`/${locale}/shop/art`}
              className="inline-flex min-h-11 items-center rounded-full border border-accent/20 px-7 py-2.5 font-display text-[10px] font-light uppercase tracking-[0.22em] text-accent-muted transition-all duration-300 hover:border-accent/40 hover:text-accent"
            >
              {t("exploreShopCta")}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
