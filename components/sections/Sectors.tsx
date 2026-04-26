'use client'
import { motion } from 'framer-motion'

const sectors = [
  {
    img:   '/images/assets/industry-mining-afridyn.png',
    label: 'Mining',
    color: '#FF4500',
    desc:  'Maintenance, spares & workforce for major African mining operations.',
    stat:  '60% of our work',
  },
  {
    img:   '/images/assets/industry-manufacturing-afridyn.png',
    label: 'Manufacturing',
    color: '#FF0000',
    desc:  'Operational efficiency and spare parts for production facilities.',
    stat:  'Multi-sector',
  },
  {
    img:   '/images/assets/industry-energy-afridyn.png',
    label: 'Energy',
    color: '#FF6B00',
    desc:  'Engineering solutions for power generation and distribution.',
    stat:  'Infrastructure',
  },
  {
    img:   '/images/assets/service-icon-it-afridyn.png',
    label: 'Commercial / IT',
    color: '#FF2D00',
    desc:  'IT equipment and technical outsourcing for growing businesses.',
    stat:  'Enterprise grade',
  },
  {
    img:   '/images/assets/service-icon-fiber-afridyn.png',
    label: 'Telecoms',
    color: '#FF8C00',
    desc:  'Optical fibre installation and 24/7 network maintenance.',
    stat:  'Pan-African',
  },
]

export function Sectors() {
  return (
    <section
      id="sectors"
      className="section relative overflow-hidden"
      style={{ background: '#F8FAFC' }}
    >
      {/* Decorative Orbs */}
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.15] blur-[100px]" style={{ background: 'radial-gradient(circle, #FF4500 0%, transparent 70%)' }} />
      <div className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.15] blur-[100px]" style={{ background: 'radial-gradient(circle, #FF0000 0%, transparent 70%)' }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,69,0,0.1) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,69,0,0.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <div className="section-label justify-center mb-5">
            Industries We Serve
          </div>
          <h2
            className="font-display font-black text-slate-900"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.04em' }}
          >
            Driving Growth in<br />
            <span className="text-gradient-fire">Critical Sectors</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {sectors.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: 'easeOut' }}
              whileHover={{ y: -8 }}
              className="group cursor-default relative rounded-[2rem] overflow-hidden p-8 flex flex-col items-center text-center gap-6 transition-all duration-500"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 8px 32px rgba(15, 23, 42, 0.05)',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                style={{ background: `radial-gradient(circle at center, ${s.color}, transparent 80%)` }}
              />

              {/* Icon container */}
              <div 
                className="relative w-20 h-20 rounded-2xl flex items-center justify-center p-3 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{ 
                  background: `${s.color}10`,
                  border: `1px solid ${s.color}20`,
                  boxShadow: `0 10px 25px ${s.color}15`
                }}
              >
                <img
                  src={s.img}
                  alt={s.label}
                  className="w-full h-full object-contain"
                  style={{ filter: `drop-shadow(0 5px 15px ${s.color}30)` }}
                />
              </div>

              <div className="relative z-10 space-y-3">
                <h4 className="font-display font-black text-[18px] text-slate-900 tracking-tight leading-tight">{s.label}</h4>
                <p className="text-[13px] leading-relaxed text-slate-500 group-hover:text-slate-900 transition-colors duration-300 font-medium">{s.desc}</p>
              </div>

              {/* Stat pill */}
              <span
                className="relative z-10 text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full transition-all duration-300 group-hover:bg-opacity-100 group-hover:border-slate-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  color: s.color,
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                }}
              >
                {s.stat}
              </span>

              {/* Bottom accent glow */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
