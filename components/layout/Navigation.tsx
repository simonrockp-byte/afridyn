'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Services',  href: 'services' },
  { label: 'About',     href: 'about' },
  { label: 'Sectors',   href: 'sectors' },
  { label: 'Why Us',    href: 'why-us' },
  { label: 'Contact',   href: 'contact' },
]

export function Navigation() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active, setActive]       = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const goto = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8, 8, 16, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <button
            onClick={() => goto('home')}
            className="flex items-center gap-3 group focus-visible:outline-none"
            aria-label="Afridyn Engineering — home"
          >
            <div className="w-9 h-9 flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt=""
                className="w-full h-full object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="hidden sm:block leading-none">
              <span className="block font-display font-black text-white text-[15px] tracking-[.1em]">AFRIDYN</span>
              <span className="block text-[9px] tracking-[.32em] font-mono text-white/35 uppercase mt-0.5">Engineering</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => goto(link.href)}
                className={`nav-link text-[13px] font-medium transition-all ${active === link.href ? 'text-white bg-white/7' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => goto('contact')}
              className="hidden lg:inline-flex btn btn-cta btn-sm"
            >
              Get a Quote
            </button>

            <button
              className="lg:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/06 transition-all"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 flex flex-col"
          style={{ background: 'rgba(8,8,16,0.98)', backdropFilter: 'blur(32px)' }}
        >
          {/* Close area / header repeat */}
          <div className="container flex items-center justify-between h-[72px]">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="" className="w-9 h-9 object-contain filter brightness-0 invert opacity-90" />
              <span className="font-display font-black text-white text-[15px] tracking-[.1em]">AFRIDYN</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-white/40 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X size={22} strokeWidth={1.8} />
            </button>
          </div>

          {/* Links */}
          <nav className="container flex flex-col gap-2 pt-8">
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                onClick={() => goto(link.href)}
                className="text-left text-2xl font-display font-bold text-white/30 hover:text-white py-3 border-b border-white/05 transition-all tracking-tight"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="container pt-10 mt-auto pb-12">
            <button
              onClick={() => goto('contact')}
              className="btn btn-cta btn-lg w-full justify-center"
            >
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
