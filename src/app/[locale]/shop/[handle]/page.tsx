import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailClient } from "@/components/shop/ProductDetailClient";
import { getAllProducts, getProductByHandle } from "@/lib/shopify";

type Props = {
  params: Promise<{ locale: string; handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {};
  }

  const image = product.images.edges[0]?.node;

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: image ? [{ url: image.url, alt: image.altText || product.title }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const allProducts = await getAllProducts(12);
  const related = allProducts
    .filter((entry) => entry.handle !== product.handle)
    .filter((entry) => entry.productType === product.productType || entry.tags.some((tag) => product.tags.includes(tag)))
    .slice(0, 4);

  return <ProductDetailClient locale={locale} product={product} related={related} />;
}
