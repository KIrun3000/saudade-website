import { NextRequest, NextResponse } from "next/server";
import { checkSpam } from "@/lib/spam-guard";

const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY!;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID!;

export async function POST(req: NextRequest) {
  try {
    const { email, company, startedAt } = await req.json();

    // Spam protection: honeypot, submit-timing, email validation, rate limiting.
    const spam = checkSpam(req, { email, honeypot: company, startedAt });
    if (!spam.ok) {
      // Silently accept honeypot/timing hits so bots don't learn they failed.
      if (spam.reason === "honeypot" || spam.reason === "timing") {
        return NextResponse.json({ success: true });
      }
      const errorMessage =
        spam.status === 429
          ? "Too many requests. Please try again shortly."
          : "Please enter a valid email address.";
      return NextResponse.json({ error: errorMessage }, { status: spam.status });
    }

    // Subscribe the profile to the list WITH email-marketing consent.
    // The relationships endpoint only adds a profile to a list; it does not
    // record consent, so Klaviyo welcome flows (which target subscribed
    // profiles) never fire. This bulk-subscribe job sets consent = SUBSCRIBED,
    // and the list's opt-in setting in Klaviyo controls single vs double opt-in.
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
              custom_source: "Website — Newsletter form",
              profiles: {
                data: [
                  {
                    type: "profile",
                    attributes: {
                      email,
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

    console.log("[subscribe] subscribe job status:", subRes.status);

    // 202 Accepted = job queued successfully.
    if (subRes.status !== 202) {
      const text = await subRes.text();
      console.error("[subscribe] subscribe error:", subRes.status, text);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe] exception:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
