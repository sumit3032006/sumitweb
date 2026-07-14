import { useEffect, useRef } from 'react'

/**
 * Custom cursor: a soft neon glow that follows the pointer with easing plus a
 * small solid dot for precision. Replaces the native cursor on fine pointers.
 * Purely ref-driven (no React re-renders) for buttery movement.
 */
export default function CursorGlow() {
  const glow = useRef(null)
  const dot = useRef(null)

  useEffect(() => {
    // Only enable on devices with a fine pointer (desktop)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const glowPos = { ...pos }
    let raf

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`
      }
      // Grow the glow when hovering interactive elements
      const interactive = e.target.closest('a, button, [data-magnetic], input, textarea')
      if (glow.current) glow.current.dataset.active = interactive ? 'true' : 'false'
    }

    const loop = () => {
      glowPos.x += (pos.x - glowPos.x) * 0.15
      glowPos.y += (pos.y - glowPos.y) * 0.15
      if (glow.current) {
        glow.current.style.transform = `translate3d(${glowPos.x - 20}px, ${glowPos.y - 20}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden>
      <div
        ref={glow}
        data-active="false"
        className="absolute left-0 top-0 h-10 w-10 rounded-full bg-neon/40 blur-xl transition-[width,height,background] duration-300 data-[active=true]:h-16 data-[active=true]:w-16 data-[active=true]:bg-neon/60"
      />
      <div ref={dot} className="absolute left-0 top-0 h-2 w-2 rounded-full bg-neon-soft shadow-neon" />
    </div>
  )
}
