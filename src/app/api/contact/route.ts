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
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const note = `[Contact Form] ${new Date().toISOString()}\n${message}`;
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ").slice(1).join(" ") || "";

    // Try to create customer
    const createRes = await shopifyRequest("/customers.json", "POST", {
      customer: {
        first_name: firstName,
        last_name: lastName,
        email,
        note,
        tags: "contact-form",
        verified_email: true,
      },
    });

    if (createRes.status === 422) {
      // Customer already exists — search and update with new note
      const searchRes = await shopifyRequest(
        `/customers/search.json?query=email:${encodeURIComponent(email)}`,
        "GET"
      );
      const searchData = await searchRes.json();
      const existing = searchData.customers?.[0];

      if (existing) {
        const updatedNote = existing.note
          ? `${existing.note}\n\n${note}`
          : note;

        await shopifyRequest(`/customers/${existing.id}.json`, "PUT", {
          customer: {
            id: existing.id,
            note: updatedNote,
            tags: existing.tags
              ? `${existing.tags},contact-form`
              : "contact-form",
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
