import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { cdnImage, cdnVideo } from '../cdn'

const STATS = [
  { value: 35, suffix: '+', label: 'Years in Business' },
  { value: 2, suffix: '-Year', label: 'Warranty' },
  { value: 1000, suffix: '+', label: 'Attachments Delivered' },
  { value: 50, suffix: '+', label: 'Machine Makes Supported' },
]

export default function Hero() {
  const headlineRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
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

    gsap.from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.6, delay: 0.7 })
    gsap.from('.hero-cta', { y: 20, opacity: 0, duration: 0.5, delay: 0.9 })

    const statEls = statsRef.current?.querySelectorAll('.stat-value')
    statEls?.forEach((el) => {
      const target = parseInt(el.dataset.value, 10)
      const suffix = el.dataset.suffix || ''
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration: 2,
        delay: 0.5,
        ease: 'power1.out',
        onUpdate() {
          el.textContent = Math.round(obj.val) + suffix
        },
      })
    })
  }, [])

  const headlineWords = ['Premium', 'Attachments.', 'Built', 'to', 'Last.']

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster={cdnImage('hero-bg.jpg')}
        >
          <source src={cdnVideo('hero-video.mp4')} type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-page via-page/85 to-page/40" />
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-page to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-32 pb-40">
        <div className="max-w-3xl">
          <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-5 flex items-center gap-3">
            <span className="w-8 h-px bg-accent inline-block" />
            Since 1989 &middot; Langley, BC
          </p>

          <h1 ref={headlineRef} className="font-heading text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.92] mb-8">
            {headlineWords.map((word, i) => (
              <span key={i} className="hero-word inline-block mr-4">
                {word}
              </span>
            ))}
          </h1>

          <p className="hero-subtitle text-muted text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Canadian-engineered excavator buckets, hydraulic thumbs, long reach booms, and custom heavy equipment attachments. Shipped across North America.
          </p>

          <div className="hero-cta flex flex-wrap gap-4">
            <a
              href="#products"
              className="btn-angled bg-accent text-page font-condensed font-bold uppercase tracking-wider px-10 py-4 text-sm hover:bg-yellow-400 transition-colors"
            >
              View Products
            </a>
            <a
              href="#contact"
              className="btn-angled border-2 border-text/20 text-text font-condensed font-bold uppercase tracking-wider px-10 py-4 text-sm hover:border-accent hover:text-accent transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        ref={statsRef}
        className="absolute bottom-0 left-0 w-full z-10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-white/10">
            {STATS.map((stat, i) => (
              <div key={i} className="py-6 md:py-8 px-4 border-r border-white/5 last:border-r-0">
                <div
                  className="stat-value font-heading text-3xl md:text-4xl text-accent"
                  data-value={stat.value}
                  data-suffix={stat.suffix}
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
      </div>
    </section>
  )
}
