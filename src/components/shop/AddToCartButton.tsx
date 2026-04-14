"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { useCart } from "./CartProvider";

type AddToCartButtonProps = {
  variantId: string;
  variantTitle: string;
  title: string;
  priceAmount: string;
  currencyCode: string;
  imageUrl?: string;
  disabled?: boolean;
};

export function AddToCartButton({
  variantId,
  variantTitle,
  title,
  priceAmount,
  currencyCode,
  imageUrl,
  disabled,
}: AddToCartButtonProps) {
  const t = useTranslations("shopPage");
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addToCart(variantId, 1, {
      title,
      variantTitle,
      priceAmount,
      currencyCode,
      imageUrl,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={disabled}
      className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-accent/60 bg-accent px-6 py-3 font-display text-[11px] font-light uppercase tracking-[0.22em] text-primary-dark transition-colors duration-300 hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60"
    >
      {disabled ? t("soldOut") : justAdded ? t("addedToCart") : t("addToCart")}
    </button>
  );
}
