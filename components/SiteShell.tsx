'use client'
import { usePathname } from 'next/navigation'
import { Navigation } from '@/components/layout/Navigation'
import { Footer }     from '@/components/layout/Footer'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin  = pathname.startsWith('/admin')

  if (isAdmin) return <>{children}</>

  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}
