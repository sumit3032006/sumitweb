import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Floating neon particle field surrounding the scene.
 * A single Points object with an additive-blended round sprite — cheap and
 * GPU-friendly (thousands of particles at 60fps).
 */
export default function Particles({ count = 900, mouse }) {
  const ref = useRef()

  const { positions, sprite } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Distribute within a large box, denser near the center
      positions[i * 3 + 0] = (Math.random() - 0.5) * 34
      positions[i * 3 + 1] = Math.random() * 16 - 2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
    }

    // Soft round particle texture drawn on a canvas (no external asset)
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const ctx = c.getContext('2d')
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(191,246,255,1)')
    g.addColorStop(0.3, 'rgba(0,229,255,0.6)')
    g.addColorStop(1, 'rgba(0,229,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
    const sprite = new THREE.CanvasTexture(c)

    return { positions, sprite }
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.02
    const mx = mouse?.current?.x ?? 0
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mx * 0.05, 0.03)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        map={sprite}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
        toneMapped={false}
      />
    </points>
  )
}
