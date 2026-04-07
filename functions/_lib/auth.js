// ── Shared auth utilities for all admin endpoints ───────────────────────────

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// ── HMAC-SHA256 token helpers ────────────────────────────────────────────────

function encode(str) {
  return new TextEncoder().encode(str);
}

async function importKey(secret, usages) {
  return crypto.subtle.importKey(
    'raw',
    encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    usages
  );
}

/**
 * Generate a signed token: base64(payload).base64(hmac)
 * Payload contains issued-at and expiry timestamps.
 */
export async function generateToken(secret) {
  const now = Date.now();
  const payload = JSON.stringify({ iat: now, exp: now + TOKEN_TTL_MS });
  const key = await importKey(secret, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, encode(payload));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return `${btoa(payload)}.${sigB64}`;
}

/**
 * Verify token signature and expiry.
 * Returns true only if signature is valid and token has not expired.
 */
export async function verifyToken(token, secret) {
  try {
    const dot = token.lastIndexOf('.');
    if (dot === -1) return false;

    const payloadB64 = token.slice(0, dot);
    const sigB64 = token.slice(dot + 1);
    const payloadStr = atob(payloadB64);
    const { exp } = JSON.parse(payloadStr);

    if (!exp || Date.now() > exp) return false; // expired

    const key = await importKey(secret, ['verify']);
    const sig = Uint8Array.from(atob(sigB64), c => c.charCodeAt(0));
    return await crypto.subtle.verify('HMAC', key, sig, encode(payloadStr));
  } catch {
    return false;
  }
}

// ── In-memory rate limiter ───────────────────────────────────────────────────
// Limits auth attempts per IP. Resets on Worker cold-start.
// For persistent rate limiting across instances, use Cloudflare WAF rules.

const RATE_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_MAX_ATTEMPTS = 5;      // max attempts per window

const _rateLimitStore = new Map(); // ip -> { count, resetAt }

export function checkRateLimit(ip) {
  const now = Date.now();

  // Prune expired entries to prevent unbounded memory growth
  for (const [key, val] of _rateLimitStore) {
    if (now > val.resetAt) _rateLimitStore.delete(key);
  }

  const entry = _rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    _rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true, remaining: RATE_MAX_ATTEMPTS - 1 };
  }

  if (entry.count >= RATE_MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_MAX_ATTEMPTS - entry.count };
}

// ── Structured security logging ──────────────────────────────────────────────

export function logSecurityEvent(event, details = {}) {
  console.log(JSON.stringify({
    security_event: event,
    timestamp: new Date().toISOString(),
    ...details
  }));
}

// ── CORS headers ─────────────────────────────────────────────────────────────

/**
 * Returns CORS headers.
 * Admin endpoints pass restrictOrigin=true so browsers on other domains are blocked.
 * Public endpoints (submit, questions) keep '*' so the survey works cross-origin.
 */
export function corsHeaders(request, restrictOrigin = false) {
  const origin = request?.headers?.get('Origin') ?? '';
  const allowOrigin = restrictOrigin
    ? (origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('pages.dev') ? origin : 'null')
    : '*';

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
  };
}
