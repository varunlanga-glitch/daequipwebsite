import { useState, useEffect } from 'react'
import { List, X, Phone } from '@phosphor-icons/react'

const NAV_LINKS = [
  { label: 'Products', href: '#products' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(9,12,15,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top bar — phone & hours (hidden on scroll) */}
        <div
          className={`hidden md:flex items-center justify-end gap-6 text-xs text-muted font-condensed uppercase tracking-wider py-2 border-b border-white/5 transition-all duration-300 overflow-hidden ${
            scrolled ? 'max-h-0 py-0 border-transparent opacity-0' : 'max-h-10 opacity-100'
          }`}
        >
          <a href="tel:6048828008" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Phone size={12} weight="bold" />
            604-882-8008
          </a>
          <span>Mon–Fri 7:30 AM – 4:30 PM</span>
        </div>

        {/* Main nav */}
        <div className="flex items-center justify-between h-16">
          <a href="#" className="font-heading text-2xl tracking-wider text-accent">
            DAEQUIP
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-condensed text-sm uppercase tracking-widest transition-colors duration-200 relative ${
                  activeSection === link.href.slice(1)
                    ? 'text-accent'
                    : 'text-muted hover:text-text'
                }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent" />
                )}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-angled bg-accent text-page font-condensed font-semibold text-sm uppercase tracking-wider px-6 py-2.5 hover:bg-yellow-400 transition-colors"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <List size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96' : 'max-h-0'
        }`}
        style={{ backgroundColor: 'rgba(9,12,15,0.97)' }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`font-condensed text-sm uppercase tracking-widest ${
                activeSection === link.href.slice(1)
                  ? 'text-accent'
                  : 'text-muted'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:6048828008"
            className="font-condensed text-sm text-muted flex items-center gap-2"
          >
            <Phone size={14} />
            604-882-8008
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="btn-angled bg-accent text-page font-condensed font-semibold text-sm uppercase tracking-wider px-6 py-2.5 text-center mt-2"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </nav>
  )
}
