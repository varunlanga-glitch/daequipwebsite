export default function Footer() {
  return (
    <footer className="bg-card border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-3xl text-accent mb-4">DAEQUIP</h3>
            <p className="text-muted text-sm leading-relaxed mb-3">
              Premium Attachments Ltd.
              <br />
              Made in Langley, BC since 1989.
            </p>
            <p className="font-condensed text-xs text-muted uppercase tracking-wider">
              #YouCanDigUs
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-condensed text-sm uppercase tracking-wider text-text mb-4">
              Products
            </h4>
            <ul className="space-y-2 text-muted text-sm">
              <li>Digging Buckets</li>
              <li>Hydraulic Thumbs</li>
              <li>Long Reach Booms</li>
              <li>WL Buckets & Attachments</li>
              <li>Machine Guarding</li>
              <li>Custom Fabrication</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-condensed text-sm uppercase tracking-wider text-text mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-muted text-sm">
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

          {/* Contact */}
          <div>
            <h4 className="font-condensed text-sm uppercase tracking-wider text-text mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-muted text-sm">
              <li>604-882-8008</li>
              <li>info@daequip.com</li>
              <li>2141 Queen Street</li>
              <li>Abbotsford BC V2T6J3</li>
              <li>Mon–Fri 7:30 AM – 4:30 PM</li>
            </ul>
          </div>
        </div>

        {/* Certifications & bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
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
