'use client'
import { Building2, Pickaxe, Laptop2, Wifi, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const sectors = [
  {
    img: '/images/assets/industry-mining-afridyn.png',
    label: 'Mining',
    color: '#FF007F',
    bg: '/images/services/maintenance.png',
    desc: 'Maintenance, spares & workforce for major African mining operations.',
    stat: '60% of our work',
  },
  {
    img: '/images/assets/industry-manufacturing-afridyn.png',
    label: 'Manufacturing',
    color: '#FF6B00',
    bg: '/images/services/spares.png',
    desc: 'Operational efficiency and spare parts for production facilities.',
    stat: 'Multi-sector',
  },
  {
    img: '/images/assets/industry-energy-afridyn.png',
    label: 'Energy',
    color: '#FFCC00',
    bg: '/images/services/spares.png',
    desc: 'Engineering solutions for power generation and distribution.',
    stat: 'Infrastructure',
  },
  {
    img: '/images/assets/service-icon-it-afridyn.png',
    label: 'Commercial/IT',
    color: '#FF007F',
    bg: '/images/services/it_supply.png',
    desc: 'IT equipment and technical outsourcing for growing businesses.',
    stat: 'Enterprise grade',
  },
  {
    img: '/images/assets/service-icon-fiber-afridyn.png',
    label: 'Telecoms',
    color: '#FF6B00',
    bg: '/images/services/fibre.png',
    desc: 'Optical fibre installation and 24/7 network maintenance.',
    stat: 'Pan-African',
  },
]

export function Sectors() {
  return (
    <section id="sectors" className="section relative overflow-hidden" style={{ background: '#0A0A0F' }}>

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="label-chip label-chip-dark mb-6 mx-auto" style={{ 
            background: 'rgba(255,0,127,0.1)', 
            borderColor: 'rgba(255,0,127,0.25)', 
            color: '#FF007F' 
          }}>
            Industries We Serve
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white" style={{ letterSpacing: '-0.03em' }}>
            Driving Growth in<br />
            <span className="text-gradient-fire">Critical Sectors</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {sectors.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group cursor-default relative rounded-[32px] overflow-hidden p-8 flex flex-col items-center text-center gap-6"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `radial-gradient(circle at center, ${s.color}08, transparent 70%)` }} />

              {/* Industry Icon Illustration */}
              <div className="relative w-24 h-24 transition-transform duration-500 group-hover:scale-110">
                <img 
                  src={s.img} 
                  alt={s.label} 
                  className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                />
              </div>

              <div className="relative z-10">
                <h4 className="font-display font-bold text-xl text-white mb-3 tracking-tight">{s.label}</h4>
                <p className="text-[13px] leading-relaxed opacity-60" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              </div>

              {/* Stat pill */}
              <span className="relative z-10 text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {s.stat}
              </span>

              {/* Accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
