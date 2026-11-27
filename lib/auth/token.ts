// Session tokens (ported from Milo Motors / miamor). Pure Web Crypto, so the
// same code runs in proxy.ts and in route handlers:
//   v1.<userId>.<deviceId>.<issuedAtMs>.<hmac-sha256>
// Tokens expire after 30 days; rotating the secret revokes every session.

export const SESSION_COOKIE = 'afridyn_session'
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30

const TOKEN_VERSION = 'v1'
const SESSION_TTL_MS = SESSION_MAX_AGE_SECONDS * 1000
const CLOCK_SKEW_MS = 5 * 60 * 1000
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const encoder = new TextEncoder()

/**
 * Signing key. SESSION_SECRET when set (recommended); otherwise it is derived
 * from DATABASE_URL, which is already a server-only secret on Vercel, so the
 * admin works without an extra variable. Rotating either one signs everyone out.
 */
function secret(): string {
  const explicit = process.env.SESSION_SECRET
  if (explicit && explicit.length >= 16) return explicit
  const db = process.env.DATABASE_URL
  if (db) return `afridyn-session-v1|${db}`
  throw new Error('SESSION_SECRET (or DATABASE_URL) is not configured.')
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, '0')).join('')
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

async function sign(value: string, key: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey('raw', encoder.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return toHex(await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(value)))
}

export async function createSessionToken(userId: string, deviceId: string, now = Date.now()): Promise<string> {
  const body = `${TOKEN_VERSION}.${userId}.${deviceId}.${now}`
  return `${body}.${await sign(body, secret())}`
}

export type SessionClaims = { userId: string; deviceId: string; issuedAt: number }

export async function verifySessionToken(token: string | undefined | null, now = Date.now()): Promise<SessionClaims | null> {
  if (!token) return null
  let key: string
  try {
    key = secret()
  } catch {
    return null
  }
  const parts = token.split('.')
  if (parts.length !== 5) return null
  const [version, userId, deviceId, issuedRaw, sig] = parts
  if (version !== TOKEN_VERSION || !UUID_RE.test(userId) || !UUID_RE.test(deviceId) || !/^\d{10,16}$/.test(issuedRaw)) return null
  const issuedAt = Number(issuedRaw)
  if (issuedAt > now + CLOCK_SKEW_MS || now - issuedAt > SESSION_TTL_MS) return null
  const expected = await sign(`${version}.${userId}.${deviceId}.${issuedRaw}`, key)
  return timingSafeEqual(sig, expected) ? { userId, deviceId, issuedAt } : null
}

/** Device codes A…Z, AA, AB… used in offline-safe document numbers. */
export function deviceCodeFor(index: number): string {
  let n = index
  let code = ''
  do {
    code = String.fromCharCode(65 + (n % 26)) + code
    n = Math.floor(n / 26) - 1
  } while (n >= 0)
  return code
}
