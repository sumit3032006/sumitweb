import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCheck, FiLoader } from 'react-icons/fi'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('sending')
    // Simulated send. Wire to an API / mailto / EmailJS as needed.
    setTimeout(() => {
      setStatus('sent')
      setTimeout(() => {
        setStatus('idle')
        setForm({ name: '', email: '', message: '' })
      }, 2600)
    }, 1400)
  }

  const fields = [
    { key: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com' },
  ]

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading
          chip="Contact"
          title="Let's build something great"
          subtitle="Have a project, role, or idea in mind? Drop me a message."
        />

        <Reveal>
          <form onSubmit={onSubmit} className="glass p-7 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((f) => (
                <label key={f.key} className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest text-white/50">{f.label}</span>
                  <input
                    required
                    type={f.type}
                    value={form[f.key]}
                    onChange={update(f.key)}
                    placeholder={f.placeholder}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/25 focus:border-neon/60 focus:bg-white/[0.07]"
                  />
                </label>
              ))}
            </div>

            <label className="mt-5 flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-white/50">Message</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder="Tell me about your project..."
                className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/25 focus:border-neon/60 focus:bg-white/[0.07]"
              />
            </label>

            {/* Animated send button */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={status !== 'idle'}
              className="btn-neon mt-7 w-full overflow-hidden shadow-neon disabled:opacity-90"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === 'idle' && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2"
                  >
                    Send Message <FiSend />
                  </motion.span>
                )}
                {status === 'sending' && (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                      <FiLoader />
                    </motion.span>
                    Sending...
                  </motion.span>
                )}
                {status === 'sent' && (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-neon-soft"
                  >
                    <FiCheck /> Message sent!
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
