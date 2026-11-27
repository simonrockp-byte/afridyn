import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s · Afridyn Admin' },
  robots: { index: false, follow: false },
  // Installable admin PWA (scope /admin/). Only admin pages link the manifest.
  manifest: '/admin.webmanifest',
  appleWebApp: { capable: true, title: 'Afridyn', statusBarStyle: 'default' },
  icons: { apple: '/icons/apple-touch-icon.png' },
}

// Applies the saved theme (light | dark | auto; default light) before first paint.
const THEME_SCRIPT = `(function(){try{var p=localStorage.getItem('afridyn.adminTheme')||'light';var t=p==='auto'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;var el=document.currentScript.parentElement;el.setAttribute('data-theme',t);document.body.style.background=t==='light'?'#F4F6F9':'';}catch(e){}})()`

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="admin-root" className="ax-admin min-h-[100svh] ax-grid" data-theme="light" suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      {children}
    </div>
  )
}
