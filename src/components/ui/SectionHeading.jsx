import Reveal from './Reveal'

/**
 * Consistent section header: a small neon chip label + large gradient title,
 * with an optional supporting line.
 */
export default function SectionHeading({ chip, title, subtitle, align = 'center' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <Reveal className={`mb-14 flex flex-col gap-4 ${alignment}`}>
      {chip && <span className="chip">{chip}</span>}
      <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
        <span className="neon-text">{title}</span>
      </h2>
      {subtitle && <p className="max-w-xl text-base text-white/50">{subtitle}</p>}
    </Reveal>
  )
}
