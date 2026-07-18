import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";

const baseUrl = "https://www.saudadevoces.com";

const pages = [
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

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
      // hreflang: tell search engines every language version of this page
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page}`]),
        ),
      },
    })),
  );
}
