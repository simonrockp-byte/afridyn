'use client'
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react'

export function Hero() {
  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 60%, #0A1628 100%)' }}>

      {/* Animated grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,105,42,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(31,133,122,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.01), transparent)' }} />

      <div className="container relative z-10 pt-24 pb-12">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center min-h-[calc(100vh-6rem)]">

          {/* LEFT */}
          <div>
            <div className="label-chip label-chip-dark mb-7" style={{ animationDelay: '0s' }}>
              Engineering Excellence Across Africa
            </div>

            <h1 className="font-display font-black text-white leading-[1.0] mb-6"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', letterSpacing: '-0.03em' }}>
              Industrial&nbsp;
              <span className="text-gradient-copper">Grade</span>
              <br />Engineering
              <br />Solutions
            </h1>

            <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Afridyn Engineering delivers mechanical, electrical, IT, and fibre optic solutions for mining, manufacturing, and infrastructure sectors across Zambia and Sub-Saharan Africa.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <button onClick={() => goto('services')} className="btn btn-primary btn-lg">
                Explore Services
                <ArrowRight size={18} />
              </button>
              <button onClick={() => goto('contact')} className="btn btn-ghost-dark btn-lg">
                Get a Quote
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {[
                { value: '2026', label: 'Established', sub: 'Lusaka, Zambia' },
                { value: '8+', label: 'Service Lines', sub: 'Technical disciplines' },
                { value: '5', label: 'Sectors', sub: 'Industry coverage' },
              ].map(s => (
                <div key={s.label}>
                  <p className="font-display font-black text-white text-3xl leading-none mb-1">{s.value}</p>
                  <p className="text-xs font-semibold text-white/60 mb-0.5">{s.label}</p>
                  <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Engineering Visual */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-full max-w-md">

              {/* Central blueprint-style hexagonal visual */}
              <div className="relative flex items-center justify-center" style={{ aspectRatio: '1' }}>
                {/* Outer ring */}
                <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0 opacity-20 animate-pulse-slow">
                  <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(212,105,42,0.5)" strokeWidth="0.5" strokeDasharray="8 4" />
                  <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(31,133,122,0.4)" strokeWidth="0.5" strokeDasharray="4 8" />
                </svg>

                {/* Geometric mechanical shape */}
                <svg viewBox="0 0 300 300" className="w-4/5 h-4/5">
                  <defs>
                    <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4692A" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#1F857A" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  {/* Hexagon */}
                  <polygon points="150,20 260,80 260,220 150,280 40,220 40,80"
                    fill="none" stroke="url(#hexGrad)" strokeWidth="1.5" />
                  {/* Inner hex */}
                  <polygon points="150,60 225,100 225,200 150,240 75,200 75,100"
                    fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  {/* Cross lines */}
                  <line x1="40" y1="150" x2="260" y2="150" stroke="rgba(212,105,42,0.2)" strokeWidth="0.5" />
                  <line x1="150" y1="20" x2="150" y2="280" stroke="rgba(31,133,122,0.2)" strokeWidth="0.5" />
                  {/* Center ring */}
                  <circle cx="150" cy="150" r="30" fill="rgba(212,105,42,0.08)" stroke="#D4692A" strokeWidth="1.5" />
                  <circle cx="150" cy="150" r="8" fill="#D4692A" opacity="0.7" />
                  {/* Corner accents */}
                  {[[40,80],[260,80],[260,220],[40,220]].map(([x,y], i) => (
                    <circle key={i} cx={x} cy={y} r="4" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                  ))}
                </svg>

                {/* Floating info cards */}
                <div className="absolute -top-4 -right-4 card-dark p-4 rounded-xl text-sm" style={{ maxWidth: 160 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield size={14} style={{ color: '#D4692A' }} />
                    <span className="font-semibold text-white text-xs">ZPPA Certified</span>
                  </div>
                  <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>Reg: 137269</p>
                </div>

                <div className="absolute -bottom-4 -left-4 card-dark p-4 rounded-xl text-sm" style={{ maxWidth: 170 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Globe size={14} style={{ color: '#1F857A' }} />
                    <span className="font-semibold text-white text-xs">Pan-African Reach</span>
                  </div>
                  <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>Lusaka HQ • 5 sectors</p>
                </div>

                <div className="absolute top-1/2 -right-12 -translate-y-1/2 card-dark p-4 rounded-xl" style={{ maxWidth: 150 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap size={14} style={{ color: '#F09040' }} />
                    <span className="font-semibold text-white text-xs">24/7 Support</span>
                  </div>
                  <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>Always operational</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
        <div className="w-5 h-8 rounded-full border border-current flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-current animate-bounce" />
        </div>
      </div>
    </section>
  )
}
