'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowUpRight, ExternalLink } from 'lucide-react'
import { SiteSettings } from '@/types'
import { BRAND_NAMES } from '@/lib/constants'
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaCopyright } from 'react-icons/fa6'
import Image from 'next/image'

interface FooterProps {
  settings?: SiteSettings
}

const QUICK_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Products', href: '/products' },
  { name: 'Certificates', href: '/certificates' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact Us', href: '/contact' },
]

const LEGAL_LINKS = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms-and-conditions' },
]

const HOURS = [
  { days: 'Mon – Thu', hours: '10:00 AM – 10:00 PM', closed: false },
  { days: 'Friday', hours: 'Closed', closed: true },
  { days: 'Saturday', hours: '10:00 AM – 10:00 PM', closed: false },
  { days: 'Sunday', hours: '10:00 AM – 10:00 PM', closed: false },
]

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const businessName = settings?.businessName
  const phone = settings?.phone
  const whatsapp = settings?.whatsappNumber
  const email = settings?.email
  const mapEmbed = settings?.mapEmbed
  const googleMapsLink = settings?.googleMapsLink

  const formattedPhone = phone?.replace(/[^\d+]/g, '')
  const formattedWhatsapp = whatsapp?.replace(/[^\d+]/g, '')

  return (
    <footer className="bg-white text-slate-600">

      {/* ── Brands strip ── */}
      <div className="bg-primary ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 ">
          <div className="shrink-0">
            <h4 className="text-[14px] sm:text-base font-bold tracking-widest uppercase text-accent-yellow">
              Authorized Retailer &amp; Distributor
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5">Serving Karachi since 2025</p>
          </div>
          <span className="hidden sm:block h-8 w-px bg-slate-300 shrink-0" />
          <div className="mt-6 sm:mt-0 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {BRAND_NAMES.slice(0, 6).map((brand, idx) => (
              <span key={brand} className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-sm font-semibold text-slate-200">
                {brand}
                {idx < 5 && <span className="text-slate-300">•</span>}
              </span>
            ))}
            <a href="/#brands-section" className="flex items-center gap-0.5 text-xs sm:text-sm font-semibold text-accent-orange hover:text-accent-yellow transition-colors">
              & more <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Col 1 — Brand & contact */}
        <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="self-start">
            <Image
              src="/logo-transparent.png"
              alt="Alhamd Battery Services"
              width={500}
              height={500}
              className="w-28 h-auto"
            />
          </Link>
          <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
            Malir's trusted source for premium batteries and solar systems. 100% genuine products, official warranties. Wholesale &amp; retail.
          </p>

          {/* Contact list */}
          {/* <ul className="flex flex-col gap-2.5">
            {phone && (
              <li>
                <a
                  href={`tel:${formattedPhone}`}
                  className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-primary transition-colors group"
                >
                  <span className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-accent-orange" />
                  </span>
                  {phone}
                </a>
              </li>
            )}
            {whatsapp && (
              <li>
                <a
                  href={`https://wa.me/${formattedWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-primary transition-colors group"
                >
                  <span className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <FaWhatsapp className="w-3.5 h-3.5 text-accent-orange" />
                  </span>
                  {whatsapp}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-primary transition-colors group break-all"
                >
                  <span className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-accent-orange" />
                  </span>
                  {email}
                </a>
              </li>
            )}
          </ul> */}
           {/* Social icons — below the map */}
          <div className="flex items-center gap-2 pt-1">
            <a
              href="https://www.facebook.com/profile.php?id=61574946852502&locale=it_IT#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-slate-100 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors text-slate-500"
            >
              <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6  " />
            </a>
            <a
              href="https://www.instagram.com/alhamdenergysolution/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-slate-100 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors text-slate-500"
            >
              <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6  " />
            </a>
            {whatsapp && (
              <a
                href='https://www.linkedin.com/company/alhamd-energy-solutions/posts/?feedView=all'
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-slate-100 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors text-slate-500"
              >
                <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6  " />
              </a>
            )}
          </div>
        </div>

        {/* Col 2 — Quick links */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-accent-orange shrink-0" />
            Navigation
          </h3>
          <ul className="space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary hover:translate-x-0.5 transition-all"
                >
                  <span className="text-accent-orange font-bold leading-none">›</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Business hours */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-accent-orange shrink-0" />
            Business Hours
          </h3>
          <ul className="space-y-1.5">
            {HOURS.map(({ days, hours, closed }) => (
              <li
                key={days}
                className="flex justify-between items-center py-1.5 border-b border-slate-200 last:border-0 text-sm"
              >
                <span className="text-slate-500 font-medium">{days}</span>
                <span className={closed ? 'text-accent-orange font-bold uppercase text-xs tracking-wide' : 'text-slate-800 font-semibold'}>
                  {hours}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Map */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-accent-orange shrink-0" />
            Our Location
          </h3>

          {mapEmbed ? (
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm h-36 relative">
              <div
                className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full border-none"
                dangerouslySetInnerHTML={{ __html: mapEmbed }}
              />
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 h-36 flex items-center justify-center bg-slate-50">
              <MapPin className="w-8 h-8 text-slate-300" />
            </div>
          )}

          {googleMapsLink && (
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent-orange transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-accent-orange" />
              Open in Google Maps
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

         

        
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-primary py-6 px-4  text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-200">
          <div className='text-center sm:text-start'>
            © {currentYear} {businessName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
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
