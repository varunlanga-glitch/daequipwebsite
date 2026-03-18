import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { cdnImage, cdnVideo } from '../cdn'

const STATS = [
  { value: 35, suffix: '+', label: 'Years Experience' },
  { value: 2, suffix: ' Year', label: 'Warranty Standard' },
  { value: 1000, suffix: '+', label: 'Attachments Delivered' },
  { value: 50, suffix: '+', label: 'Machine Makes' },
]

export default function Hero() {
  const headlineRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      const words = headlineRef.current?.querySelectorAll('.hero-word')
      words?.forEach(w => { w.style.opacity = 1 })
      document.querySelectorAll('.hero-subtitle, .hero-cta').forEach(el => { el.style.opacity = 1 })
      const statEls = statsRef.current?.querySelectorAll('.stat-value')
      statEls?.forEach((el) => {
        el.textContent = el.dataset.value + (el.dataset.suffix || '')
      })
      return
    }

    const words = headlineRef.current?.querySelectorAll('.hero-word')
    if (words?.length) {
      gsap.from(words, { y: 60, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' })
    }
    gsap.from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.6, delay: 0.7 })
    gsap.from('.hero-cta', { y: 20, opacity: 0, duration: 0.5, delay: 0.9 })

    const statEls = statsRef.current?.querySelectorAll('.stat-value')
    statEls?.forEach((el) => {
      const target = parseInt(el.dataset.value, 10)
      const suffix = el.dataset.suffix || ''
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target, duration: 2, delay: 0.5, ease: 'power1.out',
        onUpdate() { el.textContent = Math.round(obj.val) + suffix },
      })
    })
  }, [])

  const headlineWords = ['Premium', 'Quality', 'Excavator', 'Attachments']

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" id="hero">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay muted loop playsInline
          className="w-full h-full object-cover"
          poster={cdnImage('hero-bg.jpg')}
        >
          <source src={cdnVideo('hero-video.mp4')} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/75 to-dark/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-36 pb-32">
        <div className="max-w-3xl">
          <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-5 flex items-center gap-3">
            <span className="w-8 h-px bg-accent inline-block" />
            Canadian Manufacturer · Est. 1989
          </p>

          <h1 ref={headlineRef} className="font-heading text-white text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] mb-8">
            {headlineWords.map((word, i) => (
              <span key={i} className="hero-word inline-block mr-4">
                {word}
              </span>
            ))}
          </h1>

          <p className="hero-subtitle text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Over 35 years of design, engineering &amp; manufacturing expertise in excavator buckets, hydraulic thumbs, wheel loader attachments, and custom heavy equipment solutions. Shipped across North America.
          </p>

          <div className="hero-cta flex flex-wrap gap-4">
            <a
              href="#products"
              className="bg-accent text-white font-condensed font-bold uppercase tracking-wider px-10 py-4 text-sm hover:bg-accent-dark transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View Product Range
            </a>
            <a
              href="#contact"
              className="border-2 border-white/30 text-white font-condensed font-bold uppercase tracking-wider px-10 py-4 text-sm hover:border-accent hover:text-accent transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div ref={statsRef} className="absolute bottom-0 left-0 w-full z-10 bg-dark/60 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {STATS.map((stat, i) => (
              <div key={i} className="py-6 md:py-7 px-4 border-r border-white/10 last:border-r-0 text-center md:text-left">
                <div
                  className="stat-value font-heading text-3xl md:text-4xl text-accent"
                  data-value={stat.value}
                  data-suffix={stat.suffix}
                >
                  0
                </div>
                <div className="text-white/50 text-xs font-condensed uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
