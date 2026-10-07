import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { DataTexture, RepeatWrapping, RGBAFormat, Vector3 } from "three";
import type { MotionValue } from "framer-motion";

export type GatewayPalette = { background: string; metal: string; floor: string; accent: string; light: string };
type Props = {
  palette: GatewayPalette;
  pointer: MutableRefObject<{ x: number; y: number }>;
  progress: MotionValue<number>;
  active: boolean;
  onReady: () => void;
};

// An abstract architectural sculpture, not a model of a real building.
function Gateway({ palette, pointer, progress, onReady }: Omit<Props, "active">) {
  const texture = useMemo(() => {
    const size = 128;
    const pixels = new Uint8Array(size * size * 4);
    let seed = 421;
    for (let i = 0; i < size * size; i++) {
      seed = (seed * 16807) % 2147483647;
      const grain = 175 + (seed % 65);
      pixels.set([grain, grain, grain, 255], i * 4);
    }
    const map = new DataTexture(pixels, size, size, RGBAFormat);
    map.wrapS = map.wrapT = RepeatWrapping;
    map.repeat.set(5, 5);
    map.needsUpdate = true;
    return map;
  }, []);
  const target = useMemo(() => new Vector3(), []);
  const firstFrame = useRef(true);
  useEffect(() => () => texture.dispose(), [texture]);
  useFrame(({ camera, gl }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const scroll = Math.max(0, Math.min(1, progress.get()));
    target.set(pointer.current.x * 0.65, 3.1 + pointer.current.y * 0.3 + scroll * 0.5, 14 - scroll * 1.1);
    camera.position.lerp(target, 1 - Math.exp(-3 * delta));
    camera.lookAt(0, 2.2, -3);
    if (firstFrame.current) {
      firstFrame.current = false;
      onReady();
    }
    // Local non-sensitive diagnostics make motion verifiable without global state.
    gl.domElement.dataset.cameraX = camera.position.x.toFixed(3);
    gl.domElement.dataset.cameraZ = camera.position.z.toFixed(3);
  });
  return (
    <>
      <color attach="background" args={[palette.background]} />
      <fog attach="fog" args={[palette.background, 18, 46]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[1, 9, 6]} intensity={2.5} color={palette.light} />
      <pointLight position={[5, 3, 4]} intensity={65} distance={18} color={palette.accent} />
      <Environment resolution={128}>
        <Lightformer position={[0, 7, 2]} rotation-x={Math.PI / 2} scale={[16, 10, 1]} intensity={2} color={palette.light} />
        <Lightformer position={[8, 3, -3]} rotation-y={-Math.PI / 2} scale={[10, 6, 1]} intensity={3} color={palette.accent} />
      </Environment>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.15, -8]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color={palette.floor} roughness={0.38} metalness={0.65} roughnessMap={texture} bumpMap={texture} bumpScale={0.025} />
      </mesh>
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i} position={[4.5, 0, -i * 3.8]}>
          {[-2.5, 2.5].map(x => (
            <mesh key={x} position={[x, 3.1, 0]}>
              <boxGeometry args={[0.42, 6.2, 0.65]} />
              <meshStandardMaterial color={palette.metal} metalness={0.8} roughness={0.42} bumpMap={texture} bumpScale={0.035} />
            </mesh>
          ))}
          <mesh position={[0, 6.15, 0]}>
            <boxGeometry args={[5.42, 0.42, 0.65]} />
            <meshStandardMaterial color={palette.metal} metalness={0.8} roughness={0.42} bumpMap={texture} bumpScale={0.035} />
          </mesh>
          {[-2.28, 2.28].map(x => (
            <mesh key={x} position={[x, 3.05, 0.34]}>
              <boxGeometry args={[0.045, 6.05, 0.025]} />
              <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={3} toneMapped={false} />
            </mesh>
          ))}
          <mesh position={[0, 5.94, 0.34]}>
            <boxGeometry args={[4.6, 0.045, 0.025]} />
            <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={3} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </>
  );
}

export default function RHGatewayScene({ active, ...props }: Props) {
  return (
    <Canvas dpr={[1, 1.5]} frameloop={active ? "always" : "never"}
      camera={{ position: [0, 3.1, 14], fov: 42, near: 0.1, far: 65 }}
      gl={{ antialias: true, powerPreference: "low-power" }}>
      <Gateway {...props} />
    </Canvas>
  );
}