import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { ProductDetailClient } from "@/components/shop/ProductDetailClient";
import {
  buildEnglishPaintingMap,
  getMasterHandle,
  groupProductsByPainting,
} from "@/lib/groupProducts";
import { getAllProducts, getProductByHandle, type ShopifyProduct } from "@/lib/shopify";

/**
 * Shopify sometimes ships descriptionHtml with NEAR-duplicate compliance blocks
 * (e.g. the EU-Representative footer appears once with a typo and once without).
 * We dedupe by trigram similarity rather than exact text match so that
 * "Saudade Unipessoal LDA" and "Souldade Unipessoal LDA" are treated as the
 * same block. Any block element (p, li, div, h1-6, small, etc.) whose text is
 * ≥70 % similar to one seen earlier is dropped.
 */
function deduplicateDescriptionHtml(html: string): string {
  // Trigram set of a normalised string.
  const trigrams = (s: string): Set<string> => {
    const t = s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (t.length < 3) return new Set([t]);
    const out = new Set<string>();
    for (let i = 0; i <= t.length - 3; i++) out.add(t.slice(i, i + 3));
    return out;
  };
  const jaccard = (a: Set<string>, b: Set<string>): number => {
    if (!a.size || !b.size) return 0;
    let inter = 0;
    for (const v of a) if (b.has(v)) inter++;
    return inter / (a.size + b.size - inter);
  };

  const seen: { plain: string; trigrams: Set<string> }[] = [];
  // Match common block-level wrappers Shopify uses.
  return html.replace(
    /<(p|li|div|h[1-6]|small|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi,
    (match, _tag, inner) => {
      const plain = inner
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
      // Skip empties and very short blocks (headings, single words).
      if (plain.length < 20) return match;
      const tgs = trigrams(plain);
      for (const prior of seen) {
        if (jaccard(tgs, prior.trigrams) >= 0.7) return "";
      }
      seen.push({ plain, trigrams: tgs });
      return match;
    },
  );
}

type Props = {
  params: Promise<{ locale: string; handle: string }>;
};

/**
 * Look the handle up in the painting-grouped catalog first (so painting slugs
 * like "soul-gathering" resolve to the synthetic master product). Fall back to
 * the raw Shopify handle for non-art products.
 *
 * For non-EN locales we also fetch the EN catalog and pass it to the grouping
 * step so variants whose translations differ across SKUs still bucket together
 * — see groupProductsByPainting / buildEnglishPaintingMap.
 */
async function resolveProduct(handle: string, locale?: string): Promise<ShopifyProduct | null> {
  const needsEnglishMap = !!locale && locale !== "en";
  const [allProducts, englishProducts] = await Promise.all([
    getAllProducts(250, locale).catch(() => [] as ShopifyProduct[]),
    needsEnglishMap
      ? getAllProducts(250, "en").catch(() => [] as ShopifyProduct[])
      : Promise.resolve([] as ShopifyProduct[]),
  ]);
  const englishMap = needsEnglishMap ? buildEnglishPaintingMap(englishProducts) : undefined;
  const grouped = groupProductsByPainting(allProducts, englishMap);
  const master = grouped.find((p) => p.handle === handle);
  if (master) return master;
  return getProductByHandle(handle, locale);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle, locale } = await params;
  const product = await resolveProduct(handle, locale);

  if (!product) {
    return {};
  }

  const image = product.images.edges[0]?.node;

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: image ? [{ url: image.url, alt: image.altText || product.title }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, handle } = await params;
  setRequestLocale(locale);

  // Pull the full catalog so we can both: (a) resolve the master product, and
  // (b) build a "related" list from the same grouped view. For non-EN locales
  // we also pull the EN catalog and pass it to grouping as the canonical
  // bucket-key source (handles inconsistent Shopify translations).
  const needsEnglishMap = locale !== "en";
  const [allProducts, englishProducts] = await Promise.all([
    getAllProducts(250, locale).catch(() => [] as ShopifyProduct[]),
    needsEnglishMap
      ? getAllProducts(250, "en").catch(() => [] as ShopifyProduct[])
      : Promise.resolve([] as ShopifyProduct[]),
  ]);
  const englishMap = needsEnglishMap ? buildEnglishPaintingMap(englishProducts) : undefined;
  const grouped = groupProductsByPainting(allProducts, englishMap);

  // 1) Direct hit on a master/painting handle (or non-art passthrough).
  let product = grouped.find((p) => p.handle === handle) ?? null;

  // 2) Legacy path: someone has a bookmark to a raw Shopify handle like
  //    "soul-gathering-canvas". Find the underlying product, then redirect
  //    to its painting master URL so the canonical art page is the master.
  if (!product) {
    const legacy = await getProductByHandle(handle, locale);
    if (legacy) {
      const master = getMasterHandle(legacy, englishMap);
      if (master && master !== legacy.handle) {
        redirect(`/${locale}/shop/${master}`);
      }
      product = legacy;
    }
  }

  if (!product) {
    notFound();
  }

  // Catalog walk: sorted by title so the prev/next order is stable. Wrap at
  // both ends so the buyer can keep browsing without a dead-end.
  const catalog = [...grouped].sort((a, b) => a.title.localeCompare(b.title));
  const currentIndex = catalog.findIndex((p) => p.handle === product!.handle);
  const prevProduct =
    catalog.length > 1
      ? catalog[(currentIndex - 1 + catalog.length) % catalog.length]
      : null;
  const nextProduct =
    catalog.length > 1 ? catalog[(currentIndex + 1) % catalog.length] : null;

  const related = grouped
    .filter((entry) => entry.handle !== product!.handle)
    .filter(
      (entry) =>
        entry.productType === product!.productType ||
        entry.tags.some((tag) => product!.tags.includes(tag)),
    )
    .slice(0, 4);

  const dedupedProduct = {
    ...product,
    descriptionHtml: deduplicateDescriptionHtml(product.descriptionHtml),
    // Apply the same dedup pass to every per-material description so the
    // Adair / EU-Rep / Care preface doesn't double up after we swap copy.
    materialDescriptions: product.materialDescriptions
      ? Object.fromEntries(
          Object.entries(product.materialDescriptions).map(([material, body]) => [
            material,
            {
              description: body.description,
              descriptionHtml: deduplicateDescriptionHtml(body.descriptionHtml),
            },
          ]),
        )
      : undefined,
  };

  return (
    <ProductDetailClient
      locale={locale}
      product={dedupedProduct}
      related={related}
      prevProduct={prevProduct}
      nextProduct={nextProduct}
    />
  );
}
