'use client'
import { useState } from 'react'
import { FlaskConical } from 'lucide-react'

const DEVICE_KEY = 'afridyn.deviceId'

export function TestModeButton({ next }: { next: string }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function enter() {
    setBusy(true)
    setError(null)
    let id = localStorage.getItem(DEVICE_KEY)
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(DEVICE_KEY, id)
    }
    try {
      const res = await fetch('/api/auth/open', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ deviceId: id, deviceLabel: 'Test mode' }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error ?? 'Could not enter test mode.')
        return
      }
      if (data.deviceCode) localStorage.setItem('afridyn.deviceCode', data.deviceCode)
      window.location.assign(next)
    } catch {
      setError("Couldn't reach the server.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mt-6">
      <button type="button" onClick={enter} disabled={busy} className="ax-btn ax-btn-copper w-full disabled:opacity-60">
        <FlaskConical size={16} aria-hidden /> {busy ? 'Opening…' : 'Enter test mode'}
      </button>
      {error && <p role="alert" className="mt-3 text-[14px]" style={{ color: '#FFB27A' }}>{error}</p>}
    </div>
  )
}
