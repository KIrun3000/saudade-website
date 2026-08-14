import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { ShopGridClient } from "@/components/shop/ShopGridClient";
import { buildLocaleOverlay, groupProductsByPainting } from "@/lib/groupProducts";
import { getAllProducts, type ShopifyProduct } from "@/lib/shopify";
import { pageMetadata } from "@/lib/seo";

type ArtPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ params }: ArtPageProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/shop/art",
    title: "Original Art & Limited Prints by Adair",
    description:
      "Original paintings by Adair — born from pure vision, printed in limited quantities. Framed canvas, framed poster, and more.",
    imageAlt: "Original paintings and limited art prints by Adair — Saudade",
  });
}

export default async function ArtPage({ params, searchParams }: ArtPageProps) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);

  // EN catalog drives variant structure; locale catalog supplies translated
  // titles and frame-colour values for ES/PT. Polish stays in English.
  const useLocaleOverlay = locale !== "en" && locale !== "pl";

  const [englishProducts, localeProducts] = await Promise.all([
    getAllProducts(250, "en").catch(() => [] as ShopifyProduct[]),
    useLocaleOverlay
      ? getAllProducts(250, locale).catch(() => [] as ShopifyProduct[])
      : Promise.resolve([] as ShopifyProduct[]),
  ]);

  const overlay = useLocaleOverlay ? buildLocaleOverlay(localeProducts, locale) : undefined;

  // Union locale-catalog variants into the EN products so every frame/size
  // SKU surfaces regardless of which Market published it.
  const productMap = new Map(englishProducts.map((p) => [p.handle, p]));
  for (const lp of localeProducts) {
    const en = productMap.get(lp.handle);
    if (!en) {
      productMap.set(lp.handle, lp);
      continue;
    }
    const seen = new Set(en.variants.edges.map((e) => e.node.id));
    const extras = lp.variants.edges.filter((e) => !seen.has(e.node.id));
    if (extras.length) {
      productMap.set(lp.handle, {
        ...en,
        variants: { edges: [...en.variants.edges, ...extras] },
      });
    }
  }

  const products = groupProductsByPainting(
    Array.from(productMap.values()),
    undefined,
    overlay,
  );

  return (
    <main>
      <div className="pt-20">
        <ShopGridClient
          locale={locale}
          products={products}
          collections={[]}
          initialCategory={category}
        />
      </div>
    </main>
  );
}
