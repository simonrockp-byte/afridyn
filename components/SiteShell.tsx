'use client'
import { usePathname } from 'next/navigation'
import { Navigation } from '@/components/layout/Navigation'

/** Footer is passed in from the (server) root layout so it renders without hydration cost. */
export function SiteShell({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
  const pathname = usePathname()
  // Admin and public document links render without the marketing nav/footer.
  const isAdmin  = pathname.startsWith('/admin') || pathname.startsWith('/d/')

  if (isAdmin) return <>{children}</>

  return (
    <>
      <Navigation />
      <main id="main">{children}</main>
      {footer}
    </>
  )
}
