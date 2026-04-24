'use client'
import { Phone, Mail, MapPin } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

const services = [
  'Mechanical & Electrical Spares',
  'Maintenance Services',
  'Engineering Consultation',
  'IT Equipment Supply',
  'Optical Fibre Installation',
]

const companyLinks: [string, string][] = [
  ['home',    'Home'],
  ['about',   'About Us'],
  ['why-us',  'Why Afridyn'],
  ['sectors', 'Sectors'],
  ['contact', 'Contact'],
]

const goto = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for the mouse values
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  // Tilt transforms
  const rotateX = useTransform(springY, [-300, 300], [2, -2])
  const rotateY = useTransform(springX, [-300, 300], [-2, 2])
  
  // Floating orb positions
  const orbX = useTransform(springX, [-500, 500], [-10, 10])
  const orbY = useTransform(springY, [-500, 500], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <footer 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pt-24 pb-12" 
      style={{ background: '#F8FAFC', perspective: '1000px' }}
    >
      {/* 3D Background Layers */}
      <motion.div 
        style={{ rotateX, rotateY, z: -100 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Soft Glow Orbs */}
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-30 blur-[120px]"
          style={{ x: orbX, y: orbY, background: 'radial-gradient(circle, #E2E8F0 0%, transparent 70%)' }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-30 blur-[120px]"
          style={{ x: useTransform(orbX, (v) => -v), y: useTransform(orbY, (v) => -v), background: 'radial-gradient(circle, #F1F5F9 0%, transparent 70%)' }}
        />

        {/* Blueprint Pattern (Lighter for Light Mode) */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage: 'url(/images/assets/footer-blueprint-afridyn.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </motion.div>

      {/* Top Animated Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full"
          style={{ 
            background: 'linear-gradient(90deg, transparent, rgba(15, 23, 42, 0.05), rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.05), transparent)',
            width: '200%'
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-center md:text-left"
        >
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="p-2 rounded-xl bg-slate-900/[0.03] border border-slate-900/10 relative group">
                <div className="absolute inset-0 bg-slate-900 opacity-0 group-hover:opacity-5 blur-xl transition-opacity" />
                <img
                  src="/images/logo.png"
                  alt="Afridyn Logo"
                  className="w-10 h-10 object-contain filter brightness-0"
                />
              </div>
              <div>
                <p className="font-display font-black text-slate-900 text-xl tracking-[.15em]">AFRIDYN</p>
                <p className="text-[10px] tracking-[.4em] font-mono text-slate-400 uppercase mt-0.5">Engineering Limited</p>
              </div>
            </motion.div>
            
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs mb-8 mx-auto md:mx-0">
              World-class engineering solutions, technical procurement, and
              infrastructure services across Sub-Saharan Africa.
            </p>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              {['PACRA', 'ZPPA', 'TPIN'].map(tag => (
                <motion.span
                  key={tag}
                  whileHover={{ y: -2, backgroundColor: 'rgba(15,23,42,0.05)' }}
                  className="px-4 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider"
                  style={{
                    border: '1px solid rgba(15,23,42,0.08)',
                    background: 'rgba(15,23,42,0.02)',
                    color: 'rgba(15,23,42,0.4)',
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Expertise */}
          <div className="space-y-6">
            <h4 className="text-slate-900 font-display font-bold text-[13px] tracking-[0.25em] uppercase flex items-center justify-center md:justify-start gap-3">
              <span className="w-8 h-px bg-slate-200 hidden md:block" />
              Expertise
            </h4>
            <ul className="space-y-4">
              {services.map((s, idx) => (
                <li key={s}>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => goto('services')}
                    className="text-[14px] text-slate-500 hover:text-slate-900 transition-all group flex items-center justify-center md:justify-start gap-3 hover:translate-x-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 scale-0 group-hover:scale-100 transition-transform" />
                    {s}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-slate-900 font-display font-bold text-[13px] tracking-[0.25em] uppercase flex items-center justify-center md:justify-start gap-3">
              <span className="w-8 h-px bg-slate-200 hidden md:block" />
              Company
            </h4>
            <ul className="space-y-4">
              {companyLinks.map(([id, label], idx) => (
                <li key={id}>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => goto(id)}
                    className="text-[14px] text-slate-500 hover:text-slate-900 transition-all group flex items-center justify-center md:justify-start gap-3 hover:translate-x-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 scale-0 group-hover:scale-100 transition-transform" />
                    {label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-slate-900 font-display font-bold text-[13px] tracking-[0.25em] uppercase flex items-center justify-center md:justify-start gap-3">
              <span className="w-8 h-px bg-slate-200 hidden md:block" />
              Contact
            </h4>
            <div className="space-y-6">
              {[
                { Icon: MapPin, text: '31 Salama Park, Lusaka, Zambia', color: '#475569' },
                { Icon: Phone,  text: '+260 956 797 916', color: '#64748B' },
                { Icon: Mail,   text: 'info@afridynengineering.com', color: '#334155' },
              ].map(({ Icon, text, color }, idx) => (
                <motion.div 
                  key={text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col md:flex-row items-center md:items-start gap-4 group cursor-pointer"
                >
                  <div 
                    className="p-3 rounded-xl bg-slate-900/[0.03] border border-slate-900/10 transition-colors group-hover:border-slate-900/20"
                    style={{ color: 'rgba(15,23,42,0.4)' }}
                  >
                    <Icon size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" style={{ color }} />
                  </div>
                  <span
                    className="text-[14px] leading-relaxed transition-colors group-hover:text-slate-900 text-center md:text-left text-slate-500"
                  >
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-8">
          <p className="text-[12px] font-medium tracking-wide text-slate-400 text-center lg:text-left">
            © {new Date().getFullYear()} <span className="text-slate-900">Afridyn Engineering Limited</span>. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-[11px] font-mono tracking-[0.3em] uppercase">
            <div className="flex items-center gap-3">
              <span className="text-slate-400">PACRA</span>
              <span className="text-slate-700">120261040695</span>
            </div>
            <div className="w-px h-4 bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-3">
              <span className="text-slate-400">ZPPA</span>
              <span className="text-slate-700">137269</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Network Live</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
