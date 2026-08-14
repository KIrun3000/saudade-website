import type { Metadata } from "next";
import Link from "next/link";
import { Newsletter } from "@/components/ui/Newsletter";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "fashionPage" });
  return {
    ...pageMetadata({
      locale,
      path: "/shop/fashion",
      title: t("metaTitle"),
      description: t("metaDescription"),
      imageAlt: "Chaka Arcana — the five-kimono collection by Saudade",
    }),
    // Keep the placeholder out of search results while the collection is hidden.
    robots: { index: false, follow: false },
  };
}

// ── Coming-soon splash ──
// The full Chaka Arcana collection page is preserved in
// `page.published.tsx.bak` in this folder. Restore it (rename back to
// page.tsx) once the garment photography is ready.
export default async function FashionPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("fashionPage");

  return (
    <main className="relative" style={{ backgroundColor: "#0a1f23", color: "#d8cfc4" }}>

      {/* ── Background texture — same Ixchel teal surface as the full page ── */}
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
        <section className="relative flex min-h-screen flex-col items-center justify-center px-5 py-24 text-center">
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(20,55,60,0.5) 0%, transparent 70%)" }} />

          <div className="relative flex w-full max-w-xl flex-col items-center">

            {/* Eyebrow */}
            <div className="mb-10 flex items-center gap-6">
              <div className="h-px w-16 bg-current opacity-15" />
              <p style={{ fontFamily: "var(--font-display)", fontSize: "10px", letterSpacing: "0.3em", opacity: 0.45 }} className="uppercase">
                {t("comingSoonEyebrow")}
              </p>
              <div className="h-px w-16 bg-current opacity-15" />
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "0.02em",
              }}
              className="text-[clamp(3rem,9vw,6rem)]"
            >
              {t("comingSoonTitle")}
            </h1>

            {/* Thin rule */}
            <div className="my-10 h-px w-12 opacity-20" style={{ backgroundColor: "currentColor" }} />

            {/* Teaser */}
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 300,
                fontSize: "clamp(1rem,1.6vw,1.2rem)",
                lineHeight: 1.9,
                opacity: 0.6,
              }}
            >
              {t("comingSoonBody")}
            </p>

            {/* Presale signup */}
            <div className="mt-12 flex w-full justify-center">
              <Newsletter variant="dark" submitLabel={t("presaleSubmit")} />
            </div>

            {/* Back link */}
            <div className="mt-14">
              <Link
                href={`/${locale}/shop`}
                style={{ fontFamily: "var(--font-display)", fontSize: "9px", letterSpacing: "0.28em", opacity: 0.4, borderBottom: "1px solid rgba(216,207,196,0.2)", paddingBottom: "3px" }}
                className="uppercase transition-opacity duration-300 hover:opacity-70"
              >
                {t("backToShop")}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
