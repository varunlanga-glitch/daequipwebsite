import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PRODUCTS = [
  {
    name: 'Digging Buckets',
    category: 'excavator',
    specs: '400 AR Wear Steel, J-Series Teeth, XD/XDW/XDX Packages',
    image: 'https://images.unsplash.com/photo-1621922688758-8d01eaf343eb?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Hydraulic Thumbs',
    category: 'excavator',
    specs: 'X Series Direct Link, Cylinders In Stock, Pin-on or Weld-on',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Long Reach Booms',
    category: 'excavator',
    specs: 'EIK Series, 20+ Units Delivered, All Makes',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'WL Buckets',
    category: 'wheelloader',
    specs: 'GP/Light/Woodchip/Sulphur, XD XDW XDX, Half Arrows/Teeth/Liners',
    image: 'https://images.unsplash.com/photo-1589168167538-3c0da7506617?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'WL Attachments',
    category: 'wheelloader',
    specs: 'Forks/Grapples/Blades, Hydraulic Couplers, All Makes',
    image: 'https://images.unsplash.com/photo-1625758476104-f2ed6c81248a?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Machine Guarding',
    category: 'guarding',
    specs: 'Cab Guards/Catwalks, Rock Guards/Belly Pans, FOPS Available',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dozer & ADT Parts',
    category: 'guarding',
    specs: 'Tailgates/Blades, Mining/Forestry/Oil & Gas, CAD-Engineered',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Custom Fabrication',
    category: 'custom',
    specs: 'CAD Drawings Provided, Structural Engineering, MOQ: 1 Unit',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80',
  },
]

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'excavator', label: 'Excavator' },
  { key: 'wheelloader', label: 'Wheel Loader' },
  { key: 'guarding', label: 'Guarding' },
  { key: 'custom', label: 'Custom' },
]

export default function Products() {
  const [activeTab, setActiveTab] = useState('all')
  const headingRef = useRef(null)
  const gridRef = useRef(null)
  const cardsAnimated = useRef(false)

  useEffect(() => {
    gsap.from(headingRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    })

    const cards = gridRef.current?.querySelectorAll('.product-card')
    if (cards?.length && !cardsAnimated.current) {
      gsap.from(cards, {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
      })
      cardsAnimated.current = true
    }
  }, [])

  const handleTabClick = useCallback((key) => {
    if (key === activeTab) return
    const cards = gridRef.current?.querySelectorAll('.product-card')
    if (!cards) return

    gsap.to(cards, {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      onComplete: () => {
        setActiveTab(key)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const visibleCards = gridRef.current?.querySelectorAll('.product-card:not([style*="display: none"])')
            if (visibleCards?.length) {
              gsap.fromTo(
                visibleCards,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05 }
              )
            }
          })
        })
      },
    })
  }, [activeTab])

  return (
    <section id="products" className="py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-accent inline-block" />
              What We Build
            </p>
            <h2 className="font-heading text-5xl md:text-6xl">
              Premium Attachments
            </h2>
          </div>
          <p className="text-muted max-w-md text-sm leading-relaxed">
            Every attachment is CAD-engineered and manufactured at our Langley, BC facility using 400 AR wear steel. 2-year warranty standard.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`font-condensed text-sm uppercase tracking-wider px-5 py-2.5 transition-all ${
                activeTab === tab.key
                  ? 'bg-accent text-page font-bold'
                  : 'bg-card text-muted hover:text-text hover:bg-card-hover'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.map((product) => {
            const visible = activeTab === 'all' || product.category === activeTab
            return (
              <div
                key={product.name}
                className="product-card group relative overflow-hidden bg-card border border-white/5 hover:border-accent/20 transition-all"
                style={{ display: visible ? 'block' : 'none' }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  <span className="absolute top-3 left-3 font-condensed text-[10px] uppercase tracking-wider bg-page/80 text-accent px-2 py-1 backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading text-2xl mb-2 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{product.specs}</p>
                </div>

                {/* Yellow bottom border on hover */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            )
          })}
        </div>

        {/* CTA below products */}
        <div className="mt-12 text-center">
          <p className="text-muted mb-4 text-sm">Don't see what you need? We build custom attachments for any machine.</p>
          <a
            href="#contact"
            className="btn-angled inline-block bg-rust text-text font-condensed font-bold uppercase tracking-wider px-8 py-3 text-sm hover:bg-orange-700 transition-colors"
          >
            Request Custom Quote
          </a>
        </div>
      </div>
    </section>
  )
}
