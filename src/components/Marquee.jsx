export default function Marquee() {
  const items = [
    '#YouCanDigUs',
    '#DesignedToWork',
    '#BuiltToLast',
    'Made in Langley, BC',
    '35+ Years',
    '2 Year Warranty',
    'Ships All of North America',
  ]

  // Triple the items for seamless loop
  const repeated = [...items, ...items, ...items]

  return (
    <div className="bg-accent overflow-hidden py-3 relative">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="font-condensed text-page font-bold uppercase tracking-wider text-sm mx-8 flex items-center gap-8"
          >
            {item}
            <span className="text-page/40 text-lg">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
