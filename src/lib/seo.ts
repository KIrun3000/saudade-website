import type { Metadata } from "next";

import { defaultLocale, locales } from "@/i18n/config";

export const SITE_URL = "https://www.saudadevoces.com";

/**
 * Canonical URL + hreflang language alternates for a localized path.
 * `path` starts with "/" (or "" for the locale home page). Telling search
 * engines the canonical and every language version prevents the four locales
 * from competing as duplicate content, and lets Google serve the right
 * language per region (pt→Portugal/Brazil, es→Spain, etc.).
 */
export function localeAlternates(
  locale: string,
  path: string,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      // fallback Google serves when no language/region matches
      "x-default": `${SITE_URL}/${defaultLocale}${path}`,
    },
  };
}

type PageMetaOptions = {
  locale: string;
  /** Path after the locale segment, starting with "/" ("" for home). */
  path: string;
  title: string;
  description: string;
  images?: string[];
  type?: "website" | "article";
};

/**
 * Full page Metadata: title + description + canonical/hreflang alternates +
 * matching OpenGraph/Twitter cards. Title flows through the root layout's
 * "%s | Saudade" template unless passed as { absolute }.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  images,
  type = "website",
}: PageMetaOptions): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  return {
    title,
    description,
    alternates: localeAlternates(locale, path),
    openGraph: {
      type,
      url,
      title,
      description,
      ...(images ? { images } : {}),
    },
    twitter: {
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}
