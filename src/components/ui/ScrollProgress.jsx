import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin neon progress bar pinned to the top of the viewport, driven by the
 * page's scroll position with a spring for smoothness.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[90] h-[3px] w-full origin-left bg-gradient-to-r from-neon via-neon-soft to-white shadow-neon"
      aria-hidden
    />
  )
}
