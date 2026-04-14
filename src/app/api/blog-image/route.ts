import { NextRequest } from "next/server";

const ALLOWED_HOSTS = new Set(["saudadevoces.com", "www.saudadevoces.com"]);

export async function GET(request: NextRequest) {
  const rawSrc = request.nextUrl.searchParams.get("src");

  if (!rawSrc) {
    return new Response("Missing src parameter", { status: 400 });
  }

  let sourceUrl: URL;

  try {
    sourceUrl = new URL(rawSrc);
  } catch {
    return new Response("Invalid src URL", { status: 400 });
  }

  if (
    sourceUrl.protocol !== "https:" ||
    !ALLOWED_HOSTS.has(sourceUrl.hostname) ||
    !sourceUrl.pathname.startsWith("/wp-content/uploads/")
  ) {
    return new Response("Blocked source", { status: 403 });
  }

  const upstream = await fetch(sourceUrl.toString(), {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; SaudadeImageProxy/1.0)",
      accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
    cache: "force-cache",
  });

  if (!upstream.ok || !upstream.body) {
    return new Response("Failed to fetch source image", { status: 502 });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "image/jpeg",
      "cache-control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
