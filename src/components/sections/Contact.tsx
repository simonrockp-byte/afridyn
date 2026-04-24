"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

const SERVICES_LIST = [
  "Mechanical & Electrical Spares",
  "Maintenance Services",
  "Engineering Consultation",
  "IT Equipment Supply",
  "Optical Fibre Services",
  "Technical Outsourcing",
  "Logistics Consultancy",
  "Clearing & Forwarding",
];

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 6000);
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--slate-200)",
    background: "var(--white)",
    color: "var(--slate-800)",
    fontSize: "0.9375rem",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "var(--font-sans)",
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "var(--navy-900)" }}
    >
      {/* Grid texture */}
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" />

      {/* Glow */}
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,121,42,0.08) 0%, transparent 70%)" }}
      />

      <Container className="relative">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Left info — 2 cols */}
          <div className="lg:col-span-2">
            <div className="label reveal mb-6" style={{ display: "inline-flex" }}>Contact Us</div>
            <h2
              className="reveal font-bold text-white mb-5"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 2.875rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Let's Build<br />
              <span className="text-copper">Something Great</span>
            </h2>
            <p className="reveal mb-10" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
              Ready to discuss your project? Our engineers are standing by to turn
              your requirements into reliable, high-performance solutions.
            </p>

            <div className="space-y-4 reveal">
              {[
                { icon: "📍", label: "Head Office", val: "Lusaka, Zambia", sub: "Available continent-wide" },
                { icon: "📞", label: "Phone", val: "+260 XXX XXX XXX", sub: "Mon–Fri, 08:00–17:00 CAT" },
                { icon: "✉️", label: "Email", val: "info@afridynengineering.com", sub: "Reply within 24 hours" },
                { icon: "🕐", label: "Emergency", val: "24/7 Response", sub: "For critical support needs" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
                    style={{ background: "rgba(212,121,42,0.1)" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>
                      {item.label}
                    </p>
                    <p style={{ fontWeight: 600, fontSize: "0.9375rem", color: "rgba(255,255,255,0.85)" }}>
                      {item.val}
                    </p>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-2.5 mt-6 reveal">
              {[{ l: "in", bg: "#0077B5" }, { l: "f", bg: "#1877F2" }, { l: "t", bg: "#1DA1F2" }].map((s) => (
                <a
                  key={s.l}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold transition-all hover:scale-110"
                  style={{ background: s.bg }}
                >
                  {s.l}
                </a>
              ))}
            </div>
          </div>

          {/* Form — 3 cols */}
          <div
            className="reveal lg:col-span-3 rounded-2xl p-8 lg:p-10"
            style={{
              background: "var(--white)",
              boxShadow: "var(--shadow-2xl)",
              transitionDelay: "100ms",
            }}
          >
            <h3
              className="font-bold mb-7"
              style={{ fontFamily: "var(--font-display)", color: "var(--slate-900)", fontSize: "1.25rem" }}
            >
              Send a Message
            </h3>

            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-5"
                  style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)" }}
                >
                  ✅
                </div>
                <h4
                  className="font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)", color: "var(--slate-900)", fontSize: "1.25rem" }}
                >
                  Message Sent!
                </h4>
                <p style={{ color: "var(--slate-500)" }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--slate-500)", letterSpacing: "0.04em" }}>Full Name *</label>
                    <input
                      type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={inputBase}
                      onFocus={(e) => { e.target.style.borderColor = "var(--copper-500)"; e.target.style.boxShadow = "0 0 0 3px rgba(212,121,42,0.08)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "var(--slate-200)"; e.target.style.boxShadow = "none"; }}
                      placeholder="John Banda"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--slate-500)", letterSpacing: "0.04em" }}>Email Address *</label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inputBase}
                      onFocus={(e) => { e.target.style.borderColor = "var(--copper-500)"; e.target.style.boxShadow = "0 0 0 3px rgba(212,121,42,0.08)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "var(--slate-200)"; e.target.style.boxShadow = "none"; }}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--slate-500)", letterSpacing: "0.04em" }}>Phone Number</label>
                  <input
                    type="tel" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={inputBase}
                    onFocus={(e) => { e.target.style.borderColor = "var(--copper-500)"; e.target.style.boxShadow = "0 0 0 3px rgba(212,121,42,0.08)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--slate-200)"; e.target.style.boxShadow = "none"; }}
                    placeholder="+260 XXX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--slate-500)", letterSpacing: "0.04em" }}>Service Required</label>
                  <select
                    value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                    style={{ ...inputBase, appearance: "none" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--copper-500)"; e.target.style.boxShadow = "0 0 0 3px rgba(212,121,42,0.08)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--slate-200)"; e.target.style.boxShadow = "none"; }}
                  >
                    <option value="">Select a service…</option>
                    {SERVICES_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--slate-500)", letterSpacing: "0.04em" }}>Message *</label>
                  <textarea
                    required rows={4} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputBase, resize: "none" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--copper-500)"; e.target.style.boxShadow = "0 0 0 3px rgba(212,121,42,0.08)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--slate-200)"; e.target.style.boxShadow = "none"; }}
                    placeholder="Briefly describe your project or requirements…"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn btn-copper w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ padding: "14px", fontSize: "0.9375rem" }}
                >
                  {status === "sending" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : "Send Message →"}
                </button>
                <p style={{ fontSize: "11px", color: "var(--slate-400)", textAlign: "center" }}>
                  We respond to all enquiries within one business day.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
