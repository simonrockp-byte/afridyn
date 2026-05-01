'use client'
import { useEffect, useRef } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

/* ─── Canvas particle field (navy + orange brand palette) ─── */
function BrandCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Respect prefers-reduced-motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let animId: number
    let t = 0

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const blobs = [
      { x: 0.15, y: 0.25, r: 0.40, color: '#1A3A6B', speed: 0.0006, phase: 0 },
      { x: 0.78, y: 0.55, r: 0.48, color: '#2B5BA8', speed: 0.0005, phase: 1.5 },
      { x: 0.50, y: 0.82, r: 0.32, color: '#0F2347', speed: 0.0008, phase: 2.8 },
      { x: 0.85, y: 0.18, r: 0.30, color: '#E8621A', speed: 0.001,  phase: 0.6 },
      { x: 0.10, y: 0.70, r: 0.28, color: '#1A3A6B', speed: 0.0007, phase: 4.0 },
    ]

    const draw = () => {
      if (!reduced) t++
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#0F1F3D'
      ctx.fillRect(0, 0, W, H)

      for (const b of blobs) {
        const bx = (b.x + Math.sin(t * b.speed + b.phase) * 0.15) * W
        const by = (b.y + Math.cos(t * b.speed * 0.7 + b.phase) * 0.12) * H
        const br = b.r * Math.min(W, H)
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br)
        grad.addColorStop(0,   b.color + 'BB')
        grad.addColorStop(0.5, b.color + '44')
        grad.addColorStop(1,   b.color + '00')
        ctx.globalCompositeOperation = 'screen'
        ctx.beginPath()
        ctx.arc(bx, by, br, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      // Floating dots — navy and orange
      if (!reduced) {
        ctx.globalCompositeOperation = 'screen'
        for (let i = 0; i < 50; i++) {
          const sx = ((i * 141.4 + t * 0.3 + Math.sin(i + t * 0.002) * 180) % W + W) % W
          const sy = ((i * 97.3  + Math.cos(i * 0.9 + t * 0.004) * 120 - t * 0.1) % H + H) % H
          const sr = 0.8 + Math.sin(i * 4.7 + t * 0.03) * 0.6
          const op = 0.3 + Math.sin(i * 2.9 + t * 0.05) * 0.25
          ctx.beginPath()
          ctx.arc(sx, sy, sr, 0, Math.PI * 2)
          ctx.fillStyle = i % 3 === 0
            ? `rgba(232, 98, 26, ${op})`
            : `rgba(43, 91, 168, ${op})`
          ctx.fill()
        }
      }

      ctx.globalCompositeOperation = 'source-over'
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}

/* ─── Floating orbs ─── */
type Orb = { size: number; top: string; color: string; dur: string; anim: string; left?: string; right?: string }
const ORBS: Orb[] = [
  { size: 700, top: '-10%', left: '-10%',  color: 'rgba(26,58,107,0.50)',  dur: '14s', anim: 'orbFloat1' },
  { size: 600, top: '30%',  right: '-12%', color: 'rgba(43,91,168,0.45)', dur: '18s', anim: 'orbFloat2' },
  { size: 500, top: '60%',  left: '20%',   color: 'rgba(15,35,71,0.42)',  dur: '12s', anim: 'orbFloat3' },
  { size: 360, top: '-5%',  right: '30%',  color: 'rgba(232,98,26,0.30)', dur: '20s', anim: 'orbFloat1' },
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
      style={{ background: '#0F1F3D' }}
    >
      <BrandCanvas />

      {/* Glowing orbs */}
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
            filter: 'blur(60px)',
            animation: `${o.anim} ${o.dur} ease-in-out infinite`,
            zIndex: 1,
            mixBlendMode: 'screen',
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage:
            'linear-gradient(rgba(43,91,168,0.06) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(43,91,168,0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,20,50,0.65) 100%)',
        }}
      />

      {/* Content */}
      <div className="container relative pt-28 pb-24 md:pt-36 md:pb-32" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="max-w-5xl mx-auto flex flex-col items-center text-center"
        >
          {/* Logo in hero */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-10 md:mb-12"
          >
            <Image
              src="/images/logo.png"
              alt="Afridyn Engineering | Technology"
              width={260}
              height={78}
              className="object-contain brightness-0 invert"
              priority
            />
          </motion.div>

          {/* Eyebrow badge */}
          <motion.div
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2 mb-8 md:mb-10 px-4 py-2 md:px-5 md:py-2.5 rounded-full max-w-[90vw]"
            style={{
              background:    'rgba(232,98,26,0.12)',
              border:        '1px solid rgba(232,98,26,0.35)',
              backdropFilter:'blur(12px)',
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
            <span className="text-[10px] md:text-[11px] font-mono font-bold tracking-[0.16em] uppercase leading-tight" style={{ color: '#F07A38' }}>
              Certified Industrial Excellence — Zambia &amp; Sub-Saharan Africa
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-6 md:mb-8">
            {['Engineering', 'Excellence'].map((word, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="block font-display font-black text-white"
                  style={{
                    fontSize: 'clamp(3rem, 12vw, 8.5rem)',
                    letterSpacing: '-0.05em',
                    lineHeight: 0.9,
                    marginBottom: '0.06em',
                    textShadow: '0 0 60px rgba(26,58,107,0.6)',
                  }}
                >
                  {word}
                </span>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="block font-display font-black"
                style={{
                  fontSize: 'clamp(3rem, 12vw, 8.5rem)',
                  letterSpacing: '-0.05em',
                  lineHeight: 0.9,
                  background: 'linear-gradient(135deg, #E8621A 0%, #F07A38 50%, #F5A058 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'brandShift 4s ease-in-out infinite',
                }}
              >
                Across Africa
              </span>
            </motion.div>
          </div>

          {/* Sub-copy */}
          <motion.p
            {...fadeUp(0.65)}
            className="text-base md:text-lg lg:text-xl leading-relaxed mb-10 md:mb-12 max-w-2xl px-2"
            style={{ color: 'rgba(200,215,235,0.85)' }}
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
                background:     'rgba(255,255,255,0.08)',
                border:         '1px solid rgba(255,255,255,0.2)',
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
        transition={{ delay: 1.8, duration: 0.6 }}
        onClick={() => goto('trust')}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group"
        style={{ zIndex: 10 }}
      >
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(232,98,26,0.6)' }}>
          Scroll
        </span>
        <ChevronDown
          size={26}
          strokeWidth={1.5}
          className="animate-bounce"
          style={{ color: 'rgba(232,98,26,0.7)' }}
        />
      </motion.button>
    </section>
  )
}
