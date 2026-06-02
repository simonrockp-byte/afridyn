'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  LayoutDashboard, Package, ShoppingCart, Users,
  Settings, LogOut, Menu, X, Bell, ChevronRight,
  TrendingUp,
} from 'lucide-react'

const NAV = [
  { label: 'Dashboard',  href: '/admin',          icon: LayoutDashboard },
  { label: 'Products',   href: '/admin/products',  icon: Package },
  { label: 'Orders',     href: '/admin/orders',    icon: ShoppingCart },
  { label: 'Leads / CRM',href: '/admin/leads',     icon: Users },
  { label: 'Settings',   href: '/admin/settings',  icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname()
  const [open, setOpen] = useState(false)

  const Sidebar = () => (
    <aside className="flex flex-col h-full" style={{ background: '#060E1E' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
        <Image src="/images/final_logo.png" alt="Afridyn" width={120} height={36} className="brightness-0 invert object-contain" />
        <span className="text-[10px] font-mono font-bold tracking-widest text-white/30 uppercase ml-auto">Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 group ${
                active
                  ? 'bg-[#1B4E9B] text-white shadow-lg shadow-[#1B4E9B]/30'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={16} strokeWidth={active ? 2.5 : 2} />
              {label}
              {active && <ChevronRight size={13} className="ml-auto opacity-60" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 border-t border-white/5 pt-4 space-y-0.5">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl">
          <div className="w-7 h-7 rounded-full bg-[#6AAB2E]/20 border border-[#6AAB2E]/30 flex items-center justify-center text-[#6AAB2E] text-[11px] font-bold">A</div>
          <div>
            <p className="text-[12px] font-semibold text-white/80">Admin</p>
            <p className="text-[10px] text-white/30">afridynengineering.com</p>
          </div>
        </div>
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white/40 hover:text-red-400 hover:bg-red-500/5 w-full transition-all">
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0A1220', fontFamily: 'var(--font-inter)' }}>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-56 shrink-0 border-r border-white/5">
        <Sidebar />
      </div>

      {/* Mobile sidebar drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-56 flex flex-col shadow-2xl">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center gap-4 px-5 py-3.5 border-b border-white/5 shrink-0" style={{ background: '#0A1220' }}>
          <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setOpen(true)}>
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2 text-[12px] text-white/30">
            <TrendingUp size={13} className="text-[#6AAB2E]" />
            <span>Afridyn Admin</span>
            <ChevronRight size={11} />
            <span className="text-white/60 font-medium capitalize">
              {pathname.replace('/admin', '').replace('/', '') || 'Dashboard'}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative text-white/40 hover:text-white transition-colors">
              <Bell size={17} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#6AAB2E] text-white text-[9px] font-bold flex items-center justify-center">3</span>
            </button>
            <div className="w-7 h-7 rounded-full bg-[#1B4E9B]/40 border border-[#1B4E9B]/40 flex items-center justify-center text-white text-[11px] font-bold">A</div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 md:p-7">
          {children}
        </main>
      </div>
    </div>
  )
}
