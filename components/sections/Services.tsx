'use client'
import {
  Settings, Wrench, Lightbulb, Monitor,
  Radio, Users, Truck, Anchor, ArrowRight,
} from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('@/components/Scene3D').then(m => ({ default: m.Scene3D })), { ssr: false })

const services = [
  {
    id: 1, icon: Settings,
    title: 'Mechanical & Electrical Spares',
    short: 'OEM-quality components for industrial machinery and electrical systems.',
    desc:  'We source and supply high-quality mechanical and electrical spare parts including bearings, motors, cables, switchgear, and instrumentation.',
    features: ['OEM & aftermarket parts', 'Rapid procurement', 'Quality certified', 'Technical guidance'],
    accent: '#334155', sector: 'Industrial',
    image: '/images/services/spares.png',
  },
  {
    id: 2, icon: Wrench,
    title: 'Maintenance Services',
    short: 'Preventive and corrective maintenance to maximise plant uptime.',
    desc:  'Our certified technicians deliver preventive, predictive, and corrective maintenance programs for mechanical and electrical systems.',
    features: ['Preventive programs', 'Emergency response', 'CMMS integration', 'SLA-backed service'],
    accent: '#475569', sector: 'Mining / Industrial',
    image: '/images/services/maintenance.png',
  },
  {
    id: 3, icon: Lightbulb,
    title: 'Engineering Consultation',
    short: 'Strategic technical advisory and project management services.',
    desc:  'Expert engineering consultants providing feasibility studies, technical specifications, and execution oversight.',
    features: ['Feasibility studies', 'Project management', 'Risk assessment', 'Design & specification'],
    accent: '#334155', sector: 'Multi-sector',
    image: '/images/services/consultation.png',
  },
  {
    id: 4, icon: Monitor,
    title: 'IT Equipment Supply',
    short: 'Enterprise-grade hardware, servers, and infrastructure solutions.',
    desc:  'Procurement and supply of enterprise IT equipment including servers, workstations, and networking devices.',
    features: ['Enterprise hardware', 'Network infrastructure', 'Configuration & setup', 'Warranty & support'],
    accent: '#475569', sector: 'Commercial / Industrial',
    image: '/images/services/it_supply.png',
  },
  {
    id: 5, icon: Radio,
    title: 'Optical Fibre Services',
    short: 'Design, installation, splicing, and maintenance of fibre networks.',
    desc:  'Full-service capabilities including network design, cable laying, fusion splicing, and maintenance.',
    features: ['Network design', 'Fusion splicing', 'OTDR testing', '24/7 maintenance'],
    accent: '#334155', sector: 'Telecoms / Infrastructure',
    image: '/images/services/fibre.png',
  },
  {
    id: 6, icon: Users,
    title: 'Technical Outsourcing',
    short: 'Qualified engineering personnel on flexible contract terms.',
    desc:  'Access specialised engineering skills on demand — vetted, experienced technical personnel across all disciplines.',
    features: ['Vetted professionals', 'All disciplines', 'Flexible contracts', 'Skills transfer'],
    accent: '#475569', sector: 'All Sectors',
    image: '/images/services/technical_outsourcing.png',
  },
  {
    id: 7, icon: Truck,
    title: 'Logistics Consultancy',
    short: 'End-to-end supply chain analysis and optimisation.',
    desc:  'We analyse, design, and optimise supply chains and transportation networks for maximum efficiency.',
    features: ['Route optimisation', 'Cost reduction', 'Vendor management', 'KPI dashboards'],
    accent: '#334155', sector: 'Mining / Commercial',
    image: '/images/services/logistics.png',
  },
  {
    id: 8, icon: Anchor,
    title: 'Clearing & Forwarding',
    short: 'Seamless customs clearance and international freight management.',
    desc:  'Complete customs brokerage and freight forwarding ensuring goods cross borders efficiently.',
    features: ['Customs clearance', 'Full documentation', 'Freight forwarding', 'Track & trace'],
    accent: '#475569', sector: 'Import / Export',
    image: '/images/services/clearing_forwarding.png',
  },
]

function ServiceCard({
  s,
  i,
  active,
  setActive,
}: {
  s: (typeof services)[0]
  i: number
  active: number | null
  setActive: (id: number | null) => void
}) {
  const Icon = s.icon
  const isActive = active === s.id
  const accentColor = s.accent === '#334155' ? '#E8621A' : '#1A3A6B'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      data-aos="fade-up"
      data-aos-delay={i * 100}
      className="h-full"
    >
      <div
        onClick={() => setActive(isActive ? null : s.id)}
        className="relative h-full rounded-[2rem] cursor-pointer group transition-all duration-500 overflow-hidden flex flex-col"
        style={{
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: isActive
            ? `0 32px 64px -12px rgba(26, 58, 107, 0.18)`
            : '0 8px 32px rgba(26, 58, 107, 0.06)',
          transform: isActive ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden shrink-0">
          <Image
            src={s.image}
            alt={s.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />

          {/* Icon badge */}
          <div
            className="absolute bottom-6 left-6 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-2xl border transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-3 shadow-lg"
            style={{
              background: `rgba(255, 255, 255, 0.9)`,
              borderColor: `${accentColor}30`,
              color: accentColor,
            }}
          >
            <Icon size={24} strokeWidth={2} />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-8">
          {/* Sector tag */}
          <span
            className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full self-start mb-6 transition-all duration-300 group-hover:bg-opacity-20"
            style={{
              background: `${accentColor}10`,
              color: accentColor,
              border: `1px solid ${accentColor}20`,
            }}
          >
            {s.sector}
          </span>

          <h3 className="font-display font-black text-[20px] leading-tight mb-4 text-slate-900 tracking-tight">
            {s.title}
          </h3>
          <p className="text-[14px] leading-relaxed text-slate-500 group-hover:text-slate-900 transition-colors duration-300 mb-6 flex-1 font-medium">
            {s.short}
          </p>

          {/* Expandable detail */}
          <motion.div
            initial={false}
            animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-6 mt-2" style={{ borderTop: `1px solid ${accentColor}15` }}>
              <p className="text-[14px] leading-relaxed text-slate-600 font-medium">{s.desc}</p>
              <ul className="space-y-3">
                {s.features.map(f => (
                  <li key={f} className="flex items-center gap-4 text-[13px] text-slate-700 font-bold">
                    <span
                      className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                      style={{ background: accentColor }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={e => {
                  e.stopPropagation()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn btn-lg w-full justify-center text-white mt-4 font-bold"
                style={{
                  background: accentColor === '#E8621A'
                    ? 'linear-gradient(135deg, #E8621A, #F07A38)'
                    : 'linear-gradient(135deg, #1A3A6B, #2B5BA8)',
                  boxShadow: `0 12px 24px ${accentColor}30`,
                  borderRadius: '16px'
                }}
              >
                Request Consultation
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>

          {/* Expand hint */}
          {!isActive && (
            <div
              className="flex items-center gap-3 text-[11px] font-mono font-bold uppercase tracking-[0.25em] mt-4 group-hover:gap-4 transition-all duration-300"
              style={{ color: accentColor }}
            >
              <span>Learn more</span>
              <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Services() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      id="services"
      className="section relative overflow-hidden"
      style={{ background: '#F8FAFC' }}
    >
      {/* ── Three.js Scene ── */}
      <Scene3D />

      {/* Ambient orbs */}
      <div
        className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(15, 23, 42, 0.03) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(15, 23, 42, 0.03) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-24 flex flex-col items-center"
        >
          <div className="label-chip mb-5">Advanced Technical Solutions</div>
          <h2
            className="font-display font-black text-slate-900 text-center mb-6 w-full"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', letterSpacing: '-0.04em' }}
          >
            Technical<br />
            <span className="text-gradient-dual">Capability</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed text-center">
            Robust engineering, maintenance, and IT infrastructure solutions
            across Sub-Saharan Africa's critical sectors.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <ServiceCard
              key={s.id}
              s={s}
              i={i}
              active={active}
              setActive={setActive}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
