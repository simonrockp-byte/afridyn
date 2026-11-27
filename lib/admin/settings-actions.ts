'use server'

import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { and, eq, ne, sql } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { auditLog, settings, users } from '@/db/schema'
import { requireUser } from '@/lib/auth/server'
import { OPEN_MODE_EMAIL } from '@/lib/auth/open-mode'

// Owner-only. Every action re-checks the session and role.

const str = (v: FormDataEntryValue | null) => (typeof v === 'string' && v.trim() ? v.trim() : null)
const int = (v: FormDataEntryValue | null, min: number, max: number, fallback: number) => {
  const n = Number(v)
  return Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n))) : fallback
}

export async function saveSettings(_prev: unknown, formData: FormData): Promise<{ ok?: boolean; error?: string }> {
  const user = await requireUser({ role: 'owner' }).catch(() => null)
  if (!user) return { error: 'Only the owner can change settings.' }
  const businessName = str(formData.get('businessName'))
  if (!businessName) return { error: 'Business name is required.' }
  const values = {
    businessName,
    tagline: str(formData.get('tagline')),
    phone: str(formData.get('phone')),
    whatsapp: str(formData.get('whatsapp')),
    email: str(formData.get('email'))?.toLowerCase() ?? null,
    address: str(formData.get('address')),
    tpin: str(formData.get('tpin')),
    pacraNumber: str(formData.get('pacraNumber')),
    zppaNumber: str(formData.get('zppaNumber')),
    bankDetails: str(formData.get('bankDetails')),
    mobileMoneyDetails: str(formData.get('mobileMoneyDetails')),
    quoteTerms: str(formData.get('quoteTerms')),
    invoiceTerms: str(formData.get('invoiceTerms')),
    deliveryTerms: str(formData.get('deliveryTerms')),
    receiptFooter: str(formData.get('receiptFooter')),
    quoteValidityDays: int(formData.get('quoteValidityDays'), 1, 365, 30),
    invoiceDueDays: int(formData.get('invoiceDueDays'), 0, 365, 30),
    taxMode: (formData.get('taxMode') === 'VAT16' ? 'VAT16' : 'TOT') as 'TOT' | 'VAT16',
    documentTemplate: ['executive', 'industrial', 'minimal'].includes(String(formData.get('documentTemplate'))) ? String(formData.get('documentTemplate')) : 'executive',
  }
  const db = getDb()
  await db.insert(settings).values({ id: 1, ...values }).onConflictDoUpdate({ target: settings.id, set: { ...values, updatedAt: new Date(), version: sql`${settings.version} + 1` } })
  await db.insert(auditLog).values({ userId: user.id, deviceId: user.deviceId, action: 'update', entity: 'settings', details: { taxMode: values.taxMode, documentTemplate: values.documentTemplate } })
  revalidatePath('/admin', 'layout')
  return { ok: true }
}

export async function createUser(_prev: unknown, formData: FormData): Promise<{ ok?: boolean; error?: string }> {
  const owner = await requireUser({ role: 'owner' }).catch(() => null)
  if (!owner) return { error: 'Only the owner can add users.' }
  const name = str(formData.get('name'))
  const email = str(formData.get('email'))?.toLowerCase()
  const password = typeof formData.get('password') === 'string' ? (formData.get('password') as string) : ''
  const role = formData.get('role') === 'owner' ? 'owner' : 'staff'
  if (!name || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: 'Enter a name and a valid email.' }
  if (email === OPEN_MODE_EMAIL) return { error: 'That email is reserved.' }
  if (password.length < 10) return { error: 'Password must be at least 10 characters.' }
  const db = getDb()
  const [exists] = await db.select({ id: users.id }).from(users).where(eq(sql`lower(${users.email})`, email)).limit(1)
  if (exists) return { error: 'A user with that email already exists.' }
  const passwordHash = await bcrypt.hash(password, 12)
  const [created] = await db.insert(users).values({ name, email, role, passwordHash }).returning({ id: users.id })
  await db.insert(auditLog).values({ userId: owner.id, deviceId: owner.deviceId, action: 'create', entity: 'user', entityId: created.id, details: { email, role } })
  // A real owner now exists: close OPEN TEST MODE (deactivate the test account,
  // which also signs out anyone using it — including this session if it's the test one).
  if (role === 'owner') {
    await db.update(users).set({ active: false, updatedAt: new Date() }).where(and(eq(users.email, OPEN_MODE_EMAIL), eq(users.active, true)))
  }
  revalidatePath('/admin', 'layout')
  return { ok: true }
}

export async function setUserActive(userId: string, active: boolean): Promise<{ error?: string }> {
  const owner = await requireUser({ role: 'owner' }).catch(() => null)
  if (!owner) return { error: 'Only the owner can do that.' }
  if (userId === owner.id && !active) return { error: 'You can’t deactivate your own account.' }
  const db = getDb()
  if (!active) {
    // Never leave the business without an active owner.
    const [target] = await db.select({ role: users.role }).from(users).where(eq(users.id, userId)).limit(1)
    if (target?.role === 'owner') {
      const [{ n }] = await db
        .select({ n: sql<number>`count(*)::int` })
        .from(users)
        .where(and(eq(users.role, 'owner'), eq(users.active, true), ne(users.id, userId), ne(users.email, OPEN_MODE_EMAIL)))
      if (n === 0) return { error: 'Keep at least one active owner.' }
    }
  }
  await db.update(users).set({ active, updatedAt: new Date() }).where(eq(users.id, userId))
  await db.insert(auditLog).values({ userId: owner.id, deviceId: owner.deviceId, action: active ? 'activate' : 'deactivate', entity: 'user', entityId: userId })
  revalidatePath('/admin/settings')
  return {}
}

export async function resetUserPassword(userId: string, password: string): Promise<{ ok?: boolean; error?: string }> {
  const owner = await requireUser({ role: 'owner' }).catch(() => null)
  if (!owner) return { error: 'Only the owner can do that.' }
  if (password.length < 10) return { error: 'Password must be at least 10 characters.' }
  const db = getDb()
  await db.update(users).set({ passwordHash: await bcrypt.hash(password, 12), updatedAt: new Date() }).where(eq(users.id, userId))
  await db.insert(auditLog).values({ userId: owner.id, deviceId: owner.deviceId, action: 'reset_password', entity: 'user', entityId: userId })
  return { ok: true }
}
