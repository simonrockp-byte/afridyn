'use client'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { Scene3D } from '@/components/Scene3D'

const PARTICLES = [
  { left: '8%',  top: '60%', size: 3, dur: 8,  del: 0,   color: '#FF6B00' },
  { left: '18%', top: '78%', size: 2, dur: 10, del: 1.2, color: '#FF007F' },
  { left: '32%', top: '68%', size: 4, dur: 7,  del: 0.5, color: '#FF6B00' },
  { left: '48%', top: '82%', size: 2, dur: 11, del: 2.0, color: '#FF007F' },
  { left: '62%', top: '64%', size: 3, dur: 9,  del: 1.7, color: '#FF8533' },
  { left: '75%', top: '74%', size: 4, dur: 8,  del: 0.3, color: '#FF6B00' },
  { left: '88%', top: '58%', size: 2, dur: 12, del: 2.4, color: '#FF007F' },
  { left: '52%', top: '55%', size: 3, dur: 9,  del: 0.8, color: '#FF8533' },
]

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
})

export function Hero() {
  const goto = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#F8FAFC' }}
    >
      {/* ── Three.js Scene ── */}
      <Scene3D />

      {/* ── Full-bleed vivid background ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/assets/hero-banner-afridyn.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          opacity: 0.12,
          mixBlendMode: 'multiply'
        }}
      />

      {/* ── Light colour-grade ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,107,0,0.05) 0%, transparent 50%, rgba(255,0,127,0.05) 100%)',
        }}
      />

      {/* ── Bottom-to-top fade for transitions ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(to top, #F8FAFC 0%, rgba(248,250,252,0.8) 15%, transparent 100%)',
        }}
      />

      {/* ── Vibrant Orbs for Light Mode ── */}
      <div className="hero-orb" style={{
        width: 800, height: 800, top: '-15%', right: '-10%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)',
        filter: 'blur(100px)', animation: 'orbFloat1 16s ease-in-out infinite',
      }} />
      <div className="hero-orb" style={{
        width: 600, height: 600, bottom: '-15%', left: '-8%',
        background: 'radial-gradient(circle, rgba(255,0,127,0.08) 0%, transparent 70%)',
        filter: 'blur(80px)', animation: 'orbFloat2 20s ease-in-out infinite',
      }} />

      {/* ── Subtle Grid ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage:
          'linear-gradient(rgba(255,107,0,0.03) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(255,107,0,0.03) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      {/* ── Particles ── */}
      {PARTICLES.map((p, i) => (
        <div key={i} className="hero-particle z-0" style={{
          left: p.left, top: p.top,
          width: p.size, height: p.size,
          background: p.color,
          animationDuration: `${p.dur}s`,
          animationDelay: `${p.del}s`,
          opacity: 0.4
        }} />
      ))}

      {/* ── Content ── */}
      <div className="container relative z-10 pt-36 pb-32">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

          {/* Eyebrow */}
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-3 mb-10 px-5 py-2.5 rounded-full"
            style={{
              background: 'rgba(255,107,0,0.03)',
              border: '1px solid rgba(255,107,0,0.1)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-orange-500"
              style={{
                animation: 'pulseRing 2s ease-in-out infinite',
                boxShadow: '0 0 10px rgba(255,107,0,0.5)'
              }}
            />
            <span
              className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase text-orange-600"
            >
              Certified Industrial Excellence — Zambia &amp; Sub-Saharan Africa
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-8 overflow-hidden">
            {['Engineering', 'Excellence'].map((word, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="block font-display font-black text-gradient-fire"
                  style={{
                    fontSize: 'clamp(3.2rem, 10vw, 7.5rem)',
                    letterSpacing: '-0.045em',
                    lineHeight: 0.98,
                  }}
                >
                  {word}
                </span>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="block font-display font-black text-gradient-fire"
                style={{
                  fontSize: 'clamp(3.2rem, 10vw, 7.5rem)',
                  letterSpacing: '-0.045em',
                  lineHeight: 1.0,
                  filter: 'drop-shadow(0 0 30px rgba(255,107,0,0.15))',
                }}
              >
                Across Africa
              </span>
            </motion.div>
          </div>

          {/* Sub-copy */}
          <motion.p
            {...fadeUp(0.55)}
            className="text-lg md:text-xl leading-relaxed mb-12 max-w-2xl text-slate-500"
          >
            Afridyn Engineering delivers mechanical, electrical, IT, and fibre optic
            solutions for mining, manufacturing, and infrastructure sectors across
            Zambia and Sub-Saharan Africa.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.70)}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              onClick={() => goto('services')}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-lg font-bold"
              style={{
                background: 'linear-gradient(135deg, #FF6B00, #FF007F)',
                color: '#fff',
                boxShadow: '0 8px 32px rgba(255,107,0,0.2)',
                borderRadius: 14,
                fontSize: 16,
                padding: '16px 38px',
              }}
            >
              Explore Services
              <ArrowRight size={19} strokeWidth={2.2} />
            </motion.button>

            <motion.button
              onClick={() => goto('contact')}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-lg"
              style={{
                background: '#fff',
                border: '1px solid rgba(255,107,0,0.1)',
                color: '#FF6B00',
                boxShadow: '0 4px 20px rgba(255,107,0,0.05)',
                borderRadius: 14,
                fontSize: 16,
                padding: '16px 38px',
              }}
            >
              Get a Quote
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={() => goto('trust')}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group z-10"
        style={{ color: 'rgba(255,107,0,0.4)' }}
      >
        <ChevronDown
          size={26}
          strokeWidth={1.4}
          className="animate-bounce group-hover:text-orange-600 transition-colors"
        />
      </motion.button>
    </section>
  )
}
