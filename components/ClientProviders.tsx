'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 850,
      easing: 'ease-in-out',
      once: true,           // only animate in, never re-trigger on scroll-up
      offset: 80,           // trigger 80px before element enters viewport
      delay: 0,
      // Honour prefers-reduced-motion accessibility setting
      disable: () =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
  }, [])

  return <>{children}</>
}
