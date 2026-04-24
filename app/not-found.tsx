import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)' }}>
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      <div className="text-center relative z-10">
        <p className="font-mono text-sm font-bold tracking-widest mb-4" style={{ color: '#D4692A' }}>404 — PAGE NOT FOUND</p>
        <h1 className="font-display font-black text-white mb-4"
          style={{ fontSize: 'clamp(4rem, 15vw, 10rem)', letterSpacing: '-0.05em', lineHeight: 1, color: 'rgba(255,255,255,0.06)' }}>
          404
        </h1>
        <h2 className="font-display font-bold text-white text-2xl mb-3 -mt-4">Oops, wrong coordinates.</h2>
        <p className="text-sm mb-10 max-w-sm mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Link href="/"
          className="btn btn-primary btn-lg inline-flex">
          ← Return to Home
        </Link>
      </div>
    </div>
  )
}
