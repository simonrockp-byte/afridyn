'use client'
import { Phone, Mail, MapPin } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

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

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const rotateX = useTransform(springY, [-300, 300], [2, -2])
  const rotateY = useTransform(springX, [-300, 300], [-2, 2])
  const orbX  = useTransform(springX, [-500, 500], [-10, 10])
  const orbY  = useTransform(springY, [-500, 500], [-10, 10])
  const orbX2 = useTransform(orbX, (v) => -v)
  const orbY2 = useTransform(orbY, (v) => -v)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - (rect.left + rect.width / 2))
    mouseY.set(e.clientY - (rect.top  + rect.height / 2))
  }

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <footer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pt-20 pb-10 md:pt-24 md:pb-12"
      style={{ background: '#F8FAFC', perspective: '1000px' }}
    >
      {/* Parallax background layers */}
      <motion.div
        style={{ rotateX, rotateY, z: -100 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]"
          style={{ x: orbX, y: orbY, background: 'radial-gradient(circle, #1A3A6B 0%, transparent 70%)' }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-15 blur-[120px]"
          style={{ x: orbX2, y: orbY2, background: 'radial-gradient(circle, #E8621A 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* Top animated border */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, #1A3A6B 30%, #E8621A 70%, transparent)' }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16 md:mb-20 text-center md:text-left"
        >
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <motion.div whileHover={{ scale: 1.02 }} className="mb-7">
              <Image
                src="/images/logo.png"
                alt="Afridyn Engineering | Technology"
                width={180}
                height={54}
                className="object-contain"
              />
            </motion.div>

            <p className="text-sm leading-relaxed text-[#5B6B7C] max-w-xs mb-7 mx-auto md:mx-0">
              World-class engineering solutions, technical procurement, and
              infrastructure services across Sub-Saharan Africa.
            </p>

            <div className="flex items-center gap-2 justify-center md:justify-start">
              {['PACRA', 'ZPPA', 'TPIN'].map(tag => (
                <motion.span
                  key={tag}
                  whileHover={{ y: -2 }}
                  className="px-3 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider"
                  style={{
                    border:     '1px solid rgba(26,58,107,0.12)',
                    background: 'rgba(26,58,107,0.04)',
                    color:      '#1A3A6B',
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Expertise */}
          <div className="space-y-5">
            <h4 className="text-[#0F1F3D] font-display font-bold text-[13px] tracking-[0.25em] uppercase flex items-center justify-center md:justify-start gap-3">
              <span className="w-8 h-px bg-[#E8621A] hidden md:block" />
              Expertise
            </h4>
            <ul className="space-y-3">
              {services.map((s, idx) => (
                <li key={s}>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => goto('services')}
                    className="text-[14px] text-[#5B6B7C] hover:text-[#1A3A6B] transition-all group flex items-center justify-center md:justify-start gap-3 hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8621A] scale-0 group-hover:scale-100 transition-transform shrink-0" />
                    {s}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h4 className="text-[#0F1F3D] font-display font-bold text-[13px] tracking-[0.25em] uppercase flex items-center justify-center md:justify-start gap-3">
              <span className="w-8 h-px bg-[#E8621A] hidden md:block" />
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map(([id, label], idx) => (
                <li key={id}>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => goto(id)}
                    className="text-[14px] text-[#5B6B7C] hover:text-[#1A3A6B] transition-all group flex items-center justify-center md:justify-start gap-3 hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A3A6B] scale-0 group-hover:scale-100 transition-transform shrink-0" />
                    {label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-[#0F1F3D] font-display font-bold text-[13px] tracking-[0.25em] uppercase flex items-center justify-center md:justify-start gap-3">
              <span className="w-8 h-px bg-[#E8621A] hidden md:block" />
              Contact
            </h4>
            <div className="space-y-5">
              {[
                { Icon: MapPin, text: '31 Salama Park, Lusaka, Zambia',    color: '#1A3A6B' },
                { Icon: Phone,  text: '+260 956 797 916',                   color: '#E8621A' },
                { Icon: Mail,   text: 'info@afridynengineering.com',        color: '#1A3A6B' },
              ].map(({ Icon, text, color }, idx) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col md:flex-row items-center md:items-start gap-3 group"
                >
                  <div
                    className="p-2.5 rounded-xl border transition-colors shrink-0"
                    style={{
                      background:   `${color}08`,
                      borderColor:  `${color}18`,
                      color,
                    }}
                  >
                    <Icon size={16} strokeWidth={1.8} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[14px] leading-relaxed text-[#5B6B7C] group-hover:text-[#0F1F3D] transition-colors text-center md:text-left">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-8 md:pt-10 border-t border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
          <p className="text-[12px] font-medium tracking-wide text-[#7A90AB] text-center lg:text-left">
            © {new Date().getFullYear()}{' '}
            <span className="text-[#0F1F3D] font-semibold">Afridyn Engineering Limited</span>. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 text-[11px] font-mono tracking-[0.3em] uppercase">
            <div className="flex items-center gap-2">
              <span className="text-[#7A90AB]">PACRA</span>
              <span className="text-[#1A3A6B] font-bold">120261040695</span>
            </div>
            <div className="w-px h-4 bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-[#7A90AB]">ZPPA</span>
              <span className="text-[#1A3A6B] font-bold">137269</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">Network Live</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
