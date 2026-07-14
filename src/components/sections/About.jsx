import { motion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const stats = [
  { value: '10+', label: 'Projects Built' },
  { value: 'B.Sc IT', label: 'Graduate' },
  { value: '∞', label: 'Curiosity' },
]

export default function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading chip="About Me" title="Turning ideas into intelligent software" />

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Main glass card */}
          <Reveal>
            <div className="glass glass-hover group h-full p-8 sm:p-10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neon/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
              <p className="text-xl leading-relaxed text-white/80 sm:text-2xl">
                I am a passionate{' '}
                <span className="text-neon">B.Sc. Information Technology</span> graduate who
                enjoys building modern web applications, AI-powered software, and beautiful
                user experiences.
              </p>
              <p className="mt-6 text-white/50">
                I care about clean architecture, delightful interactions, and shipping
                products that feel fast and premium. Lately I&apos;ve been diving deep into
                AI, full-stack systems, and cloud computing — always learning, always
                building.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {['Full Stack', 'AI / ML', 'Cloud', 'UI Engineering'].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Stat cards */}
          <div className="grid gap-6">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="glass glass-hover flex items-center justify-between p-6"
                >
                  <span className="font-display text-4xl font-extrabold neon-text">
                    {s.value}
                  </span>
                  <span className="text-right text-sm uppercase tracking-widest text-white/50">
                    {s.label}
                  </span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
