import { Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { useLenis } from './hooks/useLenis'
import { useMousePosition } from './hooks/useMousePosition'

// UI
import CursorGlow from './components/ui/CursorGlow'
import ScrollProgress from './components/ui/ScrollProgress'
import Navbar from './components/ui/Navbar'

// Sections
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Timeline from './components/sections/Timeline'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'

// The heavy WebGL layer is lazy-loaded so DOM content paints first
const Experience = lazy(() => import('./components/three/Experience'))

/** Brief branded preloader while fonts + the scene warm up. */
function Preloader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[200] grid place-items-center bg-base"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.span
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="grid h-16 w-16 place-items-center rounded-2xl border border-neon/40 bg-neon/10 font-display text-3xl font-extrabold text-neon shadow-neon-lg"
            >
              S
            </motion.span>
            <div className="h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-neon to-transparent"
              />
            </div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Loading experience</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const mouse = useMousePosition()
  const [ready, setReady] = useState(false)
  useLenis() // enable global smooth scrolling

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1500)
    return () => clearTimeout(t)
  }, [])

  // GSAP-powered parallax on the decorative grid overlay
  useEffect(() => {
    const grid = document.querySelector('.grid-lines')
    if (!grid) return
    const setY = gsap.quickTo(grid, 'y', { duration: 0.7, ease: 'power3' })
    const onScroll = () => setY(window.scrollY * 0.12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Preloader done={ready} />

      {/* Persistent 3D background layer */}
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-base" />}>
        <Experience mouse={mouse} />
      </Suspense>

      {/* Decorative grid overlay behind content */}
      <div className="pointer-events-none fixed inset-0 -z-[5] grid-lines opacity-40" aria-hidden />

      {/* UI overlays */}
      <CursorGlow />
      <ScrollProgress />
      <Navbar />

      {/* Scrolling content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
