import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ParticleCloud = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      // Purple, blue, cyan palette
      const t = Math.random();
      col[i * 3] = 0.4 + t * 0.3;     // R
      col[i * 3 + 1] = 0.1 + t * 0.2; // G
      col[i * 3 + 2] = 0.8 + t * 0.2; // B
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.1;
    const posArr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += Math.sin(t + i * 0.3) * 0.002;
      posArr[i * 3] += Math.cos(t + i * 0.2) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const GlowingSphere = ({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.2 + offset;
    ref.current.position.y = position[1] + Math.sin(t) * 0.8;
    ref.current.position.x = position[0] + Math.cos(t * 0.5) * 0.4;
    ref.current.scale.setScalar(scale + Math.sin(t * 2) * 0.1);
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[scale, 32, 32]} />
      <meshStandardMaterial color={color} transparent opacity={0.08} emissive={color} emissiveIntensity={0.3} />
    </mesh>
  );
};

const RHScene3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#8b5cf6" />
        <ParticleCloud />
        <GlowingSphere position={[-5, 3, -4]} color="#8b5cf6" scale={1.5} />
        <GlowingSphere position={[4, -2, -5]} color="#06b6d4" scale={1.2} />
        <GlowingSphere position={[6, 4, -6]} color="#3b82f6" scale={0.8} />
        <GlowingSphere position={[-3, -3, -3]} color="#a855f7" scale={0.6} />
        <GlowingSphere position={[0, 5, -8]} color="#0ea5e9" scale={1.0} />
      </Canvas>
    </div>
  );
};

export default RHScene3D;
