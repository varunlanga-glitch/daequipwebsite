import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Shovel,
  Wrench,
  ArrowsOutLineHorizontal,
  Cube,
  ForkKnife,
  Shield,
  Truck,
  Gear,
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const PRODUCTS = [
  { name: 'Digging Buckets', category: 'excavator', Icon: Shovel, specs: '400 AR Wear Steel, J-Series Teeth, XD/XDW/XDX Packages' },
  { name: 'Hydraulic Thumbs', category: 'excavator', Icon: Wrench, specs: 'X Series Direct Link, Cylinders In Stock, Pin-on or Weld-on' },
  { name: 'Long Reach Booms', category: 'excavator', Icon: ArrowsOutLineHorizontal, specs: 'EIK Series, 20+ Units Delivered, All Makes' },
  { name: 'WL Buckets', category: 'wheelloader', Icon: Cube, specs: 'GP/Light/Woodchip/Sulphur, XD XDW XDX, Half Arrows/Teeth/Liners' },
  { name: 'WL Attachments', category: 'wheelloader', Icon: ForkKnife, specs: 'Forks/Grapples/Blades, Hydraulic Couplers, All Makes' },
  { name: 'Machine Guarding', category: 'guarding', Icon: Shield, specs: 'Cab Guards/Catwalks, Rock Guards/Belly Pans, FOPS Available' },
  { name: 'Dozer & ADT Parts', category: 'guarding', Icon: Truck, specs: 'Tailgates/Blades, Mining/Forestry/Oil & Gas, CAD-Engineered' },
  { name: 'Custom Fabrication', category: 'custom', Icon: Gear, specs: 'CAD Drawings Provided, Structural Engineering, MOQ: 1 Unit' },
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
    // Heading slide up
    gsap.from(headingRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    })

    // Initial card stagger
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

    // Fade out all cards
    gsap.to(cards, {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      onComplete: () => {
        setActiveTab(key)
        // After state update, fade in visible cards
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

  const filtered = activeTab === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeTab)

  return (
    <section id="products" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef}>
          <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-2">
            What We Build
          </p>
          <h2 className="font-heading text-5xl md:text-6xl mb-10">
            Premium Attachments
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/10 pb-4">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`font-condensed text-sm uppercase tracking-wider px-4 py-2 transition-colors relative ${
                activeTab === tab.key
                  ? 'text-accent'
                  : 'text-muted hover:text-text'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => {
            const visible = activeTab === 'all' || product.category === activeTab
            return (
              <div
                key={product.name}
                className="product-card group bg-card p-6 border border-white/5 relative overflow-hidden transition-colors hover:bg-card-hover"
                style={{ display: visible ? 'block' : 'none' }}
              >
                {/* Yellow bottom border on hover */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                <product.Icon size={36} className="text-accent mb-4" weight="duotone" />
                <h3 className="font-heading text-2xl mb-2">{product.name}</h3>
                <p className="text-muted text-sm leading-relaxed">{product.specs}</p>
                <span className="inline-block mt-4 font-condensed text-xs uppercase tracking-wider text-rust">
                  {product.category}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
