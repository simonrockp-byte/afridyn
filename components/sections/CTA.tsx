'use client'
import { ArrowRight, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

export function CTA() {
  return (
    <section className="section-sm relative overflow-hidden" style={{ background: '#F8FAFC' }}>

      {/* Ambient orbs */}
      <div
        className="absolute top-0 left-1/4 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(15, 23, 42, 0.03) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'orbFloat1 16s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(15, 23, 42, 0.03) 0%, transparent 70%)',
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
          data-aos="zoom-in"
          data-aos-duration="800"
          className="rounded-3xl overflow-hidden relative border border-white/10 bg-gradient-premium shadow-2xl"
        >
          <div className="px-10 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10 bg-black/10 backdrop-blur-sm">

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <div
                className="section-label mb-5 md:justify-start justify-center text-white/90 before:bg-white"
              >
                Start a Conversation
              </div>
              <h2
                className="font-display font-black text-white mb-4"
                style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
              >
                Ready to Solve Your<br />
                <span className="text-white underline decoration-orange-500/50">Engineering Challenge?</span>
              </h2>
              <p className="text-[15px] text-white/80">
                Talk to our team today. We respond within 24 hours, every time.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-lg bg-white text-orange-600 hover:bg-orange-50 transition-colors shadow-xl"
              >
                Request a Quote
                <ArrowRight size={17} strokeWidth={2} />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="tel:+260956797916"
                className="btn btn-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-md transition-all"
                style={{ background: 'rgba(255,255,255,0.05)' }}
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
