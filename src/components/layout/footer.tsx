'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowUpRight } from 'lucide-react'
import { SiteSettings } from '@/types'
import { BRAND_NAMES } from '@/lib/constants'

interface FooterProps {
  settings?: SiteSettings
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()

  // Fallbacks
  const businessName = settings?.businessName || 'Alhamd Battery Services and Energy Solutions'
  const phone = settings?.phone 
  const whatsapp = settings?.whatsappNumber 
  const email = settings?.email 
  const address = settings?.address
  const mapEmbed = settings?.mapEmbed
  const googleMapsLink = settings?.googleMapsLink

  const formattedPhone = phone?.replace(/[^\d+]/g, '')
  const formattedWhatsapp = whatsapp?.replace(/[^\d+]/g, '')

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Certificates Gallery', href: '/certificates' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-and-conditions' },
  ]

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Brands Banner strip */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wide text-accent-yellow uppercase">Authorized Retailer & Distributor</h4>
            <p className="text-xs text-slate-400 mt-1">Leading brands we distribute in Karachi, Pakistan</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-300">
            {BRAND_NAMES.slice(0, 8).map((brand, idx) => (
              <span key={brand} className="flex items-center gap-1.5">
                {brand}
                {idx < 7 && <span className="text-slate-700">•</span>}
              </span>
            ))}
            <span className="text-accent-orange flex items-center gap-1">
              & 9+ more <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex flex-col gap-0.5">
            <span className="font-heading font-extrabold text-2xl text-white tracking-tight leading-none">
              ALHAMD
            </span>
            <span className="font-heading font-semibold text-[10px] tracking-wider text-accent-orange uppercase leading-none">
              Battery & Solar Solutions
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            Saudabad's trusted source for premium batteries and solar systems. We deal in 100% genuine products with official warranties. Wholesale and retail services.
          </p>
          <div className="flex flex-col gap-2.5 mt-2">
            <a
              href={`tel:${formattedPhone}`}
              className="flex items-center gap-2 text-sm hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-accent-orange" />
              <span>{phone}</span>
            </a>
            <a
              href={`https://wa.me/${formattedWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-green-400" />
              <span>{whatsapp} (WhatsApp)</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-sm hover:text-white transition-colors break-all"
            >
              <Mail className="w-4 h-4 text-accent-orange" />
              <span>{email}</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-heading font-bold text-base text-white tracking-wide mb-5 uppercase border-l-4 border-accent-orange pl-3">
            Quick Navigation
          </h3>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-white hover:underline transition-all flex items-center gap-1.5"
                >
                  <span className="text-accent-orange font-bold">›</span> {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Business Hours */}
        <div>
          <h3 className="font-heading font-bold text-base text-white tracking-wide mb-5 uppercase border-l-4 border-accent-orange pl-3">
            Business Hours
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="font-medium text-slate-400">Mon – Thu</span>
              <span className="text-white font-semibold">10:00 AM – 10:00 PM</span>
            </li>
            <li className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="font-medium text-slate-400">Friday</span>
              <span className="text-accent-orange font-bold uppercase">Closed</span>
            </li>
            <li className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="font-medium text-slate-400">Saturday</span>
              <span className="text-white font-semibold">10:00 AM – 10:00 PM</span>
            </li>
            <li className="flex justify-between items-center py-1">
              <span className="font-medium text-slate-400">Sunday</span>
              <span className="text-white font-semibold">10:00 AM – 10:00 PM</span>
            </li>
          </ul>
          <div className="mt-4 flex items-start gap-2 bg-slate-950/40 p-3 rounded-md border border-slate-800/60">
            <Clock className="w-4 h-4 text-accent-yellow shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-400 leading-relaxed">
              We recommend walking in between 4:00 PM and 9:00 PM for the fastest load testing and diagnostics services.
            </p>
          </div>
        </div>

        {/* Map Embed */}
        <div className="flex flex-col gap-4">
          <h3 className="font-heading font-bold text-base text-white tracking-wide uppercase border-l-4 border-accent-orange pl-3">
            Our Location
          </h3>
          <div className="rounded-lg overflow-hidden border border-slate-800 shadow-inner h-[140px] relative">
            <div 
              className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full border-none"
              dangerouslySetInnerHTML={{ __html: mapEmbed || '' }}
            />
          </div>
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-accent-yellow hover:text-accent-orange transition-colors self-start"
          >
            <MapPin className="w-3.5 h-3.5 text-accent-orange" />
            <span>Open in Google Maps</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-950 py-6 px-4 border-t border-slate-850 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400">
          <div>
            © {currentYear} {businessName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-white hover:underline transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
