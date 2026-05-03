import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { ProductDetailClient } from "@/components/shop/ProductDetailClient";
import {
  buildLocaleOverlay,
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
 * Look the handle up in the painting-grouped catalog. EN catalog drives
 * variant structure on every locale (so the detail page always sees all 4
 * materials × all 4 frame colours × all sizes), with the locale catalog
 * supplied as a translation overlay for ES/PT. Polish stays English.
 */
async function resolveProduct(handle: string, locale?: string): Promise<ShopifyProduct | null> {
  const useLocaleOverlay = !!locale && locale !== "en" && locale !== "pl";
  const [englishProducts, localeProducts] = await Promise.all([
    getAllProducts(250, "en").catch(() => [] as ShopifyProduct[]),
    useLocaleOverlay
      ? getAllProducts(250, locale).catch(() => [] as ShopifyProduct[])
      : Promise.resolve([] as ShopifyProduct[]),
  ]);
  const overlay = useLocaleOverlay ? buildLocaleOverlay(localeProducts, locale!) : undefined;

  // Same union-by-variant-id pass we do in the page route, so generateMetadata
  // and the page see the same merged catalog.
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
  const merged = Array.from(productMap.values());
  const grouped = groupProductsByPainting(merged, undefined, overlay);
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

  // EN catalog drives structure on every locale; locale catalog is just an
  // overlay for translations (titles, productType, frame colour values).
  // We also UNION the locale catalog's variants into the EN products so any
  // frame/size SKU that exists in the locale catalog but not in EN (Gelato
  // sometimes adds variants per-Market) still surfaces. Variant IDs are
  // immutable across Markets, so de-duping by id is safe.
  const useLocaleOverlay = locale !== "en" && locale !== "pl";
  const [englishProducts, localeProducts] = await Promise.all([
    getAllProducts(250, "en").catch(() => [] as ShopifyProduct[]),
    useLocaleOverlay
      ? getAllProducts(250, locale).catch(() => [] as ShopifyProduct[])
      : Promise.resolve([] as ShopifyProduct[]),
  ]);
  const overlay = useLocaleOverlay ? buildLocaleOverlay(localeProducts, locale) : undefined;

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
  const merged = Array.from(productMap.values());
  const grouped = groupProductsByPainting(merged, undefined, overlay);

  // 1) Direct hit on a master/painting handle (or non-art passthrough).
  let product = grouped.find((p) => p.handle === handle) ?? null;

  // 2) Legacy path: someone has a bookmark to a raw Shopify handle like
  //    "soul-gathering-canvas". Find the underlying product, then redirect
  //    to its painting master URL so the canonical art page is the master.
  if (!product) {
    const legacy = await getProductByHandle(handle, locale);
    if (legacy) {
      const master = getMasterHandle(legacy);
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
