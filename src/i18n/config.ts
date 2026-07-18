export const locales = ["en", "pt", "es", "pl"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
