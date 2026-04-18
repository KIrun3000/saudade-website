import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { ShopGridClient } from "@/components/shop/ShopGridClient";
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

async function fetchFirstFound(handles: string[]): Promise<ShopifyCollection | null> {
  for (const handle of handles) {
    try {
      const col = await getCollectionByHandle(handle);
      if (col) return col;
    } catch {
      // try next
    }
  }
  return null;
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { locale } = await params;

  // Fetch all products + collections + specific named collections in parallel
  const [allProducts, allCollections, artCollection, fashionCollection] = await Promise.all([
    getAllProducts(80).catch(() => []),
    getCollections(20).catch(() => []),
    fetchFirstFound(ART_HANDLES),
    fetchFirstFound(FASHION_HANDLES),
  ]);

  // Merge specifically fetched collections into the collections list (dedup by handle)
  const collectionMap = new Map<string, ShopifyCollection>();
  for (const col of allCollections) collectionMap.set(col.handle, col);
  if (artCollection) collectionMap.set(artCollection.handle, artCollection);
  if (fashionCollection) collectionMap.set(fashionCollection.handle, fashionCollection);
  const collections = Array.from(collectionMap.values());

  // Build a unified product list (dedup by handle) including collection products
  const productMap = new Map(allProducts.map((p) => [p.handle, p]));
  for (const col of [artCollection, fashionCollection]) {
    if (!col) continue;
    for (const { node } of col.products.edges) {
      if (!productMap.has(node.handle)) productMap.set(node.handle, node);
    }
  }
  const products = Array.from(productMap.values());

  // URL ?category= values for the hero links
  const artParam = artCollection?.handle ?? "art";
  const fashionParam = fashionCollection?.handle ?? "clothing";

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
            style={{
              backgroundImage:
                "url('/wp-content/uploads/2025/08/fest-1.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary/50 to-transparent" />
          <div className="relative px-8 text-center">
            <p className="luxury-label text-[10px] text-accent-muted">Collection</p>
            <h2 className="mt-3 font-display text-4xl font-light uppercase tracking-[0.22em] md:text-5xl">
              {artCollection?.title ?? "Art"}
            </h2>
            <p className="mt-3 text-sm text-accent/80">Prints, canvas &amp; home décor</p>
            <span className="mt-6 inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.2em] text-accent/90 transition-colors duration-300 group-hover:text-accent-light">
              Shop Art →
            </span>
          </div>
        </Link>

        {/* High Frequency Fashion column */}
        <Link
          href={`/${locale}/shop?category=${fashionParam}`}
          className="group relative flex flex-col items-center justify-end overflow-hidden bg-primary pb-14 text-accent"
          style={{ minHeight: "50vh" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "url('/wp-content/uploads/2025/08/48771295762_d6f7813a78_c-799x460-1.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary/50 to-transparent" />
          <div className="relative px-8 text-center">
            <p className="luxury-label text-[10px] text-accent-muted">Collection</p>
            <h2 className="mt-3 font-display text-4xl font-light uppercase tracking-[0.22em] md:text-5xl">
              {fashionCollection?.title ?? "High Frequency Fashion"}
            </h2>
            <p className="mt-3 text-sm text-accent/80">Conscious fashion for elevated living</p>
            <span className="mt-6 inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.2em] text-accent/90 transition-colors duration-300 group-hover:text-accent-light">
              Shop Fashion →
            </span>
          </div>
        </Link>
      </section>

      <Suspense fallback={null}>
        <ShopGridClient locale={locale} products={products} collections={collections} />
      </Suspense>
    </main>
  );
}
