'use client'
import { useState } from 'react'
import { LogIn } from 'lucide-react'

const DEVICE_KEY = 'afridyn.deviceId'

function deviceId(): string {
  let id = localStorage.getItem(DEVICE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(DEVICE_KEY, id)
  }
  return id
}

function deviceLabel(): string {
  const ua = navigator.userAgent
  const os = /Android/i.test(ua) ? 'Android' : /iPhone|iPad/i.test(ua) ? 'iOS' : /Windows/i.test(ua) ? 'Windows' : /Mac/i.test(ua) ? 'Mac' : 'Device'
  return `${os} · ${new Date().toLocaleDateString('en-GB')}`
}

export function LoginForm({ next }: { next: string }) {
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    const form = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: form.get('email'),
          password: form.get('password'),
          deviceId: deviceId(),
          deviceLabel: deviceLabel(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error ?? 'Sign-in failed. Try again.')
        return
      }
      if (data.deviceCode) localStorage.setItem('afridyn.deviceCode', data.deviceCode)
      window.location.assign(next)
    } catch {
      setError("Couldn't reach the server. Check your connection.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-7 space-y-5">
      <div>
        <label htmlFor="email" className="ax-label">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required className="ax-field" />
      </div>
      <div>
        <label htmlFor="password" className="ax-label">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="ax-field" />
      </div>
      {error && (
        <p role="alert" className="text-[14px] px-3 py-2 border" style={{ borderColor: 'rgba(255,106,26,0.5)', color: '#FFB27A' }}>{error}</p>
      )}
      <button type="submit" disabled={busy} className="ax-btn ax-btn-copper w-full disabled:opacity-60">
        <LogIn size={16} aria-hidden /> {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
