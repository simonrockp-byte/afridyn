'use client'
import { Building2, Pickaxe, HardHat, Laptop2, Wifi } from 'lucide-react'

const sectors = [
  { icon: Pickaxe, label: 'Mining', color: '#D4692A', desc: 'Maintenance, spares & workforce for major mining operations.' },
  { icon: HardHat, label: 'Construction', color: '#1F857A', desc: 'Engineering consultation and equipment for infrastructure builds.' },
  { icon: Building2, label: 'Manufacturing', color: '#D4692A', desc: 'Operational efficiency and spare parts for production facilities.' },
  { icon: Laptop2, label: 'Commercial', color: '#1F857A', desc: 'IT equipment and technical outsourcing for businesses.' },
  { icon: Wifi, label: 'Telecoms', color: '#D4692A', desc: 'Optical fibre installation and network maintenance.' },
]

export function Sectors() {
  return (
    <section className="section-sm" style={{ background: 'var(--surface-3)' }}>
      <div className="container">
        <div className="text-center mb-10 reveal">
          <div className="label-chip label-chip-teal mb-4 mx-auto" style={{ display: 'inline-flex' }}>Industry Sectors</div>
          <h2 className="font-display font-black text-3xl md:text-4xl" style={{ color: 'var(--navy-900)', letterSpacing: '-0.03em' }}>
            Sectors We <span className="text-gradient-copper">Serve</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {sectors.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="card reveal p-6 text-center group"
                style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="icon-box mx-auto mb-4" style={{ background: `${s.color}10`, color: s.color }}>
                  <Icon size={22} />
                </div>
                <h4 className="font-display font-bold text-sm mb-2" style={{ color: 'var(--navy-900)' }}>{s.label}</h4>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
