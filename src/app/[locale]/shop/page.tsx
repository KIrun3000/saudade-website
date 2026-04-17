import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { ShopGridClient } from "@/components/shop/ShopGridClient";
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
      {/* 2-column hero — clickable collection entries */}
      <section className="grid min-h-[80vh] grid-cols-1 pt-20 md:grid-cols-2">
        {/* Art column */}
        <Link
          href={`/${locale}/shop?category=art`}
          className="group relative flex flex-col items-center justify-end overflow-hidden bg-primary-dark pb-14 text-accent"
          style={{ minHeight: "50vh" }}
        >
          {/* background image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://saudadevoces.com/wp-content/uploads/2025/08/fest-1.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary/50 to-transparent" />
          <div className="relative px-8 text-center">
            <p className="luxury-label text-[10px] text-accent-muted">Collection</p>
            <h2 className="mt-3 font-display text-4xl font-light uppercase tracking-[0.22em] md:text-5xl">
              Art
            </h2>
            <p className="mt-3 text-sm text-accent/80">
              Prints, canvas & home décor
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.2em] text-accent/90 transition-colors duration-300 group-hover:text-accent-light">
              Shop Art →
            </span>
          </div>
        </Link>

        {/* Clothing column */}
        <Link
          href={`/${locale}/shop?category=clothing`}
          className="group relative flex flex-col items-center justify-end overflow-hidden bg-primary pb-14 text-accent"
          style={{ minHeight: "50vh" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://saudadevoces.com/wp-content/uploads/2025/08/48771295762_d6f7813a78_c-799x460-1.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary/50 to-transparent" />
          <div className="relative px-8 text-center">
            <p className="luxury-label text-[10px] text-accent-muted">Collection</p>
            <h2 className="mt-3 font-display text-4xl font-light uppercase tracking-[0.22em] md:text-5xl">
              High Frequency Clothing
            </h2>
            <p className="mt-3 text-sm text-accent/80">
              Conscious fashion for elevated living
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.2em] text-accent/90 transition-colors duration-300 group-hover:text-accent-light">
              Shop Clothing →
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
