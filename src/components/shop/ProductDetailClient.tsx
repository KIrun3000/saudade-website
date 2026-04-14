"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { formatPrice, type ShopifyProduct } from "@/lib/shopify";

import { AddToCartButton } from "./AddToCartButton";

type ProductDetailClientProps = {
  locale: string;
  product: ShopifyProduct;
  related: ShopifyProduct[];
};

export function ProductDetailClient({ locale, product, related }: ProductDetailClientProps) {
  const t = useTranslations("shopPage");

  const images = product.images.edges.map((edge) => edge.node);
  const variants = product.variants.edges.map((edge) => edge.node);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const optionGroups = useMemo(() => {
    const map = new Map<string, string[]>();
    variants.forEach((variant) => {
      variant.selectedOptions.forEach((option) => {
        const existing = map.get(option.name) || [];
        if (!existing.includes(option.value)) {
          existing.push(option.value);
        }
        map.set(option.name, existing);
      });
    });
    return Array.from(map.entries()).map(([name, values]) => ({ name, values }));
  }, [variants]);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const firstVariant = variants[0];
    const initial: Record<string, string> = {};
    firstVariant?.selectedOptions.forEach((option) => {
      initial[option.name] = option.value;
    });
    return initial;
  });

  const selectedVariant = useMemo(() => {
    if (!variants.length) return null;
    return (
      variants.find((variant) =>
        variant.selectedOptions.every((option) => selectedOptions[option.name] === option.value),
      ) || variants[0]
    );
  }, [selectedOptions, variants]);

  const galleryImage = images[activeImageIndex] || selectedVariant?.image || images[0] || null;

  return (
    <main>
      <section className="bg-primary-dark px-6 pb-16 pt-36 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href={`/${locale}/shop`}
            className="font-display text-[11px] uppercase tracking-[0.22em] text-accent-muted hover:text-accent-light"
          >
            {t("backToShop")}
          </Link>
        </div>
      </section>

      <section className="bg-bg-alt py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] border border-primary-light/25 bg-bg-light">
              {galleryImage ? (
                <Image
                  src={galleryImage.url}
                  alt={galleryImage.altText || product.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : null}
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={`${image.url}-${index}`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
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
            <p className="luxury-label text-[10px] text-accent-muted">{product.productType || "Product"}</p>
            <h1 className="mt-4 font-heading text-5xl font-light text-text-on-light">{product.title}</h1>
            {selectedVariant ? (
              <p className="mt-4 text-2xl text-primary">
                {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
              </p>
            ) : null}

            <div
              className="prose prose-sm mt-6 max-w-none text-text-on-light/85"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml || `<p>${product.description}</p>` }}
            />

            {optionGroups.length ? (
              <div className="mt-8 space-y-5">
                {optionGroups.map((group) => (
                  <div key={group.name}>
                    <p className="font-display text-[11px] uppercase tracking-[0.2em] text-accent-muted">
                      {group.name}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {group.values.map((value) => {
                        const active = selectedOptions[group.name] === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setSelectedOptions((prev) => ({ ...prev, [group.name]: value }))}
                            className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm transition-colors ${
                              active
                                ? "border-primary bg-primary text-accent-light"
                                : "border-primary-light/30 text-text-on-light hover:border-primary-light"
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
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
