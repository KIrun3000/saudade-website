import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ContactForm } from "@/components/contact/ContactForm";
import { LeafDecoration } from "@/components/ui/LeafDecoration";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Saudade. Contact details, social profiles, and direct form for inquiries and collaborations.",
};

export default async function ContactPage() {
  const t = await getTranslations("contactPage");

  return (
    <main>
      <section className="bg-primary-dark px-5 pb-16 pt-32 text-center text-accent md:px-8 md:pb-20 md:pt-36">
        <p className="luxury-label text-sm text-accent-muted md:text-[11px]">{t("heroLabel")}</p>
        <h1 className="mt-4 font-display text-[2.25rem] font-light uppercase tracking-[0.2em] md:mt-6 md:text-7xl md:tracking-[0.3em]">
          {t("heroTitle")}
        </h1>
      </section>

      <section className="relative overflow-hidden bg-bg-light py-20">
        <LeafDecoration position="top-left" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-2">
          <article>
            <h2 className="font-heading text-4xl font-light text-text-on-light md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-6 leading-relaxed text-text-on-light/85">
              {t("text")}
            </p>
            <div className="mt-8 space-y-3 text-text-on-light/82">
              <p>{t("email")}</p>
              <p>{t("phone")}</p>
              <p>{t("location")}</p>
            </div>
            <div className="mt-8 space-y-2">
              <Link
                href="https://instagram.com/saudadevoces"
                className="block text-primary-light hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {t("brandAccount")}
              </Link>
              <Link
                href="https://instagram.com/maykalien"
                className="block text-primary-light hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {t("personalAccount")}
              </Link>
            </div>
          </article>

          <div className="rounded-2xl border border-primary-light/20 bg-bg-alt p-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
