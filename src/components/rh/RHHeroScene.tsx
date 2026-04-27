import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, AdaptiveDpr, AdaptiveEvents, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

/* ── Particle Galaxy ─────────────────────────────────────── */
const Galaxy = () => {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 1800;

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const siz = new Float32Array(COUNT);
    const palette = [
      new THREE.Color("#6366f1"), // indigo
      new THREE.Color("#8b5cf6"), // purple
      new THREE.Color("#10b981"), // emerald
      new THREE.Color("#06b6d4"), // cyan
      new THREE.Color("#ffffff"),
    ];
    for (let i = 0; i < COUNT; i++) {
      // Spiral disc with depth
      const radius = Math.random() * 18 + 2;
      const branch = (i % 3) * ((Math.PI * 2) / 3);
      const spin = radius * 0.18;
      const angle = branch + spin + Math.random() * 0.6;
      const yJitter = (Math.random() - 0.5) * 4;
      pos[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.2;
      pos[i * 3 + 1] = yJitter;
      pos[i * 3 + 2] = Math.sin(angle) * radius - 6 + (Math.random() - 0.5) * 1.2;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
      siz[i] = Math.random() * 0.06 + 0.02;
    }
    return [pos, col, siz];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.025;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/* ── Laptop Mockup ──────────────────────────────────────── */
const Laptop = () => {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2 - 0.3;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.06 - 0.15;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
      <group ref={group} position={[2.6, 0.2, 0]} scale={0.95}>
        {/* Base */}
        <mesh position={[0, -0.7, 0]} castShadow>
          <boxGeometry args={[3.2, 0.12, 2.1]} />
          <meshStandardMaterial color="#0a0d18" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Hinge bar */}
        <mesh position={[0, -0.6, -1]} rotation={[0, 0, 0]}>
          <boxGeometry args={[3.2, 0.05, 0.08]} />
          <meshStandardMaterial color="#1a1d28" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* Screen */}
        <group position={[0, 0.55, -1]} rotation={[-0.18, 0, 0]}>
          <mesh>
            <boxGeometry args={[3.2, 2.0, 0.08]} />
            <meshStandardMaterial color="#0a0d18" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Screen glow */}
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[3.0, 1.85]} />
            <meshBasicMaterial color="#6366f1" transparent opacity={0.85} />
          </mesh>
          {/* Screen content highlights */}
          <mesh position={[-1.0, 0.3, 0.05]}>
            <planeGeometry args={[0.9, 0.55]} />
            <meshBasicMaterial color="#a5b4fc" transparent opacity={0.6} />
          </mesh>
          <mesh position={[0.3, -0.2, 0.05]}>
            <planeGeometry args={[1.7, 0.35]} />
            <meshBasicMaterial color="#c4b5fd" transparent opacity={0.45} />
          </mesh>
          <mesh position={[0.5, 0.45, 0.05]}>
            <planeGeometry args={[1.3, 0.18]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

/* ── Phone Mockup ───────────────────────────────────────── */
const Phone = () => {
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.9}>
      <group position={[-2.2, -0.4, 1.5]} rotation={[0.05, 0.5, -0.18]} scale={0.85}>
        {/* Body */}
        <mesh>
          <boxGeometry args={[1.05, 2.15, 0.1]} />
          <meshStandardMaterial color="#0a0d18" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0, 0.055]}>
          <planeGeometry args={[0.92, 2.0]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.85} />
        </mesh>
        {/* App tiles */}
        <mesh position={[-0.2, 0.55, 0.06]}>
          <planeGeometry args={[0.32, 0.32]} />
          <meshBasicMaterial color="#a5b4fc" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0.2, 0.55, 0.06]}>
          <planeGeometry args={[0.32, 0.32]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[0.78, 0.5]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
        <mesh position={[0, -0.65, 0.06]}>
          <planeGeometry args={[0.78, 0.6]} />
          <meshBasicMaterial color="#c4b5fd" transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
};

/* ── Glowing Rings ──────────────────────────────────────── */
const NeonRing = ({ position, color, scale = 1, speed = 0.3 }: { position: [number, number, number]; color: string; scale?: number; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[1.3, 0.025, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </mesh>
  );
};

/* ── Mouse + Scroll driven scene rig ────────────────────── */
const SceneRig = ({ children }: { children: React.ReactNode }) => {
  const { mouse } = useThree();
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.25, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -mouse.y * 0.15, 0.05);
  });
  return <group ref={group}>{children}</group>;
};

/* ── Main Scene ─────────────────────────────────────────── */
const RHHeroScene = () => {
  const { scrollYProgress } = useScroll();
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.25]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);

  return (
    <motion.div
      className="absolute inset-0 z-0"
      style={{ opacity: sceneOpacity, scale: sceneScale }}
    >
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />

        {/* Lighting */}
        <ambientLight intensity={0.25} />
        <pointLight position={[5, 4, 5]} intensity={1.4} color="#6366f1" />
        <pointLight position={[-5, -3, 4]} intensity={1.1} color="#8b5cf6" />
        <pointLight position={[0, 5, -3]} intensity={0.8} color="#10b981" />

        <Suspense fallback={null}>
          <SceneRig>
            <Galaxy />
            <Laptop />
            <Phone />
            <NeonRing position={[0, 0.5, -2]} color="#6366f1" scale={1.6} speed={0.2} />
            <NeonRing position={[1, -1, -1]} color="#8b5cf6" scale={1.0} speed={-0.3} />
            <NeonRing position={[-1.5, 1.2, 0]} color="#10b981" scale={0.7} speed={0.4} />
          </SceneRig>
          <Environment preset="city" />
        </Suspense>

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </motion.div>
  );
};

export default RHHeroScene;
