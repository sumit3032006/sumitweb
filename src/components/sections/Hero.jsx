import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiDownload, FiMail } from 'react-icons/fi'
import MagneticButton from '../ui/MagneticButton'
import { getLenis } from '../../hooks/useLenis'

const ROLES = ['Full Stack Developer', 'AI Builder', 'Web Designer', 'Software Engineer']

/** Typewriter that cycles through the roles list. */
function useTypewriter(words, { type = 70, del = 40, hold = 1400 } = {}) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[i % words.length]
    let timeout

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), hold)
    } else if (deleting && text === '') {
      setDeleting(false)
      setI((v) => v + 1)
    } else {
      timeout = setTimeout(() => {
        setText(word.substring(0, deleting ? text.length - 1 : text.length + 1))
      }, deleting ? del : type)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, i, words, type, del, hold])

  return text
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const typed = useTypewriter(ROLES)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -20 })
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-6xl px-5">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.span variants={item} className="chip mb-6">
            <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-neon" />
            Available for opportunities
          </motion.span>

          <motion.p variants={item} className="mb-2 text-lg text-white/60">
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl"
          >
            <span className="text-glow neon-text">Sumit</span>
            <br />
            Jadhav
          </motion.h1>

          {/* Typing role line */}
          <motion.div variants={item} className="mt-6 flex items-center gap-3 text-xl sm:text-2xl">
            <span className="text-white/50">I&apos;m a</span>
            <span className="font-display font-semibold text-neon text-glow">
              {typed}
              <span className="ml-0.5 inline-block h-6 w-[3px] animate-pulseGlow bg-neon align-middle" />
            </span>
          </motion.div>

          <motion.p variants={item} className="mt-5 max-w-md text-white/50">
            Full Stack Developer · AI Enthusiast · Problem Solver — crafting fast,
            beautiful, intelligent web experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <MagneticButton onClick={() => scrollTo('projects')} className="btn-neon shadow-neon">
              View Projects <FiArrowUpRight />
            </MagneticButton>
            <MagneticButton href="/Sumit_Jadhav_Resume-1.pdf" download className="btn-ghost">
              <FiDownload /> Download Resume
            </MagneticButton>
            <MagneticButton onClick={() => scrollTo('contact')} className="btn-ghost">
              <FiMail /> Contact Me
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white/40"
      >
        <div className="mx-auto flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-1.5 w-1.5 rounded-full bg-neon"
          />
        </div>
        <span className="mt-2 block text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      </motion.div>
    </section>
  )
}
