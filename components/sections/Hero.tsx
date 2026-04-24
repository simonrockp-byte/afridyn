'use client'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

const PARTICLES = [
  { left: '8%',  top: '60%', size: 3, dur: 8,  del: 0,   color: '#E8305A' },
  { left: '18%', top: '78%', size: 2, dur: 10, del: 1.2, color: '#FF6B00' },
  { left: '32%', top: '68%', size: 4, dur: 7,  del: 0.5, color: '#E8305A' },
  { left: '48%', top: '82%', size: 2, dur: 11, del: 2.0, color: '#FF6B00' },
  { left: '62%', top: '64%', size: 3, dur: 9,  del: 1.7, color: '#FFB800' },
  { left: '75%', top: '74%', size: 4, dur: 8,  del: 0.3, color: '#E8305A' },
  { left: '88%', top: '58%', size: 2, dur: 12, del: 2.4, color: '#FF6B00' },
  { left: '52%', top: '55%', size: 3, dur: 9,  del: 0.8, color: '#FFB800' },
]

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 32 },
  animate:   { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
})

export function Hero() {
  const goto = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#06060E' }}
    >
      {/* ── Full-bleed vivid background ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/assets/hero-banner-afridyn.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          opacity: 0.55,
        }}
      />

      {/* ── Warm colour-grade ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(232,48,90,0.28) 0%, transparent 50%, rgba(212,105,42,0.22) 100%)',
        }}
      />

      {/* ── Bottom-to-top fade for readability ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(to top, #06060E 0%, rgba(6,6,14,0.72) 28%, rgba(6,6,14,0.0) 60%)',
        }}
      />

      {/* ── Nav area darken ── */}
      <div
        className="absolute top-0 left-0 right-0 h-48 z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(6,6,14,0.80) 0%, transparent 100%)',
        }}
      />

      {/* ── Aurora orbs ── */}
      <div className="hero-orb" style={{
        width: 900, height: 900, top: '-25%', right: '-15%',
        background: 'radial-gradient(circle, rgba(232,48,90,0.22) 0%, transparent 65%)',
        filter: 'blur(90px)', animation: 'orbFloat1 14s ease-in-out infinite',
      }} />
      <div className="hero-orb" style={{
        width: 700, height: 700, bottom: '-20%', left: '-12%',
        background: 'radial-gradient(circle, rgba(212,105,42,0.20) 0%, transparent 65%)',
        filter: 'blur(80px)', animation: 'orbFloat2 18s ease-in-out infinite',
      }} />
      <div className="hero-orb" style={{
        width: 450, height: 450, top: '15%', left: '38%',
        background: 'radial-gradient(circle, rgba(255,184,0,0.10) 0%, transparent 65%)',
        filter: 'blur(60px)', animation: 'orbFloat3 22s ease-in-out infinite',
      }} />

      {/* ── Grid ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }} />

      {/* ── Particles ── */}
      {PARTICLES.map((p, i) => (
        <div key={i} className="hero-particle z-0" style={{
          left: p.left, top: p.top,
          width: p.size, height: p.size,
          background: p.color,
          boxShadow: `0 0 ${p.size * 6}px ${p.color}`,
          animationDuration: `${p.dur}s`,
          animationDelay: `${p.del}s`,
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
              background: 'rgba(232,48,90,0.10)',
              border: '1px solid rgba(232,48,90,0.28)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: '#E8305A',
                boxShadow: '0 0 8px #E8305A',
                animation: 'pulseRing 2s ease-in-out infinite',
              }}
            />
            <span
              className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase"
              style={{ color: '#FF8090' }}
            >
              Certified Industrial Excellence — Zambia &amp; Sub-Saharan Africa
            </span>
          </motion.div>

          {/* Headline — each line staggers in */}
          <div className="mb-8 overflow-hidden">
            {['Engineering', 'Excellence'].map((word, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="block font-display font-black text-white"
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

            {/* Gradient accent line */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="block font-display font-black text-gradient-fire"
                style={{
                  fontSize: 'clamp(3.2rem, 10vw, 7.5rem)',
                  letterSpacing: '-0.045em',
                  lineHeight: 1.0,
                }}
              >
                Across Africa
              </span>
            </motion.div>
          </div>

          {/* Sub-copy */}
          <motion.p
            {...fadeUp(0.55)}
            className="text-lg md:text-xl leading-relaxed mb-12 max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.58)' }}
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
                background: 'linear-gradient(135deg, #E8305A, #D4692A)',
                color: '#fff',
                boxShadow: '0 6px 32px rgba(232,48,90,0.45)',
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
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.20)',
                color: 'rgba(255,255,255,0.88)',
                borderRadius: 14,
                fontSize: 16,
                padding: '16px 38px',
                backdropFilter: 'blur(16px)',
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
        style={{ color: 'rgba(255,255,255,0.22)' }}
      >
        <ChevronDown
          size={26}
          strokeWidth={1.4}
          className="animate-bounce group-hover:text-white/55 transition-colors"
        />
      </motion.button>
    </section>
  )
}
