'use client'
import { ShoppingCart, Users, Package, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const STATS = [
  { label: 'Total Orders',     value: '124',    change: '+12%', up: true,  icon: ShoppingCart, color: '#1B4E9B' },
  { label: 'Active Leads',     value: '38',     change: '+5',   up: true,  icon: Users,        color: '#6AAB2E' },
  { label: 'Products Listed',  value: '20',     change: '',     up: true,  icon: Package,      color: '#2A6DD9' },
  { label: 'Revenue (est.)',   value: 'K 84,200', change: '+18%', up: true, icon: TrendingUp,  color: '#6AAB2E' },
]

const RECENT_ORDERS = [
  { id: '#ORD-041', customer: 'Konkola Copper Mines', product: 'Bosch GCM 340-305 D', amount: 'K 285,000', status: 'pending',    time: '2h ago' },
  { id: '#ORD-040', customer: 'Zesco Limited',        product: 'Structural Steel Pipes (×5)', amount: 'K 1,612,500', status: 'fulfilled', time: '5h ago' },
  { id: '#ORD-039', customer: 'Lafarge Zambia',       product: 'Ingco Nitrile Gloves (×50)', amount: 'K 107,500', status: 'processing', time: '1d ago' },
  { id: '#ORD-038', customer: 'Indo Zambia Bank',     product: 'IT Equipment Supply',        amount: 'K 450,000', status: 'fulfilled', time: '2d ago' },
  { id: '#ORD-037', customer: 'First Quantum Minerals', product: 'Texaco Compressor Oil (×10)', amount: 'K 1,006,200', status: 'pending', time: '3d ago' },
]

const RECENT_LEADS = [
  { name: 'Charles Mwansa',    company: 'Mopani Copper Mines',  service: 'Mechanical Spares',      status: 'new',       time: '30m ago' },
  { name: 'Grace Tembo',       company: 'Zambia Sugar PLC',      service: 'Maintenance Services',   status: 'contacted', time: '2h ago' },
  { name: 'Patrick Mutale',    company: 'ZESCO',                 service: 'IT Equipment Supply',    status: 'quoted',    time: '1d ago' },
  { name: 'Mutinta Haakainde', company: 'Self',                  service: 'Safety Equipment',       status: 'new',       time: '1d ago' },
]

const STATUS_STYLES: Record<string, string> = {
  pending:    'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  processing: 'bg-blue-500/10  text-blue-400  border border-blue-500/20',
  fulfilled:  'bg-green-500/10 text-green-400 border border-green-500/20',
  new:        'bg-[#1B4E9B]/20 text-[#6EB3FF] border border-[#1B4E9B]/30',
  contacted:  'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  quoted:     'bg-[#6AAB2E]/15 text-[#82C93A] border border-[#6AAB2E]/25',
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <p className="text-[13px] text-white/40 mt-0.5">Welcome back — here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="rounded-2xl p-5 border border-white/5 flex flex-col gap-3"
              style={{ background: '#0F1A2E' }}
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${s.color}18`, border: `1px solid ${s.color}25` }}>
                  <Icon size={16} style={{ color: s.color }} />
                </div>
                {s.change && (
                  <span className={`text-[11px] font-bold flex items-center gap-0.5 ${s.up ? 'text-green-400' : 'text-red-400'}`}>
                    {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {s.change}
                  </span>
                )}
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{s.value}</p>
                <p className="text-[11px] text-white/40 mt-0.5 font-medium">{s.label}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">

        {/* Recent Orders */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="rounded-2xl border border-white/5 overflow-hidden" style={{ background: '#0F1A2E' }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="text-[14px] font-bold text-white">Recent Orders</h2>
            <a href="/admin/orders" className="text-[11px] text-[#6AAB2E] hover:text-[#82C93A] font-semibold transition-colors">View all →</a>
          </div>
          <div className="divide-y divide-white/5">
            {RECENT_ORDERS.map(o => (
              <div key={o.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                <div className="hidden sm:flex w-8 h-8 rounded-lg bg-[#1B4E9B]/15 items-center justify-center shrink-0">
                  <ShoppingCart size={13} className="text-[#6EB3FF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-white/90 truncate">{o.customer}</p>
                  <p className="text-[11px] text-white/35 truncate">{o.product}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[12px] font-bold text-white/80">{o.amount}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_STYLES[o.status]}`}>{o.status}</span>
                </div>
                <p className="text-[10px] text-white/25 w-10 text-right shrink-0">{o.time}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Leads */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="rounded-2xl border border-white/5 overflow-hidden" style={{ background: '#0F1A2E' }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="text-[14px] font-bold text-white">New Leads</h2>
            <a href="/admin/leads" className="text-[11px] text-[#6AAB2E] hover:text-[#82C93A] font-semibold transition-colors">View all →</a>
          </div>
          <div className="divide-y divide-white/5">
            {RECENT_LEADS.map(l => (
              <div key={l.name} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B4E9B] to-[#6AAB2E] flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                  {l.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-white/90 truncate">{l.name}</p>
                  <p className="text-[11px] text-white/35 truncate">{l.company}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_STYLES[l.status]}`}>{l.status}</span>
                  <p className="text-[10px] text-white/25 mt-0.5">{l.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick actions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="rounded-2xl border border-white/5 p-5" style={{ background: '#0F1A2E' }}>
        <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-wider mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Add Product',    icon: Package,        href: '/admin/products', color: '#1B4E9B' },
            { label: 'New Order',      icon: ShoppingCart,   href: '/admin/orders',  color: '#6AAB2E' },
            { label: 'Add Lead',       icon: Users,          href: '/admin/leads',   color: '#2A6DD9' },
            { label: 'Send WhatsApp',  icon: MessageCircle,  href: `https://wa.me/260977244549`, color: '#25D366' },
          ].map(a => {
            const Icon = a.icon
            return (
              <a key={a.label} href={a.href}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-semibold text-white/70 hover:text-white border border-white/8 hover:border-white/15 transition-all"
                style={{ background: `${a.color}0D` }}
              >
                <Icon size={13} style={{ color: a.color }} />
                {a.label}
              </a>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
