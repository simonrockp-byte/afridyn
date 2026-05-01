'use client'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

/**
 * AOSProvider — initialises Animate On Scroll once on the client.
 * Must be a Client Component so it can call useEffect.
 * Render this near the top of your layout so AOS is available
 * before any section mounts.
 */
export function AOSProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 850,
      easing: 'ease-in-out',
      once: true,          // animate each element only once
      offset: 80,          // trigger 80px before element enters viewport
      delay: 0,
      // Respect prefers-reduced-motion
      disable: () =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
  }, [])

  return <>{children}</>
}
