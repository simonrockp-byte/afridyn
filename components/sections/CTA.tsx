'use client'
import { ArrowRight, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

export function CTA() {
  return (
    <section className="section-sm relative overflow-hidden" style={{ background: '#0E0E1A' }}>

      {/* Ambient orbs */}
      <div
        className="absolute top-0 left-1/4 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232,48,90,0.10) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'orbFloat1 16s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,105,42,0.08) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'orbFloat2 20s ease-in-out infinite',
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="rounded-3xl overflow-hidden relative"
          style={{
            border: '1px solid rgba(232,48,90,0.16)',
            background:
              'linear-gradient(135deg, rgba(232,48,90,0.05) 0%, rgba(14,14,26,0.9) 50%, rgba(212,105,42,0.05) 100%)',
            backdropFilter: 'blur(24px)',
          }}
        >
          <div className="px-10 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10">

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <div
                className="section-label mb-5 md:justify-start justify-center"
                style={{ color: '#E8305A' }}
              >
                Start a Conversation
              </div>
              <h2
                className="font-display font-black text-white mb-4"
                style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
              >
                Ready to Solve Your<br />
                <span className="text-gradient-fire">Engineering Challenge?</span>
              </h2>
              <p className="text-[15px] text-white/45">
                Talk to our team today. We respond within 24 hours, every time.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-cta btn-lg"
              >
                Request a Quote
                <ArrowRight size={17} strokeWidth={2} />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="tel:+260956797916"
                className="btn btn-ghost btn-lg"
              >
                <Phone size={16} strokeWidth={1.8} />
                Call Now
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
