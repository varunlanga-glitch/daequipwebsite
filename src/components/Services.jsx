import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PencilRuler, Drop, Hammer, Truck } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    title: 'Design & Manufacturing',
    desc: 'In-house CAD engineering and structural design. Every attachment is built to spec in our Langley, BC facility.',
    Icon: PencilRuler,
  },
  {
    num: '02',
    title: 'Hydraulic Installation',
    desc: 'Complete hydraulic thumb and coupler installation. Cylinders in stock for fast turnaround.',
    Icon: Drop,
  },
  {
    num: '03',
    title: 'Rebuild & Repair',
    desc: 'Worn-out buckets and attachments rebuilt with 400 AR wear steel. Extend the life of your equipment.',
    Icon: Hammer,
  },
  {
    num: '04',
    title: 'Shipping & Logistics',
    desc: 'We ship finished attachments across all of North America. Crating and freight coordination included.',
    Icon: Truck,
  },
]

export default function Services() {
  const headingRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    gsap.from(headingRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    })

    const items = listRef.current?.querySelectorAll('.service-item')
    if (items?.length) {
      gsap.from(items, {
        x: -50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 85%' },
      })
    }
  }, [])

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef}>
          <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-2">
            What We Do
          </p>
          <h2 className="font-heading text-5xl md:text-6xl mb-12">
            Our Services
          </h2>
        </div>

        <div ref={listRef} className="space-y-0">
          {SERVICES.map((service) => (
            <div
              key={service.num}
              className="service-item group flex items-start gap-6 py-8 border-b border-white/5 hover:bg-card/50 transition-colors px-4 -mx-4"
            >
              <span className="font-heading text-4xl text-accent/30 group-hover:text-accent transition-colors shrink-0">
                {service.num}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <service.Icon size={24} className="text-rust" weight="duotone" />
                  <h3 className="font-heading text-2xl md:text-3xl">{service.title}</h3>
                </div>
                <p className="text-muted max-w-xl">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
