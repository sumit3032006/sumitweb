import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei'
import Scene from './Scene'
import Effects from './Effects'

/**
 * Fixed full-viewport WebGL layer that sits behind the whole page.
 * All DOM sections scroll on top of this single persistent canvas.
 *
 * Performance strategy:
 *  - Detects coarse pointers / small screens and drops to "low" quality
 *    (fewer particles, smaller reflection buffer, no depth-of-field).
 *  - PerformanceMonitor + AdaptiveDpr dynamically scale resolution to hold 60fps.
 */
export default function Experience({ mouse }) {
  const [quality, setQuality] = useState('high')
  const [dpr, setDpr] = useState(1.5)

  useEffect(() => {
    const small = window.matchMedia('(max-width: 768px)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const lowCores = (navigator.hardwareConcurrency || 8) <= 4
    if (small || coarse || lowCores) {
      setQuality('low')
      setDpr(1)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen">
      <Canvas
        shadows
        dpr={dpr}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
        camera={{ position: [7, 3, 6], fov: 42, near: 0.1, far: 100 }}
      >
        <PerformanceMonitor
          onDecline={() => {
            setQuality('low')
            setDpr(1)
          }}
        />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Suspense fallback={null}>
          <Scene mouse={mouse} quality={quality} />
          <Effects enableDOF={quality === 'high'} />
        </Suspense>
      </Canvas>
    </div>
  )
}
