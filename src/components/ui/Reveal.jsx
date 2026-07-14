import { motion } from 'framer-motion'

/**
 * Scroll-triggered reveal wrapper. Fades + slides children into view once,
 * when they enter the viewport. `delay` staggers grouped children.
 */
export default function Reveal({ children, delay = 0, y = 40, className = '', once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
