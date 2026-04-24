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
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize if above breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const goto = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const offset = 72 // height of header
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setActive(id)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[72px] flex items-center ${
        scrolled ? 'bg-[#080810]/95 border-b border-white/10 shadow-lg' : 'bg-transparent'
      }`}
      style={{ backdropFilter: scrolled ? 'blur(16px)' : 'none' }}
    >
      <div className="container w-full h-full">
        <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-3 items-center w-full h-full">

          {/* Left: Logo */}
          <div className="flex justify-start">
            <button
              onClick={() => goto('home')}
              className="flex items-center gap-3 group transition-transform active:scale-95"
              aria-label="Afridyn Engineering — home"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt=""
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <div className="leading-none text-left">
                <span className="block font-display font-black text-white text-[17px] tracking-[.06em]">AFRIDYN</span>
                <span className="block text-[9px] tracking-[.35em] font-mono text-white/50 uppercase mt-1">Engineering</span>
              </div>
            </button>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex justify-center">
            <nav className="flex items-center gap-2" aria-label="Primary navigation">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => goto(link.href)}
                  className={`px-5 py-2.5 text-[13px] font-semibold tracking-[0.05em] transition-all rounded-full uppercase
                    ${active === link.href 
                      ? 'text-white bg-white/10' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right: CTA / Mobile Toggle */}
          <div className="flex justify-end items-center gap-4">
            <button
              onClick={() => goto('contact')}
              className="hidden lg:inline-flex btn btn-cta btn-sm px-7 py-3 text-[14px]"
            >
              Get a Quote
            </button>

            <button
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu (Standard Drawer) */}
      <div 
        className={`lg:hidden fixed inset-0 top-[72px] z-40 bg-[#080810]/98 transition-all duration-500 overflow-y-auto
          ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div className="container py-10 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => goto(link.href)}
              className="text-left text-xl font-display font-bold text-white/60 hover:text-white py-4 px-2 border-b border-white/5 transition-all"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-8">
            <button
              onClick={() => goto('contact')}
              className="btn btn-cta btn-lg w-full justify-center"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
