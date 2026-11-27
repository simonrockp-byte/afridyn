'use client'
import { LogOut } from 'lucide-react'

export function SignOutButton() {
  return (
    <button
      type="button"
      className="ax-btn ax-btn-ghost !min-h-[40px] !px-4"
      onClick={async () => {
        await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
        window.location.assign('/admin/login')
      }}
    >
      <LogOut size={15} aria-hidden /> Sign out
    </button>
  )
}
