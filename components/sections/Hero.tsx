'use client'
import { ArrowRight, ChevronDown } from 'lucide-react'

const PARTICLES = [
  { left: '14%', top: '72%', w: 3,  dur: 7,  del: 0,   color: '#E8305A' },
  { left: '27%', top: '80%', w: 2,  dur: 9,  del: 1.4, color: '#D4692A' },
  { left: '41%', top: '66%', w: 4,  dur: 8,  del: 0.6, color: '#E8305A' },
  { left: '55%', top: '76%', w: 2,  dur: 10, del: 2.1, color: '#D4692A' },
  { left: '67%', top: '83%', w: 3,  dur: 7,  del: 1.9, color: '#E8305A' },
  { left: '80%', top: '69%', w: 4,  dur: 9,  del: 0.4, color: '#D4692A' },
  { left: '6%',  top: '58%', w: 3,  dur: 11, del: 1.1, color: '#D4692A' },
]

export function Hero() {
  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#080810' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/assets/hero-banner-afridyn.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.28,
          mixBlendMode: 'luminosity',
        }}
      />

      {/* Gradient veil — darkens bottom so text is readable */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(8,8,16,0.55) 0%, rgba(8,8,16,0.2) 40%, rgba(8,8,16,0.75) 80%, rgba(8,8,16,1) 100%)',
        }}
      />

      {/* Subtle aurora orbs */}
      <div
        className="hero-orb"
        style={{
          width: 700, height: 700,
          top: '-15%', right: '-10%',
          background: 'radial-gradient(circle, rgba(232,48,90,0.10) 0%, transparent 68%)',
          filter: 'blur(90px)',
          animation: 'orbFloat1 16s ease-in-out infinite',
        }}
      />
      <div
        className="hero-orb"
        style={{
          width: 560, height: 560,
          bottom: '-10%', left: '-8%',
          background: 'radial-gradient(circle, rgba(212,105,42,0.09) 0%, transparent 68%)',
          filter: 'blur(80px)',
          animation: 'orbFloat2 20s ease-in-out infinite',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="hero-particle"
          style={{
            left: p.left, top: p.top,
            width: p.w, height: p.w,
            background: p.color,
            boxShadow: `0 0 ${p.w * 4}px ${p.color}80`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.del}s`,
          }}
        />
      ))}

      {/* Content */}
      <div className="container relative z-10 pt-36 pb-24">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center"
          style={{ animation: 'textReveal 0.9s cubic-bezier(0.16,1,0.3,1) both' }}>

          {/* Section label */}
          <div className="section-label mb-6">
            Certified Industrial Excellence — Zambia &amp; Sub-Saharan Africa
          </div>

          {/* Headline */}
          <h1
            className="font-display font-black mb-7 text-white"
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 6rem)',
              letterSpacing: '-0.04em',
              lineHeight: 1.02,
            }}
          >
            Engineering
            <br />Excellence
            <br />
            <span className="text-gradient-fire">Across Africa</span>
          </h1>

          {/* Sub-copy */}
          <p
            className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Mechanical, electrical, IT, and fibre optic solutions for mining,
            manufacturing, and infrastructure sectors.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button
              onClick={() => goto('services')}
              className="btn btn-cta btn-lg"
            >
              Explore Services
              <ArrowRight size={18} strokeWidth={2} />
            </button>
            <button
              onClick={() => goto('contact')}
              className="btn btn-ghost btn-lg"
            >
              Get a Quote
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex justify-center items-center gap-10 pt-10 border-t border-white/08 w-full">
            {[
              { img: '/images/assets/trust-badge-iso.png',                    label: 'ISO Certified' },
              { img: '/images/assets/trust-badge-support-afridyn.png',        label: '24/7 Support' },
              { img: '/images/assets/trust-badge-excellence-afridyn.png',     label: 'Project Excellence' },
            ].map((b, i) => (
              <div key={i} className="flex flex-col items-center gap-2.5 group cursor-default">
                <div className="w-11 h-11 transition-transform duration-400 group-hover:scale-110">
                  <img src={b.img} alt={b.label} className="w-full h-full object-contain" />
                </div>
                <span
                  className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase transition-colors group-hover:text-white/70"
                  style={{ color: 'rgba(255,255,255,0.30)' }}
                >
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => goto('services')}
        aria-label="Scroll to services"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
        style={{ color: 'rgba(255,255,255,0.2)' }}
      >
        <ChevronDown
          size={22}
          strokeWidth={1.5}
          className="animate-bounce group-hover:text-white/50 transition-colors"
        />
      </button>
    </section>
  )
}
