'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goto = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(10, 22, 40, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <button onClick={() => goto('#home')} className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-display font-black text-sm"
              style={{ background: 'linear-gradient(135deg, #D4692A, #B85A1A)' }}>
              AE
            </div>
            <div className="leading-none text-left">
              <span className="block font-display font-black text-white text-sm tracking-[.15em]">AFRIDYN</span>
              <span className="block text-[8px] tracking-[.3em] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>ENGINEERING</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button key={link.href} onClick={() => goto(link.href)} className="nav-link">
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => goto('#contact')} className="btn btn-primary btn-sm">
              Get a Quote
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(10,22,40,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <button key={link.href} onClick={() => goto(link.href)}
                className="text-left px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-white/5 mt-2">
              <button onClick={() => goto('#contact')} className="btn btn-primary w-full justify-center">
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
