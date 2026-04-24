"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add("visible"); }, { threshold: 0.05 });
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("sent");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  const fieldStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#fff",
    outline: "none",
  } as React.CSSProperties;

  return (
    <section id="contact" ref={ref} className="section-pad relative overflow-hidden" style={{ background: "var(--navy-2)" }}>
      <div className="divider absolute top-0 left-0 right-0" />

      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(26,122,112,0.07) 0%, transparent 70%)",
        transform: "translate(30%,20%)",
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left info — 2 cols */}
          <div className="lg:col-span-2 space-y-8">
            <div className="reveal">
              <div className="label-chip mb-5">Get In Touch</div>
              <h2 className="font-display font-extrabold mb-4" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Let's Build<br /><span className="text-grad-teal">Something Great</span>
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Ready to discuss your project? Our team of engineers is here to turn
                your requirements into reliable, high-performance solutions.
              </p>
            </div>

            <div className="space-y-4 reveal">
              {[
                { icon: "📍", label: "Head Office", value: "Lusaka, Zambia", sub: "Available continent-wide" },
                { icon: "📞", label: "Phone", value: "+260 XXX XXX XXX", sub: "Mon–Fri, 08:00–17:00 CAT" },
                { icon: "✉️", label: "Email", value: "info@afridynengineering.com", sub: "Reply within 24 hours" },
                { icon: "🕐", label: "Emergency", value: "24/7 Response", sub: "For critical maintenance needs" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0" style={{ background: "rgba(212,121,42,0.1)" }}>{item.icon}</div>
                  <div>
                    <p className="text-xs font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{item.label}</p>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal flex gap-3">
              {[{ icon: "in", bg: "#0077B5" }, { icon: "f", bg: "#1877F2" }, { icon: "t", bg: "#1DA1F2" }].map((s) => (
                <a key={s.icon} href="#" className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold transition-all hover:scale-110 hover:shadow-lg" style={{ background: s.bg }}>{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Form — 3 cols */}
          <div className="lg:col-span-3 reveal" style={{ transitionDelay: "100ms" }}>
            <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="font-display font-bold text-white text-lg mb-7">Send a Message</h3>

              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-5" style={{ background: "rgba(26,122,112,0.15)", border: "1px solid rgba(26,122,112,0.3)" }}>✅</div>
                  <h4 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h4>
                  <p style={{ color: "rgba(255,255,255,0.45)" }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Full Name *</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                        style={{ ...fieldStyle }}
                        onFocus={(e) => (e.target.style.border = "1px solid rgba(212,121,42,0.4)")}
                        onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.08)")}
                        placeholder="John Banda" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Email Address *</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                        style={{ ...fieldStyle }}
                        onFocus={(e) => (e.target.style.border = "1px solid rgba(212,121,42,0.4)")}
                        onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.08)")}
                        placeholder="john@company.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Phone Number</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                      style={{ ...fieldStyle }}
                      onFocus={(e) => (e.target.style.border = "1px solid rgba(212,121,42,0.4)")}
                      onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.08)")}
                      placeholder="+260 XXX XXX XXX" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Service Required</label>
                    <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all appearance-none"
                      style={{ ...fieldStyle }}
                      onFocus={(e) => (e.target.style.border = "1px solid rgba(212,121,42,0.4)")}
                      onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.08)")}
                    >
                      <option value="" style={{ background: "#111F38" }}>Select a service…</option>
                      {["Mechanical & Electrical Spares","Maintenance Services","Engineering Consultation","IT Equipment Supply","Optical Fibre Services","Technical Outsourcing","Logistics Consultancy","Clearing & Forwarding"].map((s) => (
                        <option key={s} value={s} style={{ background: "#111F38" }}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Message *</label>
                    <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all resize-none"
                      style={{ ...fieldStyle }}
                      onFocus={(e) => (e.target.style.border = "1px solid rgba(212,121,42,0.4)")}
                      onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.08)")}
                      placeholder="Briefly describe your project or requirements…" />
                  </div>
                  <button type="submit" disabled={status === "sending"}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === "sending" ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                    ) : "Send Message →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
