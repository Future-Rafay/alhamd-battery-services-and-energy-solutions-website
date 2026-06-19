'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Menu, X, ArrowRight, MessageCircle } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet'
import { SiteSettings } from '@/types'

interface HeaderProps {
  settings?: SiteSettings
}

export function Header({ settings }: HeaderProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Default values if settings are not loaded
  const businessName = settings?.businessName
  const phone = settings?.phone
  const whatsapp = settings?.whatsappNumber
  const email = settings?.email

  const formattedPhone = phone?.replace(/[^\d+]/g, '')
  const formattedWhatsapp = whatsapp?.replace(/[^\d+]/g, '')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Certificates', href: '/certificates' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="w-full z-40">
      {/* Top Info Bar */}
      <div className="bg-primary text-white text-xs sm:text-sm py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium text-white/90">
              <Phone className="w-3.5 h-3.5 text-accent-orange" />
              Call Support: <a href={`tel:${formattedPhone}`} className="hover:text-accent-orange transition-colors">{phone}</a>
            </span>
            <span className="flex items-center gap-1.5 font-medium text-white/90">
              <MessageCircle className="w-3.5 h-3.5 text-green-400" />
              WhatsApp: <a href={`https://wa.me/${formattedWhatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">{whatsapp}</a>
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/80">
            <span>{email}</span>
            <span>|</span>
            <span className="text-accent-yellow font-semibold">Established 2025</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div
        className={`w-full transition-smooth py-4 px-4 ${isScrolled
            ? 'fixed top-0 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-205'
            : 'relative bg-white border-b border-slate-100'
          }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex flex-col gap-0.5">
            <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-primary leading-none">
              ALHAMD
            </span>
            <span className="font-heading font-semibold text-[9px] sm:text-[10px] tracking-wider text-accent-orange uppercase leading-none">
              Battery & Solar Energy Solutions
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold tracking-wide hover:text-accent-orange transition-colors ${isActive(link.href) ? 'text-primary border-b-2 border-accent-orange pb-1' : 'text-slate-700'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${formattedPhone}`}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'border-primary text-primary hover:bg-primary hover:text-white font-bold h-9 flex items-center justify-center'
              )}
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" /> Call Now
            </a>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: 'default', size: 'sm' }),
                'bg-accent-orange hover:bg-accent-orange/95 text-white font-extrabold h-9 shadow-sm flex items-center justify-center'
              )}
            >
              Get Quote <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href={`tel:${formattedPhone}`}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'sm:hidden text-primary flex items-center justify-center'
              )}
              aria-label="Call business"
            >
              <Phone className="w-5 h-5" />
            </a>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="text-primary focus-visible:ring-0" />}>
                  <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-6 bg-white border-l border-slate-200">
                <SheetHeader className="text-left mb-6 border-b border-slate-100 pb-4">
                  <SheetTitle className="font-heading font-extrabold text-xl text-primary">ALHAMD</SheetTitle>
                  <span className="text-[10px] uppercase font-semibold text-accent-orange tracking-wider">Battery & Solar</span>
                </SheetHeader>
                <div className="flex flex-col justify-between h-[80%]">
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-base font-semibold py-2 transition-colors hover:text-accent-orange ${isActive(link.href) ? 'text-primary border-l-4 border-accent-orange pl-3' : 'text-slate-700 pl-4'
                          }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
                    <a
                      href={`tel:${formattedPhone}`}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white rounded-md text-sm font-bold shadow-sm"
                    >
                      <Phone className="w-4 h-4" /> Call: {phone}
                    </a>
                    <a
                      href={`https://wa.me/${formattedWhatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-white rounded-md text-sm font-bold shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {/* spacer to avoid page jump when fixed header kicks in */}
      {isScrolled && <div className="h-[73px] md:h-[113px] w-full" />}
    </header>
  )
}
