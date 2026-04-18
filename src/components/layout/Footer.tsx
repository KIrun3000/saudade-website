import Link from "next/link";
import { useTranslations } from "next-intl";
import { AtSign, Mail } from "lucide-react";

import { Mandala } from "@/components/ui/Mandala";

type FooterProps = {
  locale: string;
};

export function Footer({ locale }: FooterProps) {
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="relative overflow-hidden bg-primary-dark text-accent">
      <div className="pointer-events-none absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 text-accent/20">
        <Mandala className="h-full w-full opacity-35" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(210,187,178,0.14),transparent_50%),radial-gradient(circle_at_85%_80%,rgba(106,139,91,0.12),transparent_45%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <section>
          <p className="font-accent text-2xl text-accent">saudade</p>
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
              <Mail className="mt-0.5 h-4 w-4 text-accent-muted" />
              <a
                href="mailto:support@saudadevoces.com"
                className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-accent-light"
              >
                support@saudadevoces.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <AtSign className="mt-0.5 h-4 w-4 text-accent-muted" />
              <a
                href="https://instagram.com/saudadevoces"
                className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-accent-light"
                target="_blank"
                rel="noreferrer"
              >
                @saudadevoces
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
            <Link href={`/${locale}/shop`} className="inline-flex min-h-11 items-center hover:text-accent-light">
              {tFooter("highFrequencyFashion")}
            </Link>
            <Link href={`/${locale}/events`} className="inline-flex min-h-11 items-center hover:text-accent-light">
              {tFooter("saudadeFestival")}
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
      </div>
    </footer>
  );
}
