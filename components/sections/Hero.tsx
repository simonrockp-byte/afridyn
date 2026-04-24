'use client'
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react'

/* tiny deterministic "random" for SSR-safe particles */
const PARTICLES = [
  { left: '12%', top: '70%', w: 4,  dur: 6,  del: 0,   color: '#FF2D55' },
  { left: '25%', top: '80%', w: 3,  dur: 8,  del: 1.2, color: '#FF6A00' },
  { left: '38%', top: '65%', w: 5,  dur: 7,  del: 0.5, color: '#CC00FF' },
  { left: '52%', top: '75%', w: 3,  dur: 9,  del: 2,   color: '#FF2D55' },
  { left: '65%', top: '82%', w: 4,  dur: 6,  del: 1.8, color: '#FF6A00' },
  { left: '78%', top: '68%', w: 6,  dur: 8,  del: 0.3, color: '#CC00FF' },
  { left: '88%', top: '78%', w: 3,  dur: 7,  del: 2.5, color: '#FF2D55' },
  { left: '5%',  top: '55%', w: 4,  dur: 10, del: 1,   color: '#FF6A00' },
]

export function Hero() {
  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A0A1A 0%, #150A28 35%, #1A0A10 70%, #0A1020 100%)',
        backgroundSize: '400% 400%',
        animation: 'bgShift 12s ease-in-out infinite',
      }}>

      {/* ── Aurora orbs ── */}
      <div className="hero-orb" style={{
        width: 600, height: 600,
        top: '-10%', right: '-5%',
        background: 'radial-gradient(circle, rgba(255,45,85,0.22) 0%, rgba(204,0,255,0.12) 45%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'orbFloat1 14s ease-in-out infinite',
      }} />
      <div className="hero-orb" style={{
        width: 500, height: 500,
        bottom: '-5%', left: '-8%',
        background: 'radial-gradient(circle, rgba(255,106,0,0.20) 0%, rgba(255,45,85,0.10) 50%, transparent 70%)',
        filter: 'blur(50px)',
        animation: 'orbFloat2 18s ease-in-out infinite',
      }} />
      <div className="hero-orb" style={{
        width: 400, height: 400,
        top: '40%', left: '35%',
        background: 'radial-gradient(circle, rgba(204,0,255,0.15) 0%, transparent 65%)',
        filter: 'blur(55px)',
        animation: 'orbFloat3 22s ease-in-out infinite',
      }} />

      {/* ── Animated grid ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:
          'linear-gradient(rgba(255,45,85,0.04) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(204,0,255,0.04) 1px, transparent 1px)',
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

      {/* ── Scan line ── */}
      <div className="absolute left-0 right-0 pointer-events-none" style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,45,85,0.15), rgba(204,0,255,0.2), rgba(255,106,0,0.15), transparent)',
        animation: 'scanLine 8s linear infinite',
      }} />

      <div className="container relative z-10 pt-24 pb-12">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center min-h-[calc(100vh-6rem)]">

          {/* ── LEFT ── */}
          <div style={{ animation: 'textReveal 0.8s cubic-bezier(0.16,1,0.3,1) both' }}>
            {/* Label chip */}
            <div className="label-chip label-chip-dark mb-7" style={{
              background: 'linear-gradient(135deg, rgba(255,45,85,0.25), rgba(204,0,255,0.18))',
              borderColor: 'rgba(255,45,85,0.45)',
              color: '#FFCCD0',
              boxShadow: '0 0 16px rgba(255,45,85,0.2)',
              animation: 'borderGlow 4s ease-in-out infinite',
              fontWeight: 800,
              letterSpacing: '0.12em'
            }}>
              Engineering Excellence Across Africa
            </div>

            {/* Headline */}
            <h1 className="font-display font-black leading-[1.0] mb-6"
              style={{ 
                fontSize: 'clamp(3rem, 7vw, 5.5rem)', 
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}>
              Engineering
              <br />Excellence
              <br /><span className="text-gradient-fire">Across Africa</span>
            </h1>

            <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{
              color: 'rgba(255,255,255,0.85)',
              animationDelay: '0.2s',
              textShadow: '0 1px 4px rgba(0,0,0,0.2)'
            }}>
              Afridyn Engineering delivers mechanical, electrical, IT, and fibre
              optic solutions for mining, manufacturing, and infrastructure
              sectors across Zambia and Sub-Saharan Africa.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-14">
              <button onClick={() => goto('services')} className="btn btn-lg" style={{
                background: 'linear-gradient(135deg, #FF2D55, #FF6A00)',
                color: '#fff',
                boxShadow: '0 4px 24px rgba(255,45,85,0.45)',
                transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 36px rgba(255,45,85,0.65)'
                  ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 24px rgba(255,45,85,0.45)'
                  ;(e.currentTarget as HTMLButtonElement).style.transform = ''
                }}>
                Explore Services <ArrowRight size={18} />
              </button>
              <button onClick={() => goto('contact')} className="btn btn-ghost-dark btn-lg" style={{
                border: '1px solid rgba(204,0,255,0.25)',
                background: 'rgba(204,0,255,0.07)',
                color: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(204,0,255,0.5)'
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(204,0,255,0.14)'
                  ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
                  ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(204,0,255,0.2)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(204,0,255,0.25)'
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(204,0,255,0.07)'
                  ;(e.currentTarget as HTMLButtonElement).style.transform = ''
                  ;(e.currentTarget as HTMLButtonElement).style.boxShadow = ''
                }}>
                Get a Quote
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8"
              style={{ borderTop: '1px solid rgba(255,45,85,0.15)' }}>
              {[
                { value: '2026', label: 'Established', sub: 'Lusaka, Zambia',    color: '#FF2D55' },
                { value: '8+',   label: 'Service Lines', sub: 'Technical disciplines', color: '#FF6A00' },
                { value: '5',    label: 'Sectors',      sub: 'Industry coverage', color: '#CC00FF' },
              ].map(s => (
                <div key={s.label}>
                  <p className="font-display font-black text-white text-3xl leading-none mb-1"
                    style={{ color: s.color, textShadow: `0 0 20px ${s.color}55` }}>{s.value}</p>
                  <p className="text-xs font-semibold text-white/80 mb-0.5">{s.label}</p>
                  <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Animated engineering visual ── */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-full max-w-md">
              <div className="relative flex items-center justify-center" style={{ aspectRatio: '1' }}>

                {/* Outermost spinning ring */}
                <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0" style={{
                  animation: 'hexSpin 30s linear infinite',
                }}>
                  <circle cx="200" cy="200" r="190" fill="none"
                    strokeWidth="0.6" strokeDasharray="10 6"
                    style={{ animation: 'colorPulse 4s ease-in-out infinite', stroke: 'rgba(255,45,85,0.6)' }} />
                </svg>

                {/* Second ring - reverse */}
                <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0" style={{
                  animation: 'hexSpinReverse 20s linear infinite',
                }}>
                  <circle cx="200" cy="200" r="155" fill="none"
                    strokeWidth="0.5" strokeDasharray="5 9"
                    style={{ animation: 'colorPulse 4s ease-in-out infinite 1.3s', stroke: 'rgba(255,106,0,0.5)' }} />
                </svg>

                {/* Static dashes ring */}
                <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0 opacity-30">
                  <circle cx="200" cy="200" r="120" fill="none"
                    stroke="rgba(204,0,255,0.6)" strokeWidth="0.5" strokeDasharray="3 12" />
                </svg>

                {/* Main hex shape */}
                <svg viewBox="0 0 300 300" className="w-4/5 h-4/5">
                  <defs>
                    <linearGradient id="hexGradFire" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%"   stopColor="#FF2D55" stopOpacity="0.8">
                        <animate attributeName="stop-color" values="#FF2D55;#FF6A00;#CC00FF;#FF2D55" dur="4s" repeatCount="indefinite" />
                      </stop>
                      <stop offset="100%" stopColor="#CC00FF" stopOpacity="0.5">
                        <animate attributeName="stop-color" values="#CC00FF;#FF2D55;#FF6A00;#CC00FF" dur="4s" repeatCount="indefinite" />
                      </stop>
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FF2D55">
                        <animate attributeName="stop-color" values="#FF2D55;#FF6A00;#CC00FF;#FF2D55" dur="3s" repeatCount="indefinite" />
                      </stop>
                      <stop offset="100%" stopColor="#FF6A00" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Outer hexagon */}
                  <polygon points="150,20 260,80 260,220 150,280 40,220 40,80"
                    fill="none" stroke="url(#hexGradFire)" strokeWidth="1.5" filter="url(#glow)"
                    style={{ animation: 'colorPulse 4s ease-in-out infinite' }} />

                  {/* Inner hexagon */}
                  <polygon points="150,60 225,100 225,200 150,240 75,200 75,100"
                    fill="rgba(255,45,85,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                  {/* Cross-hairs */}
                  <line x1="40" y1="150" x2="260" y2="150"
                    stroke="rgba(255,106,0,0.25)" strokeWidth="0.5" />
                  <line x1="150" y1="20" x2="150" y2="280"
                    stroke="rgba(204,0,255,0.25)" strokeWidth="0.5" />

                  {/* Center aura */}
                  <circle cx="150" cy="150" r="40" fill="url(#centerGrad)" opacity="0.4" />

                  {/* Center ring */}
                  <circle cx="150" cy="150" r="30" fill="rgba(255,45,85,0.08)"
                    stroke="#FF2D55" strokeWidth="1.5" filter="url(#glow)"
                    style={{ animation: 'colorPulse 3s ease-in-out infinite' }} />

                  {/* Center dot */}
                  <circle cx="150" cy="150" r="8" filter="url(#glow)">
                    <animate attributeName="fill" values="#FF2D55;#FF6A00;#CC00FF;#FF2D55" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                  </circle>

                  {/* Corner accent dots */}
                  {[[40,80],[260,80],[260,220],[40,220]].map(([x,y], i) => (
                    <circle key={i} cx={x} cy={y} r="5"
                      fill="none" strokeWidth="1.5" filter="url(#glow)"
                      style={{ animation: `colorPulse 4s ease-in-out infinite ${i * 0.7}s` }}>
                    </circle>
                  ))}

                  {/* Tick marks on hex edges */}
                  {[
                    [150, 20], [260, 80], [260, 220], [150, 280], [40, 220], [40, 80]
                  ].map(([x, y], i) => (
                    <circle key={`tick-${i}`} cx={x} cy={y} r="3" opacity="0.5">
                      <animate attributeName="fill" values="#FF2D55;#FF6A00;#CC00FF;#FF2D55"
                        dur="4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                    </circle>
                  ))}
                </svg>

                {/* ── Floating info cards ── */}
                <div className="absolute -top-4 -right-4 card-dark p-4 rounded-xl text-sm hero-card-float-1" style={{
                  maxWidth: 160,
                  background: 'rgba(255,45,85,0.08)',
                  border: '1px solid rgba(255,45,85,0.25)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 0 24px rgba(255,45,85,0.15)',
                  animation: 'cardFloat 3.5s ease-in-out infinite',
                }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield size={14} style={{ color: '#FF2D55', filter: 'drop-shadow(0 0 4px #FF2D55)' }} />
                    <span className="font-semibold text-white text-xs">ZPPA Certified</span>
                  </div>
                  <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>Reg: 137269</p>
                </div>

                <div className="absolute -bottom-4 -left-4 card-dark p-4 rounded-xl text-sm" style={{
                  maxWidth: 170,
                  background: 'rgba(255,106,0,0.08)',
                  border: '1px solid rgba(255,106,0,0.25)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 0 24px rgba(255,106,0,0.15)',
                  animation: 'cardFloat2 4.2s ease-in-out infinite 0.8s',
                }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Globe size={14} style={{ color: '#FF6A00', filter: 'drop-shadow(0 0 4px #FF6A00)' }} />
                    <span className="font-semibold text-white text-xs">Pan-African Reach</span>
                  </div>
                  <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>Lusaka HQ • 5 sectors</p>
                </div>

                <div className="absolute top-1/2 -right-12 card-dark p-4 rounded-xl" style={{
                  maxWidth: 150,
                  background: 'rgba(204,0,255,0.08)',
                  border: '1px solid rgba(204,0,255,0.25)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 0 24px rgba(204,0,255,0.15)',
                  animation: 'cardFloat3 3.8s ease-in-out infinite 0.4s',
                }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap size={14} style={{ color: '#CC00FF', filter: 'drop-shadow(0 0 4px #CC00FF)' }} />
                    <span className="font-semibold text-white text-xs">24/7 Support</span>
                  </div>
                  <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>Always operational</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'rgba(255,45,85,0.4)' }}>
        <div className="w-5 h-8 rounded-full border border-current flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-current animate-bounce" />
        </div>
      </div>
    </section>
  )
}
