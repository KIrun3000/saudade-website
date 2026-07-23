import type { Metadata } from "next";
import { EventHighlight } from "@/components/home/EventHighlight";
import { HeroSection } from "@/components/home/HeroSection";
import { PillarsSection } from "@/components/home/PillarsSection";
import { ShopPreview } from "@/components/home/ShopPreview";
import { Newsletter } from "@/components/ui/Newsletter";
import { Reveal } from "@/components/ui/Reveal";
import { setRequestLocale } from "next-intl/server";
import { SITE_URL, localeAlternates } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = "Saudade — Sustainable Fashion & Original Art | High Frequency Living";
  const description =
    "Sustainable, GOTS-certified fashion made in Portugal. Original paintings and limited art prints by Adair. Conscious clothing and art with a higher purpose — born in Portugal, rooted in Brazil.";
  return {
    title: { absolute: title },
    description,
    alternates: localeAlternates(locale, ""),
    openGraph: { type: "website", url: `${SITE_URL}/${locale}`, title, description },
    twitter: { title, description },
  };
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative" style={{ backgroundColor: "#0a1f23", color: "#d8cfc4" }}>

      {/* ── Soft dawn glow rising behind the logo ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{
          height: "150vh",
          background:
            "radial-gradient(ellipse 65% 50% at 50% 30%, rgba(28,72,72,0.5) 0%, rgba(18,52,54,0.18) 40%, transparent 70%)",
        }}
      />
      {/* ── Fine film grain — even, subtle, intentional (no watery blotches) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/grain.webp')",
          backgroundSize: "260px 260px",
          backgroundRepeat: "repeat",
          opacity: 0.95,
        }}
      />

      <div className="relative z-10">
      <HeroSection locale={locale} />
      <ShopPreview locale={locale} />
      <EventHighlight locale={locale} />

      {/* ── Newsletter ── */}
      <section className="px-5 py-28 text-center text-accent md:px-8 md:py-36" style={{ backgroundColor: "rgba(9,30,34,0.55)", borderTop: "1px solid rgba(216,207,196,0.08)" }}>
        <Reveal className="mx-auto max-w-xl">
          <div className="mx-auto mb-8 h-px w-10" style={{ backgroundColor: "rgba(216,207,196,0.25)" }} />
          <p className="font-display text-[9px] uppercase tracking-[0.3em] opacity-40">Stay close</p>
          <h2 className="font-heading mt-5 text-[clamp(2rem,4vw,3.2rem)] font-light leading-tight">
            Some things are worth<br /><em className="opacity-60">waiting for.</em>
          </h2>
          <p className="font-heading mx-auto mt-5 max-w-sm text-base font-light leading-relaxed opacity-50">
            New collections, events, and stories — delivered quietly, only when there is something real to share.
          </p>
          <div className="mx-auto mt-10 flex justify-center">
            <Newsletter variant="dark" />
          </div>
        </Reveal>
      </section>

      <PillarsSection locale={locale} />
      </div>
    </main>
  );
}
