import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { FileText, FileCheck2, Receipt, Truck, FileMinus, ScrollText, Users, Package, ShoppingCart, BarChart3, Settings } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { getSessionUser } from '@/lib/auth/server'
import { SignOutButton } from './SignOutButton'

export const metadata: Metadata = { title: 'Dashboard' }
export const dynamic = 'force-dynamic'

// Phase 0 shell: proves auth end-to-end. Each tile becomes a real screen in
// Phases 1–4 (docs/ADMIN_BUILD_PLAN.md).
const MODULES = [
  { icon: FileText,     name: 'Quotations',        code: 'QT', phase: 1 },
  { icon: FileCheck2,   name: 'Proforma invoices', code: 'PF', phase: 1 },
  { icon: Receipt,      name: 'Invoices & receipts', code: 'INV · RC', phase: 1 },
  { icon: Truck,        name: 'Delivery notes',    code: 'DN', phase: 1 },
  { icon: FileMinus,    name: 'Credit notes',      code: 'CN', phase: 1 },
  { icon: ScrollText,   name: 'Client statements', code: 'ST', phase: 1 },
  { icon: Users,        name: 'Clients & sites',   code: 'CL', phase: 1 },
  { icon: Package,      name: 'Products',          code: 'PR', phase: 3 },
  { icon: ShoppingCart, name: 'Shop orders',       code: 'OR', phase: 3 },
  { icon: BarChart3,    name: 'Reports',           code: 'RP', phase: 4 },
  { icon: Settings,     name: 'Settings',          code: 'SE', phase: 4 },
]

export default async function AdminHome() {
  const user = await getSessionUser().catch(() => null)
  if (!user) redirect('/admin/login')

  return (
    <div className="min-h-[100svh]">
      <header className="border-b" style={{ borderColor: 'var(--ax-line)', background: 'rgba(7,9,13,0.9)' }}>
        <div className="container h-[72px] flex items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-right">
              <span className="block text-[14px] text-white">{user.name}</span>
              <span className="block ax-spec text-[10px]">{user.role}</span>
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="container py-10 md:py-14">
        <p className="ax-eyebrow">Admin console</p>
        <h1 className="ax-h2 mt-3">Welcome, {user.name.split(' ')[0]}.</h1>
        <p className="ax-lead mt-3 max-w-2xl">
          The admin is being built in phases. Sign-in and the database are live; the modules below switch on as each phase ships.
        </p>

        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((m) => (
            <li key={m.name} className="ax-panel p-6 flex items-start gap-4">
              <span className="w-11 h-11 grid place-items-center border shrink-0" style={{ borderColor: 'var(--ax-line-2)', color: 'var(--ax-copper)' }}>
                <m.icon size={20} strokeWidth={1.6} aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-lg font-semibold text-white">{m.name}</h2>
                <p className="ax-spec text-[10px] mt-1">{m.code} · Phase {m.phase}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
