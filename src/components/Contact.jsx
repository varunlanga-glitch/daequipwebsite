import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Envelope, MapPin, Clock, Printer } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const PRODUCT_OPTIONS = [
  'Digging Buckets',
  'Hydraulic Thumbs',
  'Long Reach Booms',
  'WL Buckets',
  'WL Attachments',
  'Machine Guarding',
  'Dozer & ADT Parts',
  'Custom Fabrication',
]

const CONTACT_INFO = [
  { Icon: Phone, label: 'Phone', value: '604-882-8008', href: 'tel:6048828008' },
  { Icon: Printer, label: 'Fax', value: '604-882-8007', href: null },
  { Icon: Envelope, label: 'Email', value: 'info@daequip.com', href: 'mailto:info@daequip.com' },
  { Icon: MapPin, label: 'Address', value: '2141 Queen Street, Abbotsford BC V2T6J3', href: null },
  { Icon: Clock, label: 'Hours', value: 'Mon\u2013Fri 7:30 AM \u2013 4:30 PM', href: null },
]

export default function Contact() {
  const [formState, setFormState] = useState('idle') // idle | sending | sent
  const [form, setForm] = useState({
    firstName: '', lastName: '', company: '', email: '', phone: '',
    product: '', machineModel: '', notes: '',
  })
  const headingRef = useRef(null)

  useEffect(() => {
    gsap.from(headingRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    })
  }, [])

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormState('sending')
    setTimeout(() => setFormState('sent'), 1400)
  }

  const inputClass =
    'w-full bg-card border border-white/10 px-4 py-3 text-text text-sm font-body focus:outline-none focus:border-accent transition-colors placeholder:text-muted/50'

  return (
    <section id="contact" className="py-24 px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef}>
          <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-2">
            Get in Touch
          </p>
          <h2 className="font-heading text-5xl md:text-6xl mb-12">
            Request a Quote
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-6">
            {CONTACT_INFO.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <Icon size={22} className="text-accent mt-0.5 shrink-0" weight="duotone" />
                <div>
                  <div className="font-condensed text-xs uppercase tracking-wider text-muted mb-1">
                    {label}
                  </div>
                  {href ? (
                    <a href={href} className="text-text hover:text-accent transition-colors text-sm">
                      {value}
                    </a>
                  ) : (
                    <span className="text-text text-sm">{value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* RFQ Form */}
          <div className="md:col-span-3">
            {formState === 'sent' ? (
              <div className="bg-card border border-accent/30 p-10 text-center">
                <div className="font-heading text-4xl text-accent mb-2">Quote Requested!</div>
                <p className="text-muted">
                  Thank you for your inquiry. Our team will get back to you within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text" name="firstName" placeholder="First Name *" required
                    value={form.firstName} onChange={handleChange} className={inputClass}
                  />
                  <input
                    type="text" name="lastName" placeholder="Last Name *" required
                    value={form.lastName} onChange={handleChange} className={inputClass}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text" name="company" placeholder="Company"
                    value={form.company} onChange={handleChange} className={inputClass}
                  />
                  <input
                    type="email" name="email" placeholder="Email *" required
                    value={form.email} onChange={handleChange} className={inputClass}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="tel" name="phone" placeholder="Phone"
                    value={form.phone} onChange={handleChange} className={inputClass}
                  />
                  <select
                    name="product" value={form.product} onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select Product</option>
                    {PRODUCT_OPTIONS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="text" name="machineModel" placeholder="Machine Make & Model"
                  value={form.machineModel} onChange={handleChange} className={inputClass}
                />
                <textarea
                  name="notes" placeholder="Notes / Additional Details" rows={4}
                  value={form.notes} onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="btn-angled bg-accent text-page font-condensed font-bold uppercase tracking-wider px-10 py-3 text-sm hover:bg-yellow-400 transition-colors disabled:opacity-60"
                >
                  {formState === 'sending' ? 'Sending...' : 'Submit RFQ'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
