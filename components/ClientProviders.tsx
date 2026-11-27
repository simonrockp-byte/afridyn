'use client'
import { MotionConfig } from 'framer-motion'

/** reducedMotion="user": framer-motion drops transform/scale animations when the OS asks for reduced motion. */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
