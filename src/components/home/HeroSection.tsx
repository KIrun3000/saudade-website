"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";

type HeroSectionProps = {
  locale: string;
};

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations("hero");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -24]);

  return (
    <section
      data-mushroom-noperch
      className="relative flex min-h-screen items-center overflow-hidden pt-20 text-accent"
    >
      <motion.div
        aria-hidden="true"
        style={{ y }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_44%,rgba(20,61,67,0.55),transparent_62%)]" />
      </motion.div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 py-10 text-center md:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative flex w-full max-w-[min(92vw,880px)] flex-col items-center"
        >
          <h1 className="sr-only">SAUDADE — The Art That Made Us · High Frequency Living</h1>

          <p
            aria-hidden="true"
            className="w-full text-center text-accent/75"
            style={{
              fontFamily: "var(--font-wordmark), sans-serif",
              fontWeight: 200,
              fontSize: "clamp(0.85rem, 2.2vw, 1.7rem)",
              letterSpacing: "clamp(0.28em, 0.9vw, 0.46em)",
              textIndent: "clamp(0.28em, 0.9vw, 0.46em)",
            }}
          >
            {t("tagline")}
          </p>

          <motion.div
            className="relative my-8 w-full max-w-[min(98vw,1240px)] md:my-12"
            animate={{ scale: [1, 1.012, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Single anchor — all mandala layers share one center point.
                48.58% / 48.24% = measured center of the mandala embedded in saudade-lockup.svg (on the first D). */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute"
              style={{
                top: "48.24%",
                left: "48.58%",
                transform: "translate(-50%, -50%)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <motion.div
                style={{
                  gridArea: "1/1",
                  width: "min(40vw, 26rem)",
                  aspectRatio: "1",
                  background: "radial-gradient(circle, rgba(232,218,212,0.11) 0%, transparent 64%)",
                  filter: "blur(22px)",
                }}
                animate={{ opacity: [0.55, 1, 0.55], scale: [0.95, 1.08, 0.95] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                style={{
                  gridArea: "1/1",
                  width: "min(36vw, 24rem)",
                  aspectRatio: "1",
                  background:
                    "radial-gradient(circle at 50% 45%, rgba(210,187,178,0.20) 0%, rgba(106,139,91,0.12) 45%, transparent 72%)",
                  filter: "blur(26px)",
                }}
                animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.97, 1.05, 0.97] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div
                className="opacity-[0.30] md:opacity-[0.18]"
                style={{
                  gridArea: "1/1",
                  width: "min(44vw, 22rem)",
                  aspectRatio: "1",
                  // Fade circle over the small (lockup) mandala — strong but not fully hidden
                  WebkitMaskImage:
                    "radial-gradient(circle closest-side, rgba(0,0,0,0.35) 40%, black 62%)",
                  maskImage:
                    "radial-gradient(circle closest-side, rgba(0,0,0,0.35) 40%, black 62%)",
                }}
              >
                {/* Both mandalas are 12-fold (30° pitch). At 9.9° the rotating mandala's big petal
                    tips sit exactly midway between the lockup mandala's big petals. Each cycle glides
                    clockwise by exactly one 30° pitch — visually seamless (12-fold identity), easing
                    so it dwells at the symmetric phase and moves quickly through the tangled ones. */}
                <motion.img
                  src="/mandala11-transparent.png"
                  alt=""
                  aria-hidden="true"
                  className="block h-full w-full"
                  style={{ transformOrigin: "center center", willChange: "transform", backfaceVisibility: "hidden" }}
                  initial={{ rotate: 9.9 }}
                  animate={{ rotate: [9.9, 39.9] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/saudade-lockup.svg"
              alt=""
              aria-hidden="true"
              className="relative block w-full"
              style={{ filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.55))" }}
            />
          </motion.div>

          <p
            aria-hidden="true"
            className="w-full text-center text-accent/75"
            style={{
              fontFamily: "var(--font-wordmark), sans-serif",
              fontWeight: 200,
              fontSize: "clamp(0.85rem, 2.2vw, 1.7rem)",
              letterSpacing: "clamp(0.28em, 0.9vw, 0.46em)",
              textIndent: "clamp(0.28em, 0.9vw, 0.46em)",
            }}
          >
            {t("subtagline")}
          </p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-8 max-w-2xl font-heading text-[clamp(1rem,1.6vw,1.25rem)] font-light leading-relaxed text-accent/72 md:mt-10"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-12 flex flex-wrap justify-center gap-3 md:mt-16 md:gap-4"
        >
          <Link
            href={`/${locale}/shop/art`}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-accent/80 bg-accent px-6 py-2.5 font-display text-[10px] font-light uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:bg-accent-light hover:border-accent-light md:px-8 md:py-3 md:text-[11px]"
          >
            {t("ctaArt")}
          </Link>

          <Link
            href={`/${locale}/shop/fashion`}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-accent/35 bg-transparent px-6 py-2.5 font-display text-[10px] font-light uppercase tracking-[0.2em] text-accent-muted transition-all duration-300 hover:border-sage hover:text-sage-light md:px-8 md:py-3 md:text-[11px]"
          >
            {t("ctaClothing")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
