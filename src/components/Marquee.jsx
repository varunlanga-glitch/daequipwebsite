const ITEMS = [
  'Quick Couplers',
  'Excavator Buckets',
  'Hydraulic Thumbs',
  'Long Reach Booms',
  'WL Attachments',
  'Machine Guarding',
  'Custom Fabrication',
  'Canadian Made',
  '400 AR Wear Steel',
  '2-Year Warranty',
]

export default function Marquee() {
  const track = ITEMS.map((item, i) => (
    <span key={i} className="flex items-center gap-8 shrink-0">
      <span className="font-heading text-sm tracking-[0.2em] text-dark/80 whitespace-nowrap">
        {item.toUpperCase()}
      </span>
      <span className="w-1.5 h-1.5 bg-accent rotate-45 shrink-0" />
    </span>
  ))

  return (
    <div className="bg-page-alt border-y border-border py-4 overflow-hidden">
      <div className="animate-marquee flex items-center gap-8" style={{ width: 'max-content' }}>
        {track}
        {track}
      </div>
    </div>
  )
}
