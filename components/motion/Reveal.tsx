'use client'
import { motion, useInView, useReducedMotion, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

/** Quick scroll reveal (opacity + small rise). Reduced motion → opacity only (via MotionConfig). */
export function Reveal({
  children, delay = 0, className, as = 'div',
}: { children: React.ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'article' }) {
  const M = as === 'li' ? motion.li : as === 'article' ? motion.article : motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </M>
  )
}

/** Horizontal line that draws itself in. */
export function DrawLine({ className, color = 'var(--ax-line-2)' }: { className?: string; color?: string }) {
  return (
    <motion.span
      aria-hidden
      className={`block h-px origin-left ${className ?? ''}`}
      style={{ background: color }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: EASE }}
    />
  )
}

/** Counts up to `to` when scrolled into view. Server HTML contains the final value. */
export function Counter({ to, suffix = '', className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(to)
  const started = useRef(false)

  // Prime to 0 after hydration (element is below the fold) so the count-up is visible.
  useEffect(() => {
    if (!reduce && !started.current && ref.current && ref.current.getBoundingClientRect().top > window.innerHeight) setVal(0)
  }, [reduce])

  useEffect(() => {
    if (!inView || reduce || started.current) return
    started.current = true
    const c = animate(0, to, { duration: 0.6, ease: 'easeOut', onUpdate: v => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, reduce, to])

  return <span ref={ref} className={className}>{val}{suffix}</span>
}
