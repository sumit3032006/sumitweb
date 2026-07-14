# Sumit Jadhav — 3D Developer Portfolio

A premium, futuristic, fully responsive **3D portfolio** for a Full Stack Developer & AI Enthusiast. Dark glassmorphism theme with soft neon-cyan glow, a persistent WebGL background (procedural sports car, reflective neon floor, particles, bloom + depth of field), scroll- and mouse-driven camera, and rich UI micro-interactions.

## ✨ Highlights

- **Real 3D hero** — an actual **Lamborghini Gallardo** glTF model with glossy clearcoat car paint, neon-reflective chrome/metal, and glowing head/tail lights. Slowly rotates, reacts to the mouse. Draco-compressed (~4 MB) with the decoder bundled locally so it stays offline.
- **Scroll-based cinematic camera** that cranes back and up as you scroll; mouse adds parallax.
- **Post-processing** — Bloom, Depth of Field, Vignette, SMAA.
- **Procedural environment lighting** (Lightformers) → realistic reflections with **zero external asset downloads** (offline-friendly, great Lighthouse).
- **Floating holographic glass cards**, particle field, reflective floor, atmospheric fog.
- **UI polish** — custom cursor glow, magnetic buttons, scroll progress bar, smooth scrolling (Lenis), typing role animation, section reveals, 3D tilt cards, rotating 3D skills ring, animated timeline, animated contact send button.
- **Performance-aware** — lazy-loaded canvas, adaptive DPR, `PerformanceMonitor` auto-downgrade, reduced-motion support, and a lighter quality tier for mobile / low-core devices.

## 🧱 Tech Stack

React · Vite · Tailwind CSS · Three.js · React Three Fiber · Drei · @react-three/postprocessing · Framer Motion · GSAP · Lenis · React Icons

## 🚀 Getting Started

```bash
npm install
npm run dev        # start dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## 📁 Structure

```
src/
├── App.jsx                      # Layout, preloader, providers, GSAP parallax
├── main.jsx
├── index.css                    # Tailwind + design system (glass, neon, ring)
├── data/
│   ├── skills.js                # Skill groups
│   └── projects.js              # Projects (inline SVG posters)
├── hooks/
│   ├── useLenis.js              # Global smooth scroll singleton
│   └── useMousePosition.js      # Normalized pointer ref (no re-renders)
└── components/
    ├── three/                   # WebGL layer
    │   ├── Experience.jsx       # Fixed <Canvas>, quality detection
    │   ├── Scene.jsx            # Lights, env, camera rig, floor, cards
    │   ├── Car.jsx              # Lamborghini glTF model (Draco)
    │   ├── Particles.jsx        # Additive neon particle field
    │   └── Effects.jsx          # Post-processing stack
    ├── ui/                      # CursorGlow, ScrollProgress, Navbar,
    │                            # MagneticButton, Reveal, SectionHeading
    └── sections/                # Hero, About, Skills, Projects,
                                 # Timeline, Contact, Footer
```

## 🔧 Customizing

- **Content:** edit `src/data/skills.js`, `src/data/projects.js`, and the copy inside each section.
- **Car model:** the Lamborghini lives at `public/models/lamborghini.glb`. Swap in any Draco-compressed `.glb` (keep it web-weight, ~2–6 MB) and it will be auto-centered/scaled. Tune paint gloss, chrome and glowing lights in `src/components/three/Car.jsx`. Verify the model's license before publishing.
- **Resume:** replace `public/resume.pdf` with your real file.
- **Social links:** update `src/components/sections/Footer.jsx`.
- **Contact form:** `Contact.jsx` simulates a send — wire it to EmailJS / an API / a `mailto:` as needed.
- **Theme:** neon color and palette live in `tailwind.config.js` and `:root` in `index.css`.

## ♿ Accessibility & SEO

- Semantic sections, labeled controls, `prefers-reduced-motion` handling.
- Full meta/OpenGraph tags, descriptive titles, lazy-loaded images.

---

© 2026 Sumit Jadhav — Built with ❤️ and modern web technologies.
