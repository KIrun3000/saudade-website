import type { Metadata } from "next";
import Link from "next/link";
import { Newsletter } from "@/components/ui/Newsletter";
import { Reveal } from "@/components/ui/Reveal";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Collaborate — Saudade",
  description:
    "Saudade is just beginning, and it is being built with the people who believe in it. An open invitation to artists, musicians, healers, builders and investors who want to help create it.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CommunityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("communityPage");

  const roles = [
    { title: t("role1Title"), text: t("role1Text") },
    { title: t("role2Title"), text: t("role2Text") },
    { title: t("role3Title"), text: t("role3Text") },
    { title: t("role4Title"), text: t("role4Text") },
  ];

  return (
    <main style={{ backgroundColor: "#0c2429", color: "#d8cfc4" }}>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[80vh] items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/unity.webp')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0c2429 6%, rgba(12,36,41,0.55) 45%, rgba(12,36,41,0.2) 100%)" }} />

        <div className="relative mx-auto w-full max-w-5xl px-5 pb-24 pt-40 text-accent md:px-8">
          <p style={{ fontFamily: "var(--font-display)", fontSize: "10px", letterSpacing: "0.32em", opacity: 0.55 }} className="uppercase">
            {t("heroLabel")}
          </p>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 300, lineHeight: 1.08, letterSpacing: "0.01em" }} className="mt-5 max-w-3xl text-[clamp(2.6rem,6vw,5rem)]">
            {t("heroTitle")}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-accent/70 md:text-lg">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* ── The invitation ── */}
      <section className="px-5 py-28 md:px-8 md:py-32" style={{ borderTop: "1px solid rgba(216,207,196,0.08)" }}>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic" }} className="text-[clamp(1.4rem,3vw,2.1rem)] text-accent/85">
            {t("introLead")}
          </p>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }} className="mt-6 text-[clamp(1.05rem,1.7vw,1.25rem)] leading-relaxed text-accent/65">
            {t("introBody")}
          </p>
        </Reveal>
      </section>

      {/* ── Who we are looking for ── */}
      <section className="px-5 pb-28 md:px-8 md:pb-32">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "10px", letterSpacing: "0.3em", opacity: 0.4 }} className="mb-12 text-center uppercase">
              {t("lookingLabel")}
            </p>
          </Reveal>
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {roles.map((role, i) => (
              <Reveal as="div" key={role.title} delay={i * 0.08} className="border-t border-accent/12 pt-6">
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }} className="text-[clamp(1.5rem,2.4vw,2rem)] text-accent">
                  {role.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-accent/60 md:text-base">{role.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="px-5 py-28 text-center md:px-8 md:py-32" style={{ borderTop: "1px solid rgba(216,207,196,0.08)", backgroundColor: "rgba(9,30,34,0.4)" }}>
        <Reveal className="mx-auto max-w-3xl">
          <blockquote style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.5 }} className="text-[clamp(1.7rem,4vw,3rem)] text-accent/90">
            &ldquo;{t("quoteText")}&rdquo;
          </blockquote>
        </Reveal>
      </section>

      {/* ── Let's talk ── */}
      <section className="px-5 py-28 text-center md:px-8 md:py-36" style={{ borderTop: "1px solid rgba(216,207,196,0.08)" }}>
        <Reveal className="mx-auto max-w-xl">
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 300, lineHeight: 1.15 }} className="text-[clamp(2rem,4vw,3.2rem)] text-accent">
            {t("inviteTitle")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-accent/60">
            {t("inviteText")}
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex min-h-11 items-center rounded-full border border-accent/60 px-8 py-3 font-display text-[11px] font-light uppercase tracking-[0.22em] text-accent transition-colors duration-300 hover:border-accent-light hover:text-accent-light"
            >
              {t("reachOutCta")}
            </Link>
          </div>
          <div className="mt-16 flex justify-center">
            <Newsletter variant="dark" submitLabel="Stay Tuned" />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
