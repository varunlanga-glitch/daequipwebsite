import { useState, useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagnifyingGlass, CaretDown, CheckCircle, ArrowRight, Wrench, Ruler, Info } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

// ── Machine Data ──────────────────────────────────────────────────────────
const MACHINES = {
  Caterpillar: {
    Excavator: [
      '301.7 CR (1.7T)', '303 CR (3.5T)', '306 CR (6T)', '308 CR (8T)',
      '313 (13T)', '320 (20T)', '325 (25T)', '330 (30T)', '336 (36T)',
      '340 (40T)', '349 (49T)', '352 (52T)', '374 (74T)', '390 (90T)',
    ],
    'Wheel Loader': [
      '906 (1.0 yd³)', '910 (1.3 yd³)', '914 (1.5 yd³)', '920 (2.5 yd³)',
      '926M (3.0 yd³)', '930M (3.25 yd³)', '938M (3.5 yd³)', '950M (4.0 yd³)',
      '962M (4.5 yd³)', '966M (5.25 yd³)', '972M (6.5 yd³)', '980M (7.5 yd³)',
    ],
    Dozer: ['D3 (8T)', 'D4 (10T)', 'D5 (14T)', 'D6 (20T)', 'D7 (27T)', 'D8 (38T)', 'D9 (49T)'],
  },
  Komatsu: {
    Excavator: [
      'PC30 (3T)', 'PC55 (5.5T)', 'PC78 (7.8T)', 'PC130 (13T)',
      'PC200 (20T)', 'PC210 (21T)', 'PC228 (23T)', 'PC290 (29T)',
      'PC360 (36T)', 'PC490 (49T)', 'PC650 (65T)', 'PC800 (80T)',
    ],
    'Wheel Loader': [
      'WA200 (2.0 yd³)', 'WA270 (2.7 yd³)', 'WA320 (3.2 yd³)',
      'WA380 (3.8 yd³)', 'WA470 (5.0 yd³)', 'WA500 (6.5 yd³)',
    ],
  },
  Volvo: {
    Excavator: [
      'EC140 (14T)', 'EC200 (20T)', 'EC220 (22T)', 'EC250 (25T)',
      'EC300 (30T)', 'EC350 (35T)', 'EC380 (38T)', 'EC480 (48T)', 'EC750 (75T)',
    ],
    'Wheel Loader': [
      'L60 (1.7 yd³)', 'L90 (3.0 yd³)', 'L110 (3.5 yd³)',
      'L120 (4.0 yd³)', 'L150 (5.0 yd³)', 'L180 (6.0 yd³)', 'L220 (7.5 yd³)',
    ],
    ADT: ['A25G (24T)', 'A30G (28T)', 'A35G (34T)', 'A40G (39T)', 'A45G (42T)'],
  },
  'John Deere': {
    Excavator: [
      '35G (3.5T)', '50G (5T)', '75G (7.5T)', '130G (13T)', '160G (16T)',
      '200G (20T)', '245G (24T)', '300G (30T)', '350G (35T)', '470G (47T)',
    ],
    'Wheel Loader': [
      '444L (2.5 yd³)', '524L (3.0 yd³)', '624L (3.5 yd³)',
      '644L (4.5 yd³)', '724L (5.25 yd³)', '844L (7.0 yd³)',
    ],
  },
  Hitachi: {
    Excavator: [
      'ZX30 (3T)', 'ZX55 (5.5T)', 'ZX135 (13T)', 'ZX200 (20T)',
      'ZX250 (25T)', 'ZX300 (30T)', 'ZX350 (35T)', 'ZX490 (49T)', 'ZX650 (65T)',
    ],
  },
  Kobelco: {
    Excavator: [
      'SK55 (5.5T)', 'SK140 (14T)', 'SK210 (21T)', 'SK260 (26T)',
      'SK300 (30T)', 'SK350 (35T)', 'SK500 (50T)',
    ],
  },
  Liebherr: {
    Excavator: [
      'R920 (20T)', 'R924 (24T)', 'R930 (30T)', 'R936 (36T)',
      'R946 (46T)', 'R950 (50T)', 'R960 (60T)',
    ],
    'Wheel Loader': [
      'L526 (2.5 yd³)', 'L538 (3.0 yd³)', 'L546 (4.0 yd³)',
      'L556 (5.0 yd³)', 'L566 (6.0 yd³)', 'L576 (7.5 yd³)',
    ],
  },
  'Doosan / Develon': {
    Excavator: [
      'DX60 (6T)', 'DX140 (14T)', 'DX225 (22T)', 'DX255 (25T)',
      'DX300 (30T)', 'DX350 (35T)', 'DX490 (49T)', 'DX530 (53T)',
    ],
  },
}

const PRODUCTS_MAP = {
  Excavator: [
    { name: 'Digging Buckets', note: 'GP / HD / Severe Duty' },
    { name: 'Hydraulic Thumbs', note: 'X Series Direct Link' },
    { name: 'Quick Couplers', note: 'Hydraulic / Mechanical' },
    { name: 'Long Reach Booms', note: 'EIK Custom Series' },
    { name: 'Machine Guarding', note: 'Cab / Rock / Belly Pan' },
    { name: 'Custom Fabrication', note: 'CAD Eng. / MOQ: 1' },
  ],
  'Wheel Loader': [
    { name: 'WL Buckets', note: 'GP / Light / Woodchip' },
    { name: 'WL Forks & Grapples', note: 'Hydraulic Coupler Compat.' },
    { name: 'Machine Guarding', note: 'Cab Guards / Catwalks' },
    { name: 'Custom Fabrication', note: 'CAD Eng. / MOQ: 1' },
  ],
  Dozer: [
    { name: 'Blades & Push Arms', note: 'Custom Built' },
    { name: 'Machine Guarding', note: 'Belly Pan / Rock Guard' },
    { name: 'Custom Fabrication', note: 'CAD Eng. / MOQ: 1' },
  ],
  ADT: [
    { name: 'Tailgates', note: 'Custom / Replacement' },
    { name: 'Machine Guarding', note: 'Custom Built' },
    { name: 'Custom Fabrication', note: 'CAD Eng. / MOQ: 1' },
  ],
}

const BRANDS = Object.keys(MACHINES)

export default function Fitment() {
  const [mode, setMode] = useState('machine') // 'machine' or 'pin'
  const [brand, setBrand] = useState('')
  const [machineType, setMachineType] = useState('')
  const [model, setModel] = useState('')
  const [showResult, setShowResult] = useState(false)

  // Pin dimension state
  const [pinDiameter, setPinDiameter] = useState('')
  const [dipperGap, setDipperGap] = useState('')
  const [pinCentres, setPinCentres] = useState('')

  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const resultRef = useRef(null)

  const machineTypes = useMemo(() => (brand ? Object.keys(MACHINES[brand]) : []), [brand])
  const models = useMemo(() => (brand && machineType ? MACHINES[brand][machineType] || [] : []), [brand, machineType])
  const availableProducts = useMemo(() => (machineType ? PRODUCTS_MAP[machineType] || [] : []), [machineType])

  useEffect(() => { setMachineType(''); setModel(''); setShowResult(false) }, [brand])
  useEffect(() => { setModel(''); setShowResult(false) }, [machineType])
  useEffect(() => { setShowResult(false) }, [model])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from(headingRef.current, {
      y: 40, opacity: 0, duration: 0.7,
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    })
  }, [])

  useEffect(() => {
    if (showResult && resultRef.current) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo(resultRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    }
  }, [showResult])

  const handleCheck = () => {
    if (mode === 'machine' && brand && machineType && model) setShowResult(true)
    if (mode === 'pin' && pinDiameter && dipperGap && pinCentres) setShowResult(true)
  }

  const selectClass = 'w-full bg-white border border-border px-4 py-3.5 text-text text-sm font-body appearance-none focus:outline-none focus:border-accent transition-colors cursor-pointer'
  const inputClass = 'w-full bg-white border border-border px-4 py-3.5 text-text text-sm font-body focus:outline-none focus:border-accent transition-colors'

  return (
    <section id="fitment" ref={sectionRef} className="py-24 px-6 lg:px-10 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headingRef} className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-accent inline-block" />
              Fitment Guide
            </p>
            <h2 className="font-heading text-5xl md:text-6xl text-white mb-6">
              Does It Fit Your Machine?
            </h2>
            <p className="text-white/60 leading-relaxed">
              All Daequip attachments are built to OEM pin specifications. Select your machine or enter your pin dimensions below to check compatibility.
            </p>
          </div>
          <div className="flex items-end">
            <div className="grid grid-cols-3 gap-3 w-full">
              {[
                { val: '50+', label: 'Machine Makes' },
                { val: '500+', label: 'Models Supported' },
                { val: 'OEM', label: 'Pin Specifications' },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 p-5 text-center">
                  <div className="font-heading text-3xl text-accent mb-1">{s.val}</div>
                  <div className="font-condensed text-[10px] uppercase tracking-wider text-white/40">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="flex gap-0 mb-0">
          <button
            onClick={() => { setMode('machine'); setShowResult(false) }}
            className={`font-condensed text-sm uppercase tracking-wider px-6 py-3.5 min-h-[44px] cursor-pointer transition-all flex items-center gap-2 ${
              mode === 'machine' ? 'bg-white text-dark font-bold' : 'bg-white/10 text-white/60 hover:text-white'
            }`}
          >
            <Wrench size={16} /> Search by Machine
          </button>
          <button
            onClick={() => { setMode('pin'); setShowResult(false) }}
            className={`font-condensed text-sm uppercase tracking-wider px-6 py-3.5 min-h-[44px] cursor-pointer transition-all flex items-center gap-2 ${
              mode === 'pin' ? 'bg-white text-dark font-bold' : 'bg-white/10 text-white/60 hover:text-white'
            }`}
          >
            <Ruler size={16} /> Search by Pin Dimensions
          </button>
        </div>

        {/* Configurator Panel */}
        <div className="bg-white border border-border overflow-hidden">
          {mode === 'machine' ? (
            /* Machine Selector */
            <div className="grid md:grid-cols-4 gap-0">
              <div className="p-5 border-b md:border-b-0 md:border-r border-border">
                <label className="font-condensed text-[10px] uppercase tracking-widest text-accent mb-2 block">01 — Machine Make</label>
                <div className="relative">
                  <select value={brand} onChange={(e) => setBrand(e.target.value)} className={selectClass}>
                    <option value="">Select Make...</option>
                    {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <CaretDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>
              </div>
              <div className="p-5 border-b md:border-b-0 md:border-r border-border">
                <label className="font-condensed text-[10px] uppercase tracking-widest text-accent mb-2 block">02 — Machine Type</label>
                <div className="relative">
                  <select value={machineType} onChange={(e) => setMachineType(e.target.value)} disabled={!brand} className={`${selectClass} disabled:opacity-30 disabled:cursor-not-allowed`}>
                    <option value="">{brand ? 'Select Type...' : '—'}</option>
                    {machineTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <CaretDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>
              </div>
              <div className="p-5 border-b md:border-b-0 md:border-r border-border">
                <label className="font-condensed text-[10px] uppercase tracking-widest text-accent mb-2 block">03 — Model</label>
                <div className="relative">
                  <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!machineType} className={`${selectClass} disabled:opacity-30 disabled:cursor-not-allowed`}>
                    <option value="">{machineType ? 'Select Model...' : '—'}</option>
                    {models.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <CaretDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>
              </div>
              <div className="p-5 flex items-end">
                <button onClick={handleCheck} disabled={!model} className="w-full bg-accent text-white font-condensed font-bold uppercase tracking-wider px-6 py-3.5 text-sm hover:bg-accent-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer min-h-[44px]">
                  <MagnifyingGlass size={16} weight="bold" /> Check Fitment
                </button>
              </div>
            </div>
          ) : (
            /* Pin Dimension Search */
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-3 mb-6 p-4 bg-page-alt border border-border text-sm text-muted">
                <Info size={18} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-dark">How to measure:</strong> You need three measurements from your current bucket or dipper arm — <strong>Pin Diameter</strong> (width of the pin), <strong>Dipper Gap</strong> (internal width between hangers), and <strong>Pin Centres</strong> (center-to-center distance between pins). Measure in millimetres for accuracy.
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="font-condensed text-[10px] uppercase tracking-widest text-accent mb-2 block">Pin Diameter (mm)</label>
                  <input type="number" placeholder="e.g. 40" value={pinDiameter} onChange={(e) => { setPinDiameter(e.target.value); setShowResult(false) }} className={inputClass} />
                </div>
                <div>
                  <label className="font-condensed text-[10px] uppercase tracking-widest text-accent mb-2 block">Dipper Gap (mm)</label>
                  <input type="number" placeholder="e.g. 140" value={dipperGap} onChange={(e) => { setDipperGap(e.target.value); setShowResult(false) }} className={inputClass} />
                </div>
                <div>
                  <label className="font-condensed text-[10px] uppercase tracking-widest text-accent mb-2 block">Pin Centres (mm)</label>
                  <input type="number" placeholder="e.g. 185" value={pinCentres} onChange={(e) => { setPinCentres(e.target.value); setShowResult(false) }} className={inputClass} />
                </div>
                <div className="flex items-end">
                  <button onClick={handleCheck} disabled={!pinDiameter || !dipperGap || !pinCentres} className="w-full bg-accent text-white font-condensed font-bold uppercase tracking-wider px-6 py-3.5 text-sm hover:bg-accent-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer min-h-[44px]">
                    <MagnifyingGlass size={16} weight="bold" /> Find Match
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Result Panel */}
          {showResult && (
            <div ref={resultRef} className="p-6 md:p-8 border-t border-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <CheckCircle size={24} className="text-accent" weight="fill" />
                  </div>
                  <div>
                    <div className="font-heading text-2xl text-accent">Compatible</div>
                    <div className="text-muted text-sm">
                      {mode === 'machine'
                        ? `${brand} ${model} — ${machineType}`
                        : `Pin: ${pinDiameter}mm · Gap: ${dipperGap}mm · Centres: ${pinCentres}mm`
                      }
                    </div>
                  </div>
                </div>
                <a href="#contact" className="inline-flex items-center gap-2 bg-dark text-white font-condensed font-bold uppercase tracking-wider px-6 py-3 text-sm hover:bg-accent transition-colors cursor-pointer">
                  <Wrench size={16} /> Quote This Machine
                </a>
              </div>

              {/* Products table */}
              <div className="border border-border overflow-hidden">
                <div className="grid grid-cols-12 bg-page-alt px-5 py-2.5">
                  <div className="col-span-1 font-condensed text-[10px] uppercase tracking-widest text-accent">#</div>
                  <div className="col-span-5 font-condensed text-[10px] uppercase tracking-widest text-accent">Product</div>
                  <div className="col-span-4 font-condensed text-[10px] uppercase tracking-widest text-accent">Specifications</div>
                  <div className="col-span-2 font-condensed text-[10px] uppercase tracking-widest text-accent text-right">Action</div>
                </div>
                {(mode === 'machine' ? availableProducts : PRODUCTS_MAP['Excavator']).map((product, i) => (
                  <div key={product.name} className="grid grid-cols-12 items-center px-5 py-3.5 border-t border-border hover:bg-page-alt transition-colors group">
                    <div className="col-span-1 font-heading text-sm text-muted">{String(i + 1).padStart(2, '0')}</div>
                    <div className="col-span-5 text-dark text-sm font-medium">{product.name}</div>
                    <div className="col-span-4 text-muted text-xs">{product.note}</div>
                    <div className="col-span-2 text-right">
                      <a href="#contact" className="inline-flex items-center gap-1 text-muted text-xs hover:text-accent transition-colors font-condensed uppercase tracking-wider cursor-pointer">
                        Quote <ArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-muted text-xs mt-4">
                * All attachments built to OEM pin dimensions. If your model isn't listed,{' '}
                <a href="#contact" className="text-accent hover:underline cursor-pointer">contact us</a> — we confirm fitment within 24 hours.
              </p>
            </div>
          )}

          {/* Empty state */}
          {!showResult && (
            <div className="py-10 text-center border-t border-border">
              <Wrench size={36} className="text-border mx-auto mb-3" />
              <p className="text-muted text-sm">
                {mode === 'machine'
                  ? 'Select your machine make, type, and model above to check compatible attachments.'
                  : 'Enter your pin diameter, dipper gap, and pin centres to find matching attachments.'}
              </p>
            </div>
          )}
        </div>

        {/* Brand strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => { setMode('machine'); setBrand(b); window.scrollTo({ top: sectionRef.current.offsetTop - 80, behavior: 'smooth' }) }}
              className={`font-condensed text-xs uppercase tracking-[0.2em] transition-colors py-2 min-h-[44px] cursor-pointer ${
                brand === b ? 'text-accent' : 'text-white/30 hover:text-white/60'
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
