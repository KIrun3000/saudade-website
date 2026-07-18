import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { formatPrice, getAllProducts, type ShopifyProduct } from "@/lib/shopify";
import { groupProductsByPainting } from "@/lib/groupProducts";
import { MadeWithLoveBadge } from "@/components/ui/CertBadges";
import { Reveal } from "@/components/ui/Reveal";

type ShopPreviewProps = {
  locale: string;
};

export async function ShopPreview({ locale }: ShopPreviewProps) {
  const t = await getTranslations("shopPreview");
  let products: ShopifyProduct[] = [];

  try {
    // Always use the EN catalog as the structure source (same strategy as shop page).
    const allProducts = await getAllProducts(250, "en");

    // Group into one virtual master product per painting (Material × Frame × Size).
    const grouped = groupProductsByPainting(allProducts);

    // Pick the preview image: prefer the Framed Poster / Black frame variant image,
    // fall back to the first product image.
    products = grouped.slice(0, 4).map((p) => {
      const framedBlackVariant = p.variants.edges
        .map((e) => e.node)
        .find(
          (v) =>
            v.availableForSale &&
            v.selectedOptions.some(
              (o) => o.name === "Material" && /framed poster/i.test(o.value),
            ) &&
            v.selectedOptions.some(
              (o) => o.name === "Frame" && /black/i.test(o.value),
            ),
        );
      const previewImage =
        framedBlackVariant?.image ?? p.images.edges[0]?.node ?? null;
      // Inject the chosen image as the first image so the card renders it.
      return {
        ...p,
        images: previewImage
          ? { edges: [{ node: previewImage }, ...p.images.edges.filter((e) => e.node.url !== previewImage.url)] }
          : p.images,
      };
    });
  } catch {
    products = [];
  }

  return (
    <section className="py-28 text-accent md:py-36" style={{ borderTop: "1px solid rgba(216,207,196,0.08)" }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="luxury-label text-[10px] text-accent-muted">
              {t("label")}
            </p>
            <h2 className="mt-4 font-heading text-[clamp(2rem,4.5vw,3.4rem)] font-light text-accent">
              {t("title")}
            </h2>
          </div>
          <Link
            href={`/${locale}/shop/art`}
            className="inline-flex min-h-11 items-center rounded-full border border-accent/60 px-6 py-2 font-display text-[11px] font-light uppercase tracking-[0.22em] text-accent transition-colors duration-300 hover:border-accent-light hover:text-accent-light"
          >
            {t("viewAll")}
          </Link>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product, i) => {
            const image = product.images.edges[0]?.node ?? null;
            return (
            <Reveal as="div" key={product.id} delay={i * 0.07} className="group">
              <Link href={`/${locale}/shop/${product.handle}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={image.url}
                      alt={product.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                      style={{ filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.4))" }}
                    />
                  ) : null}
                </div>
                <h3 className="mt-5 text-center font-heading text-lg font-light text-accent transition-colors duration-300 group-hover:text-accent-light md:text-xl">
                  {product.title}
                </h3>
              </Link>
            </Reveal>
            );
          })}
          {products.length === 0 && (
            <p className="text-center text-sm text-accent-muted sm:col-span-2 xl:col-span-4">
              Products coming soon.
            </p>
          )}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-accent/40 bg-primary-light/40 px-8 py-6 text-center sm:flex-row sm:gap-6 sm:px-10 sm:text-left">
          <p className="luxury-label order-2 text-[12px] leading-relaxed text-accent/80 sm:order-1 sm:flex-1">
            {t("certificationShort")}
          </p>
          <div className="order-1 sm:order-2 [&_img]:brightness-0 [&_img]:invert">
            <MadeWithLoveBadge className="h-24 w-24 shrink-0 sm:h-28 sm:w-28" />
          </div>
        </div>
      </div>
    </section>
  );
}
