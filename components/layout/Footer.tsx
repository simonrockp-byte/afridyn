'use client'
import { Phone, Mail, MapPin } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const FooterScene3D = dynamic(
  () => import('@/components/FooterScene3D').then(m => ({ default: m.FooterScene3D })),
  { ssr: false }
)

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

const goto = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 })

  const orbX  = useTransform(springX, [-500, 500], [-14, 14])
  const orbY  = useTransform(springY, [-500, 500], [-10, 10])
  const orbX2 = useTransform(orbX, v => -v * 0.7)
  const orbY2 = useTransform(orbY, v => -v * 0.7)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - (rect.left + rect.width  / 2))
    mouseY.set(e.clientY - (rect.top  + rect.height / 2))
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <footer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pt-20 pb-10 md:pt-24 md:pb-12"
      style={{ background: '#060E1E' }}
    >
      {/* ── Three.js circuit animation ── */}
      <FooterScene3D />

      {/* ── Parallax glow orbs (mouse-reactive) ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <motion.div
          className="absolute top-[-15%] left-[-8%] w-[55%] h-[55%] rounded-full blur-[130px]"
          style={{
            x: orbX,
            y: orbY,
            background: 'radial-gradient(circle, rgba(27,78,155,0.32) 0%, transparent 70%)',
          }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]"
          style={{
            x: orbX2,
            y: orbY2,
            background: 'radial-gradient(circle, rgba(106,171,46,0.22) 0%, transparent 70%)',
          }}
        />
        {/* Static center glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full blur-[160px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(27,78,155,0.10) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Blueprint grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage:
            'linear-gradient(rgba(27,78,155,0.06) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(27,78,155,0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* ── Top gradient border ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #1B4E9B 35%, #6AAB2E 65%, transparent)',
          zIndex: 2,
        }}
      />

      {/* ── Content ── */}
      <div className="container relative" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16 md:mb-20 text-center md:text-left"
        >
          {/* ── Brand ── */}
          <div data-aos="fade-up" data-aos-delay="0" className="flex flex-col items-center md:items-start">
            <motion.div whileHover={{ scale: 1.03 }} className="mb-7">
              <Image
                src="/images/final_logo.png"
                alt="Afridyn Engineering | Technology"
                width={180}
                height={54}
                className="object-contain brightness-0 invert"
              />
            </motion.div>

            <p className="text-sm leading-relaxed text-white/55 max-w-xs mb-8 mx-auto md:mx-0">
              World-class engineering solutions, technical procurement, and
              infrastructure services across Sub-Saharan Africa.
            </p>

            <div className="flex items-center gap-2 justify-center md:justify-start">
              {['PACRA', 'ZPPA', 'TPIN'].map(tag => (
                <motion.span
                  key={tag}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="px-3 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider"
                  style={{
                    border:     '1px solid rgba(106,171,46,0.25)',
                    background: 'rgba(106,171,46,0.08)',
                    color:      '#82C93A',
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ── Expertise ── */}
          <div data-aos="fade-up" data-aos-delay="100" className="space-y-5">
            <h4 className="text-white/40 font-display font-bold text-[11px] tracking-[0.28em] uppercase flex items-center justify-center md:justify-start gap-3">
              <span className="w-8 h-px bg-[#6AAB2E] hidden md:block opacity-60" />
              Expertise
            </h4>
            <ul className="space-y-3">
              {services.map((s, idx) => (
                <li key={s}>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    onClick={() => goto('services')}
                    className="text-[14px] text-white/50 hover:text-white transition-all duration-300 group flex items-center justify-center md:justify-start gap-3 hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6AAB2E] scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    {s}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company ── */}
          <div data-aos="fade-up" data-aos-delay="200" className="space-y-5">
            <h4 className="text-white/40 font-display font-bold text-[11px] tracking-[0.28em] uppercase flex items-center justify-center md:justify-start gap-3">
              <span className="w-8 h-px bg-[#1B4E9B] hidden md:block opacity-60" />
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map(([id, label], idx) => (
                <li key={id}>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    onClick={() => goto(id)}
                    className="text-[14px] text-white/50 hover:text-white transition-all duration-300 group flex items-center justify-center md:justify-start gap-3 hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2A6DD9] scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    {label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div data-aos="fade-up" data-aos-delay="300" className="space-y-5">
            <h4 className="text-white/40 font-display font-bold text-[11px] tracking-[0.28em] uppercase flex items-center justify-center md:justify-start gap-3">
              <span className="w-8 h-px bg-[#6AAB2E] hidden md:block opacity-60" />
              Contact
            </h4>
            <div className="space-y-5">
              {[
                { Icon: MapPin, text: '31 Salama Park, Lusaka, Zambia', color: '#2A6DD9' },
                { Icon: Phone,  text: '+260 956 797 916',                color: '#6AAB2E' },
                { Icon: Mail,   text: 'info@afridynengineering.com',     color: '#2A6DD9' },
              ].map(({ Icon, text, color }, idx) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col md:flex-row items-center md:items-start gap-3 group"
                >
                  <div
                    className="p-2.5 rounded-xl border shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background:  `${color}15`,
                      borderColor: `${color}30`,
                      color,
                    }}
                  >
                    <Icon size={15} strokeWidth={1.8} />
                  </div>
                  <span className="text-[13px] leading-relaxed text-white/50 group-hover:text-white/90 transition-colors duration-300 text-center md:text-left">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Bottom bar ── */}
        <div
          className="pt-8 md:pt-10 border-t flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <p className="text-[12px] font-medium tracking-wide text-white/30 text-center lg:text-left">
            © {new Date().getFullYear()}{' '}
            <span className="text-white/70 font-semibold">Afridyn Engineering Limited</span>.{' '}
            All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 text-[11px] font-mono tracking-[0.3em] uppercase">
            <div className="flex items-center gap-2">
              <span className="text-white/25">PACRA</span>
              <span className="text-[#2A6DD9] font-bold">120261040695</span>
            </div>
            <div className="w-px h-4 hidden sm:block" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div className="flex items-center gap-2">
              <span className="text-white/25">ZPPA</span>
              <span className="text-[#2A6DD9] font-bold">137269</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{
                background:   'rgba(106,171,46,0.08)',
                borderColor:  'rgba(106,171,46,0.25)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#6AAB2E] animate-pulse" />
              <span className="text-[9px] font-bold text-[#82C93A] uppercase tracking-widest">
                Network Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
