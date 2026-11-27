'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import type { HeroQuality } from './HeroCanvas'

const HeroCanvas = dynamic(() => import('./HeroCanvas').then(m => m.HeroCanvas), { ssr: false })

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

function pickQuality(): HeroQuality {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  const small = window.matchMedia('(max-width: 767px)').matches
  const weak = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4
  return small || weak || nav.connection?.saveData ? 'low' : 'high'
}

/** Static blueprint backdrop — shown immediately, and permanently when WebGL is unavailable. */
function StaticBackdrop() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <div className="absolute inset-0 ax-grid ax-grid-fade opacity-70" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 55% at 72% 48%, rgba(34,211,238,0.14), transparent 70%),' +
            'radial-gradient(ellipse 35% 40% at 78% 60%, rgba(255,106,26,0.10), transparent 70%)',
        }}
      />
      {/* stylised globe outline */}
      <svg className="absolute right-[-8%] md:right-[4%] top-1/2 -translate-y-1/2 w-[80vw] md:w-[44vw] max-w-[640px] opacity-40" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="80" stroke="#22D3EE" strokeOpacity=".5" strokeWidth=".5" />
        <ellipse cx="100" cy="100" rx="40" ry="80" stroke="#22D3EE" strokeOpacity=".3" strokeWidth=".5" />
        <ellipse cx="100" cy="100" rx="80" ry="28" stroke="#22D3EE" strokeOpacity=".3" strokeWidth=".5" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="#22D3EE" strokeOpacity=".3" strokeWidth=".5" />
      </svg>
    </div>
  )
}

export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null)
  const [mount, setMount]     = useState(false)
  const [ready, setReady]     = useState(false)
  const [quality, setQuality] = useState<HeroQuality>('low')
  const [animate, setAnimate] = useState(true)
  const [inView, setInView]   = useState(true)
  const [visible, setVisible] = useState(true)

  // Decide capabilities, then mount the 3D scene once the main thread is idle (protects LCP/TBT)
  useEffect(() => {
    if (!hasWebGL()) return
    setQuality(pickQuality())
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setAnimate(!mq.matches)
    const onMq = () => setAnimate(!mq.matches)
    mq.addEventListener('change', onMq)

    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void }
    let idleId: number | undefined
    let timer: ReturnType<typeof setTimeout> | undefined
    let scheduled = false
    const go = () => setMount(true)
    const schedule = () => {
      if (scheduled) return
      scheduled = true
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(go, { timeout: 2500 })
      else timer = setTimeout(go, 1200)
    }
    // The 3D bundle is ~1 MB of JS. Load it on the visitor's first interaction (mouse move,
    // scroll, touch, key) — or after 7s idle — so it never competes with first paint / TBT.
    const EVENTS = ['pointermove', 'pointerdown', 'scroll', 'touchstart', 'keydown', 'wheel'] as const
    const onFirst = () => schedule()
    EVENTS.forEach(e => window.addEventListener(e, onFirst, { once: true, passive: true }))
    const fallback = setTimeout(schedule, 7000)

    return () => {
      mq.removeEventListener('change', onMq)
      EVENTS.forEach(e => window.removeEventListener(e, onFirst))
      clearTimeout(fallback)
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId)
      if (timer) clearTimeout(timer)
    }
  }, [])

  // Pause the render loop when the hero is off-screen or the tab is hidden
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    const onVis = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVis)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis) }
  }, [])

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden>
      <StaticBackdrop />
      {mount && (
        <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: ready ? 1 : 0 }}>
          <HeroCanvas quality={quality} animate={animate} active={inView && visible} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  )
}
