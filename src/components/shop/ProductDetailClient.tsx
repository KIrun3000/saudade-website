"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { formatPrice, type ShopifyProduct, type ShopifyProductVariant } from "@/lib/shopify";
import { translateOptionName } from "@/lib/optionTranslations";

import { AddToCartButton } from "./AddToCartButton";

type ProductDetailClientProps = {
  locale: string;
  product: ShopifyProduct;
  related: ShopifyProduct[];
  /** Adjacent products in the catalog order (alphabetical). Wraparound, so
   *  these are non-null whenever there are two or more products. */
  prevProduct?: ShopifyProduct | null;
  nextProduct?: ShopifyProduct | null;
};

/** Axis order on the master product: Material → Frame → Size. Each axis is
 *  filtered by the upstream selection so the user can only pick from values
 *  that actually exist for the chosen combination. */
const AXIS_ORDER = ["Material", "Frame", "Size"] as const;

function variantOption(variant: ShopifyProductVariant, name: string): string | undefined {
  return variant.selectedOptions.find((o) => o.name === name)?.value;
}

export function ProductDetailClient({
  locale,
  product,
  related,
  prevProduct,
  nextProduct,
}: ProductDetailClientProps) {
  const t = useTranslations("shopPage");

  const images = product.images.edges.map((edge) => edge.node);
  const variants = product.variants.edges.map((edge) => edge.node);

  // Manual thumbnail pick. `null` means "follow the selected variant's image".
  // We reset to null whenever the chosen variant's image changes, so changing
  // the Frame colour automatically swaps the main view.
  const [manualThumbIndex, setManualThumbIndex] = useState<number | null>(null);

  // Discover which axes the variants actually use, in the canonical order.
  const axisNames: string[] = useMemo(() => {
    const seen = new Set<string>();
    for (const v of variants) for (const o of v.selectedOptions) seen.add(o.name);
    const ordered: string[] = AXIS_ORDER.filter((a) => seen.has(a));
    // Append any unexpected axes at the end so we never silently drop one.
    for (const name of seen) if (!(AXIS_ORDER as readonly string[]).includes(name)) ordered.push(name);
    return ordered;
  }, [variants]);

  // Initial selection: first variant's options (variants are pre-sorted).
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    variants[0]?.selectedOptions.forEach((option) => {
      initial[option.name] = option.value;
    });
    return initial;
  });

  /** Variants compatible with the selections for axes earlier than `axisName`.
   *  Used to derive which values for `axisName` are actually pickable. */
  const compatibleVariantsFor = (axisName: string): ShopifyProductVariant[] => {
    const upstreamAxes = axisNames.slice(0, axisNames.indexOf(axisName));
    return variants.filter((v) =>
      upstreamAxes.every((up) => {
        const sel = selectedOptions[up];
        return !sel || variantOption(v, up) === sel;
      }),
    );
  };

  // Per-axis: the values that appear in upstream-compatible variants, plus
  // whether at least one such variant is in stock for that value.
  type AxisValue = { value: string; available: boolean };
  type AxisGroup = { name: string; values: AxisValue[] };
  const axisGroups: AxisGroup[] = useMemo(() => {
    return axisNames
      .map((name) => {
        const compat = compatibleVariantsFor(name);
        const valueMap = new Map<string, boolean>(); // value → at-least-one-in-stock?
        for (const v of compat) {
          const value = variantOption(v, name);
          if (!value) continue;
          const prior = valueMap.get(value) ?? false;
          valueMap.set(value, prior || v.availableForSale);
        }
        const values = Array.from(valueMap, ([value, available]) => ({ value, available }));
        return { name, values };
      })
      // Hide an axis only when:
      //   - it has no values, OR
      //   - it collapses to the single placeholder value "None" (Canvas/Poster
      //     have no frame, so we don't want to surface a useless "None" pill).
      // Framed products with a single available frame colour still get the
      // picker rendered so the buyer can see what frame they're buying.
      .filter((g) => {
        if (g.values.length === 0) return false;
        if (g.values.length === 1 && g.values[0].value === "None") return false;
        return true;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axisNames, variants, selectedOptions]);

  // When an upstream change invalidates downstream selections, auto-pick the
  // first available downstream value so we always land on a real variant.
  useEffect(() => {
    let next = selectedOptions;
    let changed = false;
    for (const name of axisNames) {
      const compat = (() => {
        const upstreamAxes = axisNames.slice(0, axisNames.indexOf(name));
        return variants.filter((v) =>
          upstreamAxes.every((up) => {
            const sel = next[up];
            return !sel || variantOption(v, up) === sel;
          }),
        );
      })();
      const validValues = new Set<string>();
      for (const v of compat) {
        const value = variantOption(v, name);
        if (value) validValues.add(value);
      }
      const current = next[name];
      if (!current || !validValues.has(current)) {
        // Prefer an in-stock value; fall back to any.
        const inStock = compat.find((v) => v.availableForSale);
        const fallback = inStock ?? compat[0];
        const newValue = fallback ? variantOption(fallback, name) : undefined;
        if (newValue && newValue !== current) {
          next = { ...next, [name]: newValue };
          changed = true;
        }
      }
    }
    if (changed) setSelectedOptions(next);
  }, [selectedOptions, axisNames, variants]);

  const selectedVariant = useMemo(() => {
    if (!variants.length) return null;
    return (
      variants.find((variant) =>
        variant.selectedOptions.every((option) => selectedOptions[option.name] === option.value),
      ) || variants[0]
    );
  }, [selectedOptions, variants]);

  // When the variant's image changes (frame colour swap, size swap), drop any
  // prior thumbnail override so the main gallery follows the new variant.
  const variantImageUrl = selectedVariant?.image?.url ?? null;
  useEffect(() => {
    setManualThumbIndex(null);
  }, [variantImageUrl]);

  // If the variant's image is one of the gallery thumbnails, that's the active
  // thumbnail; otherwise no thumbnail is highlighted (the main image is the
  // variant-specific mockup which lives outside the four hero shots).
  const variantImageIndexInGallery = useMemo(() => {
    if (!variantImageUrl) return -1;
    return images.findIndex((img) => img.url === variantImageUrl);
  }, [images, variantImageUrl]);

  const activeImageIndex =
    manualThumbIndex !== null ? manualThumbIndex : variantImageIndexInGallery;

  const galleryImage =
    (manualThumbIndex !== null ? images[manualThumbIndex] : null) ||
    selectedVariant?.image ||
    images[0] ||
    null;

  return (
    <main>
      <section className="bg-primary-dark px-6 pb-16 pt-36 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link
            href={`/${locale}/shop`}
            className="font-display text-[11px] uppercase tracking-[0.22em] text-accent-muted hover:text-accent-light"
          >
            {t("backToShop")}
          </Link>
          {(prevProduct || nextProduct) && (
            <nav className="flex items-center gap-2" aria-label={t("nextProduct")}>
              {prevProduct ? (
                <Link
                  href={`/${locale}/shop/${prevProduct.handle}`}
                  aria-label={`${t("previousProduct")}: ${prevProduct.title}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 text-accent transition-colors hover:border-accent-light hover:text-accent-light"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              ) : null}
              {nextProduct ? (
                <Link
                  href={`/${locale}/shop/${nextProduct.handle}`}
                  aria-label={`${t("nextProduct")}: ${nextProduct.title}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 text-accent transition-colors hover:border-accent-light hover:text-accent-light"
                >
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : null}
            </nav>
          )}
        </div>
      </section>

      <section className="bg-bg-alt py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="relative overflow-hidden rounded-[1.8rem] border border-primary-light/25 bg-bg-light">
              {galleryImage ? (
                <Image
                  src={galleryImage.url}
                  alt={galleryImage.altText || product.title}
                  width={galleryImage.width || 800}
                  height={galleryImage.height || 800}
                  priority
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : null}
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={`${image.url}-${index}`}
                  type="button"
                  onClick={() => setManualThumbIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded-xl border transition-colors duration-200 ${
                    activeImageIndex === index
                      ? "border-primary"
                      : "border-primary-light/25 hover:border-primary-light/55"
                  }`}
                  aria-label={`${t("selectImage")} ${index + 1}`}
                >
                  <Image
                    src={image.url}
                    alt={image.altText || product.title}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-primary-light/20 bg-bg-light p-7">
            <p className="luxury-label text-[10px] text-accent-muted">{product.productType || t("product")}</p>
            <h1 className="mt-4 font-heading text-5xl font-light text-text-on-light">{product.title}</h1>
            {selectedVariant ? (
              <p className="mt-4 text-2xl text-primary">
                {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
              </p>
            ) : null}

            {(() => {
              // Swap to the description that belongs to the currently selected
              // Material (Poster / Framed Poster / Canvas / Framed Canvas) so
              // the spec-sheet bullets at the bottom always match what the
              // buyer is configuring.
              const material = selectedOptions.Material;
              const perMaterial =
                product.materialDescriptions && material
                  ? product.materialDescriptions[material]
                  : undefined;
              const html = perMaterial?.descriptionHtml ?? product.descriptionHtml;
              const plain = perMaterial?.description ?? product.description;
              return html ? (
                <div
                  key={material ?? "default"}
                  className="prose prose-sm mt-6 max-w-none text-text-on-light/85"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : plain ? (
                <p className="mt-6 text-sm text-text-on-light/85">{plain}</p>
              ) : null;
            })()}

            {axisGroups.length ? (
              <div className="mt-8 space-y-5">
                {axisGroups.map((group, idx) => {
                  // Inline preview right after Material so the buyer can see
                  // the live mockup without scrolling back to the main gallery
                  // — for every material (Framed Poster, Framed Canvas, Canvas,
                  // Poster), not just framed ones.
                  const showPreviewAfter =
                    group.name === "Material" && idx < axisGroups.length - 1;
                  return (
                    <div key={group.name}>
                      <p className="font-display text-[11px] uppercase tracking-[0.2em] text-accent-muted">
                        {translateOptionName(group.name, locale)}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {group.values.map(({ value, available }) => {
                          const active = selectedOptions[group.name] === value;
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() =>
                                setSelectedOptions((prev) => ({ ...prev, [group.name]: value }))
                              }
                              disabled={!available}
                              className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm transition-colors ${
                                active
                                  ? "border-primary bg-primary text-accent-light"
                                  : available
                                  ? "border-primary-light/30 text-text-on-light hover:border-primary-light"
                                  : "cursor-not-allowed border-primary-light/15 text-text-on-light/35 line-through"
                              }`}
                              aria-disabled={!available}
                              title={available ? undefined : t("soldOut")}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                      {showPreviewAfter && galleryImage ? (
                        <div className="mt-5 overflow-hidden rounded-2xl border border-primary-light/25 bg-bg-light">
                          <Image
                            key={galleryImage.url}
                            src={galleryImage.url}
                            alt={galleryImage.altText || product.title}
                            width={galleryImage.width || 600}
                            height={galleryImage.height || 600}
                            className="h-auto w-full object-cover"
                            sizes="(max-width: 1024px) 100vw, 400px"
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}

            {selectedVariant ? (
              <div className="mt-8">
                <AddToCartButton
                  variantId={selectedVariant.id}
                  variantTitle={selectedVariant.title}
                  title={product.title}
                  priceAmount={selectedVariant.price.amount}
                  currencyCode={selectedVariant.price.currencyCode}
                  imageUrl={selectedVariant.image?.url || images[0]?.url}
                  disabled={!selectedVariant.availableForSale}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="bg-bg-light py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <h2 className="font-heading text-4xl font-light text-text-on-light">{t("relatedTitle")}</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {related.map((item) => {
                const image = item.images.edges[0]?.node;
                return (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-[1.3rem] border border-primary-light/20 bg-bg-alt"
                  >
                    <Link href={`/${locale}/shop/${item.handle}`}>
                      <div className="relative aspect-[4/5]">
                        {image ? (
                          <Image
                            src={image.url}
                            alt={image.altText || item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        ) : null}
                      </div>
                      <div className="p-4">
                        <h3 className="line-clamp-2 font-heading text-2xl font-light text-text-on-light">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-primary">
                          {formatPrice(
                            item.priceRange.minVariantPrice.amount,
                            item.priceRange.minVariantPrice.currencyCode,
                          )}
                        </p>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
