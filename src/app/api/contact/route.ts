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
    // Subscribe with email-marketing consent so Klaviyo welcome flows fire.
    // (The relationships endpoint only adds to a list without consent, which
    // means subscribed-only flows skip the profile and never send.)
    const subRes = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
        method: "POST",
        headers: {
          "Authorization": `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          "Content-Type": "application/json",
          "revision": "2025-01-15",
        },
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              custom_source: "Website — Contact form",
              profiles: {
                data: [
                  {
                    type: "profile",
                    attributes: {
                      email,
                      ...(firstName ? { first_name: firstName } : {}),
                      subscriptions: {
                        email: { marketing: { consent: "SUBSCRIBED" } },
                      },
                    },
                  },
                ],
              },
            },
            relationships: {
              list: { data: { type: "list", id: KLAVIYO_LIST_ID } },
            },
          },
        }),
      }
    );

    if (subRes.status !== 202) {
      const text = await subRes.text();
      console.error("[contact] Klaviyo subscribe error:", subRes.status, text);
    }
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

    // Visitor auto-reply is intentionally handled by the Klaviyo flow (triggered
    // when the profile is subscribed below), not by a hardcoded email here, so
    // the confirmation message can be edited in Klaviyo without a code change.

    // Add to Klaviyo welcome flow
    await addToKlaviyo(email, firstName);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
