'use client'
import { useActionState, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus, KeyRound, Power } from 'lucide-react'
import { createUser, resetUserPassword, setUserActive } from '@/lib/admin/settings-actions'

type U = { id: string; name: string; email: string | null; role: 'owner' | 'staff'; active: boolean; isTest: boolean; isYou: boolean }

export function UsersPanel({ users }: { users: U[] }) {
  const router = useRouter()
  const [state, action, pending] = useActionState(createUser, null)
  const [busy, start] = useTransition()
  const [msg, setMsg] = useState<string | null>(null)
  const [resetFor, setResetFor] = useState<string | null>(null)

  return (
    <section className="ax-panel p-5 md:p-6">
      <h2 className="ax-spec mb-1" style={{ color: 'var(--ax-text)' }}>Users</h2>
      <p className="text-[13px] mb-4" style={{ color: 'var(--ax-dim)' }}>Owners can change settings and users; staff can create and send documents.</p>

      <ul className="divide-y mb-6" style={{ borderColor: 'var(--ax-line)' }}>
        {users.map((u) => (
          <li key={u.id} className="py-3 border-[color:var(--ax-line)] flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <p className="text-white text-[14px]">{u.name}{u.isYou && <span className="ax-spec text-[9px] ml-2">You</span>}{u.isTest && <span className="ax-spec text-[9px] ml-2" style={{ color: 'var(--ax-copper)' }}>Test mode</span>}</p>
              <p className="text-[13px]" style={{ color: 'var(--ax-dim)' }}>{u.isTest ? 'One-click test account (closes when a real owner is created)' : u.email} · {u.role}{u.active ? '' : ' · deactivated'}</p>
            </div>
            {!u.isTest && (
              <>
                <button type="button" className="ax-btn ax-btn-ghost !min-h-[38px] !px-3" onClick={() => setResetFor(resetFor === u.id ? null : u.id)}><KeyRound size={14} aria-hidden /> Reset password</button>
                {!u.isYou && (
                  <button type="button" disabled={busy} className="ax-btn ax-btn-ghost !min-h-[38px] !px-3"
                    onClick={() => start(async () => { const r = await setUserActive(u.id, !u.active); setMsg(r.error ?? (u.active ? 'User deactivated.' : 'User reactivated.')); router.refresh() })}>
                    <Power size={14} aria-hidden /> {u.active ? 'Deactivate' : 'Reactivate'}
                  </button>
                )}
              </>
            )}
            {resetFor === u.id && (
              <form className="w-full flex flex-wrap gap-2 mt-2" onSubmit={(e) => {
                e.preventDefault()
                const pw = String(new FormData(e.currentTarget).get('pw') ?? '')
                start(async () => { const r = await resetUserPassword(u.id, pw); setMsg(r.error ?? 'Password updated.'); if (r.ok) setResetFor(null) })
              }}>
                <label htmlFor={`pw-${u.id}`} className="sr-only">New password</label>
                <input id={`pw-${u.id}`} name="pw" type="password" autoComplete="new-password" minLength={10} required placeholder="New password (10+ characters)" className="ax-field max-w-xs" />
                <button className="ax-btn ax-btn-copper !min-h-[46px]" disabled={busy}>Set password</button>
              </form>
            )}
          </li>
        ))}
      </ul>
      {msg && <p role="status" className="text-[13px] mb-4" style={{ color: 'var(--ax-dim)' }}>{msg}</p>}

      <details>
        <summary className="ax-spec text-[10px] cursor-pointer hover:text-white" style={{ color: 'var(--ax-copper)' }}>+ Add a user</summary>
        <form action={action} className="mt-4 grid md:grid-cols-2 gap-4 max-w-3xl">
          <div><label htmlFor="nu-name" className="ax-label">Name</label><input id="nu-name" name="name" required className="ax-field" /></div>
          <div><label htmlFor="nu-email" className="ax-label">Email (used to sign in)</label><input id="nu-email" name="email" type="email" required className="ax-field" /></div>
          <div><label htmlFor="nu-pw" className="ax-label">Password (10+ characters)</label><input id="nu-pw" name="password" type="password" autoComplete="new-password" minLength={10} required className="ax-field" /></div>
          <div><label htmlFor="nu-role" className="ax-label">Role</label>
            <select id="nu-role" name="role" defaultValue="staff" className="ax-field"><option value="staff">Staff</option><option value="owner">Owner</option></select></div>
          <div className="md:col-span-2 flex items-center gap-4">
            <button className="ax-btn ax-btn-copper disabled:opacity-60" disabled={pending}><UserPlus size={16} aria-hidden /> {pending ? 'Adding…' : 'Add user'}</button>
            {state?.ok && <p role="status" className="text-[14px]" style={{ color: 'var(--ax-green)' }}>User added. If you added an owner, test mode is now closed — sign in with that account.</p>}
            {state?.error && <p role="alert" className="text-[14px]" style={{ color: '#FFB27A' }}>{state.error}</p>}
          </div>
        </form>
      </details>
    </section>
  )
}
