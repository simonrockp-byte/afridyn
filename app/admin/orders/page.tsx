'use client'
import { useState } from 'react'
import { Search, MessageCircle, Eye, Filter } from 'lucide-react'
import { motion } from 'framer-motion'

type OrderStatus = 'pending' | 'processing' | 'fulfilled' | 'cancelled'

const ORDERS = [
  { id: '#ORD-041', customer: 'Konkola Copper Mines',  product: 'Bosch GCM 340-305 D Miter Saw',        qty: 1,  amount: 285000,  status: 'pending'    as OrderStatus, phone: '+260971234567', date: '2026-06-02' },
  { id: '#ORD-040', customer: 'Zesco Limited',          product: 'Structural Steel 4" SCH 80 Pipes',      qty: 5,  amount: 1612500, status: 'fulfilled'  as OrderStatus, phone: '+260966345678', date: '2026-06-01' },
  { id: '#ORD-039', customer: 'Lafarge Zambia',         product: 'Ingco Nitrile Gloves HGNG01',           qty: 50, amount: 107500,  status: 'processing' as OrderStatus, phone: '+260962111222', date: '2026-06-01' },
  { id: '#ORD-038', customer: 'Indo Zambia Bank',       product: 'IT Equipment (Custom Quote)',           qty: 1,  amount: 450000,  status: 'fulfilled'  as OrderStatus, phone: '+260977333444', date: '2026-05-31' },
  { id: '#ORD-037', customer: 'First Quantum Minerals', product: 'Texaco Cetus DE 100 Compressor Oil',    qty: 10, amount: 1006200, status: 'pending'    as OrderStatus, phone: '+260960789012', date: '2026-05-30' },
  { id: '#ORD-036', customer: 'Airtel Zambia',          product: 'Optical Fibre Installation (500m)',     qty: 1,  amount: 1200000, status: 'processing' as OrderStatus, phone: '+260975432109', date: '2026-05-29' },
  { id: '#ORD-035', customer: 'Shoprite Zambia',        product: 'Bosch ISR 18V-30 PHX Driver Drill',     qty: 8,  amount: 628000,  status: 'fulfilled'  as OrderStatus, phone: '+260955678901', date: '2026-05-28' },
  { id: '#ORD-034', customer: 'Self — Patrick Mutale',  product: 'Ingco Dust Mask HDM07',                 qty: 100,amount: 285000,  status: 'cancelled'  as OrderStatus, phone: '+260966345678', date: '2026-05-27' },
]

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending:    'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  processing: 'bg-blue-500/10  text-blue-400  border border-blue-500/20',
  fulfilled:  'bg-green-500/10 text-green-400 border border-green-500/20',
  cancelled:  'bg-red-500/10   text-red-400   border border-red-500/20',
}

const STATUSES: OrderStatus[] = ['pending', 'processing', 'fulfilled', 'cancelled']

export default function OrdersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')

  const filtered = ORDERS.filter(o =>
    (filter === 'all' || o.status === filter) &&
    (o.customer.toLowerCase().includes(search.toLowerCase()) ||
     o.id.toLowerCase().includes(search.toLowerCase()))
  )

  const total     = ORDERS.reduce((s, o) => s + (o.status !== 'cancelled' ? o.amount : 0), 0)
  const pending   = ORDERS.filter(o => o.status === 'pending').length
  const fulfilled = ORDERS.filter(o => o.status === 'fulfilled').length

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Orders</h1>
          <p className="text-[12px] text-white/40 mt-0.5">{ORDERS.length} orders · K {total.toLocaleString()} total revenue</p>
        </div>
      </div>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Total Orders', value: ORDERS.length, color: '#2A6DD9' },
          { label: 'Pending',      value: pending,        color: '#F59E0B' },
          { label: 'Fulfilled',    value: fulfilled,      color: '#10B981' },
          { label: 'Revenue',      value: `K ${(total/1000).toFixed(0)}K`, color: '#6AAB2E' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/5"
            style={{ background: '#0F1A2E' }}>
            <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            <span className="text-[11px] text-white/40 font-medium">{s.label}</span>
            <span className="text-[14px] font-black text-white ml-1">{s.value}</span>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input type="text" placeholder="Search orders…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl text-[12px] text-white placeholder:text-white/25 border border-white/8 outline-none focus:border-[#1B4E9B]/60"
            style={{ background: '#0F1A2E' }} />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter size={12} className="text-white/30" />
          <button onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${filter === 'all' ? 'bg-[#1B4E9B] text-white' : 'text-white/40 hover:text-white border border-white/8'}`}>
            All
          </button>
          {STATUSES.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold capitalize transition-all ${filter === s ? 'bg-[#1B4E9B] text-white' : 'text-white/40 hover:text-white border border-white/8'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="rounded-2xl border border-white/5 overflow-hidden" style={{ background: '#0F1A2E' }}>
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/5 text-[10px] font-bold uppercase tracking-wider text-white/25">
          <span>Order</span>
          <span>Customer / Product</span>
          <span>Qty</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        <div className="divide-y divide-white/5">
          {filtered.map((o, i) => (
            <motion.div key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-5 py-3.5 items-center hover:bg-white/[0.02] transition-colors">
              <div>
                <p className="text-[11px] font-mono font-bold text-[#6EB3FF]">{o.id}</p>
                <p className="text-[10px] text-white/25">{o.date}</p>
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-white/90 truncate">{o.customer}</p>
                <p className="text-[10px] text-white/35 truncate">{o.product}</p>
              </div>
              <span className="text-[12px] font-bold text-white/60 tabular-nums text-center">{o.qty}</span>
              <span className="text-[12px] font-bold text-white/80 tabular-nums">K {o.amount.toLocaleString()}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize whitespace-nowrap ${STATUS_STYLES[o.status]}`}>
                {o.status}
              </span>
              <div className="flex gap-1.5">
                <a href={`https://wa.me/${o.phone}`} target="_blank" rel="noopener"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-[#25D366] hover:bg-[#25D366]/10 transition-all">
                  <MessageCircle size={12} />
                </a>
                <button className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all">
                  <Eye size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-white/5">
          <p className="text-[11px] text-white/25">Showing {filtered.length} of {ORDERS.length} orders</p>
        </div>
      </motion.div>
    </div>
  )
}
