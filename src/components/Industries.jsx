import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HardHat, Mountains, Tree, Drop, Plant, Recycle } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const INDUSTRIES = [
  { name: 'Construction', Icon: HardHat },
  { name: 'Mining', Icon: Mountains },
  { name: 'Forestry', Icon: Tree },
  { name: 'Oil & Gas', Icon: Drop },
  { name: 'Landscaping', Icon: Plant },
  { name: 'Waste Handling', Icon: Recycle },
]

export default function Industries() {
  const ref = useRef(null)

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.industry-item')
    if (items?.length) {
      gsap.from(items, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    }
  }, [])

  return (
    <section className="py-16 px-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <p className="font-condensed text-muted uppercase tracking-[0.3em] text-xs text-center mb-8">
          Industries We Serve
        </p>
        <div ref={ref} className="grid grid-cols-3 md:grid-cols-6 gap-8">
          {INDUSTRIES.map(({ name, Icon }) => (
            <div key={name} className="industry-item flex flex-col items-center gap-3 group">
              <div className="p-4 bg-card border border-white/5 group-hover:border-accent/30 transition-colors">
                <Icon size={32} className="text-muted group-hover:text-accent transition-colors" weight="duotone" />
              </div>
              <span className="font-condensed text-xs uppercase tracking-wider text-muted group-hover:text-text transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
