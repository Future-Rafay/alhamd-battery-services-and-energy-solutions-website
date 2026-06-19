'use client'

import Link from 'next/link'
import { Phone, MessageCircle, ArrowRight, ShieldCheck, Cpu, Battery } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Banner } from '@/types'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

interface HeroSectionProps {
  banners: Banner[]
  phone: string
  whatsapp: string
}

export function HeroSection({ banners, phone, whatsapp }: HeroSectionProps) {
  const formattedPhone = phone.replace(/[^\d+]/g, '')
  const formattedWhatsapp = whatsapp.replace(/[^\d+]/g, '')
  const whatsappMessage = encodeURIComponent(
    'Hi Alhamd Battery Services! I am looking for a price quote on solar panels / batteries. Please assist.'
  )

  // Use first banner if available, otherwise use default marketing text
  const hasBanner = banners && banners.length > 0
  const activeBanner = hasBanner ? banners[0] : null

  const headline = activeBanner?.headline || 'Powering Your Home & Business with Trusted Energy Solutions'
  const subtext =
    activeBanner?.subtext ||
    'Authorized retail distributor of branded batteries (AGS, Daewoo, Osaka, Exide) and solar energy products in Saudabad, Karachi. Real warranties, expert service.'
  const ctaText = activeBanner?.ctaText || 'Explore Products'
  const ctaLink = activeBanner?.ctaLink || '/products'

  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-slate-950 text-white overflow-hidden py-16 px-4">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-25">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent-orange/20 blur-[100px]" />
      </div>

      {/* Dynamic Background Image from CMS */}
      {activeBanner?.image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(activeBanner.image).width(1920).height(1080).quality(85).url()}
            alt={activeBanner.image.alt || 'Alhamd Energy Solutions Background'}
            fill
            className="object-cover opacity-30 object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col gap-6 animate-fadeIn">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/60 border border-primary/80 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-accent-yellow self-start backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-accent-orange" />
            <span>100% Genuine Branded Products & Warranties</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
            {headline.split(' ').map((word, i) => (
              <span key={i} className={word === 'Solutions' || word === 'Trusted' ? 'text-accent-orange' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
            {subtext}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Link
              href={ctaLink}
              className={cn(
                buttonVariants({ variant: 'default', size: 'lg' }),
                'bg-accent-orange hover:bg-accent-orange/95 text-white font-extrabold px-8 shadow-md transition-smooth rounded-lg flex items-center justify-center'
              )}
            >
              {ctaText} <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>

            <a
              href={`https://wa.me/${formattedWhatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-white font-bold px-6 border backdrop-blur-sm rounded-lg flex items-center justify-center'
              )}
            >
              <MessageCircle className="w-5 h-5 mr-2 text-green-400 fill-green-400/20" /> Inquire Price
            </a>

            <a
              href={`tel:${formattedPhone}`}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'lg' }),
                'text-slate-200 hover:text-white font-semibold hover:bg-white/5 rounded-lg flex items-center justify-center'
              )}
            >
              <Phone className="w-4.5 h-4.5 mr-2 text-accent-yellow" /> Call Store
            </a>
          </div>

          {/* Quick stats inline indicators */}
          <div className="grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-8 mt-4 max-w-lg">
            <div>
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-accent-yellow">17+</div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">Top Brands</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-accent-yellow">200+</div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">Products</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-accent-yellow">100%</div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">Authentic</div>
            </div>
          </div>
        </div>

        {/* Visual Right Column (Hero Card stack / Product Showcase) */}
        <div className="lg:col-span-5 hidden lg:flex justify-center relative">
          <div className="w-full max-w-[420px] bg-slate-900/80 border border-slate-800 p-8 rounded-xl backdrop-blur-md shadow-2xl relative">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-accent-orange text-white text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase shadow-md">
              Store Pickup
            </div>

            <h3 className="font-heading font-bold text-lg text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Battery className="w-5 h-5 text-accent-orange" /> Available In-Store
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
                <Cpu className="w-5 h-5 text-accent-yellow shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Hybrid Solar Inverters</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Inverex, Crown, MaxPower & Simtek models.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
                <ShieldCheck className="w-5 h-5 text-accent-yellow shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Maintenance Free Batteries</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Daewoo, AGS & Osaka sealed batteries.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
                <Battery className="w-5 h-5 text-accent-yellow shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Tubular Deep Cycle Batteries</h4>
                  <p className="text-xs text-slate-400 mt-0.5">For solar setups & UPS back-up systems.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
              <span>Location: Saudabad, Karachi</span>
              <span className="text-accent-yellow font-medium">Daily Pricing Updates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
