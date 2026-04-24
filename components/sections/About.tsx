'use client'
import { Zap, Shield, Target, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

const pillars = [
  { icon: Zap, title: 'Innovation', desc: 'Leveraging modern engineering methods and technologies to solve complex industrial challenges.', color: '#FF6B00' },
  { icon: Shield, title: 'Integrity', desc: 'Transparent operations backed by full PACRA, TPIN, and ZPPA regulatory compliance.', color: '#FF007F' },
  { icon: Target, title: 'Precision', desc: 'International-standard engineering execution on every project — zero tolerance for mediocrity.', color: '#FF6B00' },
  { icon: Globe, title: 'Pan-African', desc: 'Local knowledge, pan-African capability and ambition. Headquartered in Lusaka.', color: '#FF007F' },
]

const credentials = [
  { label: 'PACRA', value: '120261040695', desc: 'Company Registration' },
  { label: 'TPIN', value: '2004257975', desc: 'Tax Identification' },
  { label: 'ZPPA', value: '137269', desc: 'Procurement Authority' },
]

export function About() {
  return (
    <section id="about" className="section" style={{ background: '#0A0A0F' }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-24 items-center">

          {/* LEFT */}
          <div>
            <div className="label-chip mb-8 reveal" style={{ background: 'rgba(255,107,0,0.1)', borderColor: 'rgba(255,107,0,0.25)', color: '#FF6B00' }}>
              Corporate Profile
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl mb-10 reveal" style={{ color: '#FFFFFF', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
              Africa's Trusted<br />
              <span className="text-gradient-fire">Engineering Partner</span>
            </h2>

            <p className="text-lg leading-relaxed mb-6 reveal opacity-70" style={{ color: '#FFFFFF' }}>
              Afridyn Engineering Limited delivers integrated engineering services spanning mechanical, electrical, IT, optical fibre, and logistics across Sub-Saharan Africa.
            </p>
            <p className="text-lg leading-relaxed mb-12 reveal opacity-70" style={{ color: '#FFFFFF' }}>
              Founded in Lusaka, Zambia, we are dedicated to building a resilient infrastructure foundation for the continent through precision and modern methodology.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal">
              {pillars.map(p => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="rounded-[24px] p-6 group transition-all duration-500" 
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-transform group-hover:scale-110" 
                      style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}25` }}>
                      <Icon size={22} />
                    </div>
                    <h4 className="font-display font-bold text-base mb-2 text-white">{p.title}</h4>
                    <p className="text-xs leading-relaxed opacity-50 group-hover:opacity-80 transition-opacity" style={{ color: '#FFFFFF' }}>{p.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-10 reveal">
            {/* Visual with Badge */}
            <div className="relative rounded-[40px] overflow-hidden aspect-[4/3] group shadow-2xl"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <img 
                src="/images/services/maintenance.png" 
                alt="Afridyn Technical Capability" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8">
                 <div className="label-chip label-chip-dark" style={{ background: 'rgba(255,0,127,0.8)', borderColor: 'rgba(255,255,255,0.2)', color: '#FFF' }}>
                   Pan-African Capability
                 </div>
              </div>
            </div>

            {/* Mission/Vision cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-8 rounded-[32px]" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: '#FF007F' }}>Our Mission</span>
                <p className="text-sm leading-relaxed opacity-60" style={{ color: '#FFFFFF' }}>
                  Reliable engineering support that enhances operational efficiency and supports African industrial development.
                </p>
              </div>
              <div className="p-8 rounded-[32px]" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: '#FF6B00' }}>Our Vision</span>
                <p className="text-sm leading-relaxed opacity-60" style={{ color: '#FFFFFF' }}>
                  To be the most trusted technical solutions provider for Africa's most demanding sectors.
                </p>
              </div>
            </div>

            {/* Credentials */}
            <div className="rounded-[32px] p-8" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <h4 className="font-display font-bold text-sm mb-6 tracking-widest uppercase opacity-40">Regulatory Compliance</h4>
              <div className="space-y-4">
                {credentials.map(c => (
                  <div key={c.label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div>
                      <p className="font-display font-bold text-sm text-white">{c.label}</p>
                      <p className="text-[10px] opacity-40 text-white">{c.desc}</p>
                    </div>
                    <span className="font-mono text-xs font-semibold px-4 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#FFFFFF' }}>
                      {c.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
