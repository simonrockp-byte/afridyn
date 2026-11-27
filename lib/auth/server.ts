import 'server-only'
import { cookies } from 'next/headers'
import { and, eq, isNull } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { users } from '@/db/schema'
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS, createSessionToken, verifySessionToken } from './token'

export type SessionUser = {
  id: string
  name: string
  email: string | null
  role: 'owner' | 'staff'
  deviceId: string
}

export class AuthError extends Error {
  constructor(message: string, readonly status: 401 | 403) {
    super(message)
  }
}

/**
 * The real gate for every admin page and API route (proxy.ts is only the first
 * line). Looks the user up each call, so deactivating an account locks it out
 * immediately.
 */
export async function requireUser(options: { role?: 'owner' } = {}): Promise<SessionUser> {
  const user = await getSessionUser()
  if (!user) throw new AuthError('Please sign in again.', 401)
  if (options.role === 'owner' && user.role !== 'owner') throw new AuthError('Only the owner can do that.', 403)
  return user
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const claims = await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)
  if (!claims || !process.env.DATABASE_URL) return null
  const [user] = await getDb()
    .select({ id: users.id, name: users.name, email: users.email, role: users.role })
    .from(users)
    .where(and(eq(users.id, claims.userId), eq(users.active, true), isNull(users.deletedAt)))
    .limit(1)
  return user ? { ...user, deviceId: claims.deviceId } : null
}

export function authErrorResponse(error: unknown): Response | null {
  if (error instanceof AuthError) return Response.json({ error: error.message }, { status: error.status })
  return null
}

export async function setSessionCookie(userId: string, deviceId: string): Promise<void> {
  ;(await cookies()).set(SESSION_COOKIE, await createSessionToken(userId, deviceId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  })
}

export async function clearSessionCookie(): Promise<void> {
  ;(await cookies()).delete(SESSION_COOKIE)
}
