'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Package, ShoppingCart,
  Users, Settings, LogOut, Menu, X,
  Bell, ChevronRight, TrendingUp,
} from 'lucide-react'

const NAV = [
  { label: 'Dashboard',   href: '/admin',           icon: LayoutDashboard },
  { label: 'Products',    href: '/admin/products',   icon: Package },
  { label: 'Orders',      href: '/admin/orders',     icon: ShoppingCart },
  { label: 'Leads / CRM', href: '/admin/leads',      icon: Users },
  { label: 'Settings',    href: '/admin/settings',   icon: Settings },
]

function NavItem({ label, href, icon: Icon, active, onClick }: {
  label: string; href: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>; active: boolean; onClick?: () => void
}) {
  return (
    <Link href={href} onClick={onClick}
      className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 group ${
        active ? 'text-white' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
      }`}
    >
      {active && (
        <motion.div
          layoutId="activeNav"
          className="absolute inset-0 rounded-xl"
          style={{ background: 'linear-gradient(135deg, #1B4E9B, #2A6DD9)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        />
      )}
      <Icon size={15} strokeWidth={active ? 2.5 : 2} className="relative z-10 shrink-0" />
      <span className="relative z-10">{label}</span>
      {active && <ChevronRight size={12} className="relative z-10 ml-auto opacity-60" />}
    </Link>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen]   = useState(false)

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  const sidebar = (
    <div className="flex flex-col h-full select-none" style={{ background: '#070E1C' }}>
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <Image src="/images/final_logo.png" alt="Afridyn" width={110} height={32}
            className="brightness-0 invert object-contain" />
          <span className="ml-auto text-[9px] font-mono font-bold tracking-[0.2em] text-white/20 uppercase
            border border-white/10 px-2 py-0.5 rounded-full">Admin</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 px-4 mb-3">Navigation</p>
        {NAV.map(item => (
          <NavItem key={item.href} {...item} active={isActive(item.href)} onClick={() => setOpen(false)} />
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 pb-5 pt-3 border-t border-white/[0.06] space-y-1">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0"
            style={{ background: 'linear-gradient(135deg,#1B4E9B,#6AAB2E)' }}>A</div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-white/80 truncate">Admin</p>
            <p className="text-[10px] text-white/25 truncate">afridynengineering.com</p>
          </div>
        </div>
        <button className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-[12px] font-semibold
          text-white/30 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200">
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0A1220' }}>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-[220px] shrink-0 border-r border-white/[0.06]">
        {sidebar}
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)} />
            <motion.div initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-[220px] lg:hidden border-r border-white/[0.06]">
              {sidebar}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className="flex items-center gap-4 px-6 py-3.5 border-b border-white/[0.06] shrink-0"
          style={{ background: '#070E1C' }}>
          <button className="lg:hidden text-white/40 hover:text-white transition-colors"
            onClick={() => setOpen(true)}>
            <Menu size={19} />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[12px]">
            <TrendingUp size={13} className="text-[#6AAB2E]" />
            <span className="text-white/25">Afridyn</span>
            <ChevronRight size={11} className="text-white/15" />
            <span className="text-white/60 font-semibold capitalize">
              {pathname === '/admin' ? 'Dashboard' : pathname.replace('/admin/', '')}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative w-8 h-8 rounded-xl flex items-center justify-center
              text-white/30 hover:text-white hover:bg-white/5 transition-all">
              <Bell size={15} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#6AAB2E]" />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#1B4E9B,#6AAB2E)' }}>A</div>
          </div>
        </header>

        {/* Page */}
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 overflow-y-auto p-6 md:p-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
