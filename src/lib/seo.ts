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

// og:locale codes per site locale (Brazilian Portuguese for the brand's roots).
const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  pt: "pt_BR",
  es: "es_ES",
  pl: "pl_PL",
};

type PageMetaOptions = {
  locale: string;
  /** Path after the locale segment, starting with "/" ("" for home). */
  path: string;
  title: string;
  description: string;
  images?: string[];
  /** Alt text for the OpenGraph/Twitter image(s). Defaults to the title. */
  imageAlt?: string;
  type?: "website" | "article";
};

/**
 * Full page Metadata: title + description + canonical/hreflang alternates +
 * matching OpenGraph/Twitter cards. Title flows through the root layout's
 * "%s | Saudade" template unless passed as { absolute }.
 *
 * Because Next replaces (rather than deep-merges) the root `openGraph`, every
 * page that sets its own must re-supply the image, siteName and locale — so we
 * do that here. When a page passes no `images`, we fall back to the branded
 * 1200×630 /opengraph-image so social shares always have a preview card.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  images,
  imageAlt,
  type = "website",
}: PageMetaOptions): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  const alt = imageAlt ?? title;
  const ogImages =
    images && images.length
      ? images.map((image) => ({ url: image, alt }))
      : [{ url: `${SITE_URL}/opengraph-image`, alt, width: 1200, height: 630 }];
  return {
    title,
    description,
    alternates: localeAlternates(locale, path),
    openGraph: {
      type,
      url,
      siteName: "Saudade",
      locale: OG_LOCALE[locale] ?? "en_US",
      title,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((image) => image.url),
    },
  };
}
