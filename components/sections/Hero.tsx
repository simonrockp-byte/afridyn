'use client'
import { useEffect, useRef } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

/* ─── Canvas Lava Animation ─── */
function LavaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Blobs config
    const blobs = [
      { x: 0.2, y: 0.3, r: 0.38, color: '#FF4500', speed: 0.0008, phase: 0 },
      { x: 0.75, y: 0.5, r: 0.45, color: '#FF0000', speed: 0.0006, phase: 1.2 },
      { x: 0.5,  y: 0.8, r: 0.30, color: '#FF6B00', speed: 0.001,  phase: 2.4 },
      { x: 0.1,  y: 0.7, r: 0.25, color: '#CC0000', speed: 0.0012, phase: 0.8 },
      { x: 0.85, y: 0.2, r: 0.28, color: '#FF2D00', speed: 0.0009, phase: 3.1 },
    ]

    const draw = () => {
      t++
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      // Dark base
      ctx.fillStyle = '#0a0000'
      ctx.fillRect(0, 0, W, H)

      // Draw animated blobs
      for (const b of blobs) {
        const bx = (b.x + Math.sin(t * b.speed + b.phase) * 0.18) * W
        const by = (b.y + Math.cos(t * b.speed * 0.7 + b.phase) * 0.14) * H
        const br = b.r * Math.min(W, H)

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br)
        grad.addColorStop(0,   b.color + 'CC') // 80% opacity core
        grad.addColorStop(0.4, b.color + '66') // 40% mid
        grad.addColorStop(1,   b.color + '00') // transparent edge

        ctx.globalCompositeOperation = 'screen'
        ctx.beginPath()
        ctx.arc(bx, by, br, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      // Bright spark overlay — tiny fast particles
      ctx.globalCompositeOperation = 'screen'
      const sparkCount = 60
      for (let i = 0; i < sparkCount; i++) {
        const sx = ((i * 137.5 + t * 0.4 + Math.sin(i + t * 0.003) * 200) % W + W) % W
        const sy = ((i * 93.7 + Math.cos(i * 0.8 + t * 0.005) * 150 - t * 0.15) % H + H) % H
        const sr = 1 + Math.sin(i * 5.3 + t * 0.04) * 0.8
        const opacity = (0.4 + Math.sin(i * 3.1 + t * 0.06) * 0.4)
        const col = i % 2 === 0 ? `rgba(255, 120, 0, ${opacity})` : `rgba(255, 0, 0, ${opacity})`
        ctx.beginPath()
        ctx.arc(sx, sy, sr, 0, Math.PI * 2)
        ctx.fillStyle = col
        ctx.fill()
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

/* ─── Floating glowing orbs (CSS) ─── */
type Orb = { size: number; top: string; color: string; dur: string; anim: string; left?: string; right?: string }
const ORBS: Orb[] = [
  { size: 700, top: '-10%', left: '-10%',  color: 'rgba(255,69,0,0.55)',  dur: '14s', anim: 'orbFloat1' },
  { size: 600, top: '30%',  right: '-12%', color: 'rgba(255,0,0,0.50)',   dur: '18s', anim: 'orbFloat2' },
  { size: 500, top: '60%',  left: '20%',   color: 'rgba(255,107,0,0.45)', dur: '12s', anim: 'orbFloat3' },
  { size: 400, top: '-5%',  right: '30%',  color: 'rgba(200,0,0,0.40)',   dur: '20s', anim: 'orbFloat1' },
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
      style={{ background: '#0a0000' }}
    >
      {/* ── Canvas lava animation ── */}
      <LavaCanvas />

      {/* ── Vivid glowing orbs ── */}
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

      {/* ── Glowing grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage:
            'linear-gradient(rgba(255,80,0,0.07) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,80,0,0.07) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* ── Vignette edges ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="container relative pt-28 pb-24 md:pt-36 md:pb-32" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          data-aos="fade-in"
          data-aos-duration="1500"
          className="max-w-5xl mx-auto flex flex-col items-center text-center"
        >

          {/* Eyebrow badge */}
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 mb-8 md:mb-10 px-4 py-2 md:px-5 md:py-2.5 rounded-full max-w-[90vw]"
            style={{
              background:    'rgba(255,80,0,0.12)',
              border:        '1px solid rgba(255,107,0,0.35)',
              backdropFilter:'blur(12px)',
            }}
          >
            <span
              className="w-2 h-2 shrink-0 rounded-full"
              style={{
                background:  '#FF6B00',
                animation:   'pulseRing 1.5s ease-in-out infinite',
                boxShadow:   '0 0 14px rgba(255,107,0,0.9)',
              }}
            />
            <span className="text-[10px] md:text-[11px] font-mono font-bold tracking-[0.14em] md:tracking-[0.22em] uppercase text-orange-400 leading-tight">
              Certified Industrial Excellence — Zambia &amp; Sub-Saharan Africa
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-6 md:mb-8">
            {['Engineering', 'Excellence'].map((word, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.0, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="block font-display font-black"
                  style={{
                    fontSize: 'clamp(3rem, 13vw, 9rem)',
                    letterSpacing: '-0.05em',
                    lineHeight: 0.88,
                    marginBottom: '0.05em',
                    background: 'linear-gradient(135deg, #FF6B00 0%, #FF2200 50%, #FF0000 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'fireShift 3s ease-in-out infinite',
                    filter: 'drop-shadow(0 0 40px rgba(255, 60, 0, 0.6))',
                  }}
                >
                  {word}
                </span>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="block font-display font-black"
                style={{
                  fontSize: 'clamp(3rem, 13vw, 9rem)',
                  letterSpacing: '-0.05em',
                  lineHeight: 0.88,
                  background: 'linear-gradient(135deg, #FF8C00 0%, #FF3300 40%, #CC0000 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'fireShift 3s ease-in-out infinite reverse',
                  filter: 'drop-shadow(0 0 60px rgba(255, 0, 0, 0.7))',
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
            style={{ color: 'rgba(255,200,150,0.8)' }}
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
              whileHover={{ y: -6, scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-lg font-bold group w-full sm:w-auto"
              style={{
                background:   'linear-gradient(135deg, #FF6B00, #FF0000)',
                color:        '#fff',
                boxShadow:    '0 0 40px rgba(255, 80, 0, 0.5), 0 8px 32px rgba(255,0,0,0.3)',
                borderRadius: 16,
                fontSize:     17,
                padding:      '18px 44px',
                border:       '1px solid rgba(255,120,0,0.4)',
              }}
            >
              Explore Services
              <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={() => goto('contact')}
              whileHover={{ y: -6, scale: 1.06, background: 'rgba(255,80,0,0.15)' }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-lg font-bold w-full sm:w-auto"
              style={{
                background:   'rgba(255,80,0,0.08)',
                border:       '1px solid rgba(255,107,0,0.4)',
                color:        '#FF8C42',
                boxShadow:    '0 0 20px rgba(255,80,0,0.15)',
                borderRadius: 16,
                fontSize:     17,
                padding:      '18px 44px',
                backdropFilter: 'blur(10px)',
              }}
            >
              Get a Quote
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        onClick={() => goto('trust')}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group"
        style={{ zIndex: 10 }}
      >
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(255,107,0,0.5)' }}>
          Scroll
        </span>
        <ChevronDown
          size={28}
          strokeWidth={1.5}
          className="animate-bounce transition-colors"
          style={{ color: 'rgba(255,107,0,0.6)' }}
        />
      </motion.button>
    </section>
  )
}
