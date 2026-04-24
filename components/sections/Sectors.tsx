'use client'
import { Building2, Pickaxe, HardHat, Laptop2, Wifi } from 'lucide-react'
import { motion } from 'framer-motion'

const sectors = [
  {
    icon: Pickaxe,
    label: 'Mining',
    color: '#FF2D55',
    bg: '/images/assets/maintenance.png',
    desc: 'Maintenance, spares & workforce for major African mining operations.',
    stat: '60% of our work',
  },
  {
    icon: HardHat,
    label: 'Construction',
    color: '#FF6A00',
    bg: '/images/assets/spares.png',
    desc: 'Engineering consultation and equipment for infrastructure builds.',
    stat: 'Active projects',
  },
  {
    icon: Building2,
    label: 'Manufacturing',
    color: '#CC00FF',
    bg: '/images/assets/spares.png',
    desc: 'Operational efficiency and spare parts for production facilities.',
    stat: 'Multi-sector',
  },
  {
    icon: Laptop2,
    label: 'Commercial',
    color: '#FF2D55',
    bg: '/images/assets/it_supply.png',
    desc: 'IT equipment and technical outsourcing for growing businesses.',
    stat: 'Enterprise grade',
  },
  {
    icon: Wifi,
    label: 'Telecoms',
    color: '#FF6A00',
    bg: '/images/assets/fibre.png',
    desc: 'Optical fibre installation and 24/7 network maintenance.',
    stat: 'Pan-African',
  },
]

export function Sectors() {
  return (
    <section className="section-sm relative overflow-hidden" style={{ background: 'var(--navy-900)' }}>

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      {/* Orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,45,85,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="label-chip label-chip-dark mb-5 mx-auto" style={{ display: 'inline-flex', background: 'rgba(255,45,85,0.12)', borderColor: 'rgba(255,45,85,0.25)', color: '#FF6A7A' }}>
            Industry Sectors
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white" style={{ letterSpacing: '-0.03em' }}>
            Sectors We{' '}
            <span className="text-gradient-fire">Serve</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {sectors.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group cursor-default relative rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(255,255,255,0.07)',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <img src={s.bg} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-navy-900/80" />
                </div>

                {/* Content */}
                <div className="p-6 text-center flex flex-col items-center gap-4 relative z-10">
                  {/* Icon with animated glow */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${s.color}15`, color: s.color, boxShadow: `0 0 0 0 ${s.color}30` }}>
                      <Icon size={26} />
                    </div>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: `0 0 20px ${s.color}40`, background: `${s.color}08` }} />
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-base text-white mb-2">{s.label}</h4>
                    <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.desc}</p>
                  </div>

                  {/* Stat pill */}
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}20` }}>
                    {s.stat}
                  </span>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
