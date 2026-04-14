"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";

import { Mandala } from "@/components/ui/Mandala";

type HeroSectionProps = {
  locale: string;
};

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations("hero");
  const { scrollY } = useScroll();
  const layerOne = useTransform(scrollY, [0, 600], [0, -18]);
  const layerTwo = useTransform(scrollY, [0, 600], [0, -36]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-primary pt-20 text-accent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(20,61,67,0.56),transparent_48%),linear-gradient(180deg,#0d2b30_0%,#0f3b47_100%)]" />
      <motion.div
        style={{ y: layerTwo }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(210,187,178,0.04)_0%,transparent_37%,rgba(210,187,178,0.06)_75%,transparent_100%)]"
      />
      <motion.div
        style={{ y: layerOne }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 text-accent/30 sm:h-[19rem] sm:w-[19rem] md:h-[30rem] md:w-[30rem]"
      >
        <Mandala className="h-full w-full opacity-40" />
      </motion.div>
      <motion.div
        style={{ y: layerTwo }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[12rem] w-[12rem] -translate-x-1/2 -translate-y-1/2 text-accent/20 sm:h-[15rem] sm:w-[15rem] md:h-[24rem] md:w-[24rem]"
      >
        <Mandala className="h-full w-full opacity-55" />
      </motion.div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-10 text-center md:px-8 md:py-24">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="luxury-label text-xs text-accent/92 md:text-[13px]"
        >
          {t("tagline")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-10 max-w-[14ch] font-display text-[3rem] font-light uppercase leading-none tracking-[0.12em] text-accent drop-shadow-[0_8px_30px_rgba(0,0,0,0.32)] sm:text-[3.5rem] md:mt-24 md:text-[8rem] md:tracking-[0.24em]"
        >
          {t("title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.16 }}
          className="luxury-label mt-8 text-xs text-accent-light drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)] md:mt-16 md:text-[13px]"
        >
          {t("subtitle")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="mt-6 max-w-3xl text-sm leading-relaxed text-accent/92 md:mt-8 md:text-base"
        >
          {t("description")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.26 }}
          className="mt-8 flex flex-nowrap justify-center gap-2 sm:gap-3 md:mt-10 md:gap-4"
        >
          <Link
            href={`/${locale}/about`}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-accent/65 bg-transparent px-5 py-2.5 font-display text-[10px] font-light uppercase tracking-[0.18em] text-accent transition-all duration-300 hover:border-accent-light hover:text-accent-light sm:px-7 sm:text-[11px] md:px-8 md:py-3 md:tracking-[0.24em]"
          >
            {t("explore")}
          </Link>
          <Link
            href={`/${locale}/shop`}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-accent/35 bg-transparent px-5 py-2.5 font-display text-[10px] font-light uppercase tracking-[0.18em] text-accent-muted transition-all duration-300 hover:border-sage hover:text-sage-light sm:px-7 sm:text-[11px] md:px-8 md:py-3 md:tracking-[0.24em]"
          >
            {t("shop")}
          </Link>
        </motion.div>
        <div className="mt-8 border-t border-accent/20 pt-4 md:mt-12 md:pt-6">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3 }}
            className="luxury-label text-xs text-accent-muted"
          >
            {t("certification")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
