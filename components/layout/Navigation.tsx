'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const navLinks = [
  { label: 'Services',  href: 'services' },
  { label: 'About',     href: 'about' },
  { label: 'Sectors',   href: 'sectors' },
  { label: 'Why Us',    href: 'why-us' },
  { label: 'Contact',   href: 'contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const goto = (id: string) => {
    setMenuOpen(false)
    setActive(id)
    const el = document.getElementById(id)
    if (el) {
      const offset = 72
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-[72px] flex items-center ${
        scrolled ? 'bg-white/95 shadow-[0_2px_24px_rgba(26,58,107,0.10)]' : 'bg-transparent'
      }`}
      style={{ backdropFilter: scrolled ? 'blur(20px)' : 'none' }}
    >
      {/* Animated brand-colour bottom border when scrolled */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, transparent, #1A3A6B 30%, #E8621A 70%, transparent)',
        }}
      />

      <div className="container w-full h-full relative z-10">
        <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-3 items-center w-full h-full">

          {/* Left: Logo */}
          <div className="flex justify-start">
            <button
              onClick={() => goto('home')}
              className="flex items-center group"
              aria-label="Afridyn Engineering — home"
            >
              <Image
                src="/images/logo.png"
                alt="Afridyn Engineering | Technology"
                width={160}
                height={48}
                className="object-contain h-10 w-auto transition-all duration-300 group-hover:opacity-90"
                priority
              />
            </button>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex justify-center">
            <nav className="flex items-center gap-1" aria-label="Primary navigation">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => goto(link.href)}
                  className={`relative px-5 py-2.5 text-[13px] font-semibold tracking-[0.04em] transition-all rounded-full
                    ${active === link.href
                      ? 'text-white'
                      : scrolled
                        ? 'text-[#3D5275] hover:text-[#1A3A6B]'
                        : 'text-white/80 hover:text-white'
                    }`}
                >
                  {active === link.href && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #1A3A6B, #2B5BA8)',
                        boxShadow: '0 4px 14px rgba(26, 58, 107, 0.35)',
                      }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
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
              <div className="absolute -inset-[2px] rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-r from-[#E8621A] to-[#F07A38]" />
              <button
                onClick={() => goto('contact')}
                className="relative btn btn-cta btn-sm px-7 py-3 text-[14px]"
              >
                Get a Quote
              </button>
            </div>

            <button
              className={`lg:hidden p-2 rounded-lg transition-all hover:bg-[#1A3A6B]/5 ${
                scrolled ? 'text-[#1A3A6B]' : 'text-white'
              }`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[72px] z-40 bg-white transition-all duration-400 overflow-y-auto
          ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
      >
        {/* Top accent bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#1A3A6B] via-[#E8621A] to-[#1A3A6B]" />
        <div className="container py-8 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => goto(link.href)}
              className="text-left text-xl font-display font-bold text-[#3D5275] hover:text-[#1A3A6B] py-4 px-2 border-b border-slate-100 transition-colors"
              style={{ transitionDelay: `${i * 40}ms` }}
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
