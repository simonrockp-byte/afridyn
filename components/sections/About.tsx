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
        <div className="grid lg:grid-cols-2 gap-20 xl:gap-28 items-center">

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
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pillars.map(p => {
                const Icon = p.icon
                return (
                  <div
                    key={p.title}
                    className="rounded-2xl p-6 group transition-all duration-300 bg-white border border-slate-200 shadow-sm hover:shadow-md"
                  >
                    <div
                      className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${p.color}08`, color: p.color, border: `1px solid ${p.color}15` }}
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <h4 className="font-display font-bold text-sm text-slate-900 mb-1.5">{p.title}</h4>
                    <p className="text-[12px] leading-relaxed text-slate-500 group-hover:text-slate-700 transition-colors">{p.desc}</p>
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
            className="space-y-5"
          >
            {/* Main image */}
            <div
              className="relative rounded-3xl overflow-hidden aspect-[4/3] group shadow-xl"
              style={{ border: '1px solid rgba(15,23,42,0.1)' }}
            >
              <img
                src="/images/services/maintenance.png"
                alt="Afridyn Technical Capability"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span
                  className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase px-4 py-2 rounded-full"
                  style={{
                    background: 'rgba(15, 23, 42, 0.85)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  Pan-African Capability
                </span>
              </div>
            </div>

            {/* Mission / Vision */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Our Mission', color: '#334155', text: 'Reliable engineering support that enhances operational efficiency and supports African industrial development.' },
                { label: 'Our Vision',  color: '#475569', text: 'To be the most trusted technical solutions provider for Africa\'s most demanding sectors.' },
              ].map(card => (
                <div
                  key={card.label}
                  className="p-6 rounded-2xl bg-white border border-slate-200"
                >
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] block mb-3 text-slate-400"
                  >
                    {card.label}
                  </span>
                  <p className="text-[13px] leading-relaxed text-slate-500">{card.text}</p>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <div
              className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
            >
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-slate-400 mb-5">
                Regulatory Compliance
              </p>
              <div className="space-y-3">
                {credentials.map(c => (
                  <div
                    key={c.label}
                    className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0"
                  >
                    <div>
                      <p className="font-display font-bold text-[13px] text-slate-900">{c.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{c.desc}</p>
                    </div>
                    <span
                      className="font-mono text-[11px] font-semibold px-3 py-1.5 rounded-full bg-slate-50 text-slate-600"
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
