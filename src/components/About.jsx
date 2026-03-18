import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STAT_CARDS = [
  { value: '35+', label: 'Years of Experience' },
  { value: '2 Year', label: 'Warranty on All Products' },
  { value: '1989', label: 'Year Founded' },
  { value: 'NA', label: 'Ships All of North America' },
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
    gsap.from(headingRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    })

    const cards = statsRef.current?.querySelectorAll('.stat-card')
    if (cards?.length) {
      gsap.from(cards, {
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
      })
    }
  }, [])

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef}>
          <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-2">
            Who We Are
          </p>
          <h2 className="font-heading text-5xl md:text-6xl mb-6">
            About Daequip
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-muted leading-relaxed mb-4">
              Daequip Premium Attachments Ltd has been designing and manufacturing heavy equipment attachments in Langley, British Columbia since 1989. From excavator buckets to custom fabrication, every product is CAD-engineered and built to withstand the toughest conditions in construction, mining, forestry, and oil & gas.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              We are a proudly Canadian manufacturer shipping across all of North America. Every attachment comes with a 2-year warranty and is backed by over 35 years of engineering expertise.
            </p>
            <p className="text-muted leading-relaxed">
              Sister company:{' '}
              <a
                href="https://dormelcontainers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Dormel Containers
              </a>
            </p>
          </div>

          {/* Team table */}
          <div>
            <h3 className="font-heading text-2xl mb-4 text-accent">Leadership Team</h3>
            <table className="w-full">
              <tbody>
                {TEAM.map((member) => (
                  <tr key={member.name} className="border-b border-white/5">
                    <td className="py-3 font-condensed font-semibold text-text">
                      {member.name}
                    </td>
                    <td className="py-3 text-muted text-sm text-right">
                      {member.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stat cards */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STAT_CARDS.map((stat) => (
            <div
              key={stat.label}
              className="stat-card bg-card border border-white/5 p-6 text-center group hover:bg-card-hover transition-colors"
            >
              <div className="font-heading text-4xl text-accent mb-2">{stat.value}</div>
              <div className="font-condensed text-xs uppercase tracking-wider text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
