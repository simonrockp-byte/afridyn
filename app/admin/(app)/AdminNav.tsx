'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Users, Package, ShoppingCart, BarChart3, Settings } from 'lucide-react'

const ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, live: true },
  { href: '/admin/documents', label: 'Documents', icon: FileText, live: true },
  { href: '/admin/clients', label: 'Clients', icon: Users, live: true },
  { href: '/admin/products', label: 'Products', icon: Package, live: false },
  { href: '/admin/orders', label: 'Shop orders', icon: ShoppingCart, live: false },
  { href: '/admin/reports', label: 'Reports', icon: BarChart3, live: false },
  { href: '/admin/settings', label: 'Settings', icon: Settings, live: false },
]

export function AdminNav({ orientation }: { orientation: 'vertical' | 'horizontal' }) {
  const path = usePathname()
  const active = (href: string) => (href === '/admin' ? path === '/admin' : path.startsWith(href))

  if (orientation === 'horizontal') {
    return (
      <ul className="grid grid-cols-3">
        {ITEMS.filter((i) => i.live).map((i) => (
          <li key={i.href}>
            <Link href={i.href} aria-current={active(i.href) ? 'page' : undefined} className="flex flex-col items-center gap-1 py-2.5 text-[11px]" style={{ color: active(i.href) ? 'var(--ax-copper)' : 'var(--ax-dim)' }}>
              <i.icon size={20} strokeWidth={1.7} aria-hidden />
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className="p-3 space-y-1">
      {ITEMS.map((i) =>
        i.live ? (
          <li key={i.href}>
            <Link
              href={i.href}
              aria-current={active(i.href) ? 'page' : undefined}
              className="flex items-center gap-3 px-3 py-2.5 text-[14px] border-l-2 transition-colors"
              style={{ borderColor: active(i.href) ? 'var(--ax-copper)' : 'transparent', color: active(i.href) ? '#fff' : 'var(--ax-dim)', background: active(i.href) ? 'rgba(255,106,26,0.08)' : 'transparent' }}
            >
              <i.icon size={17} strokeWidth={1.7} aria-hidden />
              {i.label}
            </Link>
          </li>
        ) : (
          <li key={i.href} className="flex items-center gap-3 px-3 py-2.5 text-[14px] border-l-2 border-transparent" style={{ color: 'var(--ax-faint)' }} aria-disabled="true">
            <i.icon size={17} strokeWidth={1.7} aria-hidden />
            {i.label}
            <span className="ml-auto ax-spec text-[9px]">Soon</span>
          </li>
        ),
      )}
    </ul>
  )
}
