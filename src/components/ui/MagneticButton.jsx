import { useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * A button/anchor that magnetically leans toward the cursor when hovered,
 * then springs back on leave. Renders as <a> when `href` is provided.
 */
export default function MagneticButton({ as, href, children, className = '', strength = 0.4, ...props }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate3d(0,0,0)'
  }

  const Comp = motion[href ? 'a' : as || 'button']

  return (
    <Comp
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-magnetic
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
}
