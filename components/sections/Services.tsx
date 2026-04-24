'use client'
import { Settings, Wrench, Lightbulb, Monitor, Radio, Users, Truck, Anchor, ArrowRight } from 'lucide-react'
import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const services = [
  {
    id: 1,
    icon: Settings,
    title: 'Mechanical & Electrical Spares',
    short: 'OEM-quality components for industrial machinery and electrical systems.',
    desc: 'We source and supply high-quality mechanical and electrical spare parts and components including bearings, motors, cables, switchgear, and instrumentation.',
    features: ['OEM & aftermarket parts', 'Rapid procurement', 'Quality certified', 'Technical guidance'],
    accent: '#FF2D55',
    sector: 'Industrial',
    image: '/images/assets/spares.png',
  },
  {
    id: 2,
    icon: Wrench,
    title: 'Maintenance Services',
    short: 'Preventive and corrective maintenance to maximise plant uptime.',
    desc: 'Our certified technicians deliver preventive, predictive, and corrective maintenance programs for mechanical and electrical systems.',
    features: ['Preventive programs', 'Emergency response', 'CMMS integration', 'SLA-backed service'],
    accent: '#FF6A00',
    sector: 'Mining/Industrial',
    image: '/images/assets/maintenance.png',
  },
  {
    id: 3,
    icon: Lightbulb,
    title: 'Engineering Consultation',
    short: 'Strategic technical advisory and project management services.',
    desc: 'Expert engineering consultants providing feasibility studies, technical specifications, and execution oversight.',
    features: ['Feasibility studies', 'Project management', 'Risk assessment', 'Design & specification'],
    accent: '#CC00FF',
    sector: 'Multi-sector',
    image: '/images/assets/consultation.png',
  },
  {
    id: 4,
    icon: Monitor,
    title: 'IT Equipment Supply',
    short: 'Enterprise-grade hardware, servers, and infrastructure solutions.',
    desc: 'Procurement and supply of enterprise IT equipment including servers, workstations, and networking devices.',
    features: ['Enterprise hardware', 'Network infrastructure', 'Configuration & setup', 'Warranty & support'],
    accent: '#0D7A6F',
    sector: 'Commercial/Industrial',
    image: '/images/assets/it_supply.png',
  },
  {
    id: 5,
    icon: Radio,
    title: 'Optical Fibre Services',
    short: 'Design, installation, splicing, and maintenance of fibre networks.',
    desc: 'Full-service capabilities including network design, cable laying, fusion splicing, and maintenance.',
    features: ['Network design', 'Fusion splicing', 'OTDR testing', '24/7 maintenance'],
    accent: '#FF2D55',
    sector: 'Telecoms/Infrastructure',
    image: '/images/assets/fibre.png',
  },
  {
    id: 6,
    icon: Users,
    title: 'Technical Outsourcing',
    short: 'Qualified engineering personnel on flexible contract terms.',
    desc: 'Access specialised engineering skills on demand. We provide vetted experienced technical personnel.',
    features: ['Vetted professionals', 'All disciplines', 'Flexible contracts', 'Skills transfer'],
    accent: '#FF6A00',
    sector: 'All sectors',
    image: '/images/assets/technical_outsourcing.png',
  },
  {
    id: 7,
    icon: Truck,
    title: 'Logistics Consultancy',
    short: 'End-to-end supply chain analysis and optimisation.',
    desc: 'We analyse, design, and optimise supply chains and transportation networks.',
    features: ['Route optimisation', 'Cost reduction', 'Vendor management', 'KPI dashboards'],
    accent: '#CC00FF',
    sector: 'Mining/Commercial',
    image: '/images/assets/logistics.png',
  },
  {
    id: 8,
    icon: Anchor,
    title: 'Clearing & Forwarding',
    short: 'Seamless customs clearance and international freight management.',
    desc: 'Complete customs brokerage and freight forwarding ensuring goods cross borders efficiently.',
    features: ['Customs clearance', 'Full documentation', 'Freight forwarding', 'Track & trace'],
    accent: '#0D7A6F',
    sector: 'Import/Export',
    image: '/images/assets/forwarding.png',
  },
]

function ServiceCard({ s, i, active, setActive }: any) {
  const Icon = s.icon
  const isActive = active === s.id
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: any) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className="h-full"
    >
      <div
        onClick={() => setActive(isActive ? null : s.id)}
        className="relative h-full rounded-[32px] cursor-pointer group transition-all duration-500 overflow-hidden"
        style={{
          border: isActive ? `1.5px solid ${s.accent}40` : '1px solid rgba(0,0,0,0.06)',
          background: '#FFFFFF',
          boxShadow: isActive 
            ? `0 40px 80px ${s.accent}15` 
            : '0 4px 20px rgba(0,0,0,0.02)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Image Header */}
        <div className="relative h-56 w-full overflow-hidden bg-slate-100">
          <img 
            src={s.image} 
            alt={s.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
          
          {/* Overlay Icon */}
          <div className="absolute bottom-8 left-8" style={{ transform: 'translateZ(40px)' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-2xl border shadow-xl"
              style={{ 
                background: `${s.accent}20`, 
                borderColor: `${s.accent}30`,
                color: s.accent
              }}>
              <Icon size={28} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 pt-2 relative">
          <div className="flex items-center gap-2 mb-6">
             <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
              style={{ background: `${s.accent}08`, color: s.accent, border: `1px solid ${s.accent}15` }}>
              {s.sector}
            </span>
          </div>

          <h3 className="font-display font-bold text-2xl leading-tight mb-5" style={{ color: 'var(--navy-900)', letterSpacing: '-0.02em' }}>
            {s.title}
          </h3>
          <p className="text-[16px] leading-[1.65] mb-10" style={{ color: 'var(--text-secondary)', opacity: 0.85 }}>
            {s.short}
          </p>

          {/* Expandable Section */}
          <motion.div
            initial={false}
            animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 border-t border-black/[0.05] space-y-6">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              <div className="grid grid-cols-1 gap-3">
                {s.features.map((f: string) => (
                  <div key={f} className="flex items-center gap-3 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.accent }} />
                    {f}
                  </div>
                ))}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn btn-lg w-full justify-center text-white mt-4"
                style={{ background: s.accent, boxShadow: `0 4px 12px ${s.accent}30` }}
              >
                Request Quote
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Indicator */}
          {!isActive && (
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] mt-2 group-hover:gap-4 transition-all" style={{ color: s.accent }}>
              <span>Experience</span>
              <ArrowRight size={14} />
            </div>
          )}
        </div>

        {/* Parallax Depth Elements */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), ${s.accent}03, transparent 40%)`
          }}
        />
      </div>
    </motion.div>
  )
}

export function Services() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="services" className="section relative overflow-hidden" 
      style={{ background: '#FFFFFF' }}>
      
      {/* Dynamic BG elements */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-1/4 h-1/4 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-24"
        >
          <div className="label-chip mb-8" style={{ 
            background: 'rgba(0,0,0,0.03)', 
            borderColor: 'rgba(0,0,0,0.06)',
            color: 'var(--navy-700)',
            padding: '6px 20px'
          }}>
            Advanced Engineered Solutions
          </div>
          <h2 className="font-display font-black text-5xl md:text-7xl mb-8" style={{ color: 'var(--navy-900)', letterSpacing: '-0.05em' }}>
            Technical<br />
            <span className="text-gradient-fire">Capability</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
            Delivering robust engineering, maintenance, and IT infrastructure solutions across Sub-Saharan Africa's critical sectors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
