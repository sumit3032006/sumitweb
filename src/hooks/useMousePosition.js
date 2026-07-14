import { useEffect, useRef } from 'react'

/**
 * Tracks the pointer position and exposes it as a smoothed, normalized ref
 * ranging roughly from -1..1 on both axes (centered on the viewport).
 * Uses a ref (not state) to avoid re-renders — ideal for driving the 3D scene.
 */
export function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => {
    function onMove(e) {
      mouse.current.tx = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.ty = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return mouse
}
