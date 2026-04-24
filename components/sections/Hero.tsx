'use client'
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react'

/* tiny deterministic "random" for SSR-safe particles */
const PARTICLES = [
  { left: '12%', top: '70%', w: 4,  dur: 6,  del: 0,   color: '#FF007F' },
  { left: '25%', top: '80%', w: 3,  dur: 8,  del: 1.2, color: '#FF6B00' },
  { left: '38%', top: '65%', w: 5,  dur: 7,  del: 0.5, color: '#FF007F' },
  { left: '52%', top: '75%', w: 3,  dur: 9,  del: 2,   color: '#FF6B00' },
  { left: '65%', top: '82%', w: 4,  dur: 6,  del: 1.8, color: '#FF007F' },
  { left: '78%', top: '68%', w: 6,  dur: 8,  del: 0.3, color: '#FF6B00' },
  { left: '88%', top: '78%', w: 3,  dur: 7,  del: 2.5, color: '#FF007F' },
  { left: '5%',  top: '55%', w: 4,  dur: 10, del: 1,   color: '#FF6B00' },
]

export function Hero() {
  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: '#0A0A0F',
      }}>

      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          backgroundImage: 'url(/images/assets/hero-banner-afridyn.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />

      {/* ── Aurora orbs ── */}
      <div className="hero-orb" style={{
        width: 600, height: 600,
        top: '-10%', right: '-5%',
        background: 'radial-gradient(circle, rgba(255,0,127,0.15) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'orbFloat1 14s ease-in-out infinite',
      }} />
      <div className="hero-orb" style={{
        width: 500, height: 500,
        bottom: '-5%', left: '-8%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)',
        filter: 'blur(70px)',
        animation: 'orbFloat2 18s ease-in-out infinite',
      }} />

      {/* ── Animated grid ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      {/* ── Floating particles ── */}
      {PARTICLES.map((p, i) => (
        <div key={i} className="hero-particle" style={{
          left: p.left, top: p.top,
          width: p.w, height: p.w,
          background: p.color,
          boxShadow: `0 0 ${p.w * 3}px ${p.color}`,
          animationDuration: `${p.dur}s`,
          animationDelay: `${p.del}s`,
        }} />
      ))}

      <div className="container relative z-10 pt-32 pb-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <div style={{ animation: 'textReveal 0.8s cubic-bezier(0.16,1,0.3,1) both' }}>
            {/* Label chip */}
            <div className="label-chip label-chip-dark mb-8 mx-auto" style={{
              background: 'rgba(255,107,0,0.1)',
              borderColor: 'rgba(255,107,0,0.3)',
              color: '#FF6B00',
              boxShadow: '0 0 20px rgba(255,107,0,0.15)',
            }}>
              Certified Industrial Excellence
            </div>

            {/* Headline */}
            <h1 className="font-display font-black leading-[1.05] mb-8"
              style={{ 
                fontSize: 'clamp(2.5rem, 8vw, 6rem)', 
                letterSpacing: '-0.04em',
                color: '#FFFFFF',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}>
              Engineering
              <br />Excellence
              <br /><span className="text-gradient-fire">Across Africa</span>
            </h1>

            <p className="text-xl leading-relaxed mb-10 max-w-2xl mx-auto" style={{
              color: 'rgba(255,255,255,0.8)',
              animationDelay: '0.2s',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              Afridyn Engineering delivers mechanical, electrical, IT, and fibre
              optic solutions for mining, manufacturing, and infrastructure
              sectors across Zambia and Sub-Saharan Africa.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-10 mb-14">
              {[
                { img: '/images/assets/trust-badge-iso.png', label: 'ISO Certified' },
                { img: '/images/assets/trust-badge-support-afridyn.png', label: '24/7 Support' },
                { img: '/images/assets/trust-badge-excellence-afridyn.png', label: 'Project Excellence' },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 relative overflow-hidden transition-all duration-500 group-hover:scale-115 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <img src={b.img} alt={b.label} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase group-hover:text-white/80 transition-colors">{b.label}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center gap-5 mb-16">
              <button onClick={() => goto('services')} className="btn btn-lg" style={{
                background: 'linear-gradient(135deg, #FF6B00, #FF007F)',
                color: '#FFFFFF',
                boxShadow: '0 6px 30px rgba(255,107,0,0.3)',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 40px rgba(255,107,0,0.5)'
                  ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-4px) scale(1.02)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 30px rgba(255,107,0,0.3)'
                  ;(e.currentTarget as HTMLButtonElement).style.transform = ''
                }}>
                Explore Services <ArrowRight size={20} />
              </button>
              <button onClick={() => goto('contact')} className="btn btn-ghost-dark btn-lg"
                style={{
                  transition: 'all 0.3s ease'
                }}>
                Get a Quote
              </button>
            </div>

            {/* Service Icons Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-3xl mx-auto border-t border-white/10 pt-16">
              {[
                { img: '/images/assets/service-icon-mechanical-afridyn.png', label: 'Mechanical' },
                { img: '/images/assets/service-icon-electrical-afridyn.png', label: 'Electrical' },
                { img: '/images/assets/service-icon-it-afridyn.png', label: 'IT Solutions' },
                { img: '/images/assets/service-icon-fiber-afridyn.png', label: 'Fiber Optics' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer" onClick={() => goto('services')}>
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/30 group-hover:shadow-[0_0_25px_rgba(255,0,127,0.25)] group-hover:-translate-y-2">
                    <img src={s.img} alt={s.label} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[11px] font-mono font-bold tracking-[0.15em] text-white/50 group-hover:text-white transition-colors uppercase">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ color: 'rgba(255,255,255,0.2)' }}>
        <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Scroll</span>
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
