"use client";

import Image from "next/image";

const quickLinks = ["Home", "About", "Services", "Why Us", "Contact"];
const services = [
  "Mechanical & Electrical Spares",
  "Maintenance Services",
  "Engineering Consultation",
  "IT Equipment Supply",
  "Optical Fibre Services",
  "Logistics Consultancy",
];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase().replace(" ", "-"))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#0d1b35" }}
    >
      {/* Decorative top border */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, #E67817, #1F857A, transparent)" }}
      />

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(230,120,23,0.12) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/afridyn_logo.png"
                alt="Afridyn"
                width={44}
                height={44}
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div>
                <p
                  className="font-bold text-sm text-white"
                  style={{ fontFamily: "var(--font-outfit)", letterSpacing: "0.05em" }}
                >
                  AFRIDYN
                </p>
                <p
                  className="text-xs text-white/40"
                  style={{ letterSpacing: "0.1em" }}
                >
                  ENGINEERING LIMITED
                </p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Engineering Excellence Across Africa — delivering world-class industrial,
              IT, and logistics solutions.
            </p>
            <div className="flex gap-3">
              {[
                { icon: "in", bg: "#0077B5" },
                { icon: "f", bg: "#1877F2" },
                { icon: "t", bg: "#1DA1F2" },
              ].map((s) => (
                <a
                  key={s.icon}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold transition-all hover:scale-110"
                  style={{ background: s.bg }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-bold text-white mb-4 text-sm"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="text-sm text-white/50 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                  >
                    <span
                      className="w-0 group-hover:w-3 h-px transition-all"
                      style={{ background: "#E67817" }}
                    />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-bold text-white mb-4 text-sm"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((svc) => (
                <li key={svc}>
                  <button
                    onClick={() => scrollTo("services")}
                    className="text-sm text-white/50 hover:text-teal-400 transition-colors text-left flex items-center gap-2 group"
                  >
                    <span
                      className="w-0 group-hover:w-3 h-px transition-all flex-shrink-0"
                      style={{ background: "#1F857A" }}
                    />
                    {svc}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-bold text-white mb-4 text-sm"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Contact
            </h4>
            <div className="space-y-4">
              {[
                { icon: "📍", text: "Lusaka, Zambia" },
                { icon: "📞", text: "+260 XXX XXX XXX" },
                { icon: "✉️", text: "info@afridynengineering.com" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-white/50">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Certifications badges */}
            <div className="mt-6">
              <p className="text-xs text-white/30 mb-3 uppercase tracking-wider">Certified By</p>
              <div className="flex flex-wrap gap-2">
                {["PACRA", "ZPPA", "TPIN", "ZRA"].map((cert) => (
                  <span
                    key={cert}
                    className="px-2 py-1 rounded text-xs font-bold"
                    style={{
                      background: "rgba(230,120,23,0.1)",
                      border: "1px solid rgba(230,120,23,0.25)",
                      color: "#E67817",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Afridyn Engineering Limited. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Registered in Zambia · PACRA · TPIN · ZPPA Approved
          </p>
        </div>
      </div>
    </footer>
  );
}
