'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-[72px] flex items-center ${
        scrolled ? 'bg-white/90' : 'bg-transparent'
      }`}
      style={{ 
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 10px 40px rgba(255, 107, 0, 0.08)' : 'none'
      }}
    >
      {/* Animated glowing bottom border when scrolled */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-[1.5px] transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, transparent, #FF6B00, #FF007F, #FF6B00, transparent)',
          backgroundSize: '200% auto',
          animation: 'fireShift 3s ease-in-out infinite',
        }}
      />

      <div className="container w-full h-full relative z-10">
        <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-3 items-center w-full h-full">

          {/* Left: Logo */}
          <div className="flex justify-start">
            <button
              onClick={() => goto('home')}
              className="flex items-center gap-3 group"
              aria-label="Afridyn Engineering — home"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Vibrant glow behind logo on hover */}
                <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
                <img
                  src="/images/logo.png"
                  alt=""
                  className={`w-full h-full object-contain relative z-10 group-hover:scale-110 transition-all duration-500 ${
                    scrolled ? 'brightness-0' : 'brightness-0 invert'
                  }`}
                />
              </div>
              <div className="leading-none text-left relative z-10">
                <span className={`block font-display font-black text-[17px] tracking-[.06em] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-pink-500 transition-all duration-300 ${
                  scrolled ? 'text-slate-900' : 'text-white'
                }`}>AFRIDYN</span>
                <span className="block text-[9px] tracking-[.35em] font-mono text-orange-600/60 uppercase mt-1">Engineering</span>
              </div>
            </button>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex justify-center">
            <nav className="flex items-center gap-1 relative" aria-label="Primary navigation">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => goto(link.href)}
                  className={`relative px-5 py-2.5 text-[13px] font-bold tracking-[0.06em] transition-colors rounded-full uppercase
                    ${active === link.href 
                      ? 'text-white' 
                      : scrolled ? 'text-slate-500 hover:text-orange-600' : 'text-white/70 hover:text-white'}`}
                >
                  {active === link.href && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #FF6B00, #FF007F)',
                        boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Right: CTA / Mobile Toggle */}
          <div className="flex justify-end items-center gap-4">
            <div className="relative group hidden lg:block">
              {/* Vibrant shadow glow behind button */}
              <div 
                className="absolute -inset-[2px] rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500 bg-gradient-to-r from-orange-500 to-pink-500"
              />
              <button
                onClick={() => goto('contact')}
                className="relative btn btn-cta btn-sm px-7 py-3 text-[14px]"
              >
                Get a Quote
              </button>
            </div>

            <button
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-orange-600 hover:bg-orange-500/5 transition-all"
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
        className={`lg:hidden fixed inset-0 top-[72px] z-40 bg-white/98 transition-all duration-500 overflow-y-auto
          ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div className="container py-10 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => goto(link.href)}
              className="text-left text-xl font-display font-bold text-slate-400 hover:text-orange-600 py-4 px-2 border-b border-slate-100 transition-all"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-8">
            <button
              onClick={() => goto('contact')}
              className="relative btn btn-cta btn-lg w-full justify-center"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
