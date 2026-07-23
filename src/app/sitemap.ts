import type { MetadataRoute } from "next";

import { BLOG_SLUGS } from "@/lib/blog-articles";
import { groupProductsByPainting } from "@/lib/groupProducts";
import { getAllProducts, type ShopifyProduct } from "@/lib/shopify";
import { SITE_URL } from "@/lib/seo";
import { defaultLocale, locales } from "@/i18n/config";

const staticPages = [
  "",
  "/about",
  "/events",
  "/saudade-land",
  "/community",
  "/contact",
  "/blog",
  "/shop/art",
  "/shop/fashion",
];

/** One entry per locale for a path, each carrying the full hreflang set. */
function entriesFor(
  path: string,
  priority: number,
  changeFrequency: "weekly" | "monthly",
): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
        "x-default": `${SITE_URL}/${defaultLocale}${path}`,
      },
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Every painting (grouped master handle) gets its own URL so Google can
  // index and rank each artwork. Falls back gracefully if Shopify is down.
  let productPaths: string[] = [];
  try {
    const products = await getAllProducts(250, "en").catch(() => [] as ShopifyProduct[]);
    productPaths = groupProductsByPainting(products).map((p) => `/shop/${p.handle}`);
  } catch {
    productPaths = [];
  }

  const blogPaths = BLOG_SLUGS.map((slug) => `/blog/${slug}`);

  return [
    ...staticPages.flatMap((p) => entriesFor(p, p === "" ? 1 : 0.8, "weekly")),
    ...productPaths.flatMap((p) => entriesFor(p, 0.7, "weekly")),
    ...blogPaths.flatMap((p) => entriesFor(p, 0.6, "monthly")),
  ];
}
