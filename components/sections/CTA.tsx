'use client'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="section-sm" style={{ background: 'var(--surface-2)' }}>
      <div className="container">
        <div className="reveal rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%)' }}>

          {/* Grid bg */}
          <div className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }} />

          {/* Glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(212,105,42,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />

          <div className="relative px-8 md:px-14 py-14 md:py-16 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-3" style={{ letterSpacing: '-0.03em' }}>
                Ready to Solve Your<br />
                <span className="text-gradient-copper">Engineering Challenge?</span>
              </h2>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Talk to our team today. We respond within 24 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary btn-lg">
                Request a Quote
                <ArrowRight size={18} />
              </button>
              <a href="tel:+260956797916" className="btn btn-ghost-dark btn-lg">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
