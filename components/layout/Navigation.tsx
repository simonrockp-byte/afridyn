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
        background: scrolled ? 'rgba(10, 10, 15, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <button onClick={() => goto('#home')} className="flex items-center gap-4 group">
            <div className="relative w-11 h-11 overflow-hidden filter brightness-0 invert">
              <img src="/images/logo.png" alt="Afridyn Logo" className="w-full h-full object-contain" />
            </div>
            <div className="leading-tight text-left hidden sm:block">
              <span className="block font-display font-black text-white text-base tracking-[.08em]">AFRIDYN</span>
              <span className="block text-[10px] tracking-[.3em] font-mono opacity-40 text-white uppercase">Engineering</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map(link => (
              <button key={link.href} onClick={() => goto(link.href)} 
                className="text-sm font-bold text-white/50 hover:text-white px-5 py-2.5 rounded-full transition-all hover:bg-white/5 uppercase tracking-widest">
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={() => goto('#contact')} className="btn btn-sm"
              style={{
                background: 'linear-gradient(135deg, #FF6B00, #FF007F)',
                color: '#FFF',
                borderRadius: '100px',
                padding: '10px 24px'
              }}>
              Get a Quote
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-3 text-white/60 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#0A0A0F]/98 flex flex-col pt-32 px-10 gap-8 animate-in fade-in slide-in-from-top-10 duration-500">
          {navLinks.map(link => (
            <button key={link.href} onClick={() => goto(link.href)}
              className="text-left text-3xl font-black text-white/40 hover:text-white transition-all uppercase tracking-tighter">
              {link.label}
            </button>
          ))}
          <div className="pt-10 border-t border-white/5">
            <button onClick={() => goto('#contact')} className="btn btn-lg w-full justify-center"
              style={{
                background: 'linear-gradient(135deg, #FF6B00, #FF007F)',
                color: '#FFF'
              }}>
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
