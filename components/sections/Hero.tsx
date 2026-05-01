'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const HeroScene3D = dynamic(
  () => import('@/components/HeroScene3D').then(m => ({ default: m.HeroScene3D })),
  { ssr: false }
)

/* ─── Floating orbs behind the 3D scene ─── */
type Orb = { size: number; top: string; color: string; dur: string; anim: string; left?: string; right?: string }
const ORBS: Orb[] = [
  { size: 700, top: '-10%', left: '-10%',  color: 'rgba(26,58,107,0.45)',  dur: '14s', anim: 'orbFloat1' },
  { size: 600, top: '30%',  right: '-12%', color: 'rgba(43,91,168,0.38)', dur: '18s', anim: 'orbFloat2' },
  { size: 500, top: '60%',  left: '20%',   color: 'rgba(15,35,71,0.35)',  dur: '12s', anim: 'orbFloat3' },
  { size: 360, top: '-5%',  right: '30%',  color: 'rgba(232,98,26,0.25)', dur: '20s', anim: 'orbFloat1' },
]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 32 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
})

/* ─── Mobile static background (no Three.js) ─── */
function StaticBackground() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(43,91,168,0.35) 0%, transparent 60%),' +
            'radial-gradient(ellipse 60% 50% at 80% 70%, rgba(232,98,26,0.18) 0%, transparent 60%)',
        }}
      />
      {/* Hex grid blueprint lines — pure CSS */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(43,91,168,0.07) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(43,91,168,0.07) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
    </>
  )
}

export function Hero() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const goto = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0A1628' }}
    >
      {/* Glowing orbs — always shown */}
      {ORBS.map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  o.size,
            height: o.size,
            top:    o.top,
            left:   o.left  ?? 'unset',
            right:  o.right ?? 'unset',
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            animation: `${o.anim} ${o.dur} ease-in-out infinite`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage:
            'linear-gradient(rgba(43,91,168,0.05) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(43,91,168,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* 3D network scene — desktop only */}
      {!isMobile && (
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          <HeroScene3D />
        </div>
      )}

      {/* Mobile fallback static BG layer */}
      {isMobile && (
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          <StaticBackground />
        </div>
      )}

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 4,
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(8,16,38,0.72) 100%)',
        }}
      />

      {/* Content */}
      <div className="container relative pt-28 pb-24 md:pt-36 md:pb-32" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
          className="max-w-5xl mx-auto flex flex-col items-center text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-10 md:mb-12"
          >
            <Image
              src="/images/final_logo.png"
              alt="Afridyn Engineering | Technology"
              width={260}
              height={78}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Eyebrow badge */}
          <motion.div
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2 mb-8 md:mb-10 px-4 py-2 md:px-5 md:py-2.5 rounded-full max-w-[90vw]"
            style={{
              background:     'rgba(232,98,26,0.12)',
              border:         '1px solid rgba(232,98,26,0.35)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span
              className="w-2 h-2 shrink-0 rounded-full"
              style={{
                background: '#E8621A',
                animation:  'pulseRing 1.5s ease-in-out infinite',
                boxShadow:  '0 0 12px rgba(232,98,26,0.8)',
              }}
            />
            <span
              className="text-[10px] md:text-[11px] font-mono font-bold tracking-[0.16em] uppercase leading-tight"
              style={{ color: '#F07A38' }}
            >
              Certified Industrial Excellence — Zambia &amp; Sub-Saharan Africa
            </span>
          </motion.div>

          {/* Main headline */}
          <div className="mb-6 md:mb-8">
            {/* Line 1: "Powering Africa's" — white */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="block font-display font-black text-white"
                style={{
                  fontSize:      'clamp(2.6rem, 10vw, 7.5rem)',
                  letterSpacing: '-0.05em',
                  lineHeight:    0.92,
                  marginBottom:  '0.05em',
                  textShadow:    '0 0 60px rgba(26,58,107,0.5)',
                }}
              >
                Powering Africa's
              </span>
            </motion.div>

            {/* Line 2: "Industrial" — white */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="block font-display font-black text-white"
                style={{
                  fontSize:      'clamp(2.6rem, 10vw, 7.5rem)',
                  letterSpacing: '-0.05em',
                  lineHeight:    0.92,
                  marginBottom:  '0.05em',
                  textShadow:    '0 0 60px rgba(26,58,107,0.5)',
                }}
              >
                Industrial
              </span>
            </motion.div>

            {/* Line 3: "Future" — blue→orange gradient */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="block font-display font-black"
                style={{
                  fontSize:      'clamp(2.6rem, 10vw, 7.5rem)',
                  letterSpacing: '-0.05em',
                  lineHeight:    0.92,
                  background:    'linear-gradient(90deg, #1A3A6B 0%, #2B5BA8 40%, #E8621A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Future.
              </span>
            </motion.div>
          </div>

          {/* Sub-copy */}
          <motion.p
            {...fadeUp(0.65)}
            className="text-base md:text-lg lg:text-xl leading-relaxed mb-10 md:mb-12 max-w-2xl px-2"
            style={{ color: 'rgba(200,215,235,0.82)' }}
          >
            Afridyn Engineering delivers mechanical, electrical, IT, and fibre optic
            solutions for mining, manufacturing, and infrastructure sectors across
            Zambia and Sub-Saharan Africa.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.80)}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <motion.button
              onClick={() => goto('services')}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn btn-cta btn-lg font-bold group w-full sm:w-auto"
              style={{ borderRadius: 14, fontSize: 16, padding: '16px 40px' }}
            >
              Explore Services
              <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={() => goto('contact')}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn btn-lg font-bold w-full sm:w-auto"
              style={{
                background:     'rgba(255,255,255,0.07)',
                border:         '1px solid rgba(255,255,255,0.18)',
                color:          '#fff',
                borderRadius:   14,
                fontSize:       16,
                padding:        '16px 40px',
                backdropFilter: 'blur(10px)',
              }}
            >
              Get a Quote
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        onClick={() => goto('trust')}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group"
        style={{ zIndex: 10 }}
      >
        <span
          className="text-[10px] font-mono tracking-[0.25em] uppercase mb-1"
          style={{ color: 'rgba(232,98,26,0.55)' }}
        >
          Scroll
        </span>
        <ChevronDown
          size={26}
          strokeWidth={1.5}
          className="animate-bounce"
          style={{ color: 'rgba(232,98,26,0.65)' }}
        />
      </motion.button>
    </section>
  )
}
