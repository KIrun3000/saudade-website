"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";

import { SaudadeWordmark } from "@/components/ui/SaudadeWordmark";

type HeroSectionProps = {
  locale: string;
};

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations("hero");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -24]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-primary pt-20 text-accent">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(20,61,67,0.6),transparent_55%),linear-gradient(180deg,#0d2b30_0%,#0f3b47_100%)]" />
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(210,187,178,0.04)_0%,transparent_37%,rgba(210,187,178,0.06)_75%,transparent_100%)]"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 py-10 text-center md:px-8 md:py-24">

        {/* ── Tagline + wordmark + subtitle — all constrained to the same width ── */}
        <div className="flex w-full max-w-[min(90vw,820px)] flex-col items-center text-accent">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="luxury-label w-full text-center text-[22px] tracking-[0.38em] text-accent/70 md:text-[26px]"
          >
            {t("tagline")}
          </motion.p>

          {/* ── SAUDADE wordmark with official logo mandala on D ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full"
          >
            <SaudadeWordmark size="hero" className="w-full h-auto" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="luxury-label w-full text-center text-[22px] tracking-[0.38em] text-accent/70 md:text-[26px]"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* ── Description spacer (text removed — repeated below) ── */}
        <div className="mt-8 md:mt-10" />

        {/* ── CTA buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-8 flex flex-nowrap justify-center gap-3 md:mt-10 md:gap-4"
        >
          <Link
            href={`/${locale}/about`}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-accent/65 bg-transparent px-6 py-2.5 font-display text-[10px] font-light uppercase tracking-[0.2em] text-accent transition-all duration-300 hover:border-accent-light hover:text-accent-light md:px-8 md:py-3 md:text-[11px]"
          >
            {t("explore")}
          </Link>
          <Link
            href={`/${locale}/shop`}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-accent/35 bg-transparent px-6 py-2.5 font-display text-[10px] font-light uppercase tracking-[0.2em] text-accent-muted transition-all duration-300 hover:border-sage hover:text-sage-light md:px-8 md:py-3 md:text-[11px]"
          >
            {t("shop")}
          </Link>
        </motion.div>

        {/* ── Certification spacer (text removed — repeated below) ── */}
        <div className="mt-10 border-t border-accent/15 pt-5 md:mt-14" />
      </div>
    </section>
  );
}
