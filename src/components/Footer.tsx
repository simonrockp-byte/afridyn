"use client";

import Image from "next/image";

export default function Footer() {
  const goto = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--navy)" }}>
      {/* Top gradient accent */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #D4792A 40%, #1A7A70 60%, transparent 100%)" }} />

      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-8 h-8">
                <Image src="/afridyn_logo.png" alt="Afridyn" fill className="object-contain" style={{ filter: "brightness(0) invert(1)" }} />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-white tracking-wider">AFRIDYN</p>
                <p className="text-[9px] text-white/30 tracking-[0.2em]" style={{ fontFamily: "monospace" }}>ENGINEERING LIMITED</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.38)" }}>
              Engineering Excellence Across Africa — delivering world-class industrial,
              IT, and logistics solutions since 2013.
            </p>
            <div className="flex gap-2.5">
              {[{ l: "in", bg: "#0077B5" }, { l: "f", bg: "#1877F2" }, { l: "t", bg: "#1DA1F2" }].map((s) => (
                <a key={s.l} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold transition-all hover:scale-110" style={{ background: s.bg }}>{s.l}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-5 tracking-wide">Navigation</h4>
            <ul className="space-y-3">
              {[["home","Home"],["about","About"],["services","Services"],["why-us","Why Choose Us"],["contact","Contact"]].map(([id, label]) => (
                <li key={id}>
                  <button onClick={() => goto(id)} className="text-sm transition-colors hover:text-white group flex items-center gap-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                    <span className="w-0 group-hover:w-3 h-px transition-all duration-300" style={{ background: "#D4792A" }} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-5 tracking-wide">Services</h4>
            <ul className="space-y-3">
              {["Mech. & Elec. Spares","Maintenance","Engineering Consulting","IT Equipment","Optical Fibre","Logistics","Clearing & Forwarding"].map((s) => (
                <li key={s}>
                  <button onClick={() => goto("services")} className="text-sm transition-colors hover:text-white text-left group flex items-center gap-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                    <span className="w-0 group-hover:w-3 h-px transition-all duration-300 shrink-0" style={{ background: "#1A7A70" }} />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Certs */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-5 tracking-wide">Contact</h4>
            <div className="space-y-3 mb-7">
              {[["📍","Lusaka, Zambia"], ["📞","+260 XXX XXX XXX"], ["✉️","info@afridynengineering.com"]].map(([icon, text]) => (
                <p key={text} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <span>{icon}</span><span>{text}</span>
                </p>
              ))}
            </div>
            <p className="text-xs mb-2.5 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>Certified By</p>
            <div className="flex flex-wrap gap-2">
              {["PACRA","ZPPA","TPIN","ZRA"].map((c) => (
                <span key={c} className="px-2 py-1 rounded text-xs font-bold" style={{ background: "rgba(212,121,42,0.08)", border: "1px solid rgba(212,121,42,0.2)", color: "#D4792A", fontFamily: "monospace" }}>{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px w-full mb-6" style={{ background: "rgba(255,255,255,0.05)" }} />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>© {new Date().getFullYear()} Afridyn Engineering Limited. All rights reserved.</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>Registered in Zambia · PACRA · TPIN · ZPPA Approved</p>
        </div>
      </div>
    </footer>
  );
}
