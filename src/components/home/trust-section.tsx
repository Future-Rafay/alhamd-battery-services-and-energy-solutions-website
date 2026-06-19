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
  
  const establishmentText = settings?.yearsInBusiness || `Serving Karachi since March 2025`

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
    <section className="py-20 px-4 bg-slate-50 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-6 flex flex-col gap-3">
            <span className="text-accent-orange font-bold text-xs uppercase tracking-wider border-l-4 border-accent-orange pl-3">
              Why Choose Alhamd?
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary">
              Built on Trust, Authenticity, and Dedicated Local Service
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Unlike online storefronts or generic traders, Alhamd Battery Services has a physical storefront in Karachi. Customers can walk in for load testing, original warranty claims, and genuine advice.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white border border-slate-200/60 p-6 rounded-xl shadow-sm hover:shadow-md transition-smooth flex flex-col gap-4 items-start"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-heading font-extrabold text-2xl text-primary">{stat.title}</div>
                  <div className="text-xs font-bold text-accent-orange uppercase tracking-wide">{stat.subtitle}</div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">{stat.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Certificate banner link */}
        <div className="bg-primary text-white rounded-xl p-8 mt-16 flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg shadow-primary/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-accent-yellow" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg sm:text-xl !text-white">Certified & Authorized Dealer</h3>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5">We maintain official distributor certifications for major solar and battery companies.</p>
            </div>
          </div>
          <a
            href="/certificates"
            className="px-6 py-2.5 bg-accent-orange hover:bg-accent-orange/95 text-white font-bold rounded-md text-sm transition-smooth shadow-md shrink-0 uppercase tracking-wider"
          >
            View Certificates
          </a>
        </div>
      </div>
    </section>
  )
}
