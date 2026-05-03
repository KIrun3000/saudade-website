/**
 * Fallback display-time translations for variant option NAMES and VALUES.
 *
 * The shop pages prefer Shopify's own translations (Maya translates products
 * directly in admin: "Soul Gathering — Framed Poster" → "Alma recolectora —
 * Póster enmarcado", etc.) and read them via the `LocaleOverlay` in
 * groupProducts.ts. This module fills the GAP cases — when a particular SKU
 * exists in the EN catalog but isn't translated yet on the locale catalog
 * (Markets coverage hole, new SKU, mistranslation) — so the UI never shows
 * an English token sitting next to translated ones.
 *
 * Polish stays in English by design (no PL translations in Shopify, Maya's
 * call); we therefore don't ship a PL value table.
 */

const SUPPORTED_VALUE_LOCALES = new Set(["es", "pt"]);
const SUPPORTED_NAME_LOCALES = new Set(["es", "pt"]);

const AXIS_NAME_TRANSLATIONS: Record<string, Record<string, string>> = {
  material: { es: "Material", pt: "Material" },
  frame:    { es: "Marco",    pt: "Moldura"  },
  size:     { es: "Tamaño",   pt: "Tamanho"  },
};

const MATERIAL_TRANSLATIONS: Record<string, Record<string, string>> = {
  "framed poster": { es: "Póster enmarcado", pt: "Cartaz emoldurado" },
  "framed canvas": { es: "Lienzo enmarcado", pt: "Tela emoldurada"   },
  "canvas":        { es: "Lienzo",            pt: "Tela"               },
  "poster":        { es: "Póster",            pt: "Cartaz"             },
};

const FRAME_TRANSLATIONS: Record<string, Record<string, string>> = {
  "black":     { es: "Marco negro",            pt: "Moldura preta"             },
  "white":     { es: "Marco blanco",           pt: "Moldura branca"            },
  "wood":      { es: "Marco de madera",        pt: "Moldura de madeira"        },
  "dark wood": { es: "Marco de madera oscura", pt: "Moldura de madeira escura" },
};

/** Strip " frame" / " marco" / " moldura" suffix and lowercase. */
function frameKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+(frame|marco|moldura|rama|ramka)$/i, "")
    .trim();
}

function materialKey(value: string): string {
  return value.toLowerCase().trim();
}

/**
 * Translate a variant option VALUE for display in `locale`. Returns the
 * original value unchanged for English / Polish / unknown locales, or for
 * axes/values we don't have a translation for.
 */
export function translateOptionValue(
  axisName: string,
  value: string,
  locale: string,
): string {
  if (!SUPPORTED_VALUE_LOCALES.has(locale)) return value;
  const axis = axisName.toLowerCase();

  if (axis === "material") {
    const hit = MATERIAL_TRANSLATIONS[materialKey(value)];
    return hit?.[locale] ?? value;
  }
  if (axis === "frame") {
    if (value === "None" || !value.trim()) return value;
    const hit = FRAME_TRANSLATIONS[frameKey(value)];
    return hit?.[locale] ?? value;
  }
  // Size is locale-independent (cm/inch units universal).
  return value;
}

/** Translate a variant option NAME ("Material" / "Frame" / "Size") for
 *  display in `locale`. Falls back to the English name. */
export function translateOptionName(
  axisName: string,
  locale: string,
): string {
  if (!SUPPORTED_NAME_LOCALES.has(locale)) return axisName;
  const hit = AXIS_NAME_TRANSLATIONS[axisName.toLowerCase()];
  return hit?.[locale] ?? axisName;
}

/**
 * Painting NAME translations. Keyed by the canonical English painting name
 * (already canonicalised via TITLE_ALIASES so e.g. "Nawra" and "Narwa" both
 * route to the same entry). Used as a fallback when Shopify doesn't have a
 * locale-translated title for the product, so the shop never shows
 * "The Guardian" mid-paragraph next to "Adair ha dibujado..." in Spanish.
 *
 * Adjustments to wording can be made directly here — every locale falls
 * back to the English canonical name when no entry exists.
 */
const PAINTING_NAME_TRANSLATIONS: Record<string, Record<string, string>> = {
  "narwa":                    { es: "Narwa",                     pt: "Narwa"                    },
  "the ceremony":             { es: "La Ceremonia",              pt: "A Cerimônia"              },
  "fraternal":                { es: "Fraternal",                  pt: "Fraternal"                 },
  "soul gathering":           { es: "Alma Recolectora",          pt: "Reunião de Almas"         },
  "naked desert":             { es: "Desierto Desnudo",          pt: "Deserto Nu"               },
  "the guardian":             { es: "El Guardián",               pt: "O Guardião"               },
  "grace":                    { es: "Gracia",                    pt: "Graça"                    },
  "folk master":              { es: "Maestro Folclórico",        pt: "Mestre Folclórico"        },
  "mystic garden":            { es: "Jardín Místico",            pt: "Jardim Místico"           },
  "double portrait on rose":  { es: "Retrato Doble en Rosa",     pt: "Retrato Duplo em Rosa"    },
  "double portrait on pink":  { es: "Retrato Doble en Rosa",     pt: "Retrato Duplo em Rosa"    },
  "woman":                    { es: "Mujer",                     pt: "Mulher"                   },
  "fraternal love":           { es: "Amor Fraternal",            pt: "Amor Fraternal"           },
  "intertwined":              { es: "Entrelazados",              pt: "Entrelaçados"             },
  "the eye":                  { es: "El Ojo",                    pt: "O Olho"                   },
};

/**
 * Translate a canonical English painting name for display in `locale`.
 * Returns `englishName` unchanged for English / Polish / unknown locales,
 * or when no entry exists for this painting.
 */
export function translatePaintingName(
  englishName: string,
  locale: string,
): string {
  if (!SUPPORTED_VALUE_LOCALES.has(locale)) return englishName;
  const hit = PAINTING_NAME_TRANSLATIONS[englishName.toLowerCase().trim()];
  return hit?.[locale] ?? englishName;
}
