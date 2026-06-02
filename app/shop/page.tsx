'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, Search, SlidersHorizontal, Star, BadgeCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const CATEGORIES = ['All', 'Industrial Tools', 'Safety', 'Welding Supplies', 'Lubes & Chemicals']

const PRODUCTS = [
  {
    id: 1,
    name: 'Bosch IDS 18V-200T Impact Wrench',
    brand: 'Bosch',
    category: 'Industrial Tools',
    price: 125000,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5796/7459/Bosch_IDS_18V-200T__43235.1771846409.jpg?c=2',
    badge: 'New',
  },
  {
    id: 2,
    name: 'Bosch GCM 340-305 D Sliding Miter Saw',
    brand: 'Bosch',
    category: 'Industrial Tools',
    price: 285000,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5795/7457/Bosch_GCM_340-305_D__63851.1771846177.jpg?c=2',
    badge: 'New',
  },
  {
    id: 3,
    name: 'Bosch GCO 230 Metal Cut-Off Saw',
    brand: 'Bosch',
    category: 'Industrial Tools',
    price: 95000,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5794/7454/Bosch_GCO_230__39847.1771845621.jpg?c=2',
    badge: null,
  },
  {
    id: 4,
    name: 'Bosch ISR 18V-30 PHX Driver Drill',
    brand: 'Bosch',
    category: 'Industrial Tools',
    price: 78500,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5793/7450/Bosch_ISR_18V-30_PHX__76755.1771845022.jpg?c=2',
    badge: 'New',
  },
  {
    id: 5,
    name: 'Bosch GLL 12V-100-33 CG Line Laser',
    brand: 'Bosch',
    category: 'Industrial Tools',
    price: 89500,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5798/7461/Bosch_GLL_12V-100-33_CG__87821.1771846910.jpg?c=2',
    badge: null,
  },
  {
    id: 6,
    name: 'Bosch GLL 80-33 G Green Line Laser',
    brand: 'Bosch',
    category: 'Industrial Tools',
    price: 67200,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5797/7460/Bosch_GLL_80-33_G__29111.1771846718.jpg?c=2',
    badge: null,
  },
  {
    id: 7,
    name: 'Bosch GCM 10 J Mitre Saw',
    brand: 'Bosch',
    category: 'Industrial Tools',
    price: 215000,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/350/1594/Bosch_GCM_10_J_Mitre_saw_GZ_Industrial_SUpplies__38279.1710052839.jpg?c=2',
    badge: null,
  },
  {
    id: 8,
    name: 'Bosch GKE 35 BCE Chainsaw',
    brand: 'Bosch',
    category: 'Industrial Tools',
    price: 145000,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/347/1593/Bosch_GKE_35_BCE_CHainsaw___07731.1710036543.jpg?c=2',
    badge: null,
  },
  {
    id: 9,
    name: 'Infrared Thermometer GM320',
    brand: 'Richmeters',
    category: 'Industrial Tools',
    price: 37625,
    originalPrice: 48900,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/1271/1907/RICHMETERS-GM320-Digital-infrared-Thermometer-Temperature-Gun__94120.1591019359.jpg?c=2',
    badge: 'Sale',
  },
  {
    id: 10,
    name: 'Structural Steel 4" SCH 80 Pipes',
    brand: 'Hellog Energy',
    category: 'Industrial Tools',
    price: 322500,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5547/7086/line_pipes__04012.1685977424.jpg?c=2',
    badge: null,
  },
  {
    id: 11,
    name: 'Self Priming 1HP USK Water Pump (JET100)',
    brand: 'Hellog Energy',
    category: 'Industrial Tools',
    price: 45000,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5799/7465/USK_water_pump_1Hp__91891.1776438216.png?c=2',
    badge: 'New',
  },
  {
    id: 12,
    name: 'Ingco Rain Coat HRCTL031',
    brand: 'Ingco',
    category: 'Safety',
    price: 16125,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5800/7466/HRCTL031.L__94565.1779195549.jpg?c=2',
    badge: 'New',
  },
  {
    id: 13,
    name: 'Ingco Dust Mask HDM07',
    brand: 'Ingco',
    category: 'Safety',
    price: 2850,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/2098/2934/Dust_mask_INGCO_HDMO7__79345.1569253820.jpg?c=2',
    badge: 'Best Seller',
  },
  {
    id: 14,
    name: 'Disposable Lab Coat',
    brand: 'Hellog Energy',
    category: 'Safety',
    price: 4200,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5198/6694/Lab_coat__23925.1671434188.jpg?c=2',
    badge: 'Best Seller',
  },
  {
    id: 15,
    name: 'Nitrile Gloves INGCO HGNG01',
    brand: 'Ingco',
    category: 'Safety',
    price: 2150,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/5424/6957/xl__67956.1681398297.jpg?c=2',
    badge: 'Best Seller',
  },
  {
    id: 16,
    name: 'Bosch STD Metal Cutting Disc 115mm',
    brand: 'Bosch',
    category: 'Welding Supplies',
    price: 3500,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/346/536/metal_disc_115mm__98499.1427979181.jpg?c=2',
    badge: null,
  },
  {
    id: 17,
    name: 'Nitrogen Gas 40L High Purity Cylinder',
    brand: 'Unbranded',
    category: 'Welding Supplies',
    price: 30500,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/137/7102/Nitrogen_Gas_High_purity_compressed_50_liters_returnable_Cylinders__48534.1710134991.jpg?c=2',
    badge: null,
  },
  {
    id: 18,
    name: 'Texaco Cetus DE 100 Compressor Oil',
    brand: 'Texaco',
    category: 'Lubes & Chemicals',
    price: 100620,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/842/1150/Texaco_cetus_SE_100_synthetic_compressor_oil__64186.1473538109.jpg?c=2',
    badge: 'Featured',
  },
  {
    id: 19,
    name: 'Sigma Thinner 91-92',
    brand: 'Sigma Marine',
    category: 'Lubes & Chemicals',
    price: 8750,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/1026/1535/Sigma_Thinner_91-92__29553.1507902703.jpg?c=2',
    badge: null,
  },
  {
    id: 20,
    name: 'Jumbo Bags (Heavy Duty)',
    brand: 'Hellog Energy',
    category: 'Industrial Tools',
    price: 12500,
    image: 'https://cdn11.bigcommerce.com/s-x3ki4mm/images/stencil/590x590/products/1541/2278/jumbo_bags__78583.1559053439.jpg?c=2',
    badge: null,
  },
]

const BADGE_STYLES: Record<string, string> = {
  'New':        'bg-[#1B4E9B] text-white',
  'Sale':       'bg-red-500 text-white',
  'Best Seller':'bg-[#6AAB2E] text-white',
  'Featured':   'bg-[#0F2F5E] text-white',
}

function formatPrice(n: number) {
  return 'K ' + n.toLocaleString('en-ZM')
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [cartCount, setCartCount] = useState(0)

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.brand.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <main className="min-h-screen bg-[var(--surface)]">

      {/* ── Hero Banner ── */}
      <section
        className="relative pt-[72px] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0F2F5E 0%, #1B4E9B 55%, #2A6DD9 100%)',
        }}
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Green accent blob */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #6AAB2E, transparent 70%)' }} />

        <div className="container relative z-10 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <BadgeCheck size={16} className="text-[#6AAB2E]" />
              <span className="text-[#82C93A] text-[13px] font-semibold tracking-widest uppercase">
                Africa&apos;s Trusted Industrial Store
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-white leading-tight mb-4">
              Industrial Supplies &<br />
              <span style={{ color: '#6AAB2E' }}>Engineering Equipment</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Premium tools, safety gear, lubricants and industrial equipment — sourced from the world&apos;s leading brands and delivered across Africa.
            </p>

            {/* Search */}
            <div className="relative max-w-lg">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B82A8]" />
              <input
                type="text"
                placeholder="Search products, brands…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-[#0A1E3D] placeholder:text-[#6B82A8] text-[15px] font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6AAB2E]"
              />
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-8 mt-10 pb-2"
          >
            {[
              { label: 'Products', value: '500+' },
              { label: 'Brands', value: '20+' },
              { label: 'Countries Served', value: '5+' },
              { label: 'Support', value: '24 / 7' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-white/50 text-xs font-medium uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="relative h-10">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 40 C360 0 1080 0 1440 40 L1440 40 L0 40 Z" fill="#F8FAFC"/>
          </svg>
        </div>
      </section>

      {/* ── Category Filters + Cart ── */}
      <section className="sticky top-[72px] z-30 bg-white/95 border-b border-[var(--border)]"
        style={{ backdropFilter: 'blur(16px)' }}>
        <div className="container py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal size={15} className="text-[var(--text-muted)] shrink-0" />
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#1B4E9B] text-white shadow-md'
                    : 'text-[#3D5275] hover:bg-[var(--surface-3)] border border-[var(--border)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="relative flex items-center gap-2 btn btn-outline btn-sm px-4">
            <ShoppingCart size={15} />
            <span className="text-[13px] font-semibold">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#6AAB2E] text-white text-[11px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="container py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[var(--text-muted)] text-sm font-medium">
            Showing <span className="text-[var(--text-primary)] font-bold">{filtered.length}</span> products
            {activeCategory !== 'All' && <> in <span className="text-[#1B4E9B] font-bold">{activeCategory}</span></>}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 text-[var(--text-muted)]"
            >
              <Search size={40} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-semibold">No products found</p>
              <p className="text-sm mt-1">Try adjusting your search or filter.</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="card group flex flex-col overflow-hidden bg-white border border-[var(--border)] hover:border-[var(--border-medium)] hover:shadow-xl transition-all duration-300 rounded-2xl"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-[var(--surface-3)] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.badge && (
                      <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${BADGE_STYLES[product.badge] ?? 'bg-gray-200 text-gray-700'}`}>
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 p-4 gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-[#1B4E9B] uppercase tracking-wider">{product.brand}</span>
                      <span className="text-[var(--border-strong)]">·</span>
                      <span className="text-[11px] text-[var(--text-muted)]">{product.category}</span>
                    </div>

                    <h3 className="text-[14px] font-bold text-[var(--text-primary)] leading-snug line-clamp-2 flex-1">
                      {product.name}
                    </h3>

                    {/* Stars placeholder */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={11} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-[18px] font-black text-[#0A1E3D]">
                        {formatPrice(product.price)}
                      </span>
                      {'originalPrice' in product && product.originalPrice && (
                        <span className="text-[12px] text-[var(--text-muted)] line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => setCartCount(c => c + 1)}
                      className="mt-2 w-full btn btn-primary btn-sm flex items-center justify-center gap-2 py-2.5 text-[13px]"
                    >
                      <ShoppingCart size={14} />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Brands Bar ── */}
      <section className="border-t border-[var(--border)] bg-white py-10">
        <div className="container">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-7">
            Trusted Brands We Stock
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {['Bosch', 'Ingco', 'DongCheng', 'Texaco', 'Sigma Marine', 'Hellog Energy'].map(brand => (
              <span key={brand} className="text-[16px] font-black text-[#2C4878] opacity-60 hover:opacity-100 transition-opacity">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #0F2F5E, #1B4E9B)' }}
      >
        <div className="container text-center">
          <h2 className="text-3xl font-black text-white mb-3">
            Need a Custom Quote?
          </h2>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            Looking for bulk orders or specific engineering supplies? Our team is available 24/7.
          </p>
          <a
            href="/#contact"
            className="btn btn-cta btn-lg inline-flex items-center gap-2 px-10"
          >
            Request a Quote
          </a>
        </div>
      </section>
    </main>
  )
}
