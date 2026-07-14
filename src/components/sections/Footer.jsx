import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import MagneticButton from '../ui/MagneticButton'

const socials = [
   { icon: FiGithub, href: 'https://github.com/sumit3032006', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/sumit303', label: 'LinkedIn' },
  { icon: FiMail, href: 'srj3032006@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 text-center">
        <a href="#hero" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-neon/40 bg-neon/10 font-display text-lg font-extrabold text-neon shadow-neon">
            S
          </span>
          <span className="font-display text-lg font-semibold text-white">
            Sumit Jadhav<span className="text-neon">.</span>
          </span>
        </a>

        <div className="flex gap-4">
          {socials.map((s) => (
            <MagneticButton
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              strength={0.6}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-neon/50 hover:text-neon"
            >
              <s.icon size={20} />
            </MagneticButton>
          ))}
        </div>

        <div className="space-y-1 text-sm text-white/40">
          <p>© 2026 Sumit Jadhav</p>
          <p>Built with ❤️ and modern web technologies.</p>
        </div>
      </div>
    </footer>
  )
}
