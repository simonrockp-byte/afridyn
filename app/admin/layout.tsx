import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s · Afridyn Admin' },
  robots: { index: false, follow: false },
  // Installable admin PWA (scope /admin/). Only admin pages link the manifest.
  manifest: '/admin.webmanifest',
  appleWebApp: { capable: true, title: 'Afridyn', statusBarStyle: 'black-translucent' },
  icons: { apple: '/icons/apple-touch-icon.png' },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[100svh] ax-grid" style={{ background: 'var(--ax-ink)' }}>{children}</div>
}
