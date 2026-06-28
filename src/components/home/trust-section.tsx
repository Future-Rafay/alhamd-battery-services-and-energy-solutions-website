'use client'

import { ShieldCheck, BadgeCheck, Calendar, Award } from 'lucide-react'
import { SiteSettings } from '@/types'

interface TrustSectionProps {
  settings?: SiteSettings
}

export function TrustSection({ settings }: TrustSectionProps) {
  // Compute months/years in business
  const openingDate = new Date('2025-03-01')
  const currentDate = new Date()
  
  // Calculate difference
  const diffTime = Math.abs(currentDate.getTime() - openingDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const monthsInBusiness = Math.floor(diffDays / 30.43)

  const stats = [
    {
      icon: Calendar,
      title: `${monthsInBusiness} Months`,
      subtitle: 'In Business',
      desc: `Opened on March 1, 2025. Serving walk-in & online clients in Saudabad.`,
    },
    {
      icon: Award,
      title: '17+ Brands',
      subtitle: 'Official Distribution',
      desc: 'Authorized retailer of major brands like LONGi, AGS, Osaka, Daewoo, MaxPower.',
    },
    {
      icon: ShieldCheck,
      title: '100% Genuine',
      subtitle: 'Authenticity Guarantee',
      desc: 'No refurbished items. All products carry original manufacturer warranty cards.',
    },
    {
      icon: BadgeCheck,
      title: 'Expert Support',
      subtitle: 'Professional Guidance',
      desc: 'We assist in load calculations, solar space estimation, and sizing matching.',
    },
  ]

  return (
    <section className="py-20 px-4 brand-blue-gradient text-white relative overflow-hidden border-b border-slate-900/50">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent-yellow/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent-orange/5 blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
          <span className="text-accent-yellow font-bold text-xs md:text-sm uppercase tracking-wider border-b-2 border-accent-yellow pb-1">
            Why Choose Alhamd?
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl !text-white">
            Built on Trust & Dedicated Service
          </h2>
       <p className="text-sm leading-relaxed text-white/70 sm:text-base">
            Unlike online storefronts or generic traders, Alhamd Battery Services has a physical storefront in Saudabad, Karachi. Customers can walk in for cell load testing, official manufacturer warranty claims, and genuine energy sizing advice.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white/[0.07] backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/[0.12] hover:border-accent-yellow/30 transition-smooth flex flex-col gap-4 items-start group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent-yellow/15 text-accent-yellow flex items-center justify-center group-hover:bg-accent-yellow/25 transition-smooth">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-heading font-extrabold text-2xl !text-white group-hover:text-accent-yellow transition-colors">{stat.title}</div>
                  <div className="text-xs font-bold text-accent-yellow uppercase tracking-wide">{stat.subtitle}</div>
                  <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">{stat.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Certificate banner link */}
        {/* <div className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-xl p-8 mt-16 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-yellow/10 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-accent-yellow" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg sm:text-xl !text-white">Certified & Authorized Dealer</h3>
              <p className="text-xs sm:text-sm text-white/70 mt-0.5">We maintain official distributor certifications for major solar and battery companies.</p>
            </div>
          </div>
          <a
            href="/certificates"
            className="px-6 py-2.5 bg-accent-orange hover:bg-accent-orange/90 text-white font-bold rounded-md text-sm transition-smooth shadow-md shrink-0 uppercase tracking-wider"
          >
            View Certificates
          </a>
        </div> */}
      </div>
    </section>
  )
}
