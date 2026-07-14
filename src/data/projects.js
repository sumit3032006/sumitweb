// Project showcase data. Images use inline SVG data-URIs so the site works
// fully offline with zero external asset dependencies (great for Lighthouse).

const posterSvg = (title, from, to) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${from}"/>
          <stop offset="1" stop-color="${to}"/>
        </linearGradient>
        <filter id="b"><feGaussianBlur stdDeviation="30"/></filter>
      </defs>
      <rect width="640" height="400" fill="#05070d"/>
      <circle cx="500" cy="90" r="120" fill="${from}" opacity="0.35" filter="url(#b)"/>
      <circle cx="120" cy="330" r="130" fill="${to}" opacity="0.30" filter="url(#b)"/>
      <g fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1">
        ${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="640" y2="${i * 50}"/>`).join('')}
        ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="400"/>`).join('')}
      </g>
      <text x="40" y="210" font-family="Sora, sans-serif" font-size="44" font-weight="800" fill="url(#g)">${title}</text>
    </svg>`)

export const projects = [
  {
    title: 'ChatWave',
    tagline: 'Real-time cross-platform chat',
    description:
      'A real-time messaging app with instant delivery, presence, and media sharing. Built cross-platform with a scalable Node.js backend and PostgreSQL persistence.',
    tech: ['Flutter', 'Firebase', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/sumitjadhav',
    demo: '#',
    image: posterSvg('ChatWave', '#00E5FF', '#7c5cff'),
  },
  {
    title: 'Mobile Shop Management System',
    tagline: 'Inventory & billing platform',
    description:
      'An end-to-end shop management system handling inventory, billing, customers, and sales reports with a clean admin dashboard and secure auth.',
    tech: ['PHP', 'MySQL', 'Bootstrap'],
    github: 'https://github.com/sumitjadhav',
    demo: '#',
    image: posterSvg('Shop MS', '#00ffa3', '#0088aa'),
  },
  {
    title: 'Industrial Gas Leakage Detector',
    tagline: 'IoT safety monitoring',
    description:
      'An IoT safety device that detects hazardous gas levels in real time and streams telemetry to the cloud with instant threshold-based alerts.',
    tech: ['Arduino', 'ESP8266', 'MQ-5', 'ThingSpeak'],
    github: 'https://github.com/sumitjadhav',
    demo: '#',
    image: posterSvg('Gas Detector', '#ff7ac6', '#ffb020'),
  },
]
