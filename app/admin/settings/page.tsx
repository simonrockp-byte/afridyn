'use client'
import { useState } from 'react'
import { Save, Store, Phone, Mail, MapPin, Bell, Shield, Palette } from 'lucide-react'

const Section = ({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ size?: number; className?: string }>; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-white/5 overflow-hidden" style={{ background: '#0F1A2E' }}>
    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/5">
      <Icon size={15} className="text-[#6AAB2E]" />
      <h2 className="text-[13px] font-bold text-white">{title}</h2>
    </div>
    <div className="p-5 space-y-4">{children}</div>
  </div>
)

const Field = ({ label, value, type = 'text', placeholder }: { label: string; value: string; type?: string; placeholder?: string }) => {
  const [val, setVal] = useState(value)
  return (
    <div>
      <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1.5">{label}</label>
      <input type={type} value={val} onChange={e => setVal(e.target.value)} placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white border border-white/8 outline-none focus:border-[#1B4E9B]/60 transition-colors"
        style={{ background: '#162035' }} />
    </div>
  )
}

export default function SettingsPage() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-white">Settings</h1>
        <p className="text-[12px] text-white/40 mt-0.5">Manage your store and admin preferences</p>
      </div>

      <Section title="Store Information" icon={Store}>
        <Field label="Business Name"    value="Afridyn Engineering Limited" />
        <Field label="Business Tagline" value="Africa's Trusted Engineering Partner" />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="PACRA Number" value="120261040695" />
          <Field label="ZPPA Reg."    value="137269" />
        </div>
      </Section>

      <Section title="Contact Details" icon={Phone}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="WhatsApp Number" value="+260 977 244 549" type="tel" />
          <Field label="Office Phone"    value="+260 969 628 707" type="tel" />
        </div>
        <Field label="Email Address" value="info@afridynengineering.com" type="email" />
        <Field label="Physical Address" value="31 Salama Park, Lusaka, Zambia" />
      </Section>

      <Section title="Notifications" icon={Bell}>
        {[
          { label: 'New WhatsApp lead received',    on: true },
          { label: 'Order status changed',          on: true },
          { label: 'Low stock alert (≤5 units)',    on: true },
          { label: 'Weekly summary report',         on: false },
        ].map(n => (
          <div key={n.label} className="flex items-center justify-between py-1">
            <span className="text-[13px] text-white/70 font-medium">{n.label}</span>
            <button className={`relative w-10 h-5 rounded-full transition-all duration-200 ${n.on ? 'bg-[#6AAB2E]' : 'bg-white/10'}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${n.on ? 'left-5' : 'left-0.5'}`} />
            </button>
          </div>
        ))}
      </Section>

      <Section title="Security" icon={Shield}>
        <Field label="Admin Email"    value="admin@afridynengineering.com" type="email" />
        <Field label="New Password"   value=""    type="password" placeholder="Leave blank to keep current" />
        <Field label="Confirm Password" value="" type="password" placeholder="Repeat new password" />
      </Section>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #1B4E9B, #2A6DD9)' }}>
          <Save size={14} />
          Save Changes
        </button>
      </div>
    </div>
  )
}
