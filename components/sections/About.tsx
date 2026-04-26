'use client'
import { Zap, Shield, Target, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

const pillars = [
  { icon: Zap,    title: 'Innovation', desc: 'Modern engineering methods and technologies applied to complex industrial challenges.', color: '#334155' },
  { icon: Shield, title: 'Integrity',  desc: 'Transparent operations backed by full PACRA, TPIN, and ZPPA regulatory compliance.', color: '#475569' },
  { icon: Target, title: 'Precision',  desc: 'International-standard engineering execution on every project — zero tolerance for mediocrity.', color: '#334155' },
  { icon: Globe,  title: 'Pan-African',desc: 'Local knowledge, pan-African capability. Headquartered in Lusaka, Zambia.', color: '#475569' },
]

const credentials = [
  { label: 'PACRA', value: '120261040695', desc: 'Company Registration' },
  { label: 'TPIN',  value: '2004257975',   desc: 'Tax Identification' },
  { label: 'ZPPA',  value: '137269',        desc: 'Procurement Authority' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

export function About() {
  return (
    <section id="about" className="section" style={{ background: '#F8FAFC' }}>
      <div className="container" data-aos="fade-up">
        <div className="grid lg:grid-cols-2 gap-24 xl:gap-36 items-center">

          {/* ── LEFT ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="section-label mb-5">Corporate Profile</div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              data-aos="fade-right"
              className="font-display font-black text-slate-900 mb-8"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
            >
              Africa's Trusted<br />
              <span className="text-gradient-fire">Engineering Partner</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-base leading-relaxed mb-4 text-slate-500">
              Afridyn Engineering Limited delivers integrated engineering services spanning
              mechanical, electrical, IT, optical fibre, and logistics across Sub-Saharan Africa.
            </motion.p>
            <motion.p variants={itemVariants} className="text-base leading-relaxed mb-12 text-slate-500">
              Founded in Lusaka, Zambia, we are dedicated to building a resilient infrastructure
              foundation for the continent through precision and modern methodology.
            </motion.p>

            {/* Pillars grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pillars.map((p, i) => {
                const Icon = p.icon
                const pColor = p.color === '#334155' ? '#FF4500' : '#FF0000'
                return (
                  <div
                    key={p.title}
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                    className="rounded-3xl p-7 group transition-all duration-500 relative overflow-hidden"
                    style={{
                      background: 'rgba(255, 255, 255, 0.4)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.6)',
                      boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                      style={{ background: `linear-gradient(135deg, ${pColor}, transparent)` }}
                    />
                    <div
                      className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm"
                      style={{ 
                        background: `${pColor}15`, 
                        color: pColor, 
                        border: `1px solid ${pColor}25`,
                        boxShadow: `0 4px 15px ${pColor}15`
                      }}
                    >
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <h4 className="font-display font-black text-base text-slate-900 mb-2 tracking-tight">{p.title}</h4>
                    <p className="text-[13px] leading-relaxed text-slate-500 group-hover:text-slate-900 transition-colors duration-300">{p.desc}</p>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* ── RIGHT ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Main image */}
            <div
              className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] group shadow-2xl"
              style={{ border: '1px solid rgba(15,23,42,0.1)' }}
            >
              <img
                src="/images/services/maintenance.png"
                alt="Afridyn Technical Capability"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <span
                  className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase px-5 py-2.5 rounded-full"
                  style={{
                    background: 'rgba(255, 80, 0, 0.9)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 10px 30px rgba(255, 80, 0, 0.4)'
                  }}
                >
                  Pan-African Capability
                </span>
              </div>
            </div>

            {/* Mission / Vision */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Our Mission', color: '#FF4500', text: 'Reliable engineering support that enhances operational efficiency and supports African industrial development.' },
                { label: 'Our Vision',  color: '#FF0000', text: 'To be the most trusted technical solutions provider for Africa\'s most demanding sectors.' },
              ].map(card => (
                <div
                  key={card.label}
                  className="p-7 rounded-3xl relative overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.03)',
                  }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ background: card.color }} />
                  <span
                    className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] block mb-4"
                    style={{ color: card.color }}
                  >
                    {card.label}
                  </span>
                  <p className="text-[14px] leading-relaxed text-slate-600 font-medium">{card.text}</p>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <div
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 15px 40px rgba(15, 23, 42, 0.05)',
              }}
            >
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-slate-400 mb-6">
                Regulatory Compliance
              </p>
              <div className="space-y-4">
                {credentials.map(c => (
                  <div
                    key={c.label}
                    className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0"
                  >
                    <div>
                      <p className="font-display font-black text-[15px] text-slate-900 leading-none mb-1.5">{c.label}</p>
                      <p className="text-[11px] text-slate-400 font-medium">{c.desc}</p>
                    </div>
                    <span
                      className="font-mono text-[12px] font-bold px-4 py-2 rounded-xl bg-white border border-slate-100 text-slate-900 shadow-sm"
                    >
                      {c.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
