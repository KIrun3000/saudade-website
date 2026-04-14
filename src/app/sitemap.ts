import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://saudade-website.vercel.app";
  const locales = ["en", "pt", "es"];
  const pages = [
    "",
    "/about",
    "/events",
    "/saudade-land",
    "/community",
    "/contact",
    "/blog",
    "/shop",
  ];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    })),
  );
}
