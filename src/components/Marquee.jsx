export default function Marquee() {
  const items = [
    '#YouCanDigUs',
    '·',
    '#DesignedToWork',
    '·',
    '#BuiltToLast',
    '·',
    'Made in Langley, BC',
    '·',
    '35+ Years',
    '·',
    '2 Year Warranty',
    '·',
    'Ships All of North America',
    '·',
  ]

  const repeated = [...items, ...items]

  return (
    <div className="bg-accent overflow-hidden py-3">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="font-condensed text-page font-bold uppercase tracking-wider text-sm mx-6"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
