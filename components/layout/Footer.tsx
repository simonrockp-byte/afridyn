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
  const rotateX = useTransform(springY, [-300, 300], [5, -5])
  const rotateY = useTransform(springX, [-300, 300], [-5, 5])
  
  // Floating orb positions
  const orbX = useTransform(springX, [-500, 500], [-20, 20])
  const orbY = useTransform(springY, [-500, 500], [-20, 20])

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
      style={{ background: '#030308', perspective: '1000px' }}
    >
      {/* 3D Background Layers */}
      <motion.div 
        style={{ rotateX, rotateY, z: -100 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Loud Glow Orbs */}
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]"
          style={{ x: orbX, y: orbY, background: 'radial-gradient(circle, #334155 0%, transparent 70%)' }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]"
          style={{ x: useTransform(orbX, (v) => -v), y: useTransform(orbY, (v) => -v), background: 'radial-gradient(circle, #0F172A 0%, transparent 70%)' }}
        />
        <motion.div 
          className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #1E293B 0%, transparent 70%)' }}
        />

        {/* Blueprint Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'url(/images/assets/footer-blueprint-afridyn.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </motion.div>

      {/* Top Animated "Loud" Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full"
          style={{ 
            background: 'linear-gradient(90deg, transparent, #334155, #64748B, #0F172A, transparent)',
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
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-600 via-slate-500 to-slate-800 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                <img
                  src="/images/logo.png"
                  alt="Afridyn Logo"
                  className="w-10 h-10 object-contain filter brightness-0 invert"
                />
              </div>
              <div>
                <p className="font-display font-black text-white text-xl tracking-[.15em]">AFRIDYN</p>
                <p className="text-[10px] tracking-[.4em] font-mono text-white/40 uppercase mt-0.5">Engineering Limited</p>
              </div>
            </motion.div>
            
            <p className="text-sm leading-relaxed text-white/50 max-w-xs mb-8 mx-auto md:mx-0">
              World-class engineering solutions, technical procurement, and
              infrastructure services across Sub-Saharan Africa.
            </p>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              {['PACRA', 'ZPPA', 'TPIN'].map(tag => (
                <motion.span
                  key={tag}
                  whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.2)' }}
                  className="px-4 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Expertise */}
          <div className="space-y-6">
            <h4 className="text-white font-display font-bold text-[13px] tracking-[0.25em] uppercase flex items-center justify-center md:justify-start gap-3">
              <span className="w-8 h-px bg-slate-600/50 hidden md:block" />
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
                    className="text-[14px] text-white/40 hover:text-white transition-all group flex items-center justify-center md:justify-start gap-3 hover:translate-x-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 scale-0 group-hover:scale-100 transition-transform" />
                    {s}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-white font-display font-bold text-[13px] tracking-[0.25em] uppercase flex items-center justify-center md:justify-start gap-3">
              <span className="w-8 h-px bg-slate-500/50 hidden md:block" />
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
                    className="text-[14px] text-white/40 hover:text-white transition-all group flex items-center justify-center md:justify-start gap-3 hover:translate-x-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 scale-0 group-hover:scale-100 transition-transform" />
                    {label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-display font-bold text-[13px] tracking-[0.25em] uppercase flex items-center justify-center md:justify-start gap-3">
              <span className="w-8 h-px bg-slate-700/50 hidden md:block" />
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
                    className="p-3 rounded-xl bg-white/5 border border-white/10 transition-colors group-hover:border-white/20"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    <Icon size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" style={{ color }} />
                  </div>
                  <span
                    className="text-[14px] leading-relaxed transition-colors group-hover:text-white text-center md:text-left"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
          <p className="text-[12px] font-medium tracking-wide text-white/30 text-center lg:text-left">
            © {new Date().getFullYear()} <span className="text-white">Afridyn Engineering Limited</span>. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-[11px] font-mono tracking-[0.3em] uppercase">
            <div className="flex items-center gap-3">
              <span className="text-white/20">PACRA</span>
              <span className="text-white/60">120261040695</span>
            </div>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-3">
              <span className="text-white/20">ZPPA</span>
              <span className="text-white/60">137269</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
             {/* Social or status indicators could go here */}
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
