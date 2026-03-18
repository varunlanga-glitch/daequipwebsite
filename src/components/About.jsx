import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cdnImage } from '../cdn'

gsap.registerPlugin(ScrollTrigger)

const STAT_CARDS = [
  { value: '1989', label: 'Year Founded' },
  { value: '35+', label: 'Years Experience' },
  { value: '2 Year', label: 'Warranty Standard' },
  { value: 'N. America', label: 'Shipping Coverage' },
]

const TEAM = [
  { name: 'Ed Lingel', role: 'President' },
  { name: 'Steve Tudhope', role: 'VP' },
  { name: 'Jeff Threinen', role: 'Operations Manager' },
  { name: 'Anthony Barlaan', role: 'Design & Engineering' },
  { name: 'Debbie Lingel', role: 'Business Administrator' },
]

export default function About() {
  const headingRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from(headingRef.current, {
      y: 40, opacity: 0, duration: 0.7,
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    })
    const cards = statsRef.current?.querySelectorAll('.stat-card')
    if (cards?.length) {
      gsap.from(cards, {
        scale: 0.9, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
      })
    }
  }, [])

  return (
    <section id="about" className="py-24 px-6 lg:px-10 bg-page-alt">
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="relative overflow-hidden h-80 md:h-auto">
            <img
              src={cdnImage('about-hero.jpg')} alt="Heavy equipment at Daequip facility"
              className="w-full h-full object-cover" loading="lazy"
            />
            <div className="absolute top-0 left-0 w-14 h-14 border-t-2 border-l-2 border-accent" />
            <div className="absolute bottom-0 right-0 w-14 h-14 border-b-2 border-r-2 border-accent" />
          </div>

          <div ref={headingRef}>
            <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-accent inline-block" />
              Who We Are
            </p>
            <h2 className="font-heading text-5xl md:text-6xl text-dark mb-6">About Daequip</h2>
            <p className="text-muted leading-relaxed mb-5">
              Daequip Premium Attachments Ltd has been designing and manufacturing heavy equipment attachments in Langley, British Columbia since 1989. With over 35 years of engineering expertise, we build excavator buckets, hydraulic thumbs, long reach booms, wheel loader attachments, and custom heavy equipment solutions.
            </p>
            <p className="text-muted leading-relaxed mb-5">
              Every product is CAD-engineered using certified 400 AR wear steel and manufactured in-house at our facility. We are a proudly Canadian manufacturer shipping across all of North America, with a 2-year structural warranty standard on every attachment.
            </p>
            <p className="text-muted leading-relaxed">
              Sister company:{' '}
              <a href="https://dormelcontainers.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline cursor-pointer">
                Dormel Containers
              </a>{' '}— dormelcontainers.com
            </p>
          </div>
        </div>

        {/* Stat cards */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-20">
          {STAT_CARDS.map((stat) => (
            <div key={stat.label} className="stat-card bg-white border border-border p-8 group hover:border-accent/30 transition-all relative overflow-hidden">
              <div className="font-heading text-4xl md:text-5xl text-accent mb-2">{stat.value}</div>
              <div className="font-condensed text-xs uppercase tracking-wider text-muted">{stat.label}</div>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-heading text-3xl text-dark mb-2">Leadership Team</h3>
            <p className="text-muted text-sm mb-6">The people behind 35+ years of premium attachments.</p>
          </div>
          <div>
            {TEAM.map((member, i) => (
              <div key={member.name} className="flex items-center justify-between py-4 border-b border-border">
                <div className="flex items-center gap-4">
                  <span className="font-heading text-sm text-accent/40 w-6">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-condensed font-semibold text-dark text-lg">{member.name}</span>
                </div>
                <span className="text-muted text-sm">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
