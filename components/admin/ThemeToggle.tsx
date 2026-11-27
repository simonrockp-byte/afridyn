'use client'
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'

type Pref = 'light' | 'dark' | 'auto'
const KEY = 'afridyn.adminTheme'

function apply(pref: Pref) {
  const dark = pref === 'dark' || (pref === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches)
  document.getElementById('admin-root')?.setAttribute('data-theme', dark ? 'dark' : 'light')
  document.body.style.background = dark ? '' : '#F4F6F9'
}

/** Light / Dark / Auto switch for the admin. Remembered on this device. */
export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [pref, setPref] = useState<Pref>('light')

  useEffect(() => {
    const saved = (localStorage.getItem(KEY) as Pref | null) ?? 'light'
    setPref(saved)
    if (saved !== 'auto') return
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => apply('auto')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const choose = (p: Pref) => {
    setPref(p)
    localStorage.setItem(KEY, p)
    apply(p)
  }

  const options: { value: Pref; label: string; Icon: typeof Sun }[] = [
    { value: 'light', label: 'Light', Icon: Sun },
    { value: 'dark', label: 'Dark', Icon: Moon },
    { value: 'auto', label: 'Auto', Icon: Monitor },
  ]

  if (compact) {
    const next: Pref = pref === 'light' ? 'dark' : pref === 'dark' ? 'auto' : 'light'
    const Current = options.find((o) => o.value === pref)!.Icon
    return (
      <button type="button" onClick={() => choose(next)} className="w-10 h-10 grid place-items-center border" style={{ borderColor: 'var(--ax-line-2)', color: 'var(--ax-text)' }}
        aria-label={`Theme: ${pref}. Switch to ${next}.`} title={`Theme: ${pref}`}>
        <Current size={17} aria-hidden />
      </button>
    )
  }

  return (
    <div role="radiogroup" aria-label="Theme" className="grid grid-cols-3 border" style={{ borderColor: 'var(--ax-line-2)' }}>
      {options.map(({ value, label, Icon }) => {
        const on = pref === value
        return (
          <button key={value} type="button" role="radio" aria-checked={on} onClick={() => choose(value)}
            className="flex flex-col items-center gap-1 py-2 text-[10.5px] font-mono uppercase tracking-[0.1em] transition-colors"
            style={{ background: on ? 'var(--ax-hover)' : 'transparent', color: on ? 'var(--ax-copper)' : 'var(--ax-dim)' }}>
            <Icon size={15} aria-hidden /> {label}
          </button>
        )
      })}
    </div>
  )
}
