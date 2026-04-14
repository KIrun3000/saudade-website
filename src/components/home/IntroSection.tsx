"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function IntroSection() {
  const t = useTranslations("intro");

  return (
    <section className="relative overflow-hidden bg-bg-alt py-24">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,rgba(210,187,178,0.15)_0%,rgba(245,240,235,0.8)_35%,rgba(253,252,250,0.72)_100%)]" />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="luxury-label text-[11px] text-accent-muted"
        >
          {t("label")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-4 max-w-4xl font-heading text-[2rem] font-light leading-tight text-text-on-light md:text-6xl"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, delay: 0.16 }}
          className="mt-8 max-w-3xl text-lg leading-relaxed text-text-on-light/85 md:text-xl"
        >
          {t("text")}
        </motion.p>
      </div>
    </section>
  );
}
