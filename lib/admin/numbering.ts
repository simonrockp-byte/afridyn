import 'server-only'
import { eq, sql } from 'drizzle-orm'
import type { Db } from '@/db/client'
import { deviceCounters, devices } from '@/db/schema'
import type { Series } from './documents'

/**
 * Next document number for this device, e.g. INV-2026-A-0042. Each device has
 * its own counter per series and year, so devices never collide — the same
 * scheme the offline sync (Phase 2) relies on. Atomic upsert, so two requests
 * can't get the same number.
 */
export async function allocateNumber(db: Db, deviceId: string, series: Series, year: number): Promise<string> {
  const [device] = await db.select({ code: devices.code }).from(devices).where(eq(devices.id, deviceId)).limit(1)
  if (!device) throw new Error('This device is not registered. Sign in again.')
  const [row] = await db
    .insert(deviceCounters)
    .values({ deviceId, series, year, seq: 1 })
    .onConflictDoUpdate({ target: [deviceCounters.deviceId, deviceCounters.series, deviceCounters.year], set: { seq: sql`${deviceCounters.seq} + 1` } })
    .returning({ seq: deviceCounters.seq })
  return `${series}-${year}-${device.code}-${String(row.seq).padStart(4, '0')}`
}
