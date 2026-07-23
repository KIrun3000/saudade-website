"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { formatPrice, getFirstImage, type ShopifyCollection, type ShopifyPrice, type ShopifyProduct } from "@/lib/shopify";
import { PALETTE_TAG_PREFIX } from "@/lib/groupProducts";
import { MadeWithLoveBadge } from "@/components/ui/CertBadges";

// Multiple of 6 so every non-final page fills complete rows in BOTH the mobile
// 2-column grid and the desktop 3-column grid — no orphaned item that makes a
// middle page look like the end of the catalog.
const PAGE_SIZE = 12;

// Canonical materials the grid can switch between. Order doubles as the
// fallback priority when a painting lacks the chosen material.
const MATERIAL_KEYS = ["Framed Poster", "Canvas", "Framed Canvas", "Poster"] as const;
type MaterialKey = (typeof MATERIAL_KEYS)[number];

// Default display priority — every card shows its gallery-wrapped Canvas look
// first (reads as an original painting, not a print), then degrades gracefully
// for paintings that lack a canvas source.
const DISPLAY_PRIORITY: MaterialKey[] = ["Canvas", "Framed Canvas", "Framed Poster", "Poster"];

/** Return the display price for a product card — preferring the lowest
 *  Framed Canvas variant so the shown price reflects the premium product,
 *  not the cheapest poster. Falls back to maxVariantPrice. */
function getDisplayPrice(product: ShopifyProduct): ShopifyPrice {
  const framedCanvasVariants = product.variants.edges
    .map((e) => e.node)
    .filter((v) =>
      !v.id.startsWith("phantom:") &&
      v.availableForSale &&
      v.selectedOptions.some(
        (o) => o.name.toLowerCase() === "material" && o.value === "Framed Canvas"
      )
    );
  if (framedCanvasVariants.length > 0) {
    const max = framedCanvasVariants.reduce((best, v) =>
      parseFloat(v.price.amount) > parseFloat(best.price.amount) ? v : best
    );
    return max.price;
  }
  return product.priceRange.maxVariantPrice;
}

/** Pick the grid image for a product. When `preferred` is set, try it first,
 *  then fall back through DISPLAY_PRIORITY; otherwise use DISPLAY_PRIORITY.
 *  Falls back to the product's first image if no per-material image exists
 *  (non-art products, or art missing the materialImages map). */
function pickDisplayImage(product: ShopifyProduct, preferred: MaterialKey | null) {
  const byMat = product.materialImages;
  if (byMat) {
    const order = preferred ? [preferred, ...DISPLAY_PRIORITY] : DISPLAY_PRIORITY;
    for (const m of order) {
      if (byMat[m]) return byMat[m]!;
    }
  }
  return getFirstImage(product);
}

type ShopGridClientProps = {
  locale: string;
  products: ShopifyProduct[];
  collections: ShopifyCollection[];
  /** Deep-link category (from the server-read ?category= query). Resolved to a
   *  tab on mount. Passed as a prop instead of read via useSearchParams so the
   *  grid stays server-rendered (useSearchParams would opt the subtree out of
   *  SSR, leaving the static HTML empty). */
  initialCategory?: string | null;
};

function normaliseLabel(label: string): string {
  if (/high.?frequency/i.test(label)) return "Clothing";
  return label;
}

/** Sidebar tabs we never want to surface, regardless of source (collection or
 *  product-type). Match case-insensitively after label normalisation. */
const HIDDEN_TAB_LABELS = new Set(["recommended products", "print material"]);
const isHiddenTab = (label: string) => HIDDEN_TAB_LABELS.has(label.trim().toLowerCase());

export function ShopGridClient({ locale, products, collections, initialCategory }: ShopGridClientProps) {
  const t = useTranslations("shopPage");

  const tabs = useMemo(() => {
    const collectionTabs = collections.map((collection) => ({
      key: `collection:${collection.handle}`,
      label: normaliseLabel(collection.title),
    }));

    const productTypeTabs = Array.from(
      new Set(products.map((product) => product.productType).filter(Boolean)),
    ).map((type) => ({
      key: `type:${type.toLowerCase()}`,
      label: normaliseLabel(type),
    }));

    const unique = new Map<string, { key: string; label: string }>();
    for (const entry of [...collectionTabs, ...productTypeTabs]) {
      if (isHiddenTab(entry.label)) continue;
      const norm = entry.label.toLowerCase();
      if (!unique.has(norm)) unique.set(norm, entry);
    }

    // No Featured/All toggle — the grid shows every piece by default; only real
    // category tabs (collections / product types) appear, if there are any.
    return Array.from(unique.values());
  }, [collections, products]);

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  // Sub-filter under the Art tab. null = no sub-filter (show all art).
  const [paletteFilter, setPaletteFilter] = useState<"bw" | "color" | null>(null);
  // Material display switch. null = default (framed-poster-first priority).
  // When set, every card shows that material's mockup (falling back if absent).
  const [materialView, setMaterialView] = useState<MaterialKey | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (initialCategory) {
      const match = tabs.find((tab) =>
        tab.label.toLowerCase().includes(initialCategory.toLowerCase()) ||
        tab.key.toLowerCase().includes(initialCategory.toLowerCase())
      );
      if (match) { setActiveFilter(match.key); return; }
    }
    // Default landing on "All" so every product is visible without clicking.
    setActiveFilter("all");
  }, [initialCategory, tabs]);

  const collectionMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    collections.forEach((collection) => {
      collection.products.edges.forEach(({ node }) => {
        if (!map.has(node.handle)) map.set(node.handle, new Set());
        map.get(node.handle)?.add(collection.handle.toLowerCase());
      });
    });
    return map;
  }, [collections]);

  // Detect whether the active tab is Art-ish (so we can show the B&W/Colour
  // sub-filter and the search bar focused only on paintings).
  const activeTab = tabs.find((t) => t.key === activeFilter);
  const isArtTab = !!activeTab && /art/i.test(activeTab.label);

  // Featured = the first products in the catalog (same set the old carousel used).
  const featuredHandles = useMemo(
    () => new Set(products.slice(0, 8).map((p) => p.handle)),
    [products],
  );

  const filteredProducts = useMemo(() => {
    let pool = products;
    if (activeFilter === "featured") {
      pool = pool.filter((p) => featuredHandles.has(p.handle));
    } else if (activeFilter.startsWith("collection:")) {
      const handle = activeFilter.replace("collection:", "");
      pool = pool.filter((p) => collectionMap.get(p.handle)?.has(handle));
    } else if (activeFilter.startsWith("type:")) {
      const type = activeFilter.replace("type:", "");
      pool = pool.filter((p) => p.productType.toLowerCase() === type);
    }
    // Palette sub-filter only makes sense when looking at art.
    if (isArtTab && paletteFilter) {
      pool = pool.filter((p) => p.tags.includes(`${PALETTE_TAG_PREFIX}${paletteFilter}`));
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      pool = pool.filter((p) => p.title.toLowerCase().includes(q));
    }
    // Surface featured items first in the All view so best-sellers lead the grid.
    if (activeFilter === "all" && !q) {
      pool = [...pool].sort((a, b) => {
        const af = featuredHandles.has(a.handle) ? 0 : 1;
        const bf = featuredHandles.has(b.handle) ? 0 : 1;
        return af - bf;
      });
    }
    return pool;
  }, [activeFilter, collectionMap, products, paletteFilter, isArtTab, searchQuery, featuredHandles]);

  // Pagination: PAGE_SIZE per page, reset to page 1 whenever the underlying filter
  // or search input changes so the user doesn't end up on an empty page.
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, paletteFilter, searchQuery]);
  // Clamp if the filtered list shrinks below the current page.
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);
  const paginatedProducts = useMemo(
    () => filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filteredProducts, currentPage],
  );

  return (
    <section style={{ backgroundColor: "#0a1f23", color: "#d8cfc4" }}>

      {/* ── Gallery header ── */}
      <header className="relative px-6 pt-24 pb-16 text-center md:px-8 md:pt-28 md:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(20,55,60,0.5) 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center">
          <div className="mb-8 flex items-center gap-6">
            <div className="h-px w-12 bg-current opacity-15" />
            <p style={{ fontFamily: "var(--font-display)", fontSize: "10px", letterSpacing: "0.32em", opacity: 0.4 }} className="uppercase">
              {t("galleryLabel")}
            </p>
            <div className="h-px w-12 bg-current opacity-15" />
          </div>
          <h1
            style={{ fontFamily: "var(--font-heading)", fontWeight: 300, lineHeight: 1.02, letterSpacing: "0.01em" }}
            className="text-[clamp(3rem,9vw,6.5rem)]"
          >
            {t("galleryTitle")}{" "}
            <em style={{ opacity: 0.55 }}>{t("galleryTitleItalic")}</em>
          </h1>
          <p
            style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(0.95rem,2vw,1.25rem)", letterSpacing: "0.03em" }}
            className="mt-6"
          >
            <span style={{ opacity: 0.85 }}>{t("gallerySubtitleLead")}</span>{" "}
            <span style={{ opacity: 0.5 }}>{t("gallerySubtitle")}</span>
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 pb-20 md:px-8">

        {/* Products: sidebar + grid */}
        <div className="flex gap-10 lg:gap-14">

          {/* Sidebar — desktop only, and only when real category tabs exist */}
          {tabs.length > 0 && (
            <aside className="hidden lg:block w-44 shrink-0">
              <p style={{ fontFamily: "var(--font-display)", fontSize: "10px", letterSpacing: "0.3em", opacity: 0.35 }} className="uppercase mb-6">PRODUCTS</p>
              <nav className="flex flex-col gap-0.5">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveFilter(tab.key)}
                    className={`text-left py-2.5 pl-4 font-display text-[11px] font-light uppercase tracking-[0.18em] transition-all duration-300 border-l-2 ${
                      activeFilter === tab.key
                        ? "border-[#d8cfc4] text-[#f2ece3]"
                        : "border-transparent text-[#d8cfc4]/40 hover:border-[#d8cfc4]/40 hover:text-[#d8cfc4]/80"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </aside>
          )}

          <div className="flex-1 min-w-0">
            {/* Mobile: scrollable filter tabs — only when real category tabs exist */}
            {tabs.length > 0 && (
              <div className="mb-6 flex gap-2.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveFilter(tab.key)}
                    className={`shrink-0 rounded-full border px-4 py-1.5 font-display text-[10px] font-light uppercase tracking-[0.18em] transition-colors duration-300 ${
                      activeFilter === tab.key
                        ? "border-[#d8cfc4] bg-[#d8cfc4]/10 text-[#f2ece3]"
                        : "border-[#d8cfc4]/25 text-[#d8cfc4]/50 hover:border-[#d8cfc4]/50 hover:text-[#d8cfc4]/80"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {/* Search bar */}
            <div className="mb-5">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-full border border-[#d8cfc4]/25 bg-transparent px-5 py-2.5 font-display text-[12px] tracking-[0.05em] text-[#f2ece3] placeholder:text-[#d8cfc4]/40 focus:border-[#d8cfc4]/70 focus:outline-none"
                aria-label={t("searchPlaceholder")}
              />
            </div>

            {/* Material display switch — swaps every card's mockup. Default
                (null) shows the gallery-wrapped canvas look; choosing a material
                shows that variation across the whole grid. */}
            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <span style={{ fontFamily: "var(--font-display)", fontSize: "10px", letterSpacing: "0.22em", opacity: 0.4 }} className="mr-1 uppercase">
                {t("displayAs")}
              </span>
              {(
                [
                  { key: null, label: t("materialCanvas") },
                  { key: "Framed Canvas", label: t("materialFramedCanvas") },
                  { key: "Framed Poster", label: t("materialFramedPoster") },
                  { key: "Poster", label: t("materialPoster") },
                ] as const
              ).map((opt) => {
                const active = materialView === opt.key;
                return (
                  <button
                    key={String(opt.key)}
                    type="button"
                    onClick={() => setMaterialView(opt.key)}
                    className={`shrink-0 rounded-full border px-4 py-1.5 font-display text-[10px] font-light uppercase tracking-[0.18em] transition-colors duration-300 ${
                      active
                        ? "border-[#d8cfc4] bg-[#d8cfc4]/10 text-[#f2ece3]"
                        : "border-[#d8cfc4]/25 text-[#d8cfc4]/55 hover:border-[#d8cfc4]/50 hover:text-[#d8cfc4]/80"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>


            {/* Grid — floating works, no boxes */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
              {paginatedProducts.map((product) => {
                const image = pickDisplayImage(product, materialView);
                return (
                  <article key={product.id} className="group">
                    <Link href={`/${locale}/shop/${product.handle}`} className="block">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        {image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={image.url}
                            alt={product.title}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                            style={{ filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.4))" }}
                          />
                        ) : null}
                      </div>
                      <div className="mt-5 text-center">
                        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }} className="line-clamp-2 text-lg text-[#f2ece3] md:text-xl">{product.title}</h3>
                        <p style={{ fontFamily: "var(--font-display)", letterSpacing: "0.08em" }} className="mt-1.5 text-sm text-[#d8cfc4]/55">{formatPrice(getDisplayPrice(product).amount, getDisplayPrice(product).currencyCode)}</p>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>

            {/* Pagination — always shown when there's at least one product so
                the buyer can see catalog scope. Arrows disable at boundaries. */}
            {filteredProducts.length > 0 ? (
              <div className="mt-10 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label={t("previousPage")}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d8cfc4]/25 text-[#d8cfc4] transition-colors hover:border-[#d8cfc4]/70 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="font-display text-[11px] uppercase tracking-[0.22em] text-[#d8cfc4]/70">
                  {t("pageIndicator", { current: currentPage, total: totalPages })}
                  <span className="ml-2 text-[#d8cfc4]/45">
                    · {t("productCount", { count: filteredProducts.length })}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label={t("nextPage")}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d8cfc4]/25 text-[#d8cfc4] transition-colors hover:border-[#d8cfc4]/70 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Made-with-love strip */}
        <div className="mt-16 rounded-2xl border border-[#d8cfc4]/15 px-6 py-5">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-6 sm:text-left">
            <p className="luxury-label order-2 text-[12px] leading-relaxed text-[#d8cfc4]/65 sm:order-1 sm:flex-1">
              {t("certificationShort")}
            </p>
            <MadeWithLoveBadge className="order-1 h-24 w-24 shrink-0 sm:order-2 sm:h-28 sm:w-28" />
          </div>
        </div>

      </div>
    </section>
  );
}
