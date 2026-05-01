'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingParticles({ count = 180 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3]     = (Math.random() - 0.5) * 14
      p[i * 3 + 1] = (Math.random() - 0.5) * 14
      p[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return p
  }, [count])

  const navyRef   = useRef<THREE.Points>(null!)
  const orangeRef = useRef<THREE.Points>(null!)

  const navyPts = useMemo(() => points.slice(0, (count / 2) * 3), [points, count])
  const orangePts = useMemo(() => points.slice((count / 2) * 3), [points, count])

  useFrame((_, delta) => {
    navyRef.current.rotation.x   += delta * 0.04
    navyRef.current.rotation.y   += delta * 0.06
    orangeRef.current.rotation.x -= delta * 0.03
    orangeRef.current.rotation.y -= delta * 0.05
  })

  return (
    <group>
      <Points ref={navyRef} positions={navyPts} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#2B5BA8"
          size={0.05}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.5}
        />
      </Points>
      <Points ref={orangeRef} positions={orangePts} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#E8621A"
          size={0.05}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.35}
        />
      </Points>
    </group>
  )
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} gl={{ alpha: true, antialias: false }}>
        <ambientLight intensity={0.3} />
        <FloatingParticles />
      </Canvas>
    </div>
  )
}
