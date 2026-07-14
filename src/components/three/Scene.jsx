import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, MeshReflectorMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import Car from './Car'
import Particles from './Particles'

/**
 * Scroll + mouse driven camera rig.
 * Reads the document scroll progress (0..1) and eases the camera along a
 * cinematic path — pulling back and craning up as the user scrolls — while
 * the mouse adds subtle parallax. This is the "camera movement while scrolling"
 * and "camera follows mouse" behaviour.
 */
function CameraRig({ mouse }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0.6, 0))

  useFrame(() => {
    const doc = document.documentElement
    const max = doc.scrollHeight - window.innerHeight
    const p = max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0

    const mx = mouse?.current?.x ?? 0
    const my = mouse?.current?.y ?? 0

    // Desired camera position along a scroll path
    const radius = 8 + p * 4
    const angle = 0.5 + p * Math.PI * 0.8
    const desired = new THREE.Vector3(
      Math.sin(angle) * radius + mx * 1.2,
      2.2 + p * 3.5 + my * 0.8,
      Math.cos(angle) * radius
    )

    camera.position.lerp(desired, 0.05)
    target.current.lerp(new THREE.Vector3(mx * 0.4, 0.6 - p * 0.5, 0), 0.05)
    camera.lookAt(target.current)
  })

  return null
}

/**
 * The full 3D world: procedural night-time environment lighting, the sports
 * car, a reflective neon floor, floating glass holographic cards, fog and a
 * particle field.
 */
export default function Scene({ mouse, quality = 'high' }) {
  return (
    <>
      {/* Atmospheric fog for depth */}
      <fog attach="fog" args={['#05070d', 12, 34]} />
      <color attach="background" args={['#05070d']} />

      {/* Key + fill lights */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 10, 4]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} color="#bff6ff" />
      <pointLight position={[-8, 4, -6]} intensity={120} color="#00E5FF" distance={30} />
      <pointLight position={[8, 3, 6]} intensity={80} color="#7c5cff" distance={30} />

      {/* Procedural HDRI-style environment for realistic metal reflections
          (built from Lightformers — no network asset required). */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2} color="#00E5FF" position={[-6, 4, -6]} scale={[8, 8, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#7c5cff" position={[6, 3, 6]} scale={[8, 8, 1]} />
        <Lightformer form="ring" intensity={2} color="#bff6ff" position={[0, 6, -8]} scale={6} />
        <Lightformer form="rect" intensity={1} color="#ffffff" position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 10, 1]} />
      </Environment>

      <CameraRig mouse={mouse} />

      {/* The hero car */}
      <Car mouse={mouse} />

      {/* Floating holographic glass cards around the car */}
      {[
        [-4.5, 2.6, -2, '#00E5FF'],
        [4.6, 3.2, -1, '#7c5cff'],
        [-3.8, 1.4, 3, '#00ffa3'],
      ].map(([x, y, z, c], i) => (
        <Float key={i} speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
          <mesh position={[x, y, z]} rotation={[0.2, i, 0.1]}>
            <boxGeometry args={[1.4, 0.9, 0.05]} />
            <meshPhysicalMaterial
              color={c}
              transmission={0.9}
              thickness={0.5}
              roughness={0.1}
              metalness={0.1}
              transparent
              opacity={0.5}
              emissive={c}
              emissiveIntensity={0.15}
            />
          </mesh>
        </Float>
      ))}

      {/* Reflective neon floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={quality === 'high' ? 1024 : 512}
          mixBlur={1}
          mixStrength={40}
          roughness={0.85}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.6}
          mirror={0.6}
        />
      </mesh>

      {/* Grid glow line under the car */}
      <gridHelper args={[60, 60, '#0088aa', '#062028']} position={[0, -0.34, 0]} />

      <Particles count={quality === 'high' ? 900 : 400} mouse={mouse} />
    </>
  )
}
