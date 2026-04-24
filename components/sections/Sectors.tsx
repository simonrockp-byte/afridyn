'use client'
import { motion } from 'framer-motion'

const sectors = [
  {
    img:   '/images/assets/industry-mining-afridyn.png',
    label: 'Mining',
    color: '#E8305A',
    desc:  'Maintenance, spares & workforce for major African mining operations.',
    stat:  '60% of our work',
  },
  {
    img:   '/images/assets/industry-manufacturing-afridyn.png',
    label: 'Manufacturing',
    color: '#D4692A',
    desc:  'Operational efficiency and spare parts for production facilities.',
    stat:  'Multi-sector',
  },
  {
    img:   '/images/assets/industry-energy-afridyn.png',
    label: 'Energy',
    color: '#F0A040',
    desc:  'Engineering solutions for power generation and distribution.',
    stat:  'Infrastructure',
  },
  {
    img:   '/images/assets/service-icon-it-afridyn.png',
    label: 'Commercial / IT',
    color: '#E8305A',
    desc:  'IT equipment and technical outsourcing for growing businesses.',
    stat:  'Enterprise grade',
  },
  {
    img:   '/images/assets/service-icon-fiber-afridyn.png',
    label: 'Telecoms',
    color: '#D4692A',
    desc:  'Optical fibre installation and 24/7 network maintenance.',
    stat:  'Pan-African',
  },
]

export function Sectors() {
  return (
    <section
      id="sectors"
      className="section relative overflow-hidden"
      style={{ background: '#0E0E1A' }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center mb-5" style={{ color: '#E8305A' }}>
            Industries We Serve
          </div>
          <h2
            className="font-display font-black text-white"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)', letterSpacing: '-0.04em' }}
          >
            Driving Growth in<br />
            <span className="text-gradient-fire">Critical Sectors</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {sectors.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              className="group cursor-default relative rounded-3xl overflow-hidden p-7 flex flex-col items-center text-center gap-5 transition-all duration-300"
              style={{
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.025)',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${s.color}0A, transparent 70%)` }}
              />

              {/* Icon */}
              <div className="relative w-20 h-20 transition-transform duration-400 group-hover:scale-110">
                <img
                  src={s.img}
                  alt={s.label}
                  className="w-full h-full object-contain"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.08))' }}
                />
              </div>

              <div className="relative z-10 space-y-2">
                <h4 className="font-display font-bold text-[17px] text-white tracking-tight">{s.label}</h4>
                <p className="text-[12px] leading-relaxed text-white/45 group-hover:text-white/65 transition-colors">{s.desc}</p>
              </div>

              {/* Stat pill */}
              <span
                className="relative z-10 text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  color: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}
              >
                {s.stat}
              </span>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
