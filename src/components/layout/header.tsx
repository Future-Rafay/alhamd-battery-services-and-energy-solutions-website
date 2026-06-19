'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Menu, X, ArrowRight, Mail, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet'
import { SiteSettings } from '@/types'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'

interface HeaderProps {
  settings?: SiteSettings
}

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Products', href: '/products' },
  { name: 'Certificates', href: '/certificates' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]

export function Header({ settings }: HeaderProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
              src="/logo-transparent.png"
              alt="Alhamd Battery Services logo"
              width={500}
              height={500}
              className="w-20 sm:w-[72px] h-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
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
            ))}
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
                        src="/logo-transparent.png"
                        alt="Alhamd Battery Services"
                        width={500}
                        height={500}
                        className="w-20 h-auto"
                      />
                    </Link>
                  </SheetTitle>
                 
                </SheetHeader>

                {/* Nav links */}
                <nav className="flex flex-col  flex-1 overflow-y-auto">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center justify-between px-5 py-3 text-sm font-semibold transition-colors',
                        isActive(link.href)
                          ? 'text-primary bg-primary/5 border-l-4 border-accent-orange pl-4'
                          : 'text-slate-700 hover:text-primary hover:bg-slate-50 border-l-4 border-transparent',
                      )}
                    >
                      {link.name}
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </Link>
                  ))}
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
