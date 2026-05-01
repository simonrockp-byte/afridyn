'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── Constants ─── */
const NODE_COUNT = 48
const EDGE_DIST  = 3.2
const NAVY       = new THREE.Color('#1A3A6B')
const ORANGE     = new THREE.Color('#E8621A')
const NAVY_MID   = new THREE.Color('#2B5BA8')

/* ─── Camera parallax driven by mouse ─── */
function CameraRig({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.current[0] * 1.4 - camera.position.x) * 0.04
    camera.position.y += (mouse.current[1] * 0.9 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ─── Geometric network: nodes + edges + hex rings ─── */
function NodeNetwork() {
  const groupRef = useRef<THREE.Group>(null!)

  /* Stable random node positions */
  const nodes = useMemo<THREE.Vector3[]>(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 14
      const y = (Math.random() - 0.5) * 8
      const z = (Math.random() - 0.5) * 6 - 2
      pts.push(new THREE.Vector3(x, y, z))
    }
    return pts
  }, [])

  /* Build all Three.js objects imperatively — one-time setup */
  const { edgeMesh, hexMesh, dotPoints, accentMeshes } = useMemo(() => {
    /* ── Edges ── */
    const edgePos: number[] = []
    const edgeCol: number[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].distanceTo(nodes[j])
        if (d < EDGE_DIST) {
          const t = 1 - d / EDGE_DIST
          const c = new THREE.Color().lerpColors(NAVY_MID, ORANGE, t * 0.7)
          edgePos.push(...nodes[i].toArray(), ...nodes[j].toArray())
          edgeCol.push(c.r, c.g, c.b, c.r, c.g, c.b)
        }
      }
    }
    const edgeGeo = new THREE.BufferGeometry()
    edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePos, 3))
    edgeGeo.setAttribute('color',    new THREE.Float32BufferAttribute(edgeCol, 3))
    const edgeMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.22,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const edgeMesh = new THREE.LineSegments(edgeGeo, edgeMat)

    /* ── Hex rings ── */
    const hexPos: number[] = []
    const HEX_R = 0.4
    const centres = [
      [-4, 2, -2], [3.5, -1.5, -3], [-2, -3, -1.5],
      [5, 1.5, -4], [0, 3.5, -3], [-5, -1, -2], [2.5, 2.8, -1],
      [-1, 1.5, -4], [4, -3, -2],
    ]
    for (const [cx, cy, cz] of centres) {
      for (let s = 0; s < 6; s++) {
        const a0 = (s / 6) * Math.PI * 2
        const a1 = ((s + 1) / 6) * Math.PI * 2
        hexPos.push(
          cx + HEX_R * Math.cos(a0), cy + HEX_R * Math.sin(a0), cz,
          cx + HEX_R * Math.cos(a1), cy + HEX_R * Math.sin(a1), cz,
        )
      }
    }
    const hexGeo = new THREE.BufferGeometry()
    hexGeo.setAttribute('position', new THREE.Float32BufferAttribute(hexPos, 3))
    const hexMat = new THREE.LineBasicMaterial({
      color: NAVY_MID, transparent: true, opacity: 0.1,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const hexMesh = new THREE.LineSegments(hexGeo, hexMat)

    /* ── Node dots ── */
    const dotPos: number[] = []
    const dotCol: number[] = []
    nodes.forEach((n, i) => {
      dotPos.push(n.x, n.y, n.z)
      const c = i % 5 === 0 ? ORANGE : i % 3 === 0 ? NAVY_MID : NAVY
      dotCol.push(c.r, c.g, c.b)
    })
    const dotGeo = new THREE.BufferGeometry()
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPos, 3))
    dotGeo.setAttribute('color',    new THREE.Float32BufferAttribute(dotCol, 3))
    const dotMat = new THREE.PointsMaterial({
      vertexColors: true, size: 0.12, sizeAttenuation: true,
      transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const dotPoints = new THREE.Points(dotGeo, dotMat)

    /* ── Accent spheres at 5 highlight nodes ── */
    const sGeo = new THREE.SphereGeometry(0.09, 8, 8)
    const accentMeshes = [nodes[0], nodes[4], nodes[9], nodes[14], nodes[20]].map((pos, i) => {
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? ORANGE : NAVY_MID,
        transparent: true, opacity: 0.8,
        blending: THREE.AdditiveBlending,
      })
      const mesh = new THREE.Mesh(sGeo, mat)
      mesh.position.copy(pos)
      return mesh
    })

    return { edgeMesh, hexMesh, dotPoints, accentMeshes }
  }, [nodes])

  /* Animation — pulse opacity on edges and dots */
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(t * 0.055) * 0.18
    groupRef.current.rotation.x = Math.sin(t * 0.038) * 0.07

    ;(edgeMesh.material as THREE.LineBasicMaterial).opacity  = 0.18 + Math.sin(t * 0.7) * 0.06
    ;(dotPoints.material as THREE.PointsMaterial).opacity    = 0.50 + Math.sin(t * 1.1) * 0.14
  })

  return (
    <group ref={groupRef}>
      <primitive object={edgeMesh}  />
      <primitive object={hexMesh}   />
      <primitive object={dotPoints} />
      {accentMeshes.map((m, i) => <primitive key={i} object={m} />)}
    </group>
  )
}

/* ─── Exported scene ─── */
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
      style={{
        zIndex: 0,
        opacity: ready ? 1 : 0,
        transition: 'opacity 1.4s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => setReady(true)}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 4, 4]}   color="#2B5BA8" intensity={4} />
        <pointLight position={[-5, -3, 2]} color="#E8621A" intensity={3} />
        <CameraRig mouse={mouse} />
        <NodeNetwork />
      </Canvas>
    </div>
  )
}
