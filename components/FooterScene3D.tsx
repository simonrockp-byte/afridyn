'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── Brand colors ─── */
const BLUE  = new THREE.Color('#1B4E9B')
const GREEN = new THREE.Color('#6AAB2E')
const BLUE2 = new THREE.Color('#2A6DD9')

/* ─── Circuit board path network ─── */
function CircuitPaths() {
  const groupRef = useRef<THREE.Group>(null!)

  /* Build circuit geometry: horizontal trunk lines with vertical branches */
  const { trunkMesh, branchMesh, flowPoints, nodeMesh } = useMemo(() => {
    const trunkPos: number[] = []
    const trunkCol: number[] = []
    const branchPos: number[] = []
    const branchCol: number[] = []
    const flowPos: number[] = []
    const nodePos: number[] = []
    const nodeCol: number[] = []

    /* Horizontal trunk lines — 6 rows across the full width */
    const trunks = [
      { y: 2.8,  z: -1,   col: BLUE,  w: 22 },
      { y: 1.2,  z: -2,   col: BLUE2, w: 20 },
      { y: -0.3, z: -1.5, col: BLUE,  w: 24 },
      { y: -1.8, z: -2.5, col: BLUE2, w: 20 },
      { y: -3.2, z: -1,   col: GREEN, w: 18 },
    ]

    trunks.forEach(({ y, z, col, w }) => {
      trunkPos.push(-w / 2, y, z,  w / 2, y, z)
      trunkCol.push(col.r, col.g, col.b, col.r, col.g, col.b)
    })

    /* Vertical branch segments connecting trunks */
    const branches = [
      [-8,  2.8, -1.5,  -8,  1.2, -1.5],
      [-4,  1.2, -2,    -4, -0.3, -2],
      [ 2,  2.8, -1,     2, -0.3, -1.5],
      [ 6,  1.2, -2,     6, -1.8, -2.5],
      [-6, -0.3, -1.5,  -6, -1.8, -2.5],
      [ 0, -0.3, -1.5,   0, -1.8, -2.5],
      [ 4, -1.8, -2.5,   4, -3.2, -1],
      [-3, -1.8, -2.5,  -3, -3.2, -1],
      [ 8,  2.8, -1,     8, -0.3, -1.5],
      [-9, -0.3, -1.5,  -9, -3.2, -1],
    ]
    branches.forEach(([x1,y1,z1, x2,y2,z2]) => {
      const c = Math.random() > 0.5 ? BLUE : GREEN
      branchPos.push(x1, y1, z1, x2, y2, z2)
      branchCol.push(c.r, c.g, c.b, c.r, c.g, c.b)

      /* Small L-joint horizontal stub at junction */
      const stubLen = 0.8 + Math.random() * 1.4
      branchPos.push(x2, y2, z2,  x2 + stubLen, y2, z2)
      branchCol.push(GREEN.r, GREEN.g, GREEN.b, GREEN.r, GREEN.g, GREEN.b)
    })

    /* Flow particles — travel horizontally along trunks */
    for (let t = 0; t < 5; t++) {
      for (let p = 0; p < 8; p++) {
        flowPos.push(
          (Math.random() - 0.5) * 22,
          trunks[t].y,
          trunks[t].z + 0.1,
        )
      }
    }

    /* Junction nodes (dots at intersections) */
    const junctions = [
      [-8, 2.8], [-8, 1.2],
      [-4, 1.2],  [-4, -0.3],
      [2,  2.8],  [2,  -0.3],
      [6,  1.2],  [6,  -1.8],
      [-6, -0.3], [-6, -1.8],
      [0,  -0.3], [0,  -1.8],
      [4,  -1.8], [4,  -3.2],
      [-3, -1.8], [-3, -3.2],
      [8,  2.8],  [8,  -0.3],
      [-9, -0.3], [-9, -3.2],
    ]
    junctions.forEach(([x, y]) => {
      nodePos.push(x, y, -1)
      const c = Math.random() > 0.4 ? GREEN : BLUE2
      nodeCol.push(c.r, c.g, c.b)
    })

    /* Build geometries imperatively */
    const tGeo = new THREE.BufferGeometry()
    tGeo.setAttribute('position', new THREE.Float32BufferAttribute(trunkPos, 3))
    tGeo.setAttribute('color',    new THREE.Float32BufferAttribute(trunkCol, 3))
    const tMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.28,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const trunkMesh = new THREE.LineSegments(tGeo, tMat)

    const bGeo = new THREE.BufferGeometry()
    bGeo.setAttribute('position', new THREE.Float32BufferAttribute(branchPos, 3))
    bGeo.setAttribute('color',    new THREE.Float32BufferAttribute(branchCol, 3))
    const bMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.18,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const branchMesh = new THREE.LineSegments(bGeo, bMat)

    const fGeo = new THREE.BufferGeometry()
    fGeo.setAttribute('position', new THREE.Float32BufferAttribute(flowPos, 3))
    const fMat = new THREE.PointsMaterial({
      color: GREEN, size: 0.1, sizeAttenuation: true,
      transparent: true, opacity: 0.7,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const flowPoints = new THREE.Points(fGeo, fMat)

    const nGeo = new THREE.BufferGeometry()
    nGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePos, 3))
    nGeo.setAttribute('color',    new THREE.Float32BufferAttribute(nodeCol, 3))
    const nMat = new THREE.PointsMaterial({
      vertexColors: true, size: 0.16, sizeAttenuation: true,
      transparent: true, opacity: 0.85,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const nodeMesh = new THREE.Points(nGeo, nMat)

    return { trunkMesh, branchMesh, flowPoints, nodeMesh }
  }, [])

  /* Flow particle positions for animation */
  const flowState = useMemo(() => {
    const trunks = [2.8, 1.2, -0.3, -1.8, -3.2]
    return Array.from({ length: 40 }, (_, i) => ({
      x: (Math.random() - 0.5) * 22,
      y: trunks[i % 5],
      z: [-1, -2, -1.5, -2.5, -1][i % 5] + 0.1,
      speed: 0.02 + Math.random() * 0.04,
      dir: Math.random() > 0.5 ? 1 : -1,
    }))
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    /* Pulse trunks and branches */
    ;(trunkMesh.material as THREE.LineBasicMaterial).opacity  = 0.24 + Math.sin(t * 0.6)  * 0.06
    ;(branchMesh.material as THREE.LineBasicMaterial).opacity = 0.14 + Math.sin(t * 0.9)  * 0.05

    /* Flow particles travel along trunks */
    const pos = flowPoints.geometry.getAttribute('position') as THREE.BufferAttribute
    flowState.forEach((p, i) => {
      p.x += p.speed * p.dir
      if (p.x > 11)  p.x = -11
      if (p.x < -11) p.x =  11
      pos.setXYZ(i, p.x, p.y, p.z)
    })
    pos.needsUpdate = true

    /* Pulse node brightness */
    ;(nodeMesh.material as THREE.PointsMaterial).opacity = 0.7 + Math.sin(t * 1.4) * 0.2

    /* Very slow vertical drift of entire group */
    groupRef.current.position.y = Math.sin(t * 0.15) * 0.18
  })

  return (
    <group ref={groupRef}>
      <primitive object={trunkMesh}  />
      <primitive object={branchMesh} />
      <primitive object={flowPoints} />
      <primitive object={nodeMesh}   />
    </group>
  )
}

/* ─── Subtle background particle field ─── */
function BackgroundDots() {
  const ref = useRef<THREE.Points>(null!)

  const { geo, mat } = useMemo(() => {
    const pos: number[] = []
    for (let i = 0; i < 60; i++) {
      pos.push(
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 4 - 3,
      )
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({
      color: BLUE2, size: 0.04, sizeAttenuation: true,
      transparent: true, opacity: 0.3,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    return { geo, mat }
  }, [])

  useFrame((_, delta) => {
    ref.current.rotation.z += delta * 0.008
  })

  return <primitive object={new THREE.Points(geo, mat)} ref={ref} />
}

/* ─── Exported component ─── */
export function FooterScene3D() {
  const [ready, setReady] = useState(false)

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 1.8s ease' }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        onCreated={() => setReady(true)}
        style={{ background: 'transparent' }}
      >
        <CircuitPaths />
        <BackgroundDots />
      </Canvas>
    </div>
  )
}
