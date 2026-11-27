'use client'
import { useMemo, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Grid, Line } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

export type HeroQuality = 'high' | 'low'

/* ───────────────────────── geo helpers ───────────────────────── */
const R = 1.65
const DEG = Math.PI / 180

function latLonToVec(lat: number, lon: number, r = R) {
  const phi = (90 - lat) * DEG
  const theta = (lon + 180) * DEG
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  )
}

/* Stylised outlines [lon, lat] — coarse on purpose, used only to tint points */
const AFRICA: [number, number][] = [
  [-17.5, 14.7], [-16.9, 21.3], [-13, 27.7], [-9.6, 30.4], [-6.8, 34], [-5.9, 35.8], [-1.9, 35.1],
  [3, 36.8], [10.2, 37.2], [11.1, 35.2], [10.1, 34.3], [11.5, 33.1], [15.2, 32.3], [19.9, 30.9],
  [20, 32], [23, 32.6], [25.2, 31.6], [29, 30.9], [32.3, 31.3], [34.2, 31.2], [34.9, 29.5],
  [33.6, 27.6], [35.6, 23.9], [37.3, 21], [38.5, 18], [39.7, 15.5], [41.7, 13.3], [43.3, 12.5],
  [44.5, 10.4], [51.3, 11.8], [51, 10.4], [49.8, 6.9], [47.9, 4.5], [45.3, 2], [42, -1],
  [40, -3.3], [39.2, -6.8], [40.4, -10.5], [40.6, -15.3], [37.4, -17.6], [35.3, -21.8], [35.5, -24],
  [32.9, -26], [32.4, -28.6], [30, -31.3], [27.9, -33], [25.6, -34], [20, -34.8], [18.4, -34.1],
  [17.9, -32], [16.5, -28.6], [15.2, -26.7], [14.5, -22.9], [13.4, -20.9], [11.8, -17.3], [12.3, -13.6],
  [13.7, -11], [13.2, -8.8], [12.2, -5.9], [11.1, -3.9], [9.6, -0.6], [9.3, 1], [9.8, 3.1],
  [8.5, 4.5], [6, 4.3], [4.5, 6.3], [3.4, 6.4], [1, 6], [-2, 4.7], [-4, 5.2], [-7.5, 4.4],
  [-9, 5.5], [-11.4, 6.9], [-13.2, 8.9], [-15, 10.9], [-16.7, 12.4],
]
const MADAGASCAR: [number, number][] = [
  [49.3, -12], [50.5, -15.4], [47.1, -24.9], [45.2, -25.6], [43.6, -23.6], [43.9, -17.4], [47.9, -13.6],
]

function inPoly(lon: number, lat: number, poly: [number, number][]) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}
const inAfrica = (lon: number, lat: number) => inPoly(lon, lat, AFRICA) || inPoly(lon, lat, MADAGASCAR)

const CITIES = {
  lusaka:       { lat: -15.39, lon: 28.32 },
  copperbelt:   { lat: -12.80, lon: 28.21 },
  lubumbashi:   { lat: -11.66, lon: 27.48 },
  johannesburg: { lat: -26.20, lon: 28.05 },
  dar:          { lat:  -6.79, lon: 39.21 },
}
const LINKS: [keyof typeof CITIES, keyof typeof CITIES][] = [
  ['lusaka', 'copperbelt'], ['lusaka', 'johannesburg'], ['lusaka', 'dar'],
  ['copperbelt', 'lubumbashi'], ['lusaka', 'lubumbashi'], ['johannesburg', 'dar'],
]

/* ───────────────────────── globe ───────────────────────── */
function useGlobePoints(quality: HeroQuality) {
  return useMemo(() => {
    const base = quality === 'high' ? 3200 : 1400
    const dense = quality === 'high' ? 16000 : 6000
    const pos: number[] = []
    const col: number[] = []
    const dim = new THREE.Color('#3B4757')
    const hot = new THREE.Color('#8BEFFF')
    const fib = (n: number, keep: (lon: number, lat: number) => boolean, c: THREE.Color) => {
      const g = Math.PI * (3 - Math.sqrt(5))
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2
        const lat = Math.asin(y) / DEG
        let lon = ((g * i) / DEG) % 360
        if (lon > 180) lon -= 360
        if (!keep(lon, lat)) continue
        const v = latLonToVec(lat, lon)
        pos.push(v.x, v.y, v.z)
        col.push(c.r, c.g, c.b)
      }
    }
    fib(base, (lon, lat) => !inAfrica(lon, lat), dim)
    fib(dense, inAfrica, hot)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3))
    return geo
  }, [quality])
}

function Arc({ from, to, offset, animate }: { from: THREE.Vector3; to: THREE.Vector3; offset: number; animate: boolean }) {
  const pulse = useRef<THREE.Mesh>(null)
  const curve = useMemo(() => {
    const mid = from.clone().add(to).normalize().multiplyScalar(R + 0.12 + from.distanceTo(to) * 0.45)
    return new THREE.QuadraticBezierCurve3(from, mid, to)
  }, [from, to])
  const points = useMemo(() => curve.getPoints(48), [curve])

  useFrame(({ clock }) => {
    if (!pulse.current) return
    const t = animate ? (clock.elapsedTime * 0.35 + offset) % 1 : offset
    pulse.current.position.copy(curve.getPoint(t))
    const s = Math.sin(t * Math.PI)
    pulse.current.scale.setScalar(0.6 + s * 0.8)
  })

  return (
    <group>
      <Line points={points} color="#22D3EE" lineWidth={1} transparent opacity={0.35} />
      <mesh ref={pulse}>
        <sphereGeometry args={[0.022, 10, 10]} />
        <meshBasicMaterial color={new THREE.Color(0.6, 3, 3.4)} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Globe({ quality, animate }: { quality: HeroQuality; animate: boolean }) {
  const group = useRef<THREE.Group>(null)
  const geo = useGlobePoints(quality)

  // Base orientation: centre on south-central Africa (Zambia) facing the camera
  const baseY = useMemo(() => {
    const v = latLonToVec(-8, 24)
    // face the off-axis camera (camera sits left of the globe on wide screens)
    return Math.atan2(-v.x, v.z) - 0.25
  }, [])

  const cityVecs = useMemo(
    () => Object.fromEntries(Object.entries(CITIES).map(([k, c]) => [k, latLonToVec(c.lat, c.lon, R * 1.004)])) as Record<keyof typeof CITIES, THREE.Vector3>,
    [],
  )

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = animate ? clock.elapsedTime : 0
    group.current.rotation.y = baseY + Math.sin(t * 0.15) * 0.32
  })

  return (
    <group ref={group} rotation={[-0.28, baseY, 0]}>
      <points geometry={geo}>
        <pointsMaterial
          size={quality === 'high' ? 0.022 : 0.028}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* faint core so back-side points read as depth */}
      <mesh>
        <sphereGeometry args={[R * 0.985, 48, 48]} />
        <meshBasicMaterial color="#07090D" transparent opacity={0.72} />
      </mesh>
      {LINKS.map(([a, b], i) => (
        <Arc key={a + b} from={cityVecs[a]} to={cityVecs[b]} offset={i / LINKS.length} animate={animate} />
      ))}
      {Object.entries(cityVecs).map(([k, v]) => (
        <mesh key={k} position={v}>
          <sphereGeometry args={[k === 'lusaka' ? 0.03 : 0.02, 10, 10]} />
          <meshBasicMaterial color={new THREE.Color(3, 1.1, 0.3)} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

/* ───────────────────────── gear ───────────────────────── */
function gearGeometry(teeth: number, rOuter: number, rRoot: number, rHole: number, bolts = 6) {
  const shape = new THREE.Shape()
  const step = (Math.PI * 2) / teeth
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    const pts: [number, number][] = [
      [rRoot, a],
      [rOuter, a + step * 0.18],
      [rOuter, a + step * 0.48],
      [rRoot, a + step * 0.66],
    ]
    pts.forEach(([r, ang], j) => {
      const x = Math.cos(ang) * r, y = Math.sin(ang) * r
      if (i === 0 && j === 0) shape.moveTo(x, y)
      else shape.lineTo(x, y)
    })
  }
  shape.closePath()
  const hole = new THREE.Path(); hole.absarc(0, 0, rHole, 0, Math.PI * 2, true); shape.holes.push(hole)
  for (let b = 0; b < bolts; b++) {
    const a = (b / bolts) * Math.PI * 2
    const p = new THREE.Path()
    p.absarc(Math.cos(a) * (rHole + (rRoot - rHole) * 0.5), Math.sin(a) * (rHole + (rRoot - rHole) * 0.5), (rRoot - rHole) * 0.16, 0, Math.PI * 2, true)
    shape.holes.push(p)
  }
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.35, bevelEnabled: false, curveSegments: 10 })
  geo.center()
  const edges = new THREE.EdgesGeometry(geo, 25)
  geo.dispose()
  return edges
}

function Gears({ animate }: { animate: boolean }) {
  const big = useRef<THREE.LineSegments>(null)
  const small = useRef<THREE.LineSegments>(null)
  const bigGeo = useMemo(() => gearGeometry(24, 3.3, 3.0, 1.1, 8), [])
  const smallGeo = useMemo(() => gearGeometry(12, 1.62, 1.36, 0.45, 5), [])

  useFrame((_, dt) => {
    if (!animate) return
    if (big.current) big.current.rotation.z += dt * 0.05
    if (small.current) small.current.rotation.z -= dt * 0.05 * 2
  })

  return (
    <group position={[0.9, 0.35, -5.2]} rotation={[0.18, -0.45, 0]}>
      <lineSegments ref={big} geometry={bigGeo}>
        <lineBasicMaterial color="#FF6A1A" transparent opacity={0.34} />
      </lineSegments>
      <lineSegments ref={small} geometry={smallGeo} position={[4.75, -1.4, 0]}>
        <lineBasicMaterial color="#FF6A1A" transparent opacity={0.26} />
      </lineSegments>
    </group>
  )
}

/* ───────────────────────── camera rig ───────────────────────── */
function Rig({ animate }: { animate: boolean }) {
  const { camera, size } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const scroll = useRef(0)

  useEffect(() => {
    if (!animate) return
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    const onScroll = () => { scroll.current = Math.min(1, window.scrollY / window.innerHeight) }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [animate])

  const wide = size.width / size.height > 1.15

  useFrame(() => {
    const tx = (wide ? -2.3 : -1.1) + mouse.current.x * 0.45
    const ty = 0.35 - mouse.current.y * 0.28 + scroll.current * 0.6
    const tz = (wide ? 8.8 : 10.5) - scroll.current * 2.4
    camera.position.x += (tx - camera.position.x) * 0.05
    camera.position.y += (ty - camera.position.y) * 0.05
    camera.position.z += (tz - camera.position.z) * 0.05
    camera.lookAt(wide ? -2.3 : -1.1, wide ? 0.1 : 1.9, 0)
  })
  return null
}

/* ───────────────────────── canvas ───────────────────────── */
export function HeroCanvas({
  quality,
  animate,
  active,
  onReady,
}: {
  quality: HeroQuality
  /** false = reduced motion: render a single static frame */
  animate: boolean
  /** false = off-screen / tab hidden: stop the render loop */
  active: boolean
  onReady?: () => void
}) {
  return (
    <Canvas
      dpr={quality === 'high' ? [1, 1.5] : [1, 1.25]}
      frameloop={!animate ? 'demand' : active ? 'always' : 'never'}
      camera={{ position: [-2.3, 0.35, 8.8], fov: 42, near: 0.1, far: 60 }}
      gl={{ antialias: quality === 'high', alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); onReady?.() }}
      aria-hidden
    >
      <fog attach="fog" args={['#07090D', 9, 22]} />
      <Rig animate={animate} />
      <Globe quality={quality} animate={animate} />
      <Gears animate={animate} />
      <Grid
        position={[0, -2.35, 0]}
        args={[40, 40]}
        cellSize={0.5}
        cellThickness={0.6}
        cellColor="#1C2633"
        sectionSize={2.5}
        sectionThickness={1}
        sectionColor="#22D3EE"
        fadeDistance={20}
        fadeStrength={2.2}
        infiniteGrid
      />
      {quality === 'high' && (
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.65} luminanceThreshold={0.55} luminanceSmoothing={0.25} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
