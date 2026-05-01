'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── Configuration ─── */
const NODE_COUNT    = 48
const EDGE_DIST     = 3.0
const NAVY          = new THREE.Color('#1A3A6B')
const ORANGE        = new THREE.Color('#E8621A')
const NAVY_LIGHT    = new THREE.Color('#2B5BA8')

/* ─── Mouse-driven camera parallax ─── */
function CameraRig({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.current[0] * 1.2 - camera.position.x) * 0.04
    camera.position.y += (mouse.current[1] * 0.8 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ─── Interconnected node network ─── */
function NodeNetwork() {
  const groupRef       = useRef<THREE.Group>(null!)
  const linesRef       = useRef<THREE.LineSegments>(null!)
  const glowDotsRef    = useRef<THREE.Points>(null!)

  /* Stable node positions on a hemisphere (biased toward camera) */
  const nodes = useMemo<THREE.Vector3[]>(() => {
    const pts: THREE.Vector3[] = []
    const rng = (a: number, b: number) => a + Math.random() * (b - a)
    for (let i = 0; i < NODE_COUNT; i++) {
      pts.push(new THREE.Vector3(rng(-7, 7), rng(-4, 4), rng(-5, 1)))
    }
    return pts
  }, [])

  /* Edge geometry: connect nodes closer than EDGE_DIST */
  const { edgePositions, edgeColors } = useMemo(() => {
    const pos: number[] = []
    const col: number[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].distanceTo(nodes[j])
        if (d < EDGE_DIST) {
          const t = 1 - d / EDGE_DIST
          const c = new THREE.Color().lerpColors(NAVY_LIGHT, ORANGE, t * 0.6)
          pos.push(...nodes[i].toArray(), ...nodes[j].toArray())
          col.push(c.r, c.g, c.b, c.r, c.g, c.b)
        }
      }
    }
    return { edgePositions: new Float32Array(pos), edgeColors: new Float32Array(col) }
  }, [nodes])

  /* Node dot positions */
  const dotPositions = useMemo(() => {
    const a = new Float32Array(nodes.length * 3)
    nodes.forEach((n, i) => { a[i*3]=n.x; a[i*3+1]=n.y; a[i*3+2]=n.z })
    return a
  }, [nodes])

  /* Node colors — alternating navy / orange */
  const dotColors = useMemo(() => {
    const a = new Float32Array(nodes.length * 3)
    nodes.forEach((_, i) => {
      const c = i % 5 === 0 ? ORANGE : i % 3 === 0 ? NAVY_LIGHT : NAVY
      a[i*3]=c.r; a[i*3+1]=c.g; a[i*3+2]=c.b
    })
    return a
  }, [nodes])

  /* Hex tile ring geometry (blueprint decoration) */
  const hexRings = useMemo(() => {
    const positions: number[] = []
    const HEX_RADIUS = 0.35
    const makeHex = (cx: number, cy: number, cz: number) => {
      for (let s = 0; s < 6; s++) {
        const a0 = (s / 6) * Math.PI * 2
        const a1 = ((s + 1) / 6) * Math.PI * 2
        positions.push(
          cx + HEX_RADIUS * Math.cos(a0), cy + HEX_RADIUS * Math.sin(a0), cz,
          cx + HEX_RADIUS * Math.cos(a1), cy + HEX_RADIUS * Math.sin(a1), cz,
        )
      }
    }
    const centres = [
      [-4, 2, -2], [3, -2, -3], [-2, -3, -1], [5, 1, -4],
      [0, 3.5, -3], [-5, -1, -2], [2, 2.5, -1],
    ]
    centres.forEach(([x, y, z]) => makeHex(x, y, z))
    return new Float32Array(positions)
  }, [])

  /* Slow rotation */
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y  = Math.sin(t * 0.06) * 0.18
    groupRef.current.rotation.x  = Math.sin(t * 0.04) * 0.08

    /* Pulse opacity on edges */
    const mat = linesRef.current.material as THREE.LineBasicMaterial
    mat.opacity = 0.18 + Math.sin(t * 0.8) * 0.06

    /* Glow pulse on dots */
    const dotMat = glowDotsRef.current.material as THREE.PointsMaterial
    dotMat.opacity = 0.5 + Math.sin(t * 1.2) * 0.15
  })

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[edgeColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Hex rings (blueprint lines) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[hexRings, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={NAVY_LIGHT}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Node glow dots */}
      <points ref={glowDotsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[dotColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.12}
          sizeAttenuation
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Larger accent glow spheres at key nodes */}
      {[nodes[0], nodes[4], nodes[9], nodes[14], nodes[20]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? ORANGE : NAVY_LIGHT}
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Main exported component ─── */
export function HeroScene3D() {
  const mouse = useRef<[number, number]>([0, 0])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth  - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ]
    }
    window.addEventListener('mousemove', handle, { passive: true })
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1, opacity: ready ? 1 : 0, transition: 'opacity 1.2s ease' }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => setReady(true)}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]}  color="#2B5BA8" intensity={3} />
        <pointLight position={[-4, -2, 2]} color="#E8621A" intensity={2} />
        <CameraRig mouse={mouse} />
        <NodeNetwork />
      </Canvas>
    </div>
  )
}
