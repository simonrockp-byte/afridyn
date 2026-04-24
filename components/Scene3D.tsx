'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

function FloatingParticles({ count = 150 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10
      p[i * 3 + 1] = (Math.random() - 0.5) * 10
      p[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return p
  }, [count])

  const ref = useRef<THREE.Points>(null!)

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.1
    ref.current.rotation.y += delta * 0.15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#FF6B00"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

function GlowingSphere() {
  const mesh = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mesh.current.position.y = Math.sin(t * 0.5) * 0.2
    mesh.current.rotation.x = t * 0.2
    mesh.current.rotation.y = t * 0.3
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 15]} />
        <meshStandardMaterial
          color="#FF0000"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  )
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FF6B00" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#7000FF" />
        <FloatingParticles />
        <GlowingSphere />
      </Canvas>
    </div>
  )
}
