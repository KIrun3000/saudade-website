"use client";

import { useEffect } from "react";

/** The root layout renders <html lang="en"> before the locale is known;
 *  this keeps the attribute in sync with the active locale (SEO + a11y). */
export function SetHtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
