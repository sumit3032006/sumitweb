import { useRef, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Draco-compressed model — decoder is bundled locally in /public/draco
// so the site stays fully offline (no gstatic CDN fetch at runtime).
const MODEL = '/models/lamborghini.glb'
useGLTF.preload(MODEL, '/draco/')

/**
 * Real Lamborghini Gallardo (glTF/Draco). Auto-centered and scaled to the
 * scene, with enhanced car-paint clearcoat, neon-reflective metals and glowing
 * head/tail lights. Slowly rotates and reacts to the mouse.
 */
export default function Car({ mouse }) {
  const group = useRef()
  const { scene } = useGLTF(MODEL, '/draco/')

  // Center on origin, rest on the floor, and upgrade materials. Written to be
  // idempotent so React StrictMode's double-invoke is harmless.
  useLayoutEffect(() => {
    scene.position.set(0, 0, 0)
    scene.rotation.set(0, 0, 0)
    scene.scale.set(1, 1, 1)

    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const s = 5.2 / Math.max(size.x, size.z) // normalize longest footprint axis
    scene.scale.setScalar(s)

    // Recompute after scaling to seat wheels on y=0 and center horizontally
    const box2 = new THREE.Box3().setFromObject(scene)
    const center = box2.getCenter(new THREE.Vector3())
    scene.position.x -= center.x
    scene.position.z -= center.z
    scene.position.y -= box2.min.y

    scene.traverse((o) => {
      if (!o.isMesh) return
      o.castShadow = true
      o.receiveShadow = true
      const m = o.material
      if (!m) return
      const name = m.name || ''

      // Strong environment reflections across all surfaces
      m.envMapIntensity = 2.2

      if (name.startsWith('paint')) {
        // Glossy automotive clearcoat finish
        m.metalness = 0.9
        m.roughness = 0.3
        if ('clearcoat' in m) {
          m.clearcoat = 1
          m.clearcoatRoughness = 0.06
        }
        m.envMapIntensity = 2.8
      } else if (name.includes('glass')) {
        m.roughness = 0.05
        m.metalness = 0.2
        m.envMapIntensity = 3
      } else if (name.includes('chrome') || name.includes('metal') || name.includes('mirror')) {
        m.metalness = 1
        m.roughness = 0.15
        m.envMapIntensity = 3
      } else if (name.includes('tire') || name.includes('rubber')) {
        m.roughness = 0.9
        m.metalness = 0
      }

      // Make the emissive head/tail lights glow into the Bloom pass
      if (m.emissive && (m.emissiveIntensity > 0 || (m.emissive.r + m.emissive.g + m.emissive.b) > 0)) {
        m.emissiveIntensity = Math.max(m.emissiveIntensity, 2.5)
        m.toneMapped = false
      }
    })
  }, [scene])

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime

    // Slow continuous rotation
    group.current.rotation.y += delta * 0.15

    // Mouse subtly tilts the car
    const mx = mouse?.current?.x ?? 0
    const my = mouse?.current?.y ?? 0
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, mx * 0.05, 0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -my * 0.04, 0.05)

    // Gentle hover above the reflective floor
    group.current.position.y = -0.34 + Math.sin(t * 0.7) * 0.05
  })

  return (
    <group ref={group} position={[0, -0.34, 0]} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}
