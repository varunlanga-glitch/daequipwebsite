import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PencilRuler, Drop, Hammer, Truck } from '@phosphor-icons/react'
import { cdnImage } from '../cdn'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    title: 'Design & Manufacturing',
    desc: 'In-house CAD engineering and structural design. FEA analysis on critical components. Every attachment is built to spec at our Langley, BC facility using certified 400 AR wear steel and T-1 structural plate.',
    Icon: PencilRuler,
  },
  {
    num: '02',
    title: 'Hydraulic Installation',
    desc: 'Complete hydraulic thumb and coupler installation. Cylinders in stock for fast turnaround. We install on all major excavator makes — Caterpillar, Komatsu, Volvo, Hitachi, John Deere, and more.',
    Icon: Drop,
  },
  {
    num: '03',
    title: 'Rebuild & Repair',
    desc: 'Worn-out buckets and attachments rebuilt with new wear steel. Hard-facing, re-toothing, and structural repairs. Extend the life of your equipment and reduce downtime significantly.',
    Icon: Hammer,
  },
  {
    num: '04',
    title: 'Shipping & Logistics',
    desc: 'We ship finished attachments across all of North America. Professional crating and freight coordination included with every order. Typical lead time: 3–6 weeks for custom builds.',
    Icon: Truck,
  },
]

export default function Services() {
  const headingRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from(headingRef.current, {
      y: 40, opacity: 0, duration: 0.7,
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    })
    const items = listRef.current?.querySelectorAll('.service-item')
    if (items?.length) {
      gsap.from(items, {
        x: -50, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 85%' },
      })
    }
  }, [])

  return (
    <section id="services" className="py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Left heading + image */}
          <div ref={headingRef} className="md:col-span-4">
            <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-accent inline-block" />
              What We Do
            </p>
            <h2 className="font-heading text-5xl md:text-6xl text-dark mb-6">
              Our Services
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              From initial design to final delivery, we handle every step of the process in-house at our Langley facility. Over 35 years of engineering expertise.
            </p>
            <div className="relative overflow-hidden h-48 mb-6">
              <img
                src={cdnImage('services-bg.jpg')}
                alt="" role="presentation"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-accent" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-accent" />
            </div>
            <a
              href="#contact"
              className="inline-block bg-accent text-white font-condensed font-bold uppercase tracking-wider px-8 py-3 text-sm hover:bg-accent-dark transition-colors cursor-pointer"
            >
              Get Started
            </a>
          </div>

          {/* Right service list */}
          <div ref={listRef} className="md:col-span-8">
            {SERVICES.map((service) => (
              <div
                key={service.num}
                className="service-item group flex items-start gap-5 py-7 border-b border-border hover:bg-page-alt transition-colors px-5 -mx-5"
              >
                <div className="shrink-0 w-12 h-12 bg-page-alt flex items-center justify-center border border-border group-hover:border-accent/30 transition-colors">
                  <service.Icon size={22} className="text-accent" weight="duotone" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-heading text-sm text-accent">{service.num}</span>
                    <h3 className="font-heading text-2xl md:text-3xl text-dark">{service.title}</h3>
                  </div>
                  <p className="text-muted text-sm leading-relaxed max-w-xl">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
