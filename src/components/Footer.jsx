import { Phone, Envelope, MapPin } from '@phosphor-icons/react'

export default function Footer() {
  return (
    <footer className="bg-page border-t border-white/5">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-4">
            <img src="/images/daequip-logo-white.png" alt="Daequip" className="h-8 mb-4" />
            <p className="text-muted text-sm leading-relaxed mb-4">
              Premium Attachments Ltd.
              <br />
              Designing and manufacturing heavy equipment attachments in Langley, BC since 1989.
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Phone size={14} className="text-accent" />
              <a href="tel:6048828008" className="text-muted text-sm hover:text-accent transition-colors">604-882-8008</a>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Envelope size={14} className="text-accent" />
              <a href="mailto:info@daequip.com" className="text-muted text-sm hover:text-accent transition-colors">info@daequip.com</a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-accent" />
              <span className="text-muted text-sm">2141 Queen Street, Abbotsford BC</span>
            </div>
          </div>

          {/* Products */}
          <div className="md:col-span-3">
            <h4 className="font-condensed text-sm uppercase tracking-wider text-text mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-accent inline-block" />
              Products
            </h4>
            <ul className="space-y-2.5 text-muted text-sm">
              <li><a href="#products" className="hover:text-accent transition-colors">Digging Buckets</a></li>
              <li><a href="#products" className="hover:text-accent transition-colors">Hydraulic Thumbs</a></li>
              <li><a href="#products" className="hover:text-accent transition-colors">Long Reach Booms</a></li>
              <li><a href="#products" className="hover:text-accent transition-colors">WL Buckets & Attachments</a></li>
              <li><a href="#products" className="hover:text-accent transition-colors">Machine Guarding</a></li>
              <li><a href="#products" className="hover:text-accent transition-colors">Custom Fabrication</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="font-condensed text-sm uppercase tracking-wider text-text mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-accent inline-block" />
              Company
            </h4>
            <ul className="space-y-2.5 text-muted text-sm">
              <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
              <li>
                <a
                  href="https://dormelcontainers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Dormel Containers
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & CTA */}
          <div className="md:col-span-3">
            <h4 className="font-condensed text-sm uppercase tracking-wider text-text mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-accent inline-block" />
              Hours
            </h4>
            <p className="text-muted text-sm mb-2">Mon–Fri 7:30 AM – 4:30 PM</p>
            <p className="text-muted text-xs mb-6">Closed weekends & statutory holidays</p>
            <a
              href="#contact"
              className="btn-angled inline-block bg-accent text-page font-condensed font-bold uppercase tracking-wider px-6 py-2.5 text-xs hover:bg-yellow-400 transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            &copy; {new Date().getFullYear()} Daequip Premium Attachments Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-condensed text-xs uppercase tracking-wider text-muted">
              2-Year Warranty
            </span>
            <span className="text-white/10">|</span>
            <span className="font-condensed text-xs uppercase tracking-wider text-muted">
              Made in Canada
            </span>
            <span className="text-white/10">|</span>
            <span className="font-condensed text-xs uppercase tracking-wider text-accent">
              #DesignedToWork #BuiltToLast
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
