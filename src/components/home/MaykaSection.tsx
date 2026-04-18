import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

type MaykaSectionProps = {
  locale: string;
};

export function MaykaSection({ locale }: MaykaSectionProps) {
  const t = useTranslations("mayka");

  return (
    <section className="bg-bg-light py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="absolute -left-3 -top-3 h-32 w-32 rounded-full border border-accent/60 bg-accent-light/40 md:-left-4 md:-top-4 md:h-56 md:w-56" />
          <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-primary-light/20 shadow-[0_35px_80px_-42px_rgba(9,30,34,0.4)]">
            <Image
              src="/wp-content/uploads/2024/10/784519E1-6171-45BA-AB39-9CE60DCC2A60_1_105_c.jpeg"
              alt={t("imageAlt")}
              width={920}
              height={1100}
              className="h-[300px] w-full object-cover md:h-[560px] lg:h-[600px]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 520px"
            />
          </div>
        </div>

        <article className="max-w-xl">
          <p className="luxury-label text-[10px] text-accent-muted">
            {t("label")}
          </p>
          <h2 className="mt-4 font-heading text-4xl font-light leading-tight text-text-on-light md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-on-light/85">
            {t("text")}
          </p>
          <p className="mt-6 font-accent text-3xl text-primary-light">
            {t("quote")}
          </p>
          <Link
            href={`/${locale}/about`}
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-primary-light bg-primary-light px-7 py-3 font-display text-[11px] font-light uppercase tracking-[0.22em] text-accent-light transition-colors duration-300 hover:bg-primary"
          >
            {t("cta")}
          </Link>
        </article>
      </div>
    </section>
  );
}
