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
    accent: '#FF007F',
    sector: 'Industrial',
    image: '/images/services/spares.png',
  },
  {
    id: 2,
    icon: Wrench,
    title: 'Maintenance Services',
    short: 'Preventive and corrective maintenance to maximise plant uptime.',
    desc: 'Our certified technicians deliver preventive, predictive, and corrective maintenance programs for mechanical and electrical systems.',
    features: ['Preventive programs', 'Emergency response', 'CMMS integration', 'SLA-backed service'],
    accent: '#FF6B00',
    sector: 'Mining/Industrial',
    image: '/images/services/maintenance.png',
  },
  {
    id: 3,
    icon: Lightbulb,
    title: 'Engineering Consultation',
    short: 'Strategic technical advisory and project management services.',
    desc: 'Expert engineering consultants providing feasibility studies, technical specifications, and execution oversight.',
    features: ['Feasibility studies', 'Project management', 'Risk assessment', 'Design & specification'],
    accent: '#FF007F',
    sector: 'Multi-sector',
    image: '/images/services/consultation.png',
  },
  {
    id: 4,
    icon: Monitor,
    title: 'IT Equipment Supply',
    short: 'Enterprise-grade hardware, servers, and infrastructure solutions.',
    desc: 'Procurement and supply of enterprise IT equipment including servers, workstations, and networking devices.',
    features: ['Enterprise hardware', 'Network infrastructure', 'Configuration & setup', 'Warranty & support'],
    accent: '#FF6B00',
    sector: 'Commercial/Industrial',
    image: '/images/services/it_supply.png',
  },
  {
    id: 5,
    icon: Radio,
    title: 'Optical Fibre Services',
    short: 'Design, installation, splicing, and maintenance of fibre networks.',
    desc: 'Full-service capabilities including network design, cable laying, fusion splicing, and maintenance.',
    features: ['Network design', 'Fusion splicing', 'OTDR testing', '24/7 maintenance'],
    accent: '#FF007F',
    sector: 'Telecoms/Infrastructure',
    image: '/images/services/fibre.png',
  },
  {
    id: 6,
    icon: Users,
    title: 'Technical Outsourcing',
    short: 'Qualified engineering personnel on flexible contract terms.',
    desc: 'Access specialised engineering skills on demand. We provide vetted experienced technical personnel.',
    features: ['Vetted professionals', 'All disciplines', 'Flexible contracts', 'Skills transfer'],
    accent: '#FF6B00',
    sector: 'All sectors',
    image: '/images/services/technical_outsourcing.png',
  },
  {
    id: 7,
    icon: Truck,
    title: 'Logistics Consultancy',
    short: 'End-to-end supply chain analysis and optimisation.',
    desc: 'We analyse, design, and optimise supply chains and transportation networks.',
    features: ['Route optimisation', 'Cost reduction', 'Vendor management', 'KPI dashboards'],
    accent: '#FF007F',
    sector: 'Mining/Commercial',
    image: '/images/services/logistics.png',
  },
  {
    id: 8,
    icon: Anchor,
    title: 'Clearing & Forwarding',
    short: 'Seamless customs clearance and international freight management.',
    desc: 'Complete customs brokerage and freight forwarding ensuring goods cross borders efficiently.',
    features: ['Customs clearance', 'Full documentation', 'Freight forwarding', 'Track & trace'],
    accent: '#FF6B00',
    sector: 'Import/Export',
    image: '/images/services/maintenance.png', // Fallback for missing forwarding.png
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
        className="relative h-full rounded-[40px] cursor-pointer group transition-all duration-500 overflow-hidden"
        style={{
          border: isActive ? `1.5px solid ${s.accent}50` : '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.02)',
          boxShadow: isActive 
            ? `0 40px 80px ${s.accent}15` 
            : '0 10px 30px rgba(0,0,0,0.2)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Image Header */}
        <div className="relative h-60 w-full overflow-hidden bg-white/5">
          <img 
            src={s.image} 
            alt={s.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-80" />
          
          {/* Overlay Icon */}
          <div className="absolute bottom-8 left-8" style={{ transform: 'translateZ(50px)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-2xl border shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
              style={{ 
                background: `${s.accent}20`, 
                borderColor: `${s.accent}40`,
                color: s.accent
              }}>
              <Icon size={32} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 pt-4 relative z-10">
          <div className="flex items-center gap-2 mb-6">
             <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full"
              style={{ background: `${s.accent}10`, color: s.accent, border: `1px solid ${s.accent}20` }}>
              {s.sector}
            </span>
          </div>

          <h3 className="font-display font-bold text-2xl leading-tight mb-5 text-white tracking-tight">
            {s.title}
          </h3>
          <p className="text-[15px] leading-relaxed mb-10 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: '#FFFFFF' }}>
            {s.short}
          </p>

          {/* Expandable Section */}
          <motion.div
            initial={false}
            animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-8 border-t border-white/10 space-y-8">
              <p className="text-sm leading-relaxed opacity-70" style={{ color: '#FFFFFF' }}>{s.desc}</p>
              <div className="grid grid-cols-1 gap-4">
                {s.features.map((f: string) => (
                  <div key={f} className="flex items-center gap-4 text-[13px] opacity-70" style={{ color: '#FFFFFF' }}>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.accent }} />
                    {f}
                  </div>
                ))}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn btn-lg w-full justify-center text-white mt-6"
                style={{ background: s.accent, boxShadow: `0 8px 24px ${s.accent}40` }}
              >
                Request Consultation
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* Indicator */}
          {!isActive && (
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] mt-2 group-hover:gap-5 transition-all" style={{ color: s.accent }}>
              <span>Discovery</span>
              <ArrowRight size={16} />
            </div>
          )}
        </div>

        {/* Hover Highlight */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), ${s.accent}05, transparent 40%)`
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
      style={{ background: '#0A0A0F' }}>
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-28"
        >
          <div className="label-chip label-chip-dark mb-8 mx-auto">
            Advanced Technical Solutions
          </div>
          <h2 className="font-display font-black text-5xl md:text-7xl mb-10 text-white tracking-tighter">
            Technical<br />
            <span className="text-gradient-fire">Capability</span>
          </h2>
          <p className="text-xl opacity-60 leading-relaxed mx-auto" style={{ color: '#FFFFFF' }}>
            Delivering robust engineering, maintenance, and IT infrastructure solutions across Sub-Saharan Africa's critical sectors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
