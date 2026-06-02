'use client'
import Link from 'next/link'
import { ShoppingCart, Users, Package, TrendingUp, ArrowUpRight, MessageCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const STATS = [
  { label: 'Total Orders',  value: '124',     sub: '+12% this month', icon: 'ShoppingCart', color: '#2A6DD9', bg: '#0F2347' },
  { label: 'Active Leads',  value: '38',      sub: '5 new today',     icon: 'Users',        color: '#6AAB2E', bg: '#0E1F0E' },
  { label: 'Products',      value: '20',      sub: '3 low stock',     icon: 'Package',      color: '#9B8B3B', bg: '#1A1608' },
  { label: 'Est. Revenue',  value: 'K 84.2K', sub: '+18% this month', icon: 'TrendingUp',   color: '#6AAB2E', bg: '#0E1F0E' },
]

const ICONS: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>> = { ShoppingCart, Users, Package, TrendingUp }

const ORDERS = [
  { id: '#ORD-041', customer: 'Konkola Copper Mines', product: 'Bosch GCM 340-305 D',       amount: 'K 285,000',   status: 'pending',    time: '2h ago' },
  { id: '#ORD-040', customer: 'Zesco Limited',         product: 'Structural Steel Pipes x5', amount: 'K 1,612,500', status: 'fulfilled',  time: '5h ago' },
  { id: '#ORD-039', customer: 'Lafarge Zambia',        product: 'Ingco Nitrile Gloves x50',  amount: 'K 107,500',   status: 'processing', time: '1d ago' },
  { id: '#ORD-038', customer: 'Indo Zambia Bank',      product: 'IT Equipment Supply',       amount: 'K 450,000',   status: 'fulfilled',  time: '2d ago' },
]

const LEADS = [
  { name: 'Charles Mwansa',    company: 'Mopani Copper Mines', status: 'new',       time: '30m ago' },
  { name: 'Grace Tembo',       company: 'Zambia Sugar PLC',     status: 'contacted', time: '2h ago'  },
  { name: 'Patrick Mutale',    company: 'ZESCO',                status: 'quoted',    time: '1d ago'  },
  { name: 'Mutinta Haakainde', company: 'Self Employed',        status: 'new',       time: '1d ago'  },
]

const STATUS: Record<string, string> = {
  pending:    'text-amber-400   bg-amber-400/10',
  processing: 'text-sky-400     bg-sky-400/10',
  fulfilled:  'text-emerald-400 bg-emerald-400/10',
  new:        'text-sky-400     bg-sky-400/10',
  contacted:  'text-amber-400   bg-amber-400/10',
  quoted:     'text-[#82C93A]   bg-[#6AAB2E]/10',
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-[1100px]">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-black text-white tracking-tight">Dashboard</h1>
        <p className="text-[13px] text-white/30 mt-1">Welcome back — here is your overview.</p>
      </motion.div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s, i) => {
          const Icon = ICONS[s.icon]
          return (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 + i * 0.07 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl p-5 border border-white/[0.06] hover:border-white/10 cursor-default transition-colors"
              style={{ background: s.bg }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: s.color + '20', border: '1px solid ' + s.color + '30' }}>
                  <Icon size={16} style={{ color: s.color }} />
                </div>
                <ArrowUpRight size={13} style={{ color: s.color }} className="opacity-50 mt-1" />
              </div>
              <p className="text-[30px] font-black text-white tracking-tight leading-none">{s.value}</p>
              <p className="text-[11px] text-white/30 font-medium mt-1">{s.label}</p>
              <p className="text-[10px] font-semibold mt-2.5" style={{ color: s.color }}>{s.sub}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-[3fr_2fr] gap-5">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.32 }}
          className="rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: '#0B1524' }}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <ShoppingCart size={14} className="text-[#2A6DD9]" />
              <h2 className="text-[14px] font-bold text-white">Recent Orders</h2>
            </div>
            <Link href="/admin/orders" className="text-[11px] text-[#6AAB2E] hover:text-[#82C93A] font-semibold flex items-center gap-1 transition-colors">
              View all <ArrowUpRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {ORDERS.map((o, i) => (
              <motion.div key={o.id}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.025] transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono font-bold text-[#6EB3FF]/60">{o.id}</span>
                    <Clock size={9} className="text-white/20" />
                    <span className="text-[9px] text-white/20">{o.time}</span>
                  </div>
                  <p className="text-[13px] font-semibold text-white/85 truncate">{o.customer}</p>
                  <p className="text-[11px] text-white/30 truncate mt-0.5">{o.product}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[13px] font-black text-white/80">{o.amount}</p>
                  <span className={"mt-1 inline-block text-[10px] px-2.5 py-0.5 rounded-full font-semibold capitalize " + STATUS[o.status]}>
                    {o.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.38 }}
            className="rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: '#0B1524' }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <Users size={14} className="text-[#6AAB2E]" />
                <h2 className="text-[14px] font-bold text-white">New Leads</h2>
              </div>
              <Link href="/admin/leads" className="text-[11px] text-[#6AAB2E] hover:text-[#82C93A] font-semibold flex items-center gap-1 transition-colors">
                View all <ArrowUpRight size={11} />
              </Link>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {LEADS.map((l, i) => (
                <motion.div key={l.name}
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.07 }}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.025] transition-colors">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                    style={{ background: 'linear-gradient(135deg,#1B4E9B,#6AAB2E)' }}>
                    {l.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-white/85 truncate">{l.name}</p>
                    <p className="text-[10px] text-white/30 truncate">{l.company}</p>
                  </div>
                  <span className={"text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize " + STATUS[l.status]}>
                    {l.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.45 }}
            className="rounded-2xl border border-white/[0.06] p-5" style={{ background: '#0B1524' }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 mb-4">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Add Product', icon: Package,       href: '/admin/products',         color: '#2A6DD9' },
                { label: 'New Lead',    icon: Users,         href: '/admin/leads',             color: '#6AAB2E' },
                { label: 'New Order',   icon: ShoppingCart,  href: '/admin/orders',            color: '#6AAB2E' },
                { label: 'WhatsApp',    icon: MessageCircle, href: 'https://wa.me/260977244549', color: '#25D366' },
              ].map(a => {
                const Icon = a.icon
                return (
                  <motion.a key={a.label} href={a.href}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/[0.06] hover:border-white/10 transition-colors"
                    style={{ background: a.color + '0E' }}>
                    <Icon size={12} style={{ color: a.color }} />
                    <span className="text-[11px] font-semibold text-white/55">{a.label}</span>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}