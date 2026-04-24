'use client'
import { motion } from 'framer-motion'

const badges = [
  { img: '/images/assets/trust-badge-iso.png',              label: 'ISO Certified',      color: '#334155' },
  { img: '/images/assets/trust-badge-support-afridyn.png',  label: '24/7 Support',       color: '#475569' },
  { img: '/images/assets/trust-badge-excellence-afridyn.png', label: 'Project Excellence', color: '#1E293B' },
]

const serviceIcons = [
  { img: '/images/assets/service-icon-mechanical-afridyn.png', label: 'Mechanical',   color: '#334155' },
  { img: '/images/assets/service-icon-electrical-afridyn.png', label: 'Electrical',   color: '#475569' },
  { img: '/images/assets/service-icon-it-afridyn.png',         label: 'IT Solutions', color: '#1E293B' },
  { img: '/images/assets/service-icon-fiber-afridyn.png',      label: 'Fiber Optics', color: '#334155' },
]

export function TrustBar() {
  return (
    <section
      id="trust"
      className="relative overflow-hidden"
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
      }}
    >
      {/* Thin top accent rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(15, 23, 42, 0.05) 30%, rgba(15, 23, 42, 0.05) 70%, transparent)' }}
      />

      <div className="container py-16">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-0 md:justify-between">

          {/* ── Trust Badges ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center md:items-start gap-4"
          >
            <p
              className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase mb-1 text-slate-400"
            >
              Certifications &amp; Standards
            </p>
            <div className="flex items-center gap-8">
              {badges.map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45, ease: 'easeOut' }}
                  className="flex flex-col items-center gap-2.5 group cursor-default"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center p-2 transition-all duration-400 group-hover:scale-110 bg-slate-50 border border-slate-200"
                    style={{
                      boxShadow: `0 4px 12px rgba(15, 23, 42, 0.05)`,
                    }}
                  >
                    <img src={b.img} alt={b.label} className="w-full h-full object-contain" />
                  </div>
                  <span
                    className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-slate-400 transition-colors group-hover:text-slate-900"
                  >
                    {b.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Vertical divider (desktop) ── */}
          <div
            className="hidden md:block w-px self-stretch mx-8"
            style={{ background: 'rgba(15, 23, 42, 0.08)' }}
          />

          {/* ── Core Service Icons ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center md:items-end gap-4"
          >
            <p
              className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase mb-1 text-slate-400"
            >
              Core Engineering Disciplines
            </p>
            <div className="flex items-center gap-6">
              {serviceIcons.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.45, ease: 'easeOut' }}
                  className="flex flex-col items-center gap-2.5 group cursor-default"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center p-3 transition-all duration-400 group-hover:scale-110 group-hover:-translate-y-1 bg-slate-50 border border-slate-200"
                    onMouseEnter={e => {
                      const el = e.currentTarget
                      el.style.background = `${s.color}08`
                      el.style.borderColor = `${s.color}15`
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget
                      el.style.background = '#F8FAFC'
                      el.style.borderColor = 'rgba(15, 23, 42, 0.1)'
                    }}
                  >
                    <img src={s.img} alt={s.label} className="w-full h-full object-contain" />
                  </div>
                  <span
                    className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-slate-400 transition-colors group-hover:text-slate-900"
                  >
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent rule */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(15, 23, 42, 0.05) 50%, transparent)' }}
      />
    </section>
  )
}
