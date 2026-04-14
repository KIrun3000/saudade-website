import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { formatPrice, getAllProducts, getFirstImage } from "@/lib/shopify";

const trustLogos = [
  "https://saudadevoces.com/wp-content/uploads/2023/09/client-logo-1.png",
  "https://saudadevoces.com/wp-content/uploads/2023/09/client-logo-2.png",
  "https://saudadevoces.com/wp-content/uploads/2023/09/client-logo-4.png",
];

type ShopPreviewProps = {
  locale: string;
};

export async function ShopPreview({ locale }: ShopPreviewProps) {
  const t = await getTranslations("shopPreview");
  let products = [] as Awaited<ReturnType<typeof getAllProducts>>;

  try {
    products = (await getAllProducts(4)).slice(0, 4);
  } catch {
    products = [];
  }

  return (
    <section className="bg-primary py-24 text-accent">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="luxury-label text-[10px] text-accent-muted">
              {t("label")}
            </p>
            <h2 className="mt-3 font-heading text-4xl font-light text-accent md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <Link
            href={`/${locale}/shop`}
            className="inline-flex min-h-11 items-center rounded-full border border-accent/60 px-6 py-2 font-display text-[11px] font-light uppercase tracking-[0.22em] text-accent transition-colors duration-300 hover:border-accent-light hover:text-accent-light"
          >
            {t("viewAll")}
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => {
            const image = getFirstImage(product);
            return (
            <article
              key={product.id}
              className="overflow-hidden rounded-[1.5rem] border border-accent/35 bg-primary-dark/75"
            >
              <Link href={`/${locale}/shop/${product.handle}`} className="block">
                <div className="relative h-56">
                  {image ? (
                    <Image
                      src={image.url}
                      alt={image.altText || product.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 50vw, 25vw"
                    />
                  ) : null}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-sm font-light uppercase tracking-[0.12em] text-accent">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-sm text-accent-muted">
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
          {products.length === 0 && (
            <div className="rounded-[1.5rem] border border-accent/25 bg-primary-dark/60 px-5 py-8 text-sm text-accent-muted md:col-span-2 xl:col-span-4">
              Produkte werden in Kuerze geladen.
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-accent/40 bg-primary-light/40 px-4 py-5 sm:px-6 md:flex-row md:flex-wrap md:items-center md:gap-6">
          <p className="luxury-label text-[10px] text-accent-muted">
            {t("certification")}
          </p>
          <div className="flex w-full items-center gap-4 overflow-x-auto pb-1 md:w-auto md:flex-wrap md:gap-6 md:overflow-visible">
            {trustLogos.map((logo) => (
              <Image
                key={logo}
                src={logo}
                alt={t("certLogoAlt")}
                width={120}
                height={52}
                className="h-auto w-auto max-h-8 flex-shrink-0 object-contain md:max-h-10"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
