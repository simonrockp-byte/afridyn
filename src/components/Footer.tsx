"use client";

import Image from "next/image";

export default function Footer() {
  const goto = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--off-white)" }}>
      {/* Top gradient accent */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent 0%, var(--copper) 40%, var(--teal) 60%, transparent 100%)" }} />

      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)",
        backgroundSize: "72px 72px",
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-9 h-9">
                <Image src="/afridyn_logo.png" alt="Afridyn" fill className="object-contain" />
              </div>
              <div className="text-left leading-none">
                <p className="font-display font-black text-sm tracking-widest" style={{ color: "var(--navy)" }}>AFRIDYN</p>
                <p className="text-[8px] font-bold tracking-[.3em] opacity-30 uppercase" style={{ color: "var(--navy)" }}>Engineering</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              Engineering Excellence Across Africa — delivering world-class industrial,
              IT, and logistics solutions since 2013.
            </p>
            <div className="flex gap-3">
              {[{ l: "in", bg: "#0077B5" }, { l: "f", bg: "#1877F2" }, { l: "t", bg: "#1DA1F2" }].map((s) => (
                <a key={s.l} href="#" className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold transition-all hover:scale-110 hover:shadow-lg" style={{ background: s.bg }}>{s.l}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-var(--navy) text-sm mb-7 tracking-wide uppercase">Navigation</h4>
            <ul className="space-y-4">
              {[["home","Home"],["about","About"],["services","Services"],["why-us","Why Choose Us"],["contact","Contact"]].map(([id, label]) => (
                <li key={id}>
                  <button onClick={() => goto(id)} className="text-sm transition-colors hover:text-var(--copper) group flex items-center gap-3" style={{ color: "var(--text-muted)" }}>
                    <span className="w-0 group-hover:w-3 h-px transition-all duration-300" style={{ background: "var(--copper)" }} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-var(--navy) text-sm mb-7 tracking-wide uppercase">Services</h4>
            <ul className="space-y-4">
              {["Mech. & Elec. Spares","Maintenance","Engineering Consulting","IT Equipment","Optical Fibre","Logistics","Clearing & Forwarding"].map((s) => (
                <li key={s}>
                  <button onClick={() => goto("services")} className="text-sm transition-colors hover:text-var(--teal) text-left group flex items-center gap-3" style={{ color: "var(--text-muted)" }}>
                    <span className="w-0 group-hover:w-3 h-px transition-all duration-300 shrink-0" style={{ background: "var(--teal)" }} />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Certs */}
          <div>
            <h4 className="font-display font-bold text-var(--navy) text-sm mb-7 tracking-wide uppercase">Contact</h4>
            <div className="space-y-4 mb-10">
              {[["📍","Lusaka, Zambia"], ["📞","+260 XXX XXX XXX"], ["✉️","info@afridynengineering.com"]].map(([icon, text]) => (
                <p key={text} className="flex items-start gap-3.5 text-sm" style={{ color: "var(--text-muted)" }}>
                  <span className="opacity-60">{icon}</span><span>{text}</span>
                </p>
              ))}
            </div>
            <p className="text-[10px] mb-3.5 uppercase tracking-[.2em] font-bold opacity-30" style={{ color: "var(--navy)" }}>Certified By</p>
            <div className="flex flex-wrap gap-2">
              {["PACRA","ZPPA","TPIN","ZRA"].map((c) => (
                <span key={c} className="px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest bg-white border border-black/[0.05] shadow-sm" style={{ color: "var(--copper)" }}>{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px w-full mb-8" style={{ background: "rgba(0,0,0,0.04)" }} />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>© {new Date().getFullYear()} Afridyn Engineering Limited. All rights reserved.</p>
          <p className="text-xs font-bold opacity-30" style={{ color: "var(--navy)" }}>Registered in Zambia · PACRA Approved</p>
        </div>
      </div>
    </footer>
  );
}
