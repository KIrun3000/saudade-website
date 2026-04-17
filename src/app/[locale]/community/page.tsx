import type { Metadata } from "next";
import Link from "next/link";
import { Newsletter } from "@/components/ui/Newsletter";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Connect with the Saudade community of artists, musicians, healers, entrepreneurs, and dreamers building a conscious future together.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CommunityPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("communityPage");
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
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:px-8 md:grid-cols-1 lg:grid-cols-2">
          <article className="rounded-2xl border border-accent/25 bg-primary-dark/40 p-6">
            <h3 className="font-heading text-3xl font-light">{t("artists")}</h3>
            <p className="mt-3 text-accent-muted">{t("musicians")}</p>
            <p className="mt-2 text-accent-muted">{t("yoga")}</p>
          </article>
          <article className="rounded-2xl border border-accent/25 bg-primary-dark/40 p-6">
            <h3 className="font-heading text-3xl font-light">{t("builders")}</h3>
            <p className="mt-3 text-accent-muted">{t("investors")}</p>
            <p className="mt-2 text-accent-muted">{t("entrepreneurs")}</p>
          </article>
        </div>
      </section>

      <section className="bg-bg-alt py-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <h2 className="font-heading text-4xl font-light text-text-on-light md:text-5xl">
            {t("joinTitle")}
          </h2>
          <p className="mt-6 text-text-on-light/82">
            {t("contactEmail")}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            <Link
              href={`/${locale}/events`}
              className="font-display text-[11px] font-light uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:text-primary-dark"
            >
              {tNav("events")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="font-display text-[11px] font-light uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:text-primary-dark"
            >
              {tNav("contact")}
            </Link>
          </div>
          <div className="mt-8">
            <Newsletter />
          </div>
        </div>
      </section>
    </main>
  );
}
