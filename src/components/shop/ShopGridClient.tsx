"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { formatPrice, getFirstImage, type ShopifyCollection, type ShopifyProduct } from "@/lib/shopify";

type ShopGridClientProps = {
  locale: string;
  products: ShopifyProduct[];
  collections: ShopifyCollection[];
};

const trustLogos = [
  "https://saudadevoces.com/wp-content/uploads/2023/09/client-logo-1.png",
  "https://saudadevoces.com/wp-content/uploads/2023/09/client-logo-2.png",
  "https://saudadevoces.com/wp-content/uploads/2023/09/client-logo-4.png",
];

export function ShopGridClient({ locale, products, collections }: ShopGridClientProps) {
  const t = useTranslations("shopPage");

  const tabs = useMemo(() => {
    const collectionTabs = collections.map((collection) => ({
      key: `collection:${collection.handle}`,
      label: collection.title,
    }));

    const productTypeTabs = Array.from(
      new Set(products.map((product) => product.productType).filter(Boolean)),
    ).map((type) => ({
      key: `type:${type.toLowerCase()}`,
      label: type,
    }));

    const unique = new Map<string, { key: string; label: string }>();
    for (const entry of [...collectionTabs, ...productTypeTabs]) {
      if (!unique.has(entry.label.toLowerCase())) {
        unique.set(entry.label.toLowerCase(), entry);
      }
    }

    return [{ key: "all", label: t("all") }, ...Array.from(unique.values())];
  }, [collections, products, t]);

  const [activeFilter, setActiveFilter] = useState("all");

  const collectionMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    collections.forEach((collection) => {
      collection.products.edges.forEach(({ node }) => {
        if (!map.has(node.handle)) {
          map.set(node.handle, new Set());
        }
        map.get(node.handle)?.add(collection.handle.toLowerCase());
      });
    });
    return map;
  }, [collections]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return products;

    if (activeFilter.startsWith("collection:")) {
      const handle = activeFilter.replace("collection:", "");
      return products.filter((product) => collectionMap.get(product.handle)?.has(handle));
    }

    if (activeFilter.startsWith("type:")) {
      const type = activeFilter.replace("type:", "");
      return products.filter((product) => product.productType.toLowerCase() === type);
    }

    return products;
  }, [activeFilter, collectionMap, products]);

  return (
    <section className="bg-bg-alt py-14">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`inline-flex min-h-11 items-center rounded-full border px-5 py-2 font-display text-[11px] font-light uppercase tracking-[0.2em] transition-colors duration-300 ${
                activeFilter === tab.key
                  ? "border-accent bg-accent text-primary-dark"
                  : "border-primary-light/35 text-primary hover:border-primary-light hover:text-primary-dark"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            const image = getFirstImage(product);
            return (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[1.5rem] border border-primary-light/25 bg-bg-light shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Link href={`/${locale}/shop/${product.handle}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-primary-dark/8">
                    {image ? (
                      <Image
                        src={image.url}
                        alt={image.altText || product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    ) : null}
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2 font-heading text-2xl font-light text-text-on-light">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-sm text-primary">
                      {formatPrice(
                        product.priceRange.minVariantPrice.amount,
                        product.priceRange.minVariantPrice.currencyCode,
                      )}
                    </p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-6 rounded-2xl border border-primary-light/35 bg-bg-light px-6 py-5">
          <p className="luxury-label text-[10px] text-accent-muted">{t("certification")}</p>
          <div className="flex flex-wrap items-center gap-6">
            {trustLogos.map((logo) => (
              <Image
                key={logo}
                src={logo}
                alt={t("certLogoAlt")}
                width={120}
                height={52}
                className="h-auto w-auto max-h-10 object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
