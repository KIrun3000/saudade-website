import { NextRequest, NextResponse } from "next/server";

import { addToCheckout, createCheckout } from "@/lib/shopify";

type CheckoutItemInput = {
  variantId: string;
  quantity: number;
};

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as { items?: CheckoutItemInput[] };
    const items = payload.items?.filter((item) => item.quantity > 0) ?? [];

    if (!items.length) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    try {
      const [firstItem, ...restItems] = items;
      const checkout = await createCheckout(firstItem.variantId, firstItem.quantity);

      let currentCheckout = checkout;

      for (const item of restItems) {
        currentCheckout = await addToCheckout(currentCheckout.id, item.variantId, item.quantity);
      }

      return NextResponse.json({ webUrl: currentCheckout.webUrl });
    } catch (checkoutError) {
      const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
      if (!domain) {
        throw checkoutError;
      }

      // Fallback for stores where Storefront checkout mutations are disabled.
      const cartItems = items
        .map((item) => {
          const numericId = item.variantId.includes("gid://")
            ? item.variantId.split("/").pop()
            : item.variantId;
          return `${numericId}:${item.quantity}`;
        })
        .join(",");

      return NextResponse.json({
        webUrl: `https://${domain}/cart/${cartItems}`,
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
