import { useEffect, useState } from 'react'
import Lenis from 'lenis'

/**
 * Global Lenis smooth-scroll instance.
 * Exposes the singleton so other components (nav links, scroll progress)
 * can drive / read the same scroll.
 */
let lenisInstance = null

export function getLenis() {
  return lenisInstance
}

export function useLenis() {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    // Skip smooth scroll for users who prefer reduced motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })
    lenisInstance = instance
    setLenis(instance)

    let rafId
    function raf(time) {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      lenisInstance = null
    }
  }, [])

  return lenis
}
