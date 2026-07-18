import Link from "next/link";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";

import { MushroomMascot } from "@/components/ui/MushroomMascot";

type FooterProps = {
  locale: string;
};

export function Footer({ locale }: FooterProps) {
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="relative text-accent" style={{ backgroundColor: "#0a1f23" }}>
      {/* the little mushroom lives on this rectangle's top edge */}
      <MushroomMascot />
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute -right-16 top-1/2 h-80 w-80 -translate-y-1/2 opacity-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mandala11-transparent.png" alt="" className="h-full w-full object-contain" style={{ animation: "spin 120s linear infinite", transformOrigin: "center center" }} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(216,207,196,0.06),transparent_50%),radial-gradient(circle_at_85%_80%,rgba(20,55,60,0.35),transparent_45%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <section>
          <p className="text-3xl tracking-[0.18em] text-accent" style={{ fontFamily: "var(--font-wordmark), sans-serif", fontWeight: 200 }}>SAUDADE</p>
          <h2 className="mt-3 font-heading text-3xl font-light leading-tight text-accent">
            {tFooter("tagline")}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-accent-muted">
            {tFooter("brandText")}
          </p>
        </section>

        <section>
          <h3 className="luxury-label text-[10px] text-accent-muted">
            {tFooter("contact")}
          </h3>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-accent-muted" />
              <a
                href="mailto:hello@saudadevoces.com"
                className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-accent-light"
              >
                hello@saudadevoces.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              <a
                href="https://instagram.com/saudadevoces"
                className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-accent-light"
                target="_blank"
                rel="noreferrer"
              >
                SaudadeVoces
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="luxury-label text-[10px] text-accent-muted">
            {tFooter("explore")}
          </h3>
          <div className="mt-5 grid gap-1 text-sm">
            <Link href={`/${locale}/about`} className="inline-flex min-h-11 items-center hover:text-accent-light">
              {tNav("about")} Saudade
            </Link>
            <Link href={`/${locale}/shop/art`} className="inline-flex min-h-11 items-center hover:text-accent-light">
              {tNav("art")}
            </Link>
            <Link href={`/${locale}/shop/fashion`} className="inline-flex min-h-11 items-center hover:text-accent-light">
              {tFooter("highFrequencyFashion")}
            </Link>
            <Link href={`/${locale}/events`} className="inline-flex min-h-11 items-center hover:text-accent-light">
              {tNav("events")}
            </Link>
            <Link href={`/${locale}/blog`} className="inline-flex min-h-11 items-center hover:text-accent-light">
              {tFooter("articles")}
            </Link>
            <Link href={`/${locale}/contact`} className="inline-flex min-h-11 items-center hover:text-accent-light">
              {tNav("contact")}
            </Link>
          </div>
        </section>
      </div>

      <div className="relative mx-auto w-full max-w-7xl border-t border-accent-muted/35 px-5 py-5 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-y-3">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-accent-muted">
            <Link href={`/${locale}/impressum`} className="inline-flex min-h-11 items-center hover:text-accent-light">
              {tFooter("impressum")}
            </Link>
            <Link href={`/${locale}/datenschutz`} className="inline-flex min-h-11 items-center hover:text-accent-light">
              {tFooter("privacyPolicy")}
            </Link>
            <Link href={`/${locale}/refund-returns`} className="inline-flex min-h-11 items-center hover:text-accent-light">
              {tFooter("refundReturns")}
            </Link>
          </nav>
          <p className="text-xs text-accent-muted/60">
            © {new Date().getFullYear()} Saudade. All rights reserved. Powered by Saudade.
          </p>
        </div>
      </div>
    </footer>
  );
}
