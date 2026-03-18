import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cdnImage } from '../cdn'
import { ArrowUpRight } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const PRODUCTS = [
  {
    name: 'Digging Buckets',
    category: 'excavator',
    desc: 'Heavy-duty excavator digging buckets for construction and demanding excavating conditions. Replaceable bolt-on teeth, reversible cutting edges, and full 400 AR wear steel construction.',
    image: cdnImage('product-digging-buckets.jpg'),
    specs: [
      { key: 'Machine Class', val: '1T – 90T' },
      { key: 'Wear Steel', val: '400 AR / Hardox' },
      { key: 'Teeth', val: 'J-Series Bolt-on' },
      { key: 'Packages', val: 'XD / XDW / XDX' },
    ],
  },
  {
    name: 'Hydraulic Thumbs',
    category: 'excavator',
    desc: 'X Series direct link hydraulic thumbs for material handling, demolition, and site cleanup. Adjustable positions with cylinders in stock for fast turnaround.',
    image: cdnImage('product-hydraulic-thumbs.jpg'),
    specs: [
      { key: 'Machine Class', val: '2T – 50T' },
      { key: 'Mount', val: 'Pin-on / Weld-on' },
      { key: 'Tines', val: '3 – 5 Adjustable' },
      { key: 'Cylinder', val: 'In Stock' },
    ],
  },
  {
    name: 'Long Reach Booms',
    category: 'excavator',
    desc: 'EIK Series long reach boom and stick assemblies for dredging, deep trenching, and demolition. CAD-engineered for each machine to maintain structural integrity.',
    image: cdnImage('product-long-reach.jpg'),
    specs: [
      { key: 'Reach', val: 'Up to 24m' },
      { key: 'Series', val: 'EIK Custom' },
      { key: 'Units Delivered', val: '20+' },
      { key: 'Engineering', val: 'CAD / FEA' },
    ],
  },
  {
    name: 'WL Buckets',
    category: 'wheelloader',
    desc: 'Wheel loader buckets for general purpose, light material, woodchip, and sulphur handling. Available in XD, XDW, and XDX packages with half arrows, teeth, or bolt-on liners.',
    image: cdnImage('product-wl-buckets.jpg'),
    specs: [
      { key: 'Types', val: 'GP / Light / Woodchip' },
      { key: 'Capacity', val: '1.0 – 10 yd³' },
      { key: 'Edge', val: 'Half Arrow / Teeth / Liner' },
      { key: 'Packages', val: 'XD / XDW / XDX' },
    ],
  },
  {
    name: 'WL Forks & Grapples',
    category: 'wheelloader',
    desc: 'Wheel loader pallet forks, log grapples, and utility blades. Hydraulic quick coupler compatible for fast swap between attachments on all major loader makes.',
    image: cdnImage('product-wl-attachments.jpg'),
    specs: [
      { key: 'Types', val: 'Forks / Grapples / Blades' },
      { key: 'Coupler', val: 'Hydraulic Compatible' },
      { key: 'Makes', val: 'All Major Brands' },
      { key: 'Rating', val: 'Up to 15,000 lb' },
    ],
  },
  {
    name: 'Machine Guarding',
    category: 'guarding',
    desc: 'Cab guards, catwalks, rock guards, belly pans, and FOPS-rated protective structures. Engineered to shield operators and equipment in mining, forestry, and demolition.',
    image: cdnImage('product-guarding.jpg'),
    specs: [
      { key: 'Types', val: 'Cab / Rock / Belly Pan' },
      { key: 'Certification', val: 'FOPS Available' },
      { key: 'Industries', val: 'Mining / Forestry' },
      { key: 'Fit', val: 'OEM Pin Specs' },
    ],
  },
  {
    name: 'Dozer & ADT Parts',
    category: 'guarding',
    desc: 'Custom-built tailgates, blades, push arms, and guarding for dozers and articulated dump trucks. CAD-engineered structural components for the harshest operating conditions.',
    image: cdnImage('product-dozer-adt.jpg'),
    specs: [
      { key: 'Types', val: 'Tailgates / Blades / Guards' },
      { key: 'Industries', val: 'Mining / Oil & Gas' },
      { key: 'Engineering', val: 'CAD Drawings Provided' },
      { key: 'Steel', val: '400 AR / T-1' },
    ],
  },
  {
    name: 'Custom Fabrication',
    category: 'custom',
    desc: 'Don\'t see what you need? Send us your drawings or machine specs and we\'ll engineer a solution. CAD drawings provided with every order. Minimum order quantity: 1 unit.',
    image: cdnImage('product-custom-fab.jpg'),
    specs: [
      { key: 'Lead Time', val: '3 – 6 Weeks' },
      { key: 'Drawing', val: 'CAD Provided' },
      { key: 'MOQ', val: '1 Unit' },
      { key: 'Structural', val: 'P.Eng Stamped' },
    ],
  },
]

const TABS = [
  { key: 'all', label: 'All Products' },
  { key: 'excavator', label: 'Excavator' },
  { key: 'wheelloader', label: 'Wheel Loader' },
  { key: 'guarding', label: 'Guarding & Parts' },
  { key: 'custom', label: 'Custom' },
]

export default function Products() {
  const [activeTab, setActiveTab] = useState('all')
  const headingRef = useRef(null)
  const gridRef = useRef(null)
  const cardsAnimated = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from(headingRef.current, {
      y: 40, opacity: 0, duration: 0.7,
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    })
    const cards = gridRef.current?.querySelectorAll('.product-card')
    if (cards?.length && !cardsAnimated.current) {
      gsap.from(cards, {
        y: 30, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out',
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
      opacity: 0, scale: 0.97, duration: 0.2,
      onComplete: () => {
        setActiveTab(key)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const vis = gridRef.current?.querySelectorAll('.product-card:not([style*="display: none"])')
            if (vis?.length) gsap.fromTo(vis, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05 })
          })
        })
      },
    })
  }, [activeTab])

  return (
    <section id="products" className="py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-accent inline-block" />
              What We Build
            </p>
            <h2 className="font-heading text-5xl md:text-6xl text-dark">
              Product Portfolio
            </h2>
          </div>
          <p className="text-muted max-w-md text-sm leading-relaxed">
            Every attachment is CAD-engineered and manufactured at our Langley, BC facility using certified 400 AR wear steel. 2-year warranty standard on all products.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1 mb-10 border-b border-border pb-px">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`font-condensed text-sm uppercase tracking-wider px-5 py-3 min-h-[44px] cursor-pointer transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent relative ${
                activeTab === tab.key
                  ? 'text-accent font-bold'
                  : 'text-muted hover:text-dark'
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
        <div ref={gridRef} className="grid md:grid-cols-2 gap-4">
          {PRODUCTS.map((product) => {
            const visible = activeTab === 'all' || product.category === activeTab
            return (
              <div
                key={product.name}
                className="product-card group bg-card border border-border hover:border-accent/40 transition-all cursor-pointer overflow-hidden"
                style={{ display: visible ? 'flex' : 'none' }}
              >
                {/* Image */}
                <div className="relative w-48 md:w-56 shrink-0 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-heading text-2xl text-dark group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <ArrowUpRight size={18} className="text-muted group-hover:text-accent transition-colors shrink-0 mt-1" />
                  </div>
                  <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                    {product.desc}
                  </p>

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-auto">
                    {product.specs.map((spec) => (
                      <div key={spec.key} className="flex justify-between border-t border-border pt-2">
                        <span className="font-condensed text-[11px] uppercase tracking-wider text-muted">{spec.key}</span>
                        <span className="font-condensed text-[11px] uppercase tracking-wider text-dark font-semibold">{spec.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted mb-4 text-sm">Don't see what you need? We fabricate to spec — minimum order quantity: 1 unit.</p>
          <a
            href="#contact"
            className="inline-block bg-accent text-white font-condensed font-bold uppercase tracking-wider px-8 py-3 text-sm hover:bg-accent-dark transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Request Custom Quote
          </a>
        </div>
      </div>
    </section>
  )
}
