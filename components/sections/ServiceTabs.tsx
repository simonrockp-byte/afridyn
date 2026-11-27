'use client'
import { useEffect } from 'react'
import { SERVICE_EVENT } from '@/lib/events'

/** Progressive enhancement for the server-rendered service tabs in <Services>. Renders nothing. */
export function ServiceTabs() {
  useEffect(() => {
    const root = document.getElementById('svc')
    if (!root) return
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
    const panels = tabs.map(t => document.getElementById(t.getAttribute('aria-controls') || ''))

    const select = (i: number, focus = false) => {
      tabs.forEach((t, j) => {
        const on = i === j
        t.setAttribute('aria-selected', String(on))
        t.tabIndex = on ? 0 : -1
        const p = panels[j]
        if (p) p.hidden = !on
      })
      if (focus) tabs[i].focus()
    }

    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const tab = el.closest<HTMLButtonElement>('[role="tab"]')
      if (tab) {
        const i = tabs.indexOf(tab)
        select(i)
        if (window.innerWidth < 1024) requestAnimationFrame(() => panels[i]?.scrollIntoView({ block: 'start' }))
        return
      }
      const cta = el.closest<HTMLElement>('[data-service]')
      if (cta) window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: cta.dataset.service }))
    }

    const onKey = (e: KeyboardEvent) => {
      const i = tabs.indexOf(e.target as HTMLButtonElement)
      if (i < 0) return
      const n = tabs.length
      const next =
        e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (i + 1) % n :
        e.key === 'ArrowUp'   || e.key === 'ArrowLeft'  ? (i - 1 + n) % n :
        e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1
      if (next < 0) return
      e.preventDefault()
      select(next, true)
    }

    root.addEventListener('click', onClick)
    root.addEventListener('keydown', onKey)
    return () => {
      root.removeEventListener('click', onClick)
      root.removeEventListener('keydown', onKey)
    }
  }, [])
  return null
}
