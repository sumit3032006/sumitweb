import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { projects } from '../../data/projects'

/** Project card with mouse-follow 3D tilt, glow and floating hover. */
function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setTilt({ x: -(py - 0.5) * 12, y: (px - 0.5) * 12 })
    setGlow({ x: px * 100, y: py * 100 })
  }

  return (
    <Reveal delay={index * 0.12}>
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        whileHover={{ y: -10 }}
        className="glass group h-full overflow-hidden [transform-style:preserve-3d]"
        style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        {/* Cursor-follow glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(300px circle at ${glow.x}% ${glow.y}%, rgba(0,229,255,0.15), transparent 60%)`,
          }}
        />

        {/* Poster image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-white/70 backdrop-blur">
            {project.tagline}
          </span>
        </div>

        {/* Body */}
        <div className="p-6" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="font-display text-xl font-bold text-white">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/55">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-neon/20 bg-neon/5 px-2 py-0.5 text-xs text-neon/90"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 py-2.5 text-sm text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              <FiGithub /> GitHub
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-neon/50 bg-neon/10 py-2.5 text-sm font-semibold text-neon transition-colors hover:bg-neon/20"
            >
              <FiExternalLink /> Live Demo
            </a>
          </div>
        </div>
      </motion.article>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          chip="Selected Work"
          title="Projects I'm proud of"
          subtitle="From real-time chat to IoT safety systems — a few things I've built end to end."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
