import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ShopGridClient } from "@/components/shop/ShopGridClient";
import { LeafDecoration } from "@/components/ui/LeafDecoration";
import { getAllProducts, getCollections } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Shop — High Frequency Fashion",
  description:
    "High Frequency Fashion by Saudade — sustainable and ethical pieces inspired by nature, crafted with conscious materials.",
};

type ShopPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ShopPage({ params }: ShopPageProps) {
  const { locale } = await params;
  const t = await getTranslations("shopPage");
  let products = [] as Awaited<ReturnType<typeof getAllProducts>>;
  let collections = [] as Awaited<ReturnType<typeof getCollections>>;

  try {
    [products, collections] = await Promise.all([getAllProducts(80), getCollections(12)]);
  } catch {
    products = [];
    collections = [];
  }

  return (
    <main>
      <section className="relative overflow-hidden bg-primary-dark px-5 pb-16 pt-32 text-center text-accent md:px-8 md:pb-20 md:pt-36">
        <LeafDecoration position="bottom-right" />
        <p className="luxury-label text-sm text-accent-muted md:text-[11px]">{t("heroLabel")}</p>
        <h1 className="mt-4 font-display text-[2.25rem] font-light uppercase tracking-[0.2em] md:mt-6 md:text-7xl md:tracking-[0.3em]">
          {t("title")}
        </h1>
        <p className="mt-6 text-accent-muted">{t("subtitle")}</p>
      </section>

      <ShopGridClient locale={locale} products={products} collections={collections} />
    </main>
  );
}
