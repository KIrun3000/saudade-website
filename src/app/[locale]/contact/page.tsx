import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Saudade",
  description:
    "Get in touch with Saudade. Contact details, social profiles, and a direct form for inquiries and collaborations.",
};

export default async function ContactPage() {
  const t = await getTranslations("contactPage");

  return (
    <main className="relative" style={{ backgroundColor: "#0a1f23", color: "#d8cfc4" }}>
      {/* ── Ixchel grain texture ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/ixchel-bg-teal.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat-y",
          opacity: 0.85,
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 100%)",
          maskImage:
            "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      <div className="relative z-10">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-5 pb-12 pt-36 text-center md:px-8 md:pb-16 md:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(20,55,60,0.5) 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-7 flex items-center justify-center gap-5">
            <div className="h-px w-10 bg-current opacity-15" />
            <p style={{ fontFamily: "var(--font-display)", fontSize: "10px", letterSpacing: "0.32em", opacity: 0.4 }} className="uppercase">
              {t("heroTitle")}
            </p>
            <div className="h-px w-10 bg-current opacity-15" />
          </div>
          <h1
            style={{ fontFamily: "var(--font-heading)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "0.01em" }}
            className="text-[clamp(2.6rem,7vw,5rem)]"
          >
            {t("title")}
          </h1>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="px-5 pb-32 md:px-8" style={{ borderTop: "1px solid rgba(216,207,196,0.08)" }}>
        <div className="mx-auto grid max-w-6xl gap-12 pt-16 lg:grid-cols-2 lg:gap-16">
          {/* Left — invitation + details */}
          <article className="max-w-md">
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontSize: "clamp(1.15rem,2vw,1.5rem)", lineHeight: 1.7 }} className="text-accent/80">
              {t("text")}
            </p>

            <div className="mt-12 space-y-6">
              <a href="mailto:hello@saudadevoces.com" className="group flex items-center gap-4 transition-colors">
                <Mail className="h-4 w-4 text-accent-muted transition-colors group-hover:text-accent-light" />
                <span className="text-accent/85 transition-colors group-hover:text-accent-light">hello@saudadevoces.com</span>
              </a>
              <div className="flex items-center gap-4">
                <MapPin className="h-4 w-4 text-accent-muted" />
                <span className="text-accent/85">Portugal</span>
              </div>
              <a href="https://instagram.com/saudadevoces" target="_blank" rel="noreferrer" className="group flex items-center gap-4">
                <InstagramIcon className="h-4 w-4 text-accent-muted transition-colors group-hover:text-accent-light" />
                <span className="text-accent/85 transition-colors group-hover:text-accent-light">SaudadeVoces</span>
              </a>
              <a href="https://instagram.com/maykalien" target="_blank" rel="noreferrer" className="group flex items-center gap-4">
                <InstagramIcon className="h-4 w-4 text-accent-muted transition-colors group-hover:text-accent-light" />
                <span className="text-accent/85 transition-colors group-hover:text-accent-light">Maykalien</span>
              </a>
            </div>

          </article>

          {/* Right — form */}
          <div className="rounded-2xl border border-accent/12 p-6 md:p-8" style={{ backgroundColor: "rgba(216,207,196,0.02)" }}>
            <ContactForm />
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}
