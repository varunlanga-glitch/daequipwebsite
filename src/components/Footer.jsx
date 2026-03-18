import { Phone, Envelope, MapPin } from '@phosphor-icons/react'

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-4">
            <img src="/images/daequip-logo-white.png" alt="Daequip Premium Attachments" className="h-8 mb-4" />
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Premium Attachments Ltd.<br />
              Over 35 years of design, engineering &amp; manufacturing expertise in heavy equipment attachments. Langley, BC.
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Phone size={14} className="text-accent" />
              <a href="tel:6048828008" className="text-white/60 text-sm hover:text-accent transition-colors cursor-pointer">604-882-8008</a>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Envelope size={14} className="text-accent" />
              <a href="mailto:info@daequip.com" className="text-white/60 text-sm hover:text-accent transition-colors cursor-pointer">info@daequip.com</a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-accent" />
              <span className="text-white/60 text-sm">2141 Queen Street, Abbotsford BC</span>
            </div>
          </div>

          {/* Products */}
          <div className="md:col-span-3">
            <h4 className="font-condensed text-sm uppercase tracking-wider text-accent mb-5">Products</h4>
            <ul className="space-y-2.5 text-white/50 text-sm">
              <li><a href="#products" className="hover:text-white transition-colors cursor-pointer">Digging Buckets</a></li>
              <li><a href="#products" className="hover:text-white transition-colors cursor-pointer">Hydraulic Thumbs</a></li>
              <li><a href="#products" className="hover:text-white transition-colors cursor-pointer">Long Reach Booms</a></li>
              <li><a href="#products" className="hover:text-white transition-colors cursor-pointer">WL Buckets & Attachments</a></li>
              <li><a href="#products" className="hover:text-white transition-colors cursor-pointer">Machine Guarding</a></li>
              <li><a href="#products" className="hover:text-white transition-colors cursor-pointer">Custom Fabrication</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="font-condensed text-sm uppercase tracking-wider text-accent mb-5">Company</h4>
            <ul className="space-y-2.5 text-white/50 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors cursor-pointer">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors cursor-pointer">Services</a></li>
              <li><a href="#fitment" className="hover:text-white transition-colors cursor-pointer">Fitment Guide</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors cursor-pointer">Contact</a></li>
              <li>
                <a href="https://dormelcontainers.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">
                  Dormel Containers
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & CTA */}
          <div className="md:col-span-3">
            <h4 className="font-condensed text-sm uppercase tracking-wider text-accent mb-5">Hours</h4>
            <p className="text-white/50 text-sm mb-2">Mon–Fri 7:30 AM – 4:30 PM</p>
            <p className="text-white/30 text-xs mb-6">Closed weekends & statutory holidays</p>
            <a
              href="#contact"
              className="inline-block bg-accent text-white font-condensed font-bold uppercase tracking-wider px-6 py-2.5 text-xs hover:bg-accent-dark transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Daequip Premium Attachments Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-condensed text-xs uppercase tracking-wider text-white/40">2-Year Warranty</span>
            <span className="text-white/10">|</span>
            <span className="font-condensed text-xs uppercase tracking-wider text-white/40">Made in Canada</span>
            <span className="text-white/10">|</span>
            <span className="font-condensed text-xs uppercase tracking-wider text-accent">#BuiltToLast</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
