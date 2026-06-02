/* Pure CSS/SVG circuit board animation — replaces Three.js FooterScene3D.
   Zero JS bundle cost, same visual feel, works on all devices. */

export function FooterCircuit() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 400"
      >
        <defs>
          {/* Trunk line gradient */}
          <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#1B4E9B" stopOpacity="0" />
            <stop offset="20%"  stopColor="#1B4E9B" stopOpacity="0.35" />
            <stop offset="80%"  stopColor="#2A6DD9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2A6DD9" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trunkGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#6AAB2E" stopOpacity="0" />
            <stop offset="30%"  stopColor="#6AAB2E" stopOpacity="0.28" />
            <stop offset="70%"  stopColor="#6AAB2E" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#6AAB2E" stopOpacity="0" />
          </linearGradient>
          {/* Flow particle pulse */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Horizontal trunk lines */}
        <line x1="0" y1="80"  x2="1440" y2="80"  stroke="url(#trunkGrad)"  strokeWidth="1" />
        <line x1="0" y1="160" x2="1440" y2="160" stroke="url(#trunkGrad)"  strokeWidth="1" />
        <line x1="0" y1="240" x2="1440" y2="240" stroke="url(#trunkGrad2)" strokeWidth="1" />
        <line x1="0" y1="320" x2="1440" y2="320" stroke="url(#trunkGrad)"  strokeWidth="1" />

        {/* Vertical branches */}
        {[180, 360, 540, 720, 900, 1080, 1260].map((x, i) => (
          <line key={x} x1={x} y1={i % 2 === 0 ? 80 : 160} x2={x} y2={i % 2 === 0 ? 240 : 320}
            stroke="#1B4E9B" strokeOpacity="0.18" strokeWidth="1" />
        ))}

        {/* Junction dots */}
        {[
          [180, 80], [360, 160], [540, 80], [720, 240],
          [900, 160], [1080, 320], [1260, 80], [1080, 160],
          [360, 240], [900, 320], [540, 320], [720, 160],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3"
            fill={i % 2 === 0 ? '#6AAB2E' : '#2A6DD9'}
            fillOpacity="0.8"
            filter="url(#glow)"
          >
            <animate attributeName="fill-opacity" values="0.8;0.3;0.8" dur={`${2 + (i * 0.4)}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Animated flow particles on trunk lines */}
        {[80, 160, 240, 320].map((y, row) => (
          [0, 1, 2].map((p) => (
            <circle key={`${y}-${p}`} cy={y} r="2"
              fill={row % 2 === 0 ? '#6AAB2E' : '#2A6DD9'}
              fillOpacity="0.9"
              filter="url(#glow)"
            >
              <animateMotion
                dur={`${6 + p * 2 + row}s`}
                repeatCount="indefinite"
                path={`M ${p * 480} 0 H 1440`}
              />
            </circle>
          ))
        ))}
      </svg>
    </div>
  )
}
