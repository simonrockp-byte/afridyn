'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/brand/Logo'

const navLinks = [
  { label: 'Services', id: 'services' },
  { label: 'About',    id: 'about' },
  { label: 'Sectors',  id: 'sectors' },
  { label: 'Why Us',   id: 'why-us' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact',  id: 'contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive]     = useState('')
  const pathname = usePathname()
  const isHome   = pathname === '/'
  const isShop   = pathname === '/shop'
  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [menuOpen])

  /* Track which section is in view (home only) */
  useEffect(() => {
    if (!isHome) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    navLinks.forEach(l => { const el = document.getElementById(l.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [isHome])

  const solid = scrolled || menuOpen

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-[76px] flex items-center transition-[background,border-color,backdrop-filter] duration-300 border-b"
      style={{
        background:     solid ? 'rgba(7,9,13,0.92)' : 'rgba(7,9,13,0.35)',
        borderColor:    solid ? 'var(--ax-line)' : 'transparent',
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
      }}
    >
      <div className="container w-full flex items-center justify-between gap-6">
        <Link href="/" aria-label="Afridyn Engineering Limited — home" className="shrink-0 rounded-sm">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {navLinks.map(link => {
            const on = isHome && active === link.id
            return (
              <a
                key={link.id}
                href={href(link.id)}
                aria-current={on ? 'true' : undefined}
                className="relative px-3.5 py-2 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors"
                style={{ color: on ? '#fff' : 'var(--ax-dim)' }}
              >
                {link.label}
                <span
                  className="absolute left-3.5 right-3.5 -bottom-0.5 h-px transition-transform origin-left"
                  style={{ background: 'var(--ax-copper)', transform: `scaleX(${on ? 1 : 0})` }}
                  aria-hidden
                />
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/shop"
            aria-current={isShop ? 'page' : undefined}
            className="hidden md:inline-flex ax-btn ax-btn-ghost !min-h-[42px] !px-4"
          >
            <ShoppingBag size={15} aria-hidden /> Shop
          </Link>
          <a href={href('contact')} className="hidden sm:inline-flex ax-btn ax-btn-copper !min-h-[42px] !px-5">
            Get a Quote
          </a>
          <button
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-white border"
            style={{ borderColor: 'var(--ax-line-2)' }}
            onClick={() => setMenuOpen(v => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="lg:hidden fixed inset-0 top-[76px] z-40 overflow-y-auto ax-grid"
        style={{ background: 'var(--ax-ink)' }}
      >
        <div className="container py-6 flex flex-col">
          {navLinks.map((link, i) => (
            <a
              key={link.id}
              href={href(link.id)}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-5 border-b font-display text-2xl font-semibold text-white"
              style={{ borderColor: 'var(--ax-line)' }}
            >
              <span><span className="font-mono text-xs mr-4" style={{ color: 'var(--ax-copper)' }}>0{i + 1}</span>{link.label}</span>
              <ArrowRight size={18} style={{ color: 'var(--ax-dim)' }} aria-hidden />
            </a>
          ))}
          <Link
            href="/shop"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 py-5 border-b font-display text-2xl font-semibold text-white"
            style={{ borderColor: 'var(--ax-line)' }}
          >
            <ShoppingBag size={20} aria-hidden /> Shop
          </Link>
          <a href={href('contact')} onClick={() => setMenuOpen(false)} className="ax-btn ax-btn-copper w-full mt-8">
            Request a Quote
          </a>
        </div>
      </div>
    </header>
  )
}
