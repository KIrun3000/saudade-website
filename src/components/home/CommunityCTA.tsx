import Link from "next/link";
import { useTranslations } from "next-intl";

import { Newsletter } from "@/components/ui/Newsletter";

type CommunityCTAProps = {
  locale: string;
};

export function CommunityCTA({ locale }: CommunityCTAProps) {
  const t = useTranslations("communityCta");

  return (
    <section className="bg-primary py-24 text-accent">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="luxury-label text-[10px] text-accent-muted">
          {t("label")}
        </p>
        <h2 className="mt-4 max-w-4xl font-heading text-4xl font-light leading-tight text-accent md:text-6xl">
          {t("title")}
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-accent-muted">
          {t("text")}
        </p>

        <div className="mt-10">
          <Newsletter />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Link
            href={`/${locale}/community`}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-accent/65 px-6 py-2 font-display text-[11px] font-light uppercase tracking-[0.22em] text-accent transition-colors duration-300 hover:border-accent-light hover:text-accent-light"
          >
            {t("exploreCta")}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-sage/60 px-6 py-2 font-display text-[11px] font-light uppercase tracking-[0.22em] text-sage-light transition-colors duration-300 hover:border-sage-light hover:text-sage-light"
          >
            {t("contactCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
