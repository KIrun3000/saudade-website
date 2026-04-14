"use client";

import { Minus, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { formatPrice } from "@/lib/shopify";

import { useCart } from "./CartProvider";

type CartDrawerProps = {
  locale: string;
};

export function CartDrawer({ locale }: CartDrawerProps) {
  const t = useTranslations("cart");
  const { items, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal, checkout, isCheckingOut } =
    useCart();

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <>
          <motion.button
            aria-label={t("close")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-primary-dark/70 backdrop-blur-sm"
            onClick={toggleCart}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 250, damping: 28 }}
            className="fixed right-0 top-0 z-[80] flex h-dvh w-full max-w-md flex-col border-l border-accent/20 bg-primary-dark text-accent shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-accent/20 px-6 py-4">
              <h2 className="font-display text-sm uppercase tracking-[0.25em]">{t("title")}</h2>
              <button
                type="button"
                onClick={toggleCart}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-accent/30 text-accent"
                aria-label={t("close")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {!items.length ? (
                <p className="text-sm text-accent-muted">{t("empty")}</p>
              ) : (
                items.map((item) => (
                  <article key={item.variantId} className="rounded-2xl border border-accent/15 bg-primary-light/25 p-4">
                    <div className="flex items-start gap-3">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-16 w-16 rounded-lg object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null}
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 font-heading text-xl font-light">{item.title}</h3>
                        <p className="text-xs text-accent-muted">{item.variantTitle}</p>
                        <p className="mt-1 text-sm">{formatPrice(item.priceAmount, item.currencyCode)}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/30"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          aria-label={t("decrease")}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/30"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          aria-label={t("increase")}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="text-xs uppercase tracking-[0.16em] text-accent-muted hover:text-accent-light"
                        onClick={() => removeFromCart(item.variantId)}
                      >
                        {t("remove")}
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>

            <div className="space-y-4 border-t border-accent/20 px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span>{t("subtotal")}</span>
                <span>{formatPrice(String(cartTotal), "EUR")}</span>
              </div>
              <button
                type="button"
                onClick={() => void checkout()}
                disabled={!items.length || isCheckingOut}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-accent/60 bg-accent px-6 py-3 font-display text-[11px] font-light uppercase tracking-[0.22em] text-primary-dark transition-colors duration-300 hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCheckingOut ? t("redirecting") : t("checkout")}
              </button>
              <Link
                href={`/${locale}/shop`}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-accent/35 px-6 py-3 font-display text-[11px] font-light uppercase tracking-[0.22em] text-accent transition-colors duration-300 hover:border-accent-light hover:text-accent-light"
                onClick={toggleCart}
              >
                {t("continueShopping")}
              </Link>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
