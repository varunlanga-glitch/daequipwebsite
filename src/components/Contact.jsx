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
  const [formState, setFormState] = useState('idle')
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
    'w-full bg-page border border-white/10 px-4 py-3.5 text-text text-sm font-body focus:outline-none focus:border-accent transition-colors placeholder:text-muted/40'

  return (
    <section id="contact" className="py-28 px-6 lg:px-10 bg-card">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <p className="font-condensed text-accent uppercase tracking-[0.3em] text-sm mb-3">
            Get in Touch
          </p>
          <h2 className="font-heading text-5xl md:text-6xl mb-4">
            Request a Quote
          </h2>
          <p className="text-muted max-w-lg mx-auto text-sm">
            Send us your specifications and our team will get back to you within 1 business day with a detailed quote.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          {/* Contact info */}
          <div className="md:col-span-4">
            <div className="bg-page p-8 border border-white/5 mb-6">
              <h3 className="font-heading text-2xl mb-6 text-accent">Contact Info</h3>
              <div className="space-y-5">
                {CONTACT_INFO.map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-card flex items-center justify-center shrink-0 border border-white/5">
                      <Icon size={18} className="text-accent" weight="duotone" />
                    </div>
                    <div>
                      <div className="font-condensed text-[10px] uppercase tracking-wider text-muted mb-0.5">
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
            </div>

            {/* Map placeholder */}
            <div className="relative overflow-hidden h-48 bg-page border border-white/5">
              <img
                src="/images/contact-fab.jpg"
                alt="Daequip facility"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-page to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-condensed text-xs uppercase tracking-wider text-accent">Langley, BC</p>
                <p className="text-text text-sm">Made in Canada Since 1989</p>
              </div>
            </div>
          </div>

          {/* RFQ Form */}
          <div className="md:col-span-8">
            {formState === 'sent' ? (
              <div className="bg-page border border-accent/30 p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-accent/10 flex items-center justify-center mb-6">
                  <Envelope size={32} className="text-accent" weight="duotone" />
                </div>
                <div className="font-heading text-4xl text-accent mb-3">Quote Requested!</div>
                <p className="text-muted max-w-md">
                  Thank you for your inquiry. Our team will review your requirements and get back to you within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-page border border-white/5 p-8 md:p-10">
                <h3 className="font-heading text-2xl mb-6">RFQ Form</h3>
                <div className="space-y-4">
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
                    name="notes" placeholder="Notes / Additional Details" rows={5}
                    value={form.notes} onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="btn-angled bg-accent text-page font-condensed font-bold uppercase tracking-wider px-12 py-4 text-sm hover:bg-yellow-400 transition-colors disabled:opacity-60 w-full sm:w-auto"
                  >
                    {formState === 'sending' ? 'Sending...' : 'Submit RFQ'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
