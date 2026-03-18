import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const STATS = [
  { value: 35, suffix: '+', label: 'Years in Business' },
  { value: 2, suffix: ' Year', label: 'Warranty' },
  { value: 604, suffix: '', label: 'Area Code — Call Us', prefix: '' },
  { value: 1000, suffix: '+', label: 'Attachments Built' },
]

function BucketSVG() {
  return (
    <svg viewBox="0 0 500 400" className="w-full max-w-lg mx-auto" fill="none">
      {/* Bucket body */}
      <path
        d="M100 280 L160 120 L340 120 L400 280 Z"
        fill="#1f2733"
        stroke="#f5c300"
        strokeWidth="2"
      />
      {/* Teeth */}
      {[180, 220, 260, 300, 340].map((x, i) => (
        <polygon
          key={i}
          points={`${x - 12},280 ${x},310 ${x + 12},280`}
          fill="#f5c300"
        />
      ))}
      {/* Reinforcement lines */}
      <line x1="130" y1="200" x2="370" y2="200" stroke="#7a8494" strokeWidth="1" strokeDasharray="6 4" />
      <line x1="145" y1="240" x2="355" y2="240" stroke="#7a8494" strokeWidth="1" strokeDasharray="6 4" />
      {/* Pin holes */}
      <circle cx="160" cy="130" r="8" fill="#090c0f" stroke="#7a8494" strokeWidth="1.5" />
      <circle cx="340" cy="130" r="8" fill="#090c0f" stroke="#7a8494" strokeWidth="1.5" />
      {/* Arm brackets */}
      <rect x="140" y="100" width="40" height="20" fill="#161b22" stroke="#f5c300" strokeWidth="1.5" />
      <rect x="320" y="100" width="40" height="20" fill="#161b22" stroke="#f5c300" strokeWidth="1.5" />
      {/* Wear edge */}
      <rect x="100" y="275" width="300" height="8" fill="#c44b1b" />
    </svg>
  )
}

export default function Hero() {
  const headlineRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    // Staggered word reveal
    const words = headlineRef.current?.querySelectorAll('.hero-word')
    if (words?.length) {
      gsap.from(words, {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    // Stats count-up
    const statEls = statsRef.current?.querySelectorAll('.stat-value')
    statEls?.forEach((el) => {
      const target = parseInt(el.dataset.value, 10)
      gsap.from(el, {
        innerText: 0,
        duration: 2,
        ease: 'power1.out',
        snap: { innerText: 1 },
        delay: 0.5,
        onUpdate() {
          const current = Math.round(parseFloat(el.style.getPropertyValue('--v') || gsap.getProperty(el, 'innerText')))
          el.textContent = current + (el.dataset.suffix || '')
        },
      })
      // Set final value after animation
      gsap.set(el, {
        onComplete() {
          el.textContent = (el.dataset.prefix || '') + target + (el.dataset.suffix || '')
        },
        delay: 2.6,
      })
    })
  }, [])

  const headlineWords = ['Premium', 'Attachments.', 'Built', 'to', 'Last.']

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16" id="hero">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,195,0,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,195,0,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left column */}
        <div>
          <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-4">
            Since 1989 · Langley, BC
          </p>

          <h1 ref={headlineRef} className="font-heading text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
            {headlineWords.map((word, i) => (
              <span key={i} className="hero-word inline-block mr-3">
                {word}
              </span>
            ))}
          </h1>

          <p className="text-muted text-lg max-w-md mb-8 font-body">
            Canadian-engineered excavator buckets, hydraulic thumbs, long reach booms, and custom heavy equipment attachments. Shipped across North America.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#products"
              className="btn-angled bg-accent text-page font-condensed font-bold uppercase tracking-wider px-8 py-3 text-sm hover:bg-yellow-400 transition-colors"
            >
              View Products
            </a>
            <a
              href="#contact"
              className="btn-angled border border-muted text-text font-condensed font-bold uppercase tracking-wider px-8 py-3 text-sm hover:border-accent hover:text-accent transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </div>

        {/* Right column — SVG bucket */}
        <div className="hidden md:block">
          <BucketSVG />
        </div>
      </div>

      {/* Stats bar */}
      <div
        ref={statsRef}
        className="absolute bottom-0 left-0 w-full bg-card/80 backdrop-blur-sm border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="stat-value font-heading text-3xl md:text-4xl text-accent"
                data-value={stat.value}
                data-suffix={stat.suffix}
                data-prefix={stat.prefix || ''}
              >
                0
              </div>
              <div className="text-muted text-xs font-condensed uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
