'use client'
import { useEffect } from 'react'

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#/<>-_'

/**
 * One small script for all pointer/scroll micro-interactions. Renders nothing and only
 * touches elements opted in with data attributes, so the markup stays server-rendered:
 *   [data-tilt]      3D tilt + glare (expects a child .ax-glare)
 *   [data-magnetic]  pulls slightly toward the pointer
 *   [data-scramble]  "decodes" its text when it scrolls into view
 *   [data-clock]     live Lusaka time (Africa/Lusaka)
 * Plus a cursor-following highlight on the global blueprint grid (.ax-cursor-grid).
 */
export function Interactions() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const root = document.documentElement
    const cleanups: (() => void)[] = []

    /* ── Live Lusaka clock ── */
    const clocks = Array.from(document.querySelectorAll<HTMLElement>('[data-clock]'))
    if (clocks.length) {
      const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lusaka', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
      const tick = () => { const t = fmt.format(new Date()); clocks.forEach(c => { c.textContent = t }) }
      tick()
      const id = window.setInterval(tick, 1000)
      cleanups.push(() => clearInterval(id))
    }

    /* ── Decode effect ── */
    const scrambles = Array.from(document.querySelectorAll<HTMLElement>('[data-scramble]'))
    if (scrambles.length && !reduce && 'IntersectionObserver' in window) {
      const run = (el: HTMLElement) => {
        const final = el.textContent ?? ''
        el.setAttribute('aria-label', final)
        const start = performance.now()
        const dur = 650
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / dur)
          const lock = Math.floor(p * final.length)
          let out = ''
          for (let i = 0; i < final.length; i++) {
            const ch = final[i]
            out += i < lock || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
          }
          el.textContent = out
          if (p < 1) requestAnimationFrame(step)
          else { el.textContent = final; el.removeAttribute('aria-label') }
        }
        requestAnimationFrame(step)
      }
      const io = new IntersectionObserver(entries => entries.forEach(e => {
        if (!e.isIntersecting) return
        io.unobserve(e.target)
        run(e.target as HTMLElement)
      }), { threshold: 0.6 })
      scrambles.forEach(el => io.observe(el))
      cleanups.push(() => io.disconnect())
    }

    if (!fine || reduce) return () => cleanups.forEach(f => f())

    /* ── Pointer-driven effects (desktop, motion allowed) ── */
    let mx = -9999, my = -9999, raf = 0
    let tiltEl: HTMLElement | null = null
    let magEl: HTMLElement | null = null

    const frame = () => {
      raf = 0
      root.style.setProperty('--mx', `${mx}px`)
      root.style.setProperty('--my', `${my}px`)
      if (tiltEl) {
        const r = tiltEl.getBoundingClientRect()
        const px = (mx - r.left) / r.width, py = (my - r.top) / r.height
        tiltEl.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 9}deg) translateZ(0)`
        tiltEl.style.setProperty('--gx', `${px * 100}%`)
        tiltEl.style.setProperty('--gy', `${py * 100}%`)
      }
      if (magEl) {
        const r = magEl.getBoundingClientRect()
        const dx = mx - (r.left + r.width / 2), dy = my - (r.top + r.height / 2)
        magEl.style.transform = `translate(${dx * 0.18}px, ${dy * 0.28}px)`
      }
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(frame) }

    const onMove = (e: PointerEvent) => {
      mx = e.clientX; my = e.clientY
      const t = e.target as HTMLElement
      const nextTilt = t.closest<HTMLElement>('[data-tilt]')
      if (nextTilt !== tiltEl) {
        if (tiltEl) { tiltEl.style.transform = ''; tiltEl.classList.remove('is-tilting') }
        tiltEl = nextTilt
        tiltEl?.classList.add('is-tilting')
      }
      const nextMag = t.closest<HTMLElement>('[data-magnetic]')
      if (nextMag !== magEl) {
        if (magEl) magEl.style.transform = ''
        magEl = nextMag
      }
      schedule()
    }
    const onLeave = () => {
      mx = my = -9999
      if (tiltEl) { tiltEl.style.transform = ''; tiltEl.classList.remove('is-tilting') }
      if (magEl) magEl.style.transform = ''
      tiltEl = magEl = null
      schedule()
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    root.classList.add('has-pointer-fx')
    cleanups.push(() => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      root.classList.remove('has-pointer-fx')
      if (raf) cancelAnimationFrame(raf)
    })

    return () => cleanups.forEach(f => f())
  }, [])

  return null
}
