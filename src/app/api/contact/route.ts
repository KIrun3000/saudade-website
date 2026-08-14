import { NextRequest, NextResponse } from "next/server";
import { checkSpam } from "@/lib/spam-guard";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY!;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID!;

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Saudade Voces <info@saudadevoces.com>",
      to,
      subject,
      html,
    }),
  });
  return res;
}

async function addToKlaviyo(email: string, firstName?: string) {
  try {
    // Step 1: Create or find profile
    const profileRes = await fetch("https://a.klaviyo.com/api/profiles/", {
      method: "POST",
      headers: {
        "Authorization": `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        "Content-Type": "application/json",
        "revision": "2025-01-15",
      },
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: { email, ...(firstName ? { first_name: firstName } : {}) },
        },
      }),
    });

    let profileId: string;
    if (profileRes.status === 201) {
      const profileData = await profileRes.json();
      profileId = profileData.data.id;
    } else if (profileRes.status === 409) {
      const profileData = await profileRes.json();
      profileId = profileData.errors?.[0]?.meta?.duplicate_profile_id;
    } else {
      console.error("[contact] Klaviyo profile error:", profileRes.status);
      return;
    }

    // Step 2: Add to list
    await fetch(`https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`, {
      method: "POST",
      headers: {
        "Authorization": `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        "Content-Type": "application/json",
        "revision": "2025-01-15",
      },
      body: JSON.stringify({
        data: [{ type: "profile", id: profileId }],
      }),
    });
  } catch (err) {
    console.error("[contact] Klaviyo error:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, company, startedAt } = await req.json();

    // Spam protection: honeypot, submit-timing, email validation,
    // length limits, and per-IP rate limiting.
    const spam = checkSpam(
      req,
      { name, email, message, honeypot: company, startedAt },
      { requireName: true, requireMessage: true }
    );
    if (!spam.ok) {
      // Return a generic success for silently-dropped spam (honeypot/timing)
      // so bots don't learn they were caught; surface real errors otherwise.
      if (spam.reason === "honeypot" || spam.reason === "timing") {
        return NextResponse.json({ success: true });
      }
      const errorMessage =
        spam.status === 429
          ? "Too many requests. Please try again shortly."
          : "Please check your details and try again.";
      return NextResponse.json({ error: errorMessage }, { status: spam.status });
    }

    const firstName = name.split(" ")[0];

    // Escape user-supplied values before embedding them in HTML emails so spam
    // can't inject markup or links into the notification you receive.
    const esc = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    const safeName = esc(name);
    const safeEmail = esc(email);
    const safeMessage = esc(message).replace(/\n/g, "<br>");
    const safeFirstName = esc(firstName);

    // Notify you
    await sendEmail(
      "hello@saudadevoces.com",
      `New message from ${safeName}`,
      `<h2>New Contact Form Submission</h2>
       <p><strong>Name:</strong> ${safeName}</p>
       <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
       <p><strong>Message:</strong></p>
       <p>${safeMessage}</p>`
    );

    // Auto-reply to visitor
    await sendEmail(
      email,
      "Thank you for reaching out — Saudade Voces",
      `<p>Dear ${safeFirstName},</p>
       <p>Thank you for reaching out to us. We have received your message and will get back to you within 48 hours.</p>
       <p>In the meantime, feel free to explore our world at <a href="https://www.saudadevoces.com">saudadevoces.com</a>.</p>
       <br>
       <p>With love,</p>
       <p><strong>Saudade Voces</strong></p>`
    );

    // Add to Klaviyo welcome flow
    await addToKlaviyo(email, firstName);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
