'use client'
import { useEffect } from 'react'

/** One IntersectionObserver for every `.ax-reveal` element on the page. */
export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.ax-reveal:not(.is-in)'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (!e.isIntersecting) return
        e.target.classList.add('is-in')
        io.unobserve(e.target)
      }),
      { threshold: 0.12, rootMargin: '0px 0px -4% 0px' },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}
