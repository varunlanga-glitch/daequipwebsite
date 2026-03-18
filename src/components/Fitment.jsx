import { useState, useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagnifyingGlass, CaretDown, CheckCircle, XCircle, ArrowRight, Wrench } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

// ── Data ──────────────────────────────────────────────────────────────────
const MACHINES = {
  Caterpillar: {
    Excavator: [
      '301.7 CR (1.7T)', '303 CR (3.5T)', '306 CR (6T)', '308 CR (8T)',
      '313 (13T)', '320 (20T)', '325 (25T)', '330 (30T)', '336 (36T)',
      '340 (40T)', '349 (49T)', '352 (52T)', '374 (74T)', '390 (90T)',
    ],
    'Wheel Loader': [
      '906 (1.0 yd³)', '908 (1.15 yd³)', '910 (1.3 yd³)', '914 (1.5 yd³)',
      '920 (2.5 yd³)', '926M (3.0 yd³)', '930M (3.25 yd³)', '938M (3.5 yd³)',
      '950M (4.0 yd³)', '962M (4.5 yd³)', '966M (5.25 yd³)', '972M (6.5 yd³)',
      '980M (7.5 yd³)', '988K (10 yd³)',
    ],
    Dozer: ['D3 (8T)', 'D4 (10T)', 'D5 (14T)', 'D6 (20T)', 'D7 (27T)', 'D8 (38T)', 'D9 (49T)', 'D10 (66T)'],
  },
  Komatsu: {
    Excavator: [
      'PC30 (3T)', 'PC55 (5.5T)', 'PC78 (7.8T)', 'PC130 (13T)',
      'PC170 (17T)', 'PC200 (20T)', 'PC210 (21T)', 'PC228 (23T)',
      'PC290 (29T)', 'PC360 (36T)', 'PC490 (49T)', 'PC650 (65T)',
      'PC800 (80T)',
    ],
    'Wheel Loader': [
      'WA150 (1.5 yd³)', 'WA200 (2.0 yd³)', 'WA270 (2.7 yd³)',
      'WA320 (3.2 yd³)', 'WA380 (3.8 yd³)', 'WA470 (5.0 yd³)',
      'WA500 (6.5 yd³)', 'WA600 (8.0 yd³)',
    ],
    Dozer: ['D37 (9T)', 'D39 (10T)', 'D51 (13T)', 'D61 (17T)', 'D65 (20T)', 'D85 (27T)', 'D155 (40T)'],
  },
  Volvo: {
    Excavator: [
      'EC55 (5.5T)', 'EC140 (14T)', 'EC200 (20T)', 'EC220 (22T)',
      'EC250 (25T)', 'EC300 (30T)', 'EC350 (35T)', 'EC380 (38T)',
      'EC480 (48T)', 'EC750 (75T)',
    ],
    'Wheel Loader': [
      'L60 (1.7 yd³)', 'L70 (2.3 yd³)', 'L90 (3.0 yd³)',
      'L110 (3.5 yd³)', 'L120 (4.0 yd³)', 'L150 (5.0 yd³)',
      'L180 (6.0 yd³)', 'L220 (7.5 yd³)', 'L260 (9.0 yd³)',
    ],
    ADT: ['A25G (24T)', 'A30G (28T)', 'A35G (34T)', 'A40G (39T)', 'A45G (42T)', 'A60H (55T)'],
  },
  'John Deere': {
    Excavator: [
      '35G (3.5T)', '50G (5T)', '75G (7.5T)', '130G (13T)',
      '160G (16T)', '200G (20T)', '210G (21T)', '245G (24T)',
      '300G (30T)', '350G (35T)', '470G (47T)', '670G (67T)',
    ],
    'Wheel Loader': [
      '304L (0.5 yd³)', '324L (1.3 yd³)', '444L (2.5 yd³)',
      '524L (3.0 yd³)', '624L (3.5 yd³)', '644L (4.5 yd³)',
      '724L (5.25 yd³)', '844L (7.0 yd³)',
    ],
    Dozer: ['450K (6T)', '550K (8T)', '650K (11T)', '700K (13T)', '750K (16T)', '850K (21T)', '1050K (35T)'],
  },
  Hitachi: {
    Excavator: [
      'ZX30 (3T)', 'ZX55 (5.5T)', 'ZX75 (7.5T)', 'ZX135 (13T)',
      'ZX200 (20T)', 'ZX225 (22T)', 'ZX250 (25T)', 'ZX300 (30T)',
      'ZX350 (35T)', 'ZX490 (49T)', 'ZX650 (65T)', 'ZX890 (89T)',
    ],
    'Wheel Loader': [
      'ZW80 (0.8 yd³)', 'ZW120 (1.2 yd³)', 'ZW150 (1.5 yd³)',
      'ZW180 (2.5 yd³)', 'ZW220 (3.0 yd³)', 'ZW310 (4.0 yd³)',
      'ZW370 (5.0 yd³)', 'ZW550 (7.5 yd³)',
    ],
  },
  Kobelco: {
    Excavator: [
      'SK30 (3T)', 'SK55 (5.5T)', 'SK75 (7.5T)', 'SK140 (14T)',
      'SK210 (21T)', 'SK260 (26T)', 'SK300 (30T)', 'SK350 (35T)',
      'SK500 (50T)',
    ],
  },
  Liebherr: {
    Excavator: [
      'R914 (14T)', 'R920 (20T)', 'R924 (24T)', 'R930 (30T)',
      'R936 (36T)', 'R946 (46T)', 'R950 (50T)', 'R960 (60T)',
      'R976 (76T)',
    ],
    'Wheel Loader': [
      'L506 (0.5 yd³)', 'L509 (1.0 yd³)', 'L526 (2.5 yd³)',
      'L538 (3.0 yd³)', 'L546 (4.0 yd³)', 'L556 (5.0 yd³)',
      'L566 (6.0 yd³)', 'L576 (7.5 yd³)', 'L586 (9.0 yd³)',
    ],
  },
  'Doosan / Develon': {
    Excavator: [
      'DX35 (3.5T)', 'DX60 (6T)', 'DX85 (8.5T)', 'DX140 (14T)',
      'DX225 (22T)', 'DX255 (25T)', 'DX300 (30T)', 'DX350 (35T)',
      'DX490 (49T)', 'DX530 (53T)',
    ],
    'Wheel Loader': [
      'DL200 (2.0 yd³)', 'DL250 (2.5 yd³)', 'DL300 (3.0 yd³)',
      'DL420 (4.5 yd³)', 'DL550 (6.5 yd³)',
    ],
  },
}

const PRODUCTS_MAP = {
  Excavator: [
    { name: 'Digging Buckets', available: true },
    { name: 'Hydraulic Thumbs', available: true },
    { name: 'Quick Couplers', available: true },
    { name: 'Long Reach Booms', available: true },
    { name: 'Machine Guarding', available: true },
    { name: 'Custom Fabrication', available: true },
  ],
  'Wheel Loader': [
    { name: 'WL Buckets (GP/Light/Woodchip)', available: true },
    { name: 'WL Forks & Grapples', available: true },
    { name: 'Hydraulic Couplers', available: true },
    { name: 'Machine Guarding', available: true },
    { name: 'Custom Fabrication', available: true },
  ],
  Dozer: [
    { name: 'Blades & Push Arms', available: true },
    { name: 'Machine Guarding', available: true },
    { name: 'Belly Pans & Rock Guards', available: true },
    { name: 'Custom Fabrication', available: true },
  ],
  ADT: [
    { name: 'Tailgates', available: true },
    { name: 'Machine Guarding', available: true },
    { name: 'Custom Fabrication', available: true },
  ],
}

const BRANDS = Object.keys(MACHINES)

// ── Component ─────────────────────────────────────────────────────────────
export default function Fitment() {
  const [brand, setBrand] = useState('')
  const [machineType, setMachineType] = useState('')
  const [model, setModel] = useState('')
  const [showResult, setShowResult] = useState(false)

  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const resultRef = useRef(null)

  // Derived data
  const machineTypes = useMemo(() => (brand ? Object.keys(MACHINES[brand]) : []), [brand])
  const models = useMemo(
    () => (brand && machineType ? MACHINES[brand][machineType] || [] : []),
    [brand, machineType]
  )
  const availableProducts = useMemo(
    () => (machineType ? PRODUCTS_MAP[machineType] || [] : []),
    [machineType]
  )

  // Reset downstream when parent changes
  useEffect(() => { setMachineType(''); setModel(''); setShowResult(false) }, [brand])
  useEffect(() => { setModel(''); setShowResult(false) }, [machineType])
  useEffect(() => { setShowResult(false) }, [model])

  // GSAP entrance
  useEffect(() => {
    gsap.from(headingRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    })
  }, [])

  // Animate result panel in
  useEffect(() => {
    if (showResult && resultRef.current) {
      gsap.fromTo(
        resultRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [showResult])

  const handleCheck = () => {
    if (brand && machineType && model) {
      setShowResult(true)
    }
  }

  return (
    <section
      id="fitment"
      ref={sectionRef}
      className="py-28 px-6 lg:px-10 bg-card relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 80px, #f5c300 80px, #f5c300 81px), repeating-linear-gradient(0deg, transparent, transparent 80px, #f5c300 80px, #f5c300 81px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headingRef} className="grid md:grid-cols-2 gap-12 mb-14">
          <div>
            <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-accent inline-block" />
              Fitment Guide
            </p>
            <h2 className="font-heading text-5xl md:text-6xl mb-6">
              Does It Fit Your Machine?
            </h2>
            <p className="text-muted leading-relaxed">
              All Daequip attachments are built to OEM pin specifications. Select your machine below to see compatible products — or{' '}
              <a href="#contact" className="text-accent hover:underline">contact us</a>{' '}
              with your make, model, and year for a confirmed fitment.
            </p>
          </div>

          {/* Quick-stats side */}
          <div className="flex items-center">
            <div className="grid grid-cols-3 gap-4 w-full">
              {[
                { val: '50+', label: 'Machine Makes' },
                { val: '500+', label: 'Models Supported' },
                { val: 'OEM', label: 'Pin Specs' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-page border border-white/5 p-6 text-center group hover:border-accent/20 transition-colors"
                >
                  <div className="font-heading text-3xl text-accent mb-1">{s.val}</div>
                  <div className="font-condensed text-[10px] uppercase tracking-wider text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Configurator Panel */}
        <div className="bg-page border border-white/5 overflow-hidden">
          {/* Selector Row */}
          <div className="grid md:grid-cols-4 gap-0 border-b border-white/5">
            {/* Brand */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-white/5">
              <label className="font-condensed text-[10px] uppercase tracking-widest text-accent mb-3 block">
                01 — Machine Make
              </label>
              <div className="relative">
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-card border border-white/10 px-4 py-3.5 text-text text-sm font-body appearance-none focus:outline-none focus:border-accent transition-colors cursor-pointer"
                >
                  <option value="">Select Make...</option>
                  {BRANDS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <CaretDown
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                />
              </div>
            </div>

            {/* Machine Type */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-white/5">
              <label className="font-condensed text-[10px] uppercase tracking-widest text-accent mb-3 block">
                02 — Machine Type
              </label>
              <div className="relative">
                <select
                  value={machineType}
                  onChange={(e) => setMachineType(e.target.value)}
                  disabled={!brand}
                  className="w-full bg-card border border-white/10 px-4 py-3.5 text-text text-sm font-body appearance-none focus:outline-none focus:border-accent transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {brand ? 'Select Type...' : '—'}
                  </option>
                  {machineTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <CaretDown
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                />
              </div>
            </div>

            {/* Model */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-white/5">
              <label className="font-condensed text-[10px] uppercase tracking-widest text-accent mb-3 block">
                03 — Model
              </label>
              <div className="relative">
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!machineType}
                  className="w-full bg-card border border-white/10 px-4 py-3.5 text-text text-sm font-body appearance-none focus:outline-none focus:border-accent transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {machineType ? 'Select Model...' : '—'}
                  </option>
                  {models.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <CaretDown
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                />
              </div>
            </div>

            {/* Check Button */}
            <div className="p-6 flex items-end">
              <button
                onClick={handleCheck}
                disabled={!model}
                className="btn-angled w-full bg-accent text-page font-condensed font-bold uppercase tracking-wider px-6 py-3.5 text-sm hover:bg-yellow-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <MagnifyingGlass size={16} weight="bold" />
                Check Fitment
              </button>
            </div>
          </div>

          {/* Result Panel */}
          {showResult && (
            <div ref={resultRef} className="p-8 md:p-10">
              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <CheckCircle size={28} className="text-accent" weight="fill" />
                  </div>
                  <div>
                    <div className="font-heading text-2xl md:text-3xl text-accent">
                      Compatible
                    </div>
                    <div className="text-muted text-sm">
                      {brand} {model} — {machineType}
                    </div>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="btn-angled inline-flex items-center gap-2 bg-rust text-text font-condensed font-bold uppercase tracking-wider px-6 py-3 text-sm hover:bg-orange-700 transition-colors"
                >
                  <Wrench size={16} />
                  Quote This Machine
                </a>
              </div>

              {/* Products table */}
              <div className="border border-white/5 overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-12 bg-card px-6 py-3">
                  <div className="col-span-6 font-condensed text-[10px] uppercase tracking-widest text-accent">
                    Product
                  </div>
                  <div className="col-span-3 font-condensed text-[10px] uppercase tracking-widest text-accent text-center">
                    Availability
                  </div>
                  <div className="col-span-3 font-condensed text-[10px] uppercase tracking-widest text-accent text-right">
                    Action
                  </div>
                </div>

                {/* Table rows */}
                {availableProducts.map((product, i) => (
                  <div
                    key={product.name}
                    className="grid grid-cols-12 items-center px-6 py-4 border-t border-white/5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <div className="col-span-6 flex items-center gap-3">
                      <span className="font-heading text-sm text-accent/30 w-5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-text text-sm font-medium">{product.name}</span>
                    </div>
                    <div className="col-span-3 text-center">
                      {product.available ? (
                        <span className="inline-flex items-center gap-1.5 font-condensed text-[11px] uppercase tracking-wider bg-accent/10 text-accent px-3 py-1">
                          <CheckCircle size={12} weight="fill" />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 font-condensed text-[11px] uppercase tracking-wider bg-rust/10 text-rust px-3 py-1">
                          <XCircle size={12} weight="fill" />
                          On Request
                        </span>
                      )}
                    </div>
                    <div className="col-span-3 text-right">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1 text-muted text-sm hover:text-accent transition-colors font-condensed uppercase tracking-wider"
                      >
                        Get Quote
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <p className="text-muted text-xs mt-6 flex items-start gap-2">
                <span className="text-accent mt-0.5">*</span>
                All attachments built to OEM pin dimensions for your specific machine. If your model isn't listed,{' '}
                <a href="#contact" className="text-accent hover:underline">
                  contact us
                </a>{' '}
                — we can confirm fitment within 24 hours.
              </p>
            </div>
          )}

          {/* Empty state when no result */}
          {!showResult && (
            <div className="p-12 text-center">
              <Wrench size={40} className="text-muted/20 mx-auto mb-4" />
              <p className="text-muted text-sm">
                Select your machine make, type, and model above to check compatible attachments.
              </p>
            </div>
          )}
        </div>

        {/* Brand logos / trust strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => { setBrand(b); window.scrollTo({ top: sectionRef.current.offsetTop - 80, behavior: 'smooth' }) }}
              className={`font-condensed text-xs uppercase tracking-[0.2em] transition-colors py-2 ${
                brand === b ? 'text-accent' : 'text-muted/40 hover:text-muted'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
