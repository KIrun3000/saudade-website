import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { ShopGridClient } from "@/components/shop/ShopGridClient";
import { buildEnglishPaintingMap, groupProductsByPainting } from "@/lib/groupProducts";
import { getAllProducts, getCollectionByHandle, getCollections, type ShopifyCollection } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Shop — High Frequency Fashion",
  description:
    "High Frequency Fashion by Saudade — sustainable and ethical pieces inspired by nature, crafted with conscious materials.",
};

type ShopPageProps = {
  params: Promise<{ locale: string }>;
};

/** Possible collection handles for each category (tries each in order) */
const ART_HANDLES = ["art", "arte", "prints", "wall-art"];
const FASHION_HANDLES = ["high-frequency-fashion", "high-frequency-clothing", "clothing", "fashion", "frontpage"];

async function fetchFirstFound(handles: string[], locale?: string): Promise<ShopifyCollection | null> {
  for (const handle of handles) {
    try {
      const col = await getCollectionByHandle(handle, locale);
      if (col) return col;
    } catch {
      // try next
    }
  }
  return null;
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("shopPage");

  // Need an English-canonical painting map so non-EN locales can group
  // variants whose Shopify titles are inconsistently translated (e.g. some
  // PT products say "A Cerimônia", others still "The Ceremony Premium Matte
  // Paper"). For the EN locale itself the map is identical to local
  // resolution and adds no work. We only fetch the EN catalog separately
  // when the user-facing locale is not English.
  const needsEnglishMap = locale !== "en";

  // Fetch all products + collections + specific named collections in parallel.
  const [allProducts, allCollections, artCollection, fashionCollection, englishProducts] =
    await Promise.all([
      getAllProducts(250, locale).catch(() => []),
      getCollections(20, locale).catch(() => []),
      fetchFirstFound(ART_HANDLES, locale),
      fetchFirstFound(FASHION_HANDLES, locale),
      needsEnglishMap ? getAllProducts(250, "en").catch(() => []) : Promise.resolve([]),
    ]);

  const englishMap = needsEnglishMap ? buildEnglishPaintingMap(englishProducts) : undefined;

  // Merge specifically fetched collections into the collections list (dedup by handle)
  const collectionMap = new Map<string, ShopifyCollection>();
  for (const col of allCollections) collectionMap.set(col.handle, col);
  if (artCollection) collectionMap.set(artCollection.handle, artCollection);
  if (fashionCollection) collectionMap.set(fashionCollection.handle, fashionCollection);
  // Re-map each collection's product list through the same painting-grouping
  // transform, so collection memberships use the new virtual handles too.
  const collections = Array.from(collectionMap.values()).map((col) => ({
    ...col,
    products: {
      edges: groupProductsByPainting(
        col.products.edges.map((e) => e.node),
        englishMap,
      ).map((node) => ({ node })),
    },
  }));

  // Build a unified product list (dedup by handle) including collection products
  const productMap = new Map(allProducts.map((p) => [p.handle, p]));
  for (const col of [artCollection, fashionCollection]) {
    if (!col) continue;
    for (const { node } of col.products.edges) {
      if (!productMap.has(node.handle)) productMap.set(node.handle, node);
    }
  }
  const rawProducts = Array.from(productMap.values());

  // Collapse painting products that share a master title (e.g. "Soul Gathering — Canvas",
  // "Soul Gathering — Framed Poster") into one virtual product per painting with
  // Material × Frame × Size variants. Non-art products pass through unchanged.
  const products = groupProductsByPainting(rawProducts, englishMap);

  // URL ?category= values for the hero links
  const artParam = artCollection?.handle ?? "art";
  // fashionParam reserved for future use when the fashion collection goes live

  // Art hero background — Adair painting photo (newspaper cropped out)
  const artHeroImage =
    artCollection?.products.edges[0]?.node.images.edges[0]?.node.url ??
    "/adair-painting-clean.jpg";

  return (
    <main>
      {/* 2-column hero — clickable collection entries */}
      <section className="grid min-h-[80vh] grid-cols-1 pt-20 md:grid-cols-2">
        {/* Art column */}
        <Link
          href={`/${locale}/shop?category=${artParam}`}
          className="group relative flex flex-col items-center justify-end overflow-hidden bg-primary-dark pb-14 text-accent"
          style={{ minHeight: "50vh" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${artHeroImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary/50 to-transparent" />
          <div className="relative px-8 text-center">
            <h2 className="font-display text-4xl font-light uppercase tracking-[0.22em] md:text-5xl">
              {artCollection?.title ?? t("artTitle")}
            </h2>
            <p className="mt-2 luxury-label text-[10px] text-accent-muted">{t("collection")}</p>
            <p className="mt-3 text-sm text-accent/80">{t("artSubtitle")}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.2em] text-accent/90 transition-colors duration-300 group-hover:text-accent-light">
              {t("shopArt")} →
            </span>
          </div>
        </Link>

        {/* High Frequency Fashion column — coming soon */}
        <div
          className="relative flex flex-col items-center justify-center overflow-hidden bg-primary pb-14 pt-14 text-accent"
          style={{ minHeight: "50vh" }}
        >
          <div className="relative px-8 text-center">
            <h2 className="font-display text-4xl font-light uppercase tracking-[0.22em] md:text-5xl">
              {t("fashionTitle")}
            </h2>
            <p className="mt-2 luxury-label text-[10px] text-accent-muted">{t("collection")}</p>
            <div className="mx-auto mt-6 h-px w-12 bg-accent/30" />
            <p className="mt-5 font-display text-[11px] uppercase tracking-[0.3em] text-accent/50">
              {t("comingSoon")}
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <ShopGridClient locale={locale} products={products} collections={collections} />
      </Suspense>
    </main>
  );
}
