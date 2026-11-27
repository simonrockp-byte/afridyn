import 'server-only'
import bcrypt from 'bcryptjs'
import { and, eq, isNull, ne, sql } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { devices, users } from '@/db/schema'
import { deviceCodeFor } from './token'

/**
 * OPEN TEST MODE — temporary, requested so the app can be tried before an owner
 * account exists. While no active user other than the test account exists, the
 * login page offers one-click sign-in as "Test Admin". As soon as scripts/migrate.mjs
 * creates the real owner (ADMIN_EMAIL/ADMIN_PASSWORD), it deactivates the test
 * account and this mode switches off on its own.
 */
export const OPEN_MODE_EMAIL = 'open-mode@afridyn.local'

export async function isOpenMode(): Promise<boolean> {
  if (!process.env.DATABASE_URL) return false
  const [{ count }] = await getDb()
    .select({ count: sql<number>`count(*)::int` })
    .from(users)
    .where(and(eq(users.active, true), isNull(users.deletedAt), ne(users.email, OPEN_MODE_EMAIL)))
  return count === 0
}

export async function ensureOpenModeUser(): Promise<{ id: string; name: string; email: string; role: 'owner' | 'staff' }> {
  const db = getDb()
  const [existing] = await db.select().from(users).where(eq(users.email, OPEN_MODE_EMAIL)).limit(1)
  if (existing) {
    if (!existing.active) await db.update(users).set({ active: true, updatedAt: new Date() }).where(eq(users.id, existing.id))
    return { id: existing.id, name: existing.name, email: OPEN_MODE_EMAIL, role: existing.role }
  }
  // Unusable password: this account can only be entered through open mode.
  const passwordHash = await bcrypt.hash(crypto.randomUUID() + crypto.randomUUID(), 10)
  const [created] = await db
    .insert(users)
    .values({ name: 'Test Admin', email: OPEN_MODE_EMAIL, role: 'owner', passwordHash })
    .returning()
  return { id: created.id, name: created.name, email: OPEN_MODE_EMAIL, role: created.role }
}

/** Registers (or refreshes) a device and returns its short code (A, B, …). */
export async function registerDevice(deviceId: string, userId: string, label: string | undefined): Promise<string> {
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
