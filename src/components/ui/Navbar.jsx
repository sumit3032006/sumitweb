import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { getLenis } from '../../hooks/useLenis'

const links = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -20 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-500 ${
          scrolled ? 'glass rounded-full py-2.5' : ''
        }`}
      >
        <button onClick={() => go('hero')} className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-neon/40 bg-neon/10 font-display text-lg font-extrabold text-neon shadow-neon">
            S
          </span>
          <span className="font-display text-sm font-semibold tracking-wide text-white/90">
            Sumit<span className="text-neon">.</span>
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="rounded-full px-4 py-2 text-sm text-white/60 transition-colors hover:text-neon"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => go('contact')}
          className="hidden rounded-full border border-neon/50 bg-neon/10 px-5 py-2 text-sm font-semibold text-neon transition-colors hover:bg-neon/20 md:inline-flex"
        >
          Let&apos;s talk
        </button>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-neon md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <HiX size={20} /> : <HiMenuAlt4 size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-4 mt-3 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
          >
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="w-full rounded-xl px-4 py-3 text-left text-white/70 transition-colors hover:bg-white/5 hover:text-neon"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
