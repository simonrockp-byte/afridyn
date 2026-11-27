import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { sql } from 'drizzle-orm'
import { Logo } from '@/components/brand/Logo'
import { getDb } from '@/db/client'
import { users } from '@/db/schema'
import { getSessionUser } from '@/lib/auth/server'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = { title: 'Sign in' }
export const dynamic = 'force-dynamic'

async function hasAnyUser(): Promise<boolean | null> {
  if (!process.env.DATABASE_URL) return null
  try {
    const [{ count }] = await getDb().select({ count: sql<number>`count(*)::int` }).from(users)
    return count > 0
  } catch {
    return null
  }
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams
  const safeNext = next && next.startsWith('/admin') && !next.startsWith('//') ? next : '/admin'
  if (await getSessionUser().catch(() => null)) redirect(safeNext)

  const ready = await hasAnyUser()

  return (
    <main className="min-h-[100svh] grid place-items-center px-5 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8"><Logo size="lg" /></div>
        <div className="ax-panel ax-brackets p-7 md:p-9">
          <p className="ax-spec text-[10px]" style={{ color: 'var(--ax-copper)' }}>ADM-00 · Authorised users only</p>
          <h1 className="font-display text-3xl font-semibold text-white mt-3">Admin sign in</h1>

          {ready === false ? (
            <div className="mt-6 text-[15px] leading-relaxed" style={{ color: 'var(--ax-dim)' }}>
              <p className="text-white font-medium">No admin account has been set up yet.</p>
              <p className="mt-3">
                In Vercel → project <span className="text-white">afridyn</span> → Settings → Environment Variables, add{' '}
                <code className="text-white">ADMIN_EMAIL</code>, <code className="text-white">ADMIN_PASSWORD</code> (10+ characters) and
                optionally <code className="text-white">ADMIN_NAME</code>, then redeploy. The owner account is created during the deploy.
              </p>
            </div>
          ) : ready === null ? (
            <p className="mt-6 text-[15px]" style={{ color: 'var(--ax-dim)' }}>The admin database isn&apos;t reachable right now. Try again shortly.</p>
          ) : (
            <LoginForm next={safeNext} />
          )}
        </div>
      </div>
    </main>
  )
}
