import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const timeline = [
  {
    year: '2026',
    title: 'B.Sc. Information Technology',
    body: 'Graduated with a strong foundation in software engineering, databases, and web development.',
    tag: 'Milestone',
  },
  {
    year: 'Now',
    title: 'Learning AI',
    body: 'Exploring machine learning, LLMs, and AI-powered application development.',
    tag: 'Ongoing',
  },
  {
    year: 'Now',
    title: 'Building Full Stack Applications',
    body: 'Shipping modern web apps with React, Node.js, and robust backend systems.',
    tag: 'Ongoing',
  },
  {
    year: 'Now',
    title: 'Exploring Cloud Computing',
    body: 'Diving into deployment, scalability, and cloud-native architectures.',
    tag: 'Ongoing',
  },
]

export default function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  // Animated line grows as you scroll through the section
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading chip="Journey" title="Experience & growth" />

        <div ref={ref} className="relative pl-8 sm:pl-0">
          {/* Center rail */}
          <div className="absolute left-2 top-0 h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2">
            <motion.div style={{ height }} className="w-px bg-gradient-to-b from-neon to-neon-deep shadow-neon" />
          </div>

          <div className="space-y-12">
            {timeline.map((it, i) => {
              const left = i % 2 === 0
              return (
                <Reveal key={it.title} delay={0.05}>
                  <div
                    className={`relative flex sm:w-1/2 ${
                      left ? 'sm:pr-10 sm:text-right' : 'sm:ml-auto sm:pl-10'
                    }`}
                  >
                    {/* Node dot */}
                    <span
                      className={`absolute top-2 h-4 w-4 rounded-full border-2 border-neon bg-base shadow-neon ${
                        left
                          ? 'left-[-1.55rem] sm:left-auto sm:right-[-2.05rem]'
                          : 'left-[-1.55rem] sm:left-[-2.05rem]'
                      }`}
                    >
                      <span className="absolute inset-0.5 animate-pulseGlow rounded-full bg-neon" />
                    </span>

                    <div className="glass glass-hover w-full p-6">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="font-display text-2xl font-extrabold neon-text">{it.year}</span>
                        <span className="rounded-full border border-neon/30 bg-neon/5 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-neon">
                          {it.tag}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{it.title}</h3>
                      <p className="mt-2 text-sm text-white/50">{it.body}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
