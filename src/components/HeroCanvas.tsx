"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions } = useMemo(() => {
    const count = 1500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return { positions: pos };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#E67817"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingGeometry({ position, color, speed = 1, shape = "box" }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  shape?: "box" | "octahedron" | "tetrahedron" | "torus";
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.6;
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "octahedron": return <octahedronGeometry args={[0.4]} />;
      case "tetrahedron": return <tetrahedronGeometry args={[0.5]} />;
      case "torus": return <torusGeometry args={[0.3, 0.1, 8, 16]} />;
      default: return <boxGeometry args={[0.5, 0.5, 0.5]} />;
    }
  }, [shape]);

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function RotatingRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    ringRef.current.rotation.x = state.clock.elapsedTime * 0.1;
  });

  return (
    <mesh ref={ringRef} position={[3, 0, -2]}>
      <torusGeometry args={[2, 0.03, 8, 64]} />
      <meshStandardMaterial color="#1F857A" transparent opacity={0.4} />
    </mesh>
  );
}

const shapes: Array<{
  position: [number, number, number];
  color: string;
  speed: number;
  shape: "box" | "octahedron" | "tetrahedron" | "torus";
}> = [
  { position: [4, 2, -3], color: "#E67817", speed: 0.8, shape: "octahedron" },
  { position: [-4, -1, -2], color: "#1F857A", speed: 1.2, shape: "tetrahedron" },
  { position: [6, -2, -4], color: "#E67817", speed: 0.6, shape: "box" },
  { position: [-5, 3, -5], color: "#1F857A", speed: 1.0, shape: "torus" },
  { position: [2, -3, -3], color: "#E67817", speed: 1.4, shape: "octahedron" },
  { position: [-3, 1, -4], color: "#1F857A", speed: 0.7, shape: "box" },
];

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#E67817" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#1F857A" intensity={0.5} />

        <ParticleNetwork />
        <RotatingRing />
        {shapes.map((s, i) => (
          <FloatingGeometry key={i} {...s} />
        ))}
      </Canvas>
    </div>
  );
}
