import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, OrbitControls, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function Gem() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.25;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} castShadow>
        {/* Octahedron makes a faceted gem silhouette */}
        <octahedronGeometry args={[1.2, 0]} />
        <MeshTransmissionMaterial
          thickness={1.5}
          roughness={0.05}
          transmission={1}
          ior={2.4}
          chromaticAberration={0.06}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.4}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationColor="#f7e6c4"
          attenuationDistance={1.6}
          color="#fff7e6"
        />
      </mesh>
    </Float>
  );
}

function GoldRing() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.x += dt * 0.15;
      ref.current.rotation.z += dt * 0.08;
    }
  });
  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={[1.6, -0.8, -0.5]}>
        <torusGeometry args={[0.55, 0.06, 64, 128]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={1}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <color attach="background" args={[0, 0, 0]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#fff1d6" />
      <directionalLight position={[-5, -2, -3]} intensity={0.6} color="#ffe2b8" />
      <Suspense fallback={null}>
        <Gem />
        <GoldRing />
        <Sparkles count={40} scale={6} size={2} speed={0.3} color="#f4d28a" />
        <Environment preset="studio" />
      </Suspense>
      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.6} luminanceSmoothing={0.4} mipmapBlur />
      </EffectComposer>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        rotateSpeed={0.4}
      />
    </Canvas>
  );
}
