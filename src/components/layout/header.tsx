'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Menu, X, ArrowRight, Mail, ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet'
import { SiteSettings } from '@/types'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'

interface HeaderProps {
  settings?: SiteSettings
  categories?: any[]
}

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Products', href: '/products' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Certificates', href: '/certificates' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]

const DEFAULT_CATEGORIES = [
  {
    name: 'Lead Acid Battery',
    slug: 'lead-acid-battery',
    subcategories: [
      { name: 'Tubular Batteries', slug: 'tubular-batteries' },
      { name: 'Dry Batteries', slug: 'dry-batteries' }
    ]
  },
  {
    name: 'Lithium Ion Battery',
    slug: 'lithium-ion-battery',
    subcategories: [
      { name: 'LiFePO4 Packs', slug: 'lifepo4-packs' }
    ]
  },
  {
    name: 'Solar Panel',
    slug: 'solar-panel',
    subcategories: [
      { name: 'Mono-PERC Panels', slug: 'mono-perc-panels' }
    ]
  },
  {
    name: 'Inverter & Charger',
    slug: 'inverter-charger',
    subcategories: [
      { name: 'Hybrid Inverters', slug: 'hybrid-inverters' }
    ]
  }
]

export function Header({ settings, categories }: HeaderProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const categoriesList = categories && categories.length > 0 ? categories : DEFAULT_CATEGORIES


  const phone = settings?.phone
  const whatsapp = settings?.whatsappNumber
  const email = settings?.email
  const formattedPhone = phone?.replace(/[^\d+]/g, '')
  const formattedWhatsapp = whatsapp?.replace(/[^\d+]/g, '')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="w-full z-40">

      {/* ── Top info bar (md+) ── */}
      <div className="hidden md:block bg-primary text-white text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between gap-6">

          {/* Left — contact quick links */}
          <div className="flex items-center gap-5">
            {phone && (
              <a
                href={`tel:${formattedPhone}`}
                className="flex items-center gap-1.5 text-white/80 hover:text-accent-orange transition-colors font-medium"
              >
                <Phone className="w-4 h-4 text-accent-orange shrink-0" />
                {phone}
              </a>
            )}
            {whatsapp && (
              <a
                href={`https://wa.me/${formattedWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/80 hover:text-green-400 transition-colors font-medium"
              >
                <FaWhatsapp className="w-4 h-4 text-green-400 shrink-0" />
                {whatsapp}
              </a>
            )}
          </div>

          {/* Right — email + tagline */}
          <div className="flex items-center gap-4 text-white/60">
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-accent-orange shrink-0" />
                {email}
              </a>
            )}
            <span className="h-4 w-px bg-white/20" />
            <span className="text-accent-orange font-semibold tracking-wide">Est. 2025</span>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <div
        className={cn(
          'w-full transition-all py-2 duration-300',
          isScrolled
            ? 'fixed top-0 left-0 right-0 bg-white/96 backdrop-blur-md shadow-md border-b border-slate-200'
            : 'relative bg-white border-b border-slate-100',
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange rounded">
            <Image
              src="/alhamd-logo-horizontal.png"
              alt="Alhamd Battery Services logo"
              width={400}
              height={400}
              className="w-32 sm:w-[168px] h-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              if (link.name === 'Products') {
                return (
                  <div key={link.href} className="group relative py-2">
                    <Link
                      href={link.href}
                      className={cn(
                        'relative px-3 py-2 text-sm font-semibold tracking-wide rounded-md transition-colors flex items-center gap-1 group-hover:text-primary group-hover:bg-slate-50',
                        isActive(link.href)
                          ? 'text-primary'
                          : 'text-slate-600',
                      )}
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                      {isActive(link.href) && (
                        <span className="absolute inset-x-3 -bottom-px h-0.5 bg-accent-orange rounded-full" />
                      )}
                    </Link>

                    {/* Mega Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[720px] hidden group-hover:grid grid-cols-4 gap-6 bg-white shadow-xl rounded-xl border border-slate-200/80 p-6 z-50 transition-all">
                      {categoriesList.map((category) => (
                        <div key={category._id || category.slug} className="flex flex-col gap-3">
                          <Link
                            href={`/products?category=${category.slug}`}
                            className="font-bold text-sm text-primary hover:text-accent-orange transition-colors border-b border-slate-100 pb-1 flex items-center justify-between"
                          >
                            <span>{category.name}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          </Link>
                          {category.subcategories && category.subcategories.length > 0 && (
                            <div className="flex flex-col gap-2 pl-0.5">
                              {category.subcategories.map((sub: any) => (
                                <Link
                                  key={sub._id || sub.slug}
                                  href={`/products?category=${category.slug}&subcategory=${sub.slug}`}
                                  className="text-xs text-slate-500 hover:text-primary hover:pl-1 transition-all duration-150"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3 py-2 text-sm font-semibold tracking-wide rounded-md transition-colors',
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-slate-600 hover:text-primary hover:bg-slate-50',
                  )}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 bg-accent-orange rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {phone && (
              <a
                href={`tel:${formattedPhone}`}
                className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-md border border-primary text-primary text-sm font-bold hover:bg-primary hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Call Now</span>
                <span className="xl:hidden">{phone}</span>
              </a>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 h-9 rounded-md bg-accent-orange text-white text-sm font-bold hover:bg-accent-orange/90 shadow-sm transition-colors"
            >
              Get Quote <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile: phone icon + hamburger */}
          <div className="lg:hidden flex items-center gap-1">
            {phone && (
              <a
                href={`tel:${formattedPhone}`}
                aria-label="Call us"
                className="sm:hidden w-9 h-9 inline-flex items-center justify-center rounded-md text-primary hover:bg-slate-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            )}

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger
                render={
                  <button
                    aria-label="Open menu"
                    className="w-9 h-9 inline-flex items-center justify-center rounded-md text-primary hover:bg-slate-100 transition-colors"
                  />
                }
              >
                {isMobileMenuOpen
                  ? <X className="w-5 h-5" />
                  : <Menu className="w-5 h-5" />
                }
              </SheetTrigger>

              <SheetContent side="right" className="w-72 p-0 bg-white border-l border-slate-200 flex flex-col gap-0">
                {/* Drawer header */}
                <SheetHeader className="px-5  border-b border-slate-100">
                  <SheetTitle >
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                      <Image
                        src="/alhamd-logo-horizontal.png"
                        alt="Alhamd Battery Services"
                        width={500}
                        height={500}
                        className="w-36 h-auto"
                      />
                    </Link>
                  </SheetTitle>
                 
                </SheetHeader>

                {/* Nav links */}
                <nav className="flex flex-col flex-1 overflow-y-auto py-2">
                  {NAV_LINKS.map((link) => {
                    if (link.name === 'Products') {
                      return (
                        <details key={link.href} className="group border-b border-slate-100">
                          <summary className="flex items-center justify-between px-5 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                            <span>{link.name}</span>
                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 transition-transform group-open:rotate-180" />
                          </summary>
                          <div className="bg-slate-50/50 py-2 pl-6 flex flex-col gap-2">
                            <Link
                              href="/products"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-5 py-2 text-xs font-bold text-slate-600 hover:text-primary border-l-2 border-transparent"
                            >
                              All Products
                            </Link>
                            {categoriesList.map((category) => (
                              <div key={category._id || category.slug} className="flex flex-col gap-1 my-1">
                                <Link
                                  href={`/products?category=${category.slug}`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-5 py-1 text-xs font-semibold text-primary hover:text-accent-orange border-l-2 border-slate-200"
                                >
                                  {category.name}
                                </Link>
                                {category.subcategories && category.subcategories.map((sub: any) => (
                                  <Link
                                    key={sub._id || sub.slug}
                                    href={`/products?category=${category.slug}&subcategory=${sub.slug}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-8 py-1 text-xs text-slate-500 hover:text-primary"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </details>
                      )
                    }

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center justify-between px-5 py-3 text-sm font-semibold transition-colors border-b border-slate-100',
                          isActive(link.href)
                            ? 'text-primary bg-primary/5 border-l-4 border-accent-orange pl-4'
                            : 'text-slate-700 hover:text-primary hover:bg-slate-50 border-l-4 border-transparent',
                        )}
                      >
                        {link.name}
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </Link>
                    )
                  })}
                </nav>

                {/* Drawer footer CTAs */}
                <div className="px-5 py-5 border-t border-slate-100 flex flex-col gap-2.5">
                  {/* {phone && (
                    <a
                      href={`tel:${formattedPhone}`}
                      className="flex items-center justify-center gap-2 w-full h-10 rounded-md bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors"
                    >
                      <Phone className="w-4 h-4" /> {phone}
                    </a>
                  )}
                  {whatsapp && (
                    <a
                      href={`https://wa.me/${formattedWhatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full h-10 rounded-md bg-[#25D366] text-white text-sm font-bold shadow-sm hover:bg-[#22c55e] transition-colors"
                    >
                      <FaWhatsapp className="w-4 h-4" /> Chat on WhatsApp
                    </a>
                  )} */}
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>

      {/* Spacer prevents layout jump when header becomes fixed */}
      {isScrolled && <div className="h-20 w-full" />}
    </header>
  )
}
