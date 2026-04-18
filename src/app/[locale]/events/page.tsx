import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("eventsPage");
  const tNav = await getTranslations("nav");

  return (
    <main>
      <section className="bg-primary-dark px-5 pb-16 pt-32 text-center text-accent md:px-8 md:pb-20 md:pt-36">
        <p className="luxury-label text-sm text-accent-muted md:text-[11px]">{t("heroLabel")}</p>
        <h1 className="mt-4 font-display text-[2.25rem] font-light uppercase tracking-[0.2em] md:mt-6 md:text-7xl md:tracking-[0.3em]">
          {t("heroTitle")}
        </h1>
      </section>

      <section className="relative overflow-hidden bg-bg-light py-20">
        <div className="relative mx-auto max-w-5xl px-5 md:px-8">
          <h2 className="font-heading text-4xl font-light text-text-on-light md:text-5xl">
            {t("introTitle")}
          </h2>
          <p className="mt-6 leading-relaxed text-text-on-light/85">
            {t("introText")}
          </p>
        </div>
      </section>

      <section className="bg-primary py-20 text-accent">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h3 className="font-heading text-4xl font-light">{t("festivalTitle")}</h3>
          <p className="mt-6 max-w-4xl leading-relaxed text-accent/86">
            {t("festivalText")}
          </p>

          <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2">
            {[
              "/wp-content/uploads/2025/08/fest-1.jpg",
              "/wp-content/uploads/2025/08/fest-3.jpg",
              "/wp-content/uploads/2025/08/48771295762_d6f7813a78_c-799x460-1.jpg",
              "/wp-content/uploads/2025/08/istockphoto-1141427484-612x612-1.jpg",
            ].map((image) => (
              <div key={image} className="relative h-56 overflow-hidden rounded-2xl border border-accent/20">
                <Image
                  src={image}
                  alt={t("festivalImageAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-alt py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:px-8 md:grid-cols-2">
          <article className="rounded-2xl border border-primary-light/15 bg-bg-light p-6">
            <h4 className="font-heading text-3xl font-light text-text-on-light">{t("spaceTitle")}</h4>
            <p className="mt-3 text-sm text-text-on-light/78">
              {t("spaceText")}
            </p>
            <Link
              href={`/${locale}/community`}
              className="mt-4 inline-flex text-sm text-primary-light transition-colors duration-300 hover:text-primary-dark"
            >
              {t("spaceCta")}
            </Link>
          </article>
          <article className="rounded-2xl border border-primary-light/15 bg-bg-light p-6">
            <h4 className="font-heading text-3xl font-light text-text-on-light">{t("musicTitle")}</h4>
            <p className="mt-3 text-sm text-text-on-light/78">
              {t("musicText")}
            </p>
            <p className="mt-4 text-sm text-primary-light">{t("musicCta")}</p>
          </article>
          <article className="rounded-2xl border border-primary-light/15 bg-bg-light p-6">
            <h4 className="font-heading text-3xl font-light text-text-on-light">{t("yogaTitle")}</h4>
            <div className="relative mt-4 h-40 overflow-hidden rounded-xl">
              <Image
                src="/wp-content/uploads/2025/08/yoga_with_nature_at_the_sharpham_trust_1200px_10.jpg"
                alt={t("yogaImageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </article>
          <article className="rounded-2xl border border-primary-light/15 bg-bg-light p-6">
            <h4 className="font-heading text-3xl font-light text-text-on-light">{t("workshopTitle")}</h4>
            <p className="mt-3 text-sm text-text-on-light/78">
              {t("workshopText")}
            </p>
            <p className="mt-4 text-sm text-primary-light">{t("workshopCta")}</p>
          </article>
        </div>
      </section>

      <section className="bg-primary-dark py-14">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Link
            href={`/${locale}/community`}
            className="font-display text-[11px] font-light uppercase tracking-[0.22em] text-accent/90 transition-colors duration-300 hover:text-accent-light"
          >
            {tNav("community")}
          </Link>
        </div>
      </section>
    </main>
  );
}
