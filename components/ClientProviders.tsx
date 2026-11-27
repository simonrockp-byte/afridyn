'use client'

/** Kept as a seam for future app-wide providers. (framer-motion is no longer loaded app-wide.) */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
