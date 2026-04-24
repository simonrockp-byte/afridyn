'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

function FloatingParticles({ count = 200 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 12
      p[i * 3 + 1] = (Math.random() - 0.5) * 12
      p[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return p
  }, [count])

  const ref = useRef<THREE.Points>(null!)

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.05
    ref.current.rotation.y += delta * 0.08
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#FF0000"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.6}
        />
      </Points>
    </group>
  )
}

function EnergyCore() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const innerRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.4
    meshRef.current.rotation.y = t * 0.6
    innerRef.current.rotation.z = -t * 0.8
    innerRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1)
  })

  return (
    <group position={[2, 0, 0]}>
      <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        {/* Outer Wireframe */}
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <meshStandardMaterial
            color="#FF6B00"
            wireframe
            emissive="#FF6B00"
            emissiveIntensity={2}
          />
        </mesh>
        {/* Inner Core */}
        <mesh ref={innerRef}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#FF0000"
            emissive="#FF0000"
            emissiveIntensity={5}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>
      {/* Light Source */}
      <pointLight position={[0, 0, 0]} intensity={10} color="#FF6B00" distance={5} />
    </group>
  )
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#FF6B00" />
        <FloatingParticles />
        <EnergyCore />
      </Canvas>
    </div>
  )
}
