import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HardHat, Mountains, Tree, Drop, Plant, Recycle } from '@phosphor-icons/react'
import { cdnImage } from '../cdn'

gsap.registerPlugin(ScrollTrigger)

const INDUSTRIES = [
  { name: 'Construction', Icon: HardHat, image: cdnImage('industry-construction.jpg') },
  { name: 'Mining', Icon: Mountains, image: cdnImage('industry-mining.jpg') },
  { name: 'Forestry', Icon: Tree, image: cdnImage('industry-forestry.jpg') },
  { name: 'Oil & Gas', Icon: Drop, image: cdnImage('industry-oilgas.jpg') },
  { name: 'Landscaping', Icon: Plant, image: cdnImage('industry-landscaping.jpg') },
  { name: 'Waste Handling', Icon: Recycle, image: cdnImage('industry-waste.jpg') },
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
    <section className="py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-3">
            Industries We Serve
          </p>
          <h2 className="font-heading text-4xl md:text-5xl">
            Built for the Toughest Conditions
          </h2>
        </div>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INDUSTRIES.map(({ name, Icon, image }) => (
            <div key={name} className="industry-item group relative overflow-hidden h-56 bg-card">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-page via-page/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <Icon size={28} className="text-accent mx-auto mb-2" weight="duotone" />
                <span className="font-condensed text-xs uppercase tracking-wider text-text font-semibold">
                  {name}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
