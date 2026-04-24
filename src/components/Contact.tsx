"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.05 }
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulated send — wire up to your backend/email service
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2";
  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#fff",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "#f8f9fc" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 50%, rgba(31,133,122,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span
            className="text-xs tracking-widest uppercase font-semibold"
            style={{ color: "#E67817", fontFamily: "var(--font-mono)" }}
          >
            Get In Touch
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3"
            style={{ fontFamily: "var(--font-outfit)", color: "#14223E" }}
          >
            Contact Us
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Ready to discuss your engineering project? Our team is here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8 reveal">
            <div
              className="p-8 rounded-3xl"
              style={{ background: "#14223E" }}
            >
              <h3
                className="text-xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Contact Information
              </h3>
              <div className="space-y-5">
                {[
                  {
                    icon: "📍",
                    label: "Head Office",
                    value: "Lusaka, Zambia",
                    sub: "Available across Africa",
                  },
                  {
                    icon: "📞",
                    label: "Phone",
                    value: "+260 XXX XXX XXX",
                    sub: "Mon–Fri, 08:00–17:00 CAT",
                  },
                  {
                    icon: "✉️",
                    label: "Email",
                    value: "info@afridynengineering.com",
                    sub: "We respond within 24 hours",
                  },
                  {
                    icon: "🕐",
                    label: "Emergency Support",
                    value: "24/7 Available",
                    sub: "For critical maintenance needs",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: "rgba(230,120,23,0.15)", border: "1px solid rgba(230,120,23,0.3)" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-0.5">{item.label}</p>
                      <p className="font-medium text-white text-sm">{item.value}</p>
                      <p className="text-xs text-white/50">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {[
                { icon: "in", label: "LinkedIn", color: "#0077B5" },
                { icon: "f", label: "Facebook", color: "#1877F2" },
                { icon: "t", label: "Twitter", color: "#1DA1F2" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm transition-all hover:scale-110 hover:shadow-lg"
                  style={{ background: s.color }}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            className="reveal p-8 rounded-3xl"
            style={{ background: "#14223E" }}
          >
            <h3
              className="text-xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Send Us a Message
            </h3>

            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                <p className="text-white/60">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/50 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                      style={{ ...inputStyle, outlineColor: "#E67817" }}
                      placeholder="John Banda"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      style={{ ...inputStyle, outlineColor: "#E67817" }}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                    style={{ ...inputStyle, outlineColor: "#E67817" }}
                    placeholder="+260 XXX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Service Interested In</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className={inputClass}
                    style={{ ...inputStyle, outlineColor: "#E67817" }}
                  >
                    <option value="" style={{ background: "#14223E" }}>Select a service...</option>
                    {[
                      "Mechanical & Electrical Spares",
                      "Maintenance Services",
                      "Engineering Consultation",
                      "IT Equipment Supply",
                      "Optical Fibre Services",
                      "Technical Outsourcing",
                      "Logistics Consultancy",
                      "Clearing & Forwarding",
                    ].map((s) => (
                      <option key={s} value={s} style={{ background: "#14223E" }}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={inputClass}
                    style={{ ...inputStyle, outlineColor: "#E67817", resize: "none" }}
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #E67817, #1F857A)" }}
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
