export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen"
      style={{ background: 'var(--navy-900)' }}>
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: 'transparent', borderTopColor: '#475569' }} />
        </div>
        <div className="text-center">
          <p className="font-display font-bold text-white text-sm mb-1">AFRIDYN</p>
          <p className="text-[10px] font-mono tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>LOADING…</p>
        </div>
      </div>
    </div>
  )
}
