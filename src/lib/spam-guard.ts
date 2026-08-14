import { NextRequest } from "next/server";

/**
 * Lightweight spam protection for public form endpoints.
 *
 * Layers (no third-party service required):
 *  1. Honeypot   — a hidden field bots tend to fill in; humans never see it.
 *  2. Timing     — bots submit near-instantly; reject anything faster than MIN_FILL_MS.
 *  3. Email      — stricter validation than "has an @".
 *  4. Rate limit — cap submissions per IP within a rolling window (in-memory).
 *  5. Length     — reject absurdly long payloads.
 *
 * Field-name convention for forms:
 *   - Honeypot input name: "company"  (visually hidden, autocomplete off)
 *   - Timing field name:   "startedAt" (ms epoch when the form was first rendered)
 */

// Reject submissions that arrive sooner than this after the form loads (ms).
// Kept low so genuine fast users (e.g. paste-and-send) aren't caught; the
// honeypot and rate limit are the primary defenses.
const MIN_FILL_MS = 1500;
// Reject "started" timestamps older than this (stale / replayed) (ms).
const MAX_FILL_MS = 1000 * 60 * 60; // 1 hour

// Per-IP rate limit.
const RATE_LIMIT_MAX = 5; // submissions...
const RATE_LIMIT_WINDOW_MS = 1000 * 60 * 10; // ...per 10 minutes

// Field length ceilings.
const MAX_EMAIL_LEN = 254;
const MAX_NAME_LEN = 120;
const MAX_MESSAGE_LEN = 5000;

export type SpamCheckInput = {
  /** Honeypot field value — must be empty for a real human. */
  honeypot?: unknown;
  /** ms-epoch timestamp captured when the form was first rendered. */
  startedAt?: unknown;
  email?: unknown;
  name?: unknown;
  message?: unknown;
};

export type SpamCheckResult =
  | { ok: true }
  | { ok: false; reason: string; status: number };

// Stricter-than-usual email check: single @, no spaces, a dotted domain,
// no consecutive dots, and a sane TLD. Not RFC-perfect on purpose — the goal
// is to reject the junk bots submit, not to police every valid address.
const EMAIL_RE =
  /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i;

export function isValidEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const email = value.trim();
  if (email.length === 0 || email.length > MAX_EMAIL_LEN) return false;
  if (email.includes("..")) return false;
  return EMAIL_RE.test(email);
}

// ---- In-memory rate limiter ------------------------------------------------
// Note: per-instance. On serverless this is best-effort (each cold instance
// has its own map), but it still meaningfully slows a burst from one source.
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function rateLimit(req: NextRequest): boolean {
  const ip = getClientIp(req);
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (bucket.count >= RATE_LIMIT_MAX) return false;
  bucket.count += 1;
  return true;
}

// Opportunistic cleanup so the map doesn't grow unbounded.
function sweep() {
  const now = Date.now();
  for (const [ip, b] of buckets) {
    if (now > b.resetAt) buckets.delete(ip);
  }
}

// ---- Combined check --------------------------------------------------------
export function checkSpam(
  req: NextRequest,
  input: SpamCheckInput,
  opts: { requireName?: boolean; requireMessage?: boolean } = {}
): SpamCheckResult {
  sweep();

  // 1. Honeypot — a filled hidden field means a bot.
  if (typeof input.honeypot === "string" && input.honeypot.trim() !== "") {
    return { ok: false, reason: "honeypot", status: 400 };
  }

  // 2. Timing — reject submissions that come in too fast or with a stale/absent stamp.
  const startedAt = Number(input.startedAt);
  if (Number.isFinite(startedAt) && startedAt > 0) {
    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
      return { ok: false, reason: "timing", status: 400 };
    }
  }
  // If startedAt is missing/invalid we don't hard-fail on timing alone — the
  // honeypot and rate limit still apply — to stay resilient to old clients.

  // 3. Email.
  if (!isValidEmail(input.email)) {
    return { ok: false, reason: "email", status: 400 };
  }

  // 4. Length ceilings on any provided text fields.
  if (typeof input.name === "string" && input.name.length > MAX_NAME_LEN) {
    return { ok: false, reason: "name-length", status: 400 };
  }
  if (typeof input.message === "string" && input.message.length > MAX_MESSAGE_LEN) {
    return { ok: false, reason: "message-length", status: 400 };
  }

  // 5. Required non-empty fields (used by the contact form).
  if (opts.requireName && (typeof input.name !== "string" || input.name.trim() === "")) {
    return { ok: false, reason: "name-required", status: 400 };
  }
  if (opts.requireMessage && (typeof input.message !== "string" || input.message.trim() === "")) {
    return { ok: false, reason: "message-required", status: 400 };
  }

  // 6. Rate limit (checked last so it only counts otherwise-valid attempts).
  if (!rateLimit(req)) {
    return { ok: false, reason: "rate-limit", status: 429 };
  }

  return { ok: true };
}
