'use client'
import { useState } from 'react'
import { Search, Plus, MessageCircle, Phone, Mail, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'

type Status = 'new' | 'contacted' | 'quoted' | 'won' | 'lost'

const LEADS = [
  { id: 1,  name: 'Charles Mwansa',     company: 'Mopani Copper Mines',      service: 'Mechanical & Electrical Spares',   phone: '+260 971 234 567', email: 'c.mwansa@mopani.com',    status: 'new'       as Status, value: 450000,  date: '2026-06-02', notes: 'Urgently needs bearings for crusher unit' },
  { id: 2,  name: 'Grace Tembo',        company: 'Zambia Sugar PLC',          service: 'Maintenance Services',              phone: '+260 955 678 901', email: 'g.tembo@zambiasugar.zm', status: 'contacted' as Status, value: 120000,  date: '2026-06-01', notes: 'Monthly retainer discussion ongoing' },
  { id: 3,  name: 'Patrick Mutale',     company: 'ZESCO',                     service: 'IT Equipment Supply',               phone: '+260 966 345 678', email: 'p.mutale@zesco.co.zm',   status: 'quoted'    as Status, value: 800000,  date: '2026-05-31', notes: 'Quoted 50× laptops + networking gear' },
  { id: 4,  name: 'Mutinta Haakainde',  company: 'Self Employed',             service: 'Safety Equipment',                  phone: '+260 979 012 345', email: 'mutinta@gmail.com',       status: 'new'       as Status, value: 15000,   date: '2026-06-02', notes: '' },
  { id: 5,  name: 'Joseph Phiri',       company: 'First Quantum Minerals',    service: 'Engineering Consultation',          phone: '+260 960 789 012', email: 'j.phiri@fqm.com',         status: 'won'       as Status, value: 2500000, date: '2026-05-28', notes: 'Contract signed — 6-month retainer' },
  { id: 6,  name: 'Amina Banda',        company: 'Airtel Zambia',             service: 'Optical Fibre Installation',        phone: '+260 975 432 109', email: 'a.banda@airtel.zm',       status: 'quoted'    as Status, value: 1200000, date: '2026-05-29', notes: 'Site survey done, awaiting approval' },
  { id: 7,  name: 'Rodger Kasonde',     company: 'Lafarge Zambia',            service: 'Logistics & Supply Chain',          phone: '+260 962 111 222', email: 'r.kasonde@lafarge.zm',    status: 'contacted' as Status, value: 350000,  date: '2026-05-30', notes: '' },
  { id: 8,  name: 'Natasha Chikwanda',  company: 'Investrust Bank',           service: 'IT Equipment Supply',               phone: '+260 977 333 444', email: 'n.chik@investrust.zm',   status: 'lost'      as Status, value: 220000,  date: '2026-05-25', notes: 'Lost to cheaper competitor' },
]

const PIPELINE: { label: string; status: Status; color: string }[] = [
  { label: 'New',       status: 'new',       color: '#1B4E9B' },
  { label: 'Contacted', status: 'contacted', color: '#F59E0B' },
  { label: 'Quoted',    status: 'quoted',    color: '#6AAB2E' },
  { label: 'Won',       status: 'won',       color: '#10B981' },
  { label: 'Lost',      status: 'lost',      color: '#EF4444' },
]

const STATUS_BADGE: Record<Status, string> = {
  new:       'bg-[#1B4E9B]/20 text-[#6EB3FF] border border-[#1B4E9B]/30',
  contacted: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  quoted:    'bg-[#6AAB2E]/15 text-[#82C93A] border border-[#6AAB2E]/25',
  won:       'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  lost:      'bg-red-500/10 text-red-400 border border-red-500/20',
}

export default function LeadsPage() {
  const [search, setSearch]       = useState('')
  const [filter, setFilter]       = useState<Status | 'all'>('all')
  const [view, setView]           = useState<'table' | 'kanban'>('table')

  const filtered = LEADS.filter(l =>
    (filter === 'all' || l.status === filter) &&
    (l.name.toLowerCase().includes(search.toLowerCase()) ||
     l.company.toLowerCase().includes(search.toLowerCase()))
  )

  const totalValue = LEADS.filter(l => l.status === 'won').reduce((s, l) => s + l.value, 0)
  const pipelineValue = LEADS.filter(l => !['won','lost'].includes(l.status)).reduce((s, l) => s + l.value, 0)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Leads & CRM</h1>
          <p className="text-[12px] text-white/40 mt-0.5">{LEADS.length} leads · K {pipelineValue.toLocaleString()} in pipeline</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white" style={{ background: 'linear-gradient(135deg, #1B4E9B, #2A6DD9)' }}>
          <Plus size={15} /> Add Lead
        </button>
      </div>

      {/* Pipeline summary */}
      <div className="grid grid-cols-5 gap-3">
        {PIPELINE.map(p => {
          const count = LEADS.filter(l => l.status === p.status).length
          const val   = LEADS.filter(l => l.status === p.status).reduce((s, l) => s + l.value, 0)
          return (
            <motion.button
              key={p.status}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              onClick={() => setFilter(filter === p.status ? 'all' : p.status)}
              className={`rounded-xl p-3 text-left border transition-all ${filter === p.status ? 'border-white/20 scale-[1.02]' : 'border-white/5 hover:border-white/10'}`}
              style={{ background: filter === p.status ? `${p.color}18` : '#0F1A2E' }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: p.color }}>{p.label}</span>
              </div>
              <p className="text-lg font-black text-white">{count}</p>
              <p className="text-[10px] text-white/30 font-medium">K {val.toLocaleString()}</p>
            </motion.button>
          )
        })}
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input type="text" placeholder="Search leads…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl text-[12px] text-white placeholder:text-white/25 border border-white/8 outline-none focus:border-[#1B4E9B]/60"
            style={{ background: '#0F1A2E' }} />
        </div>
        <div className="flex items-center gap-1">
          {(['table', 'kanban'] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all ${view === v ? 'bg-[#1B4E9B] text-white' : 'text-white/40 hover:text-white'}`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === 'table' ? (
        /* Table view */
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-white/5 overflow-hidden" style={{ background: '#0F1A2E' }}>
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/5 text-[10px] font-bold uppercase tracking-wider text-white/25">
            <span>Lead</span>
            <span className="hidden lg:block">Service</span>
            <span>Value</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          <div className="divide-y divide-white/5">
            {filtered.map((l, i) => (
              <motion.div key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3.5 items-center hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B4E9B] to-[#6AAB2E] flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                    {l.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-white/90 truncate">{l.name}</p>
                    <p className="text-[10px] text-white/35 truncate">{l.company}</p>
                  </div>
                </div>
                <span className="hidden lg:block text-[11px] text-white/40 max-w-[160px] truncate">{l.service}</span>
                <span className="text-[12px] font-bold text-white/70 tabular-nums">K {l.value.toLocaleString()}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize whitespace-nowrap ${STATUS_BADGE[l.status]}`}>{l.status}</span>
                <div className="flex gap-1.5">
                  <a href={`https://wa.me/${l.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-[#25D366] hover:bg-[#25D366]/10 transition-all">
                    <MessageCircle size={12} />
                  </a>
                  <a href={`tel:${l.phone}`}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-[#6EB3FF] hover:bg-[#1B4E9B]/15 transition-all">
                    <Phone size={12} />
                  </a>
                  <a href={`mailto:${l.email}`}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-[#82C93A] hover:bg-[#6AAB2E]/10 transition-all">
                    <Mail size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        /* Kanban view */
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto">
          {PIPELINE.map(col => (
            <div key={col.status} className="min-w-[200px]">
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: col.color }}>{col.label}</span>
                <span className="text-[10px] text-white/30 ml-auto font-medium">
                  {LEADS.filter(l => l.status === col.status).length}
                </span>
              </div>
              <div className="space-y-2">
                {LEADS.filter(l => l.status === col.status).map(l => (
                  <div key={l.id} className="rounded-xl p-3 border border-white/5 hover:border-white/10 cursor-pointer transition-all" style={{ background: '#0F1A2E' }}>
                    <p className="text-[12px] font-semibold text-white/90 mb-0.5">{l.name}</p>
                    <p className="text-[10px] text-white/40 mb-2">{l.company}</p>
                    <p className="text-[11px] font-bold" style={{ color: col.color }}>K {l.value.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
