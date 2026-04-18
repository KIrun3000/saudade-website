import { NextRequest, NextResponse } from "next/server";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;
const API_VERSION = "2024-10";

async function shopifyRequest(path: string, method: string, body?: object) {
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/admin/api/${API_VERSION}${path}`,
    {
      method,
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_TOKEN,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    }
  );
  return res;
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Try to create subscriber
    const createRes = await shopifyRequest("/customers.json", "POST", {
      customer: {
        email,
        email_marketing_consent: {
          opt_in_level: "single_opt_in",
          state: "subscribed",
        },
        tags: "newsletter",
        verified_email: true,
      },
    });

    if (createRes.status === 422) {
      // Customer already exists — update marketing consent
      const searchRes = await shopifyRequest(
        `/customers/search.json?query=email:${encodeURIComponent(email)}`,
        "GET"
      );
      const searchData = await searchRes.json();
      const existing = searchData.customers?.[0];

      if (existing) {
        await shopifyRequest(`/customers/${existing.id}.json`, "PUT", {
          customer: {
            id: existing.id,
            email_marketing_consent: {
              opt_in_level: "single_opt_in",
              state: "subscribed",
            },
            tags: existing.tags ? `${existing.tags},newsletter` : "newsletter",
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
