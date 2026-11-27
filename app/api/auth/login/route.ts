import bcrypt from 'bcryptjs'
import { and, eq, isNull, sql } from 'drizzle-orm'
import { z } from 'zod'
import { getDb } from '@/db/client'
import { devices, users } from '@/db/schema'
import { setSessionCookie } from '@/lib/auth/server'
import { deviceCodeFor } from '@/lib/auth/token'

// Online sign-in (ported from Milo Motors). Registers the device, which gets a
// short code (A, B, …) for its offline-safe document numbers.

const bodySchema = z.object({
  email: z.string().trim().toLowerCase().max(200),
  password: z.string().min(1).max(200),
  deviceId: z.uuid(),
  deviceLabel: z.string().max(100).optional(),
})

// Best-effort brake on password guessing, per IP and per instance.
const MAX_FAILURES = 5
const LOCK_MS = 15 * 60 * 1000
const failures = new Map<string, { count: number; lockedUntil: number }>()
// bcrypt hash of a random string: compared when the email doesn't exist, so
// response timing doesn't reveal which emails have accounts.
const DUMMY_HASH = '$2b$10$6K5eIn0VhRqKLGqvY1vmieoZHKbqc6Mk5KRSZWRYNAcfUlTy9H5q2'

function clientKey(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

async function registerDevice(deviceId: string, userId: string, label: string | undefined) {
  const db = getDb()
  const [existing] = await db.select().from(devices).where(eq(devices.id, deviceId)).limit(1)
  if (existing) {
    await db.update(devices).set({ userId, lastSeenAt: new Date(), label: label ?? existing.label }).where(eq(devices.id, deviceId))
    return existing.code
  }
  for (let attempt = 0; attempt < 5; attempt++) {
    const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(devices)
    const code = deviceCodeFor(count + attempt)
    try {
      await db.insert(devices).values({ id: deviceId, userId, code, label, lastSeenAt: new Date() })
      return code
    } catch (error) {
      if ((error as { code?: string }).code !== '23505') throw error
      const [now] = await db.select().from(devices).where(eq(devices.id, deviceId)).limit(1)
      if (now) return now.code
    }
  }
  throw new Error("Couldn't register this device.")
}

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'Enter your email and password.' }, { status: 400 })
  if (!process.env.DATABASE_URL) return Response.json({ error: "Sign-in isn't set up yet." }, { status: 503 })

  const key = clientKey(request)
  const now = Date.now()
  const record = failures.get(key)
  if (record && record.lockedUntil > now) {
    const minutes = Math.ceil((record.lockedUntil - now) / 60000)
    return Response.json({ error: `Too many wrong attempts. Try again in ${minutes} minute${minutes === 1 ? '' : 's'}.` }, { status: 429 })
  }

  const { email, password, deviceId, deviceLabel } = parsed.data
  const db = getDb()
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(sql`lower(${users.email})`, email), eq(users.active, true), isNull(users.deletedAt)))
    .limit(1)

  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH)
  if (!user || !ok) {
    const count = (record && record.lockedUntil <= now ? 0 : (record?.count ?? 0)) + 1
    failures.set(key, { count, lockedUntil: count >= MAX_FAILURES ? now + LOCK_MS : 0 })
    await new Promise((r) => setTimeout(r, 400))
    return Response.json({ error: 'That email and password don’t match.' }, { status: 401 })
  }
  failures.delete(key)

  const deviceCode = await registerDevice(deviceId, user.id, deviceLabel)
  await setSessionCookie(user.id, deviceId)
  return Response.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    deviceCode,
  })
}
