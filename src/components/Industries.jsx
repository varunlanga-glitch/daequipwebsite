import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HardHat, Mountains, Tree, Drop, Plant, Recycle } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const INDUSTRIES = [
  {
    name: 'Construction',
    Icon: HardHat,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Mining',
    Icon: Mountains,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Forestry',
    Icon: Tree,
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Oil & Gas',
    Icon: Drop,
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Landscaping',
    Icon: Plant,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Waste Handling',
    Icon: Recycle,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80',
  },
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
              />
              <div className="absolute inset-0 bg-gradient-to-t from-page via-page/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <Icon size={28} className="text-accent mx-auto mb-2" weight="duotone" />
                <span className="font-condensed text-xs uppercase tracking-wider text-text font-semibold">
                  {name}
                </span>
              </div>
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
