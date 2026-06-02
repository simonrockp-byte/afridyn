'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Search, Plus, Pencil, Trash2, Package, Filter } from 'lucide-react'
import { motion } from 'framer-motion'

const PRODUCTS = [
  { id: 1,  name: 'Bosch IDS 18V-200T Impact Wrench',      brand: 'Bosch',   category: 'Industrial Tools',    price: 125000, stock: 8,  image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5796/7459/Bosch_IDS_18V-200T__43235.1771846409.jpg?c=2' },
  { id: 2,  name: 'Bosch GCM 340-305 D Sliding Miter Saw', brand: 'Bosch',   category: 'Industrial Tools',    price: 285000, stock: 3,  image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5795/7457/Bosch_GCM_340-305_D__63851.1771846177.jpg?c=2' },
  { id: 3,  name: 'Bosch GCO 230 Metal Cut-Off Saw',       brand: 'Bosch',   category: 'Industrial Tools',    price: 95000,  stock: 12, image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5794/7454/Bosch_GCO_230__39847.1771845621.jpg?c=2' },
  { id: 4,  name: 'Ingco Rain Coat HRCTL031',              brand: 'Ingco',   category: 'Safety',              price: 16125,  stock: 45, image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5800/7466/HRCTL031.L__94565.1779195549.jpg?c=2' },
  { id: 5,  name: 'Ingco Dust Mask HDM07',                 brand: 'Ingco',   category: 'Safety',              price: 2850,   stock: 200,image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/2098/2934/Dust_mask_INGCO_HDMO7__79345.1569253820.jpg?c=2' },
  { id: 6,  name: 'Texaco Cetus DE 100 Compressor Oil',    brand: 'Texaco',  category: 'Lubes & Chemicals',   price: 100620, stock: 22, image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/842/1150/Texaco_cetus_SE_100_synthetic_compressor_oil__64186.1473538109.jpg?c=2' },
  { id: 7,  name: 'Bosch STD Metal Cutting Disc 115mm',    brand: 'Bosch',   category: 'Welding Supplies',    price: 3500,   stock: 300,image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/346/536/metal_disc_115mm__98499.1427979181.jpg?c=2' },
  { id: 8,  name: 'Infrared Thermometer GM320',            brand: 'Richmeters','category': 'Industrial Tools', price: 37625,  stock: 15, image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/1271/1907/RICHMETERS-GM320-Digital-infrared-Thermometer-Temperature-Gun__94120.1591019359.jpg?c=2' },
  { id: 9,  name: 'Nitrogen Gas 40L High Purity Cylinder', brand: 'Unbranded','category':'Welding Supplies',   price: 30500,  stock: 6,  image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/137/7102/Nitrogen_Gas_High_purity_compressed_50_liters_returnable_Cylinders__48534.1710134991.jpg?c=2' },
  { id: 10, name: 'USK Self Priming Water Pump 1HP',       brand: 'USK',     category: 'Industrial Tools',    price: 45000,  stock: 18, image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5799/7465/USK_water_pump_1Hp__91891.1776438216.png?c=2' },
]

const CATEGORIES = ['All', 'Industrial Tools', 'Safety', 'Welding Supplies', 'Lubes & Chemicals']

export default function ProductsPage() {
  const [search, setSearch]   = useState('')
  const [cat, setCat]         = useState('All')
  const [selected, setSelected] = useState<number[]>([])

  const filtered = PRODUCTS.filter(p =>
    (cat === 'All' || p.category === cat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
  )

  const toggle = (id: number) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Products</h1>
          <p className="text-[12px] text-white/40 mt-0.5">{PRODUCTS.length} products in catalogue</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all" style={{ background: 'linear-gradient(135deg, #1B4E9B, #2A6DD9)' }}>
          <Plus size={15} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text" placeholder="Search products…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-[13px] text-white placeholder:text-white/25 border border-white/8 outline-none focus:border-[#1B4E9B]/60 transition-colors"
            style={{ background: '#0F1A2E' }}
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter size={13} className="text-white/30" />
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${cat === c ? 'bg-[#1B4E9B] text-white' : 'text-white/40 hover:text-white border border-white/8'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
        className="rounded-2xl border border-white/5 overflow-hidden"
        style={{ background: '#0F1A2E' }}
      >
        {/* Table header */}
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/5 text-[10px] font-bold uppercase tracking-wider text-white/25">
          <span />
          <span>Product</span>
          <span className="hidden md:block">Category</span>
          <span>Price (K)</span>
          <span>Stock</span>
          <span>Actions</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/5">
          {filtered.map((p, i) => {
            const stockColor = p.stock <= 5 ? 'text-red-400' : p.stock <= 20 ? 'text-amber-400' : 'text-green-400'
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className={`grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-5 py-3.5 items-center hover:bg-white/[0.02] transition-colors ${selected.includes(p.id) ? 'bg-[#1B4E9B]/5' : ''}`}
              >
                <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggle(p.id)}
                  className="w-3.5 h-3.5 rounded accent-[#1B4E9B]" />

                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/8" style={{ background: '#162035' }}>
                    <Image src={p.image} alt={p.name} width={40} height={40} className="object-contain w-full h-full p-1" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-white/90 truncate">{p.name}</p>
                    <p className="text-[10px] text-white/35">{p.brand}</p>
                  </div>
                </div>

                <span className="hidden md:block text-[11px] text-white/40 font-medium">{p.category}</span>

                <span className="text-[12px] font-bold text-white/80 tabular-nums">
                  {p.price.toLocaleString()}
                </span>

                <span className={`text-[12px] font-bold tabular-nums ${stockColor}`}>
                  {p.stock}
                </span>

                <div className="flex items-center gap-1.5">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-[#6EB3FF] hover:bg-[#1B4E9B]/15 transition-all">
                    <Pencil size={12} />
                  </button>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <Trash2 size={12} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
          <p className="text-[11px] text-white/25">{filtered.length} of {PRODUCTS.length} products</p>
          {selected.length > 0 && (
            <button className="text-[11px] text-red-400 hover:text-red-300 font-semibold transition-colors">
              Delete selected ({selected.length})
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
