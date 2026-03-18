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
    desc: 'In-house CAD engineering and structural design. Every attachment is built to spec in our Langley, BC facility using 400 AR wear steel.',
    Icon: PencilRuler,
  },
  {
    num: '02',
    title: 'Hydraulic Installation',
    desc: 'Complete hydraulic thumb and coupler installation. Cylinders in stock for fast turnaround on all major machine makes.',
    Icon: Drop,
  },
  {
    num: '03',
    title: 'Rebuild & Repair',
    desc: 'Worn-out buckets and attachments rebuilt with premium wear steel. Extend the life of your equipment and reduce downtime.',
    Icon: Hammer,
  },
  {
    num: '04',
    title: 'Shipping & Logistics',
    desc: 'We ship finished attachments across all of North America. Crating and freight coordination included with every order.',
    Icon: Truck,
  },
]

export default function Services() {
  const headingRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

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
    <section id="services" className="py-28 px-6 lg:px-10 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={cdnImage('services-bg.jpg')}
          alt=""
          role="presentation"
          className="w-full h-full object-cover opacity-10"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-page/90" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Left heading */}
          <div ref={headingRef} className="md:col-span-4">
            <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-accent inline-block" />
              What We Do
            </p>
            <h2 className="font-heading text-5xl md:text-6xl mb-6">
              Our Services
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              From initial design to final delivery, we handle every step of the process in-house at our Langley facility.
            </p>
            <a
              href="#contact"
              className="btn-angled inline-block bg-accent text-page font-condensed font-bold uppercase tracking-wider px-8 py-3 text-sm hover:bg-yellow-400 transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Right service list */}
          <div ref={listRef} className="md:col-span-8">
            {SERVICES.map((service) => (
              <div
                key={service.num}
                className="service-item group flex items-start gap-6 py-8 border-b border-white/5 hover:bg-white/[0.02] transition-colors px-6 -mx-6"
              >
                <div className="shrink-0 w-14 h-14 bg-card flex items-center justify-center border border-white/5 group-hover:border-accent/30 transition-colors">
                  <service.Icon size={24} className="text-accent" weight="duotone" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-heading text-sm text-rust">{service.num}</span>
                    <h3 className="font-heading text-2xl md:text-3xl">{service.title}</h3>
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
