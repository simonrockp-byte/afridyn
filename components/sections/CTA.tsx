'use client'
import { ArrowRight, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

export function CTA() {
  return (
    <section className="section-sm relative overflow-hidden" style={{ background: '#0A0A1A' }}>

      {/* Aurora orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,45,85,0.15) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'orbFloat1 14s ease-in-out infinite' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(204,0,255,0.12) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'orbFloat2 18s ease-in-out infinite' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.08) 0%, transparent 70%)', filter: 'blur(50px)', animation: 'orbFloat3 22s ease-in-out infinite' }} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,45,85,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(204,0,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[32px] overflow-hidden relative"
          style={{
            border: '1px solid rgba(255,45,85,0.18)',
            background: 'linear-gradient(135deg, rgba(255,45,85,0.06) 0%, rgba(204,0,255,0.04) 50%, rgba(255,106,0,0.06) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 80px rgba(255,45,85,0.08)',
          }}
        >
          <div className="relative px-10 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10">

            {/* Left text */}
            <div className="flex-1 text-center md:text-left">
              <div className="label-chip mb-6 inline-flex" style={{ background: 'rgba(255,45,85,0.12)', borderColor: 'rgba(255,45,85,0.25)', color: '#FF6A7A' }}>
                Start a Conversation
              </div>
              <h2 className="font-display font-black text-3xl md:text-5xl text-white mb-4" style={{ letterSpacing: '-0.04em', lineHeight: 1.05 }}>
                Ready to Solve Your<br />
                <span className="text-gradient-fire">Engineering Challenge?</span>
              </h2>
              <p className="text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Talk to our team today. We respond within 24 hours, every time.
              </p>
            </div>

            {/* Right buttons */}
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-lg text-white"
                style={{
                  background: 'linear-gradient(135deg, #FF2D55, #FF6A00)',
                  boxShadow: '0 8px 30px rgba(255,45,85,0.4)',
                  borderRadius: 14,
                }}
              >
                Request a Quote
                <ArrowRight size={18} />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="tel:+260956797916"
                className="btn btn-lg"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 14,
                }}
              >
                <Phone size={16} />
                Call Now
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
