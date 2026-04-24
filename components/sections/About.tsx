'use client'
import { Zap, Shield, Target, Globe } from 'lucide-react'

const pillars = [
  { icon: Zap, title: 'Innovation', desc: 'Leveraging modern engineering methods and technologies to solve complex industrial challenges efficiently.', color: '#D4692A' },
  { icon: Shield, title: 'Integrity', desc: 'Transparent, ethical operations backed by full PACRA, TPIN, and ZPPA regulatory compliance.', color: '#1F857A' },
  { icon: Target, title: 'Precision', desc: 'International-standard engineering execution on every project, every time — zero tolerance for mediocrity.', color: '#D4692A' },
  { icon: Globe, title: 'Pan-African', desc: 'Local knowledge, pan-African capability and ambition. Headquartered in Lusaka, serving the continent.', color: '#1F857A' },
]

const credentials = [
  { label: 'PACRA', value: '120261040695', desc: 'Company Registration' },
  { label: 'TPIN', value: '2004257975', desc: 'Tax Identification' },
  { label: 'ZPPA', value: '137269', desc: 'Procurement Authority' },
]

export function About() {
  return (
    <section id="about" className="section" style={{ background: 'var(--surface-2)' }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div>
            <div className="label-chip mb-6 reveal">Who We Are</div>
            <h2 className="font-display font-black text-4xl md:text-5xl mb-6 reveal" style={{ color: 'var(--navy-900)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Africa's Trusted<br />
              <span className="text-gradient-teal">Engineering Partner</span>
            </h2>

            <p className="text-base leading-relaxed mb-4 reveal" style={{ color: 'var(--text-secondary)' }}>
              Afridyn Engineering Limited was founded in February 2026, headquartered in Lusaka, Zambia. We deliver integrated engineering services spanning mechanical, electrical, IT, optical fibre, and logistics.
            </p>
            <p className="text-base leading-relaxed mb-10 reveal" style={{ color: 'var(--text-secondary)' }}>
              We are dedicated to building a resilient infrastructure foundation for the continent through precision, modern methodology, and a commitment to operational uptime.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-4 reveal">
              {pillars.map(p => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="card p-5">
                    <div className="icon-box mb-3" style={{ background: `${p.color}10`, color: p.color }}>
                      <Icon size={20} />
                    </div>
                    <h4 className="font-display font-bold text-sm mb-1.5" style={{ color: 'var(--navy-900)' }}>{p.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8 reveal">
            {/* Team/Facility Visual */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group shadow-2xl"
              style={{ border: '1px solid var(--border)' }}>
              <img 
                src="/images/assets/technical_outsourcing.png" 
                alt="Afridyn Technical Team" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6">
                 <div className="label-chip label-chip-dark" style={{ background: 'rgba(255,45,85,0.8)', borderColor: 'rgba(255,255,255,0.2)' }}>
                   Technical Excellence
                 </div>
              </div>
            </div>

            {/* Mission/Vision cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl" style={{ border: '1px solid var(--border)', background: 'linear-gradient(135deg, var(--white), var(--surface)-2)' }}>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-3" style={{ color: '#FF2D55' }}>Our Mission</span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Reliable engineering support that enhances operational efficiency and supports African industrial development.
                </p>
              </div>
              <div className="p-6 rounded-2xl" style={{ border: '1px solid var(--border)', background: 'linear-gradient(135deg, var(--white), var(--surface)-2)' }}>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-3" style={{ color: '#CC00FF' }}>Our Vision</span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  To be the most trusted technical solutions provider for Africa's most demanding sectors.
                </p>
              </div>
            </div>

            {/* Credentials */}
            <div className="card p-6">
              <h4 className="font-display font-bold text-sm mb-4" style={{ color: 'var(--navy-900)' }}>Regulatory Credentials</h4>
              <div className="space-y-3">
                {credentials.map(c => (
                  <div key={c.label} className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <p className="font-display font-bold text-sm" style={{ color: 'var(--navy-900)' }}>{c.label}</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{c.desc}</p>
                    </div>
                    <span className="font-mono text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: 'var(--surface-3)', color: 'var(--text-secondary)' }}>
                      {c.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact quick card */}
            <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, rgba(212,105,42,0.06), rgba(31,133,122,0.04))', border: '1px solid rgba(212,105,42,0.12)' }}>
              <p className="font-display font-bold text-sm mb-1" style={{ color: 'var(--navy-900)' }}>📍 31 Salama Park, Lusaka, Zambia</p>
              <p className="text-sm mb-0.5" style={{ color: 'var(--text-muted)' }}>📞 +260 956 797 916 / +260 969 628 707</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>✉️ info@afridynengineering.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
