"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  variantId: string;
  quantity: number;
  title: string;
  variantTitle: string;
  priceAmount: string;
  currencyCode: string;
  imageUrl?: string;
};

type CartItemPayload = Omit<CartItem, "variantId" | "quantity">;

type CartContextValue = {
  items: CartItem[];
  addToCart: (variantId: string, quantity: number, payload: CartItemPayload) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  checkout: () => Promise<void>;
  isCheckingOut: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "saudade_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed)) {
        setItems(parsed);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback(
    (variantId: string, quantity: number, payload: CartItemPayload) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.variantId === variantId);
        if (existing) {
          return prev.map((item) =>
            item.variantId === variantId
              ? { ...item, quantity: Math.max(1, item.quantity + quantity) }
              : item,
          );
        }
        return [...prev, { variantId, quantity: Math.max(1, quantity), ...payload }];
      });
      setIsCartOpen(true);
    },
    [],
  );

  const removeFromCart = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((item) => item.variantId !== variantId));
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.variantId === variantId ? { ...item, quantity: Math.max(0, quantity) } : item))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const toggleCart = useCallback(() => setIsCartOpen((open) => !open), []);

  const checkout = useCallback(async () => {
    if (!items.length || isCheckingOut) return;

    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ variantId, quantity }) => ({ variantId, quantity })),
        }),
      });

      const data = (await response.json()) as { webUrl?: string; error?: string };

      if (!response.ok || !data.webUrl) {
        throw new Error(data.error || "Checkout failed");
      }

      window.location.href = data.webUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      setIsCheckingOut(false);
    }
  }, [isCheckingOut, items]);

  const cartCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const cartTotal = useMemo(
    () => items.reduce((acc, item) => acc + Number(item.priceAmount) * item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartCount,
      cartTotal,
      isCartOpen,
      toggleCart,
      checkout,
      isCheckingOut,
    }),
    [addToCart, cartCount, cartTotal, checkout, isCartOpen, isCheckingOut, items, removeFromCart, toggleCart, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
