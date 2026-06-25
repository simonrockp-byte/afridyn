'use client'

import { useEffect } from 'react'

export function ScrollProgressBar() {
  useEffect(() => {
    const bar = document.getElementById('scroll-bar')
    const onScroll = () => {
      if (!bar) return
      const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      bar.style.transform = `scaleX(${p})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return null
}
