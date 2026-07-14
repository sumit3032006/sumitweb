import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { skillGroups } from '../../data/skills'

/**
 * A single glass skill card. Adds a mouse-driven 3D tilt for the
 * "tilt with mouse / lift in 3D" hover effect.
 */
function TiltCard({ group }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ x: -py * 16, y: px * 16 })
  }

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="glass ring-card w-[240px] p-6"
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(20px)`,
        borderColor: tilt.x || tilt.y ? `${group.color}66` : undefined,
      }}
    >
      <div
        className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
        style={{ color: group.color, background: `${group.color}18`, border: `1px solid ${group.color}44` }}
      >
        {group.category}
      </div>
      <ul className="flex flex-wrap gap-2">
        {group.skills.map((s) => (
          <li
            key={s}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-sm text-white/75"
          >
            {s}
          </li>
        ))}
      </ul>
      <div
        className="pointer-events-none absolute inset-x-6 -bottom-3 h-6 rounded-full opacity-60 blur-lg"
        style={{ background: group.color }}
      />
    </div>
  )
}

export default function Skills() {
  const count = skillGroups.length
  const radius = 340 // desktop ring radius

  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          chip="Tech Stack"
          title="Skills orbiting my craft"
          subtitle="A rotating constellation of the tools and technologies I build with."
        />

        {/* Rotating 3D ring — desktop / tablet */}
        <div className="ring-scene relative hidden h-[440px] items-center justify-center md:flex">
          {/* Center glowing core */}
          <div className="absolute h-40 w-40 rounded-full bg-neon/20 blur-3xl" />
          <div className="ring relative h-[240px] w-[240px]">
            {skillGroups.map((group, i) => {
              const angle = (360 / count) * i
              return (
                <div
                  key={group.category}
                  className="absolute left-0 top-0"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  }}
                >
                  <TiltCard group={group} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Static responsive grid — mobile */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:hidden">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.08}>
              <motion.div whileHover={{ y: -6 }} className="glass p-6">
                <div
                  className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: group.color, background: `${group.color}18`, border: `1px solid ${group.color}44` }}
                >
                  {group.category}
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <li key={s} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-sm text-white/75">
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
