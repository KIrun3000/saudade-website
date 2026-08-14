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

    // Step 1: Create or update the profile
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
          attributes: { email },
        },
      }),
    });

    let profileId: string;

    if (profileRes.status === 201) {
      const profileData = await profileRes.json();
      profileId = profileData.data.id;
    } else if (profileRes.status === 409) {
      // Profile already exists — extract id from conflict response
      const profileData = await profileRes.json();
      profileId = profileData.errors?.[0]?.meta?.duplicate_profile_id;
    } else {
      const text = await profileRes.text();
      console.error("[subscribe] profile error:", profileRes.status, text);
      return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
    }

    // Step 2: Add profile to list
    const listRes = await fetch(`https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`, {
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

    console.log("[subscribe] list add status:", listRes.status);

    if (listRes.status !== 204 && listRes.status !== 200) {
      const text = await listRes.text();
      console.error("[subscribe] list error:", text);
      return NextResponse.json({ error: "Failed to add to list" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe] exception:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
