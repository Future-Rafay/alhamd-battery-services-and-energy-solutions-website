import { Compass, Heart, ShieldAlert, BadgeCheck } from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

import { getSiteUrl } from '@/lib/utils'

export const metadata = {
  title: 'About Us | Alhamd Battery Services and Energy Solutions',
  description: 'Learn about our history, our commitment to genuine battery and solar brands, and our retail shop located in Saudabad, Karachi.',
  openGraph: {
    title: 'About Us | Alhamd Battery Services',
    description: 'Learn about our history, our commitment to genuine battery and solar brands, and our retail shop located in Saudabad, Karachi.',
    url: `${getSiteUrl()}/about`,
    siteName: 'Alhamd Battery Services',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Alhamd Battery Services',
    description: 'Learn about our history and retail shop in Karachi.',
  },
}

export default function AboutPage() {
  const stats = [
    { value: '100%', label: 'Genuine Products' },
    { value: '17+', label: 'Authorized Brands' },
    { value: '2025', label: 'Established' },
    { value: 'Karachi', label: 'Service Focus' },
  ]

  const pillars = [
    {
      icon: Compass,
      title: 'Our Mission',
      desc: 'To provide local retail walk-in and online customers in Karachi with authentic backup batteries and high-efficiency solar equipment, backed by manufacturer warranties and honest support.',
    },
    {
      icon: ShieldAlert,
      title: 'Our Guarantee',
      desc: 'We never sell counterfeit or refurbished goods. Every battery, solar panel, and inverter purchased from our store is brand new, factory sealed, and includes its official warranty card.',
    },
    {
      icon: Heart,
      title: 'Our Approach',
      desc: 'We pair you with products that match your specific load requirements. We believe in building long-term neighborhood relationships, not making quick, one-time sales.',
    },
  ]

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Intro Banner */}
      <section className="bg-primary text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-foreground" />
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-4">
          <span className="text-accent-yellow text-xs font-bold uppercase tracking-widest bg-white/10 px-3.5 py-1 rounded-full">
            Our Story
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl !text-white">
            About Alhamd Battery Services
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
            Established in Saudabad, Karachi on March 1, 2025, we are dedicated to helping our customers solve local electricity challenges through reliable products.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text Details */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <SectionHeading
              badge="Established 2025"
              title="A Trusted Physical Presence in Saudabad, Karachi"
            />

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              At Alhamd Battery Services and Energy Solutions, we understand that energy backup is a critical necessity in Pakistan. That's why we opened our physical retail outlet at Begum Khursheed Road, Saudabad. We wanted to offer local walk-in clients a reliable place to inspect batteries, consult on solar sizes, and easily claim manufacturer warranties.
            </p>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              We specialize in top-quality energy equipment, acting as a retail and wholesale distributor for 17 leading brands. Whether you need a tubular battery for a UPS, a replacement car battery, or a full solar power setup, our team has the knowledge to configure the system correctly.
            </p>

            {/* Stats Block */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm text-center">
                  <div className="font-heading font-extrabold text-xl sm:text-2xl text-primary">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info Card Stack */}
          <div className="lg:col-span-5 bg-white border border-slate-200/60 p-8 rounded-2xl shadow-sm flex flex-col gap-6">
            <h3 className="font-heading font-bold text-lg !text-primary border-b border-slate-100 pb-3 flex items-center gap-2">
              <BadgeCheck className="w-5.5 h-5.5 text-accent-orange" /> Why Buy From Us?
            </h3>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-accent-orange font-bold shrink-0 mt-0.5">✓</span>
                <div>
                  <strong className="text-primary block mb-0.5">Direct Manufacturer Ties</strong>
                  We source directly from official brand channels to ensure authentic daily prices.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-orange font-bold shrink-0 mt-0.5">✓</span>
                <div>
                  <strong className="text-primary block mb-0.5">Full Load Consulting</strong>
                  We do not over-sell. We configure systems based on your actual wattage consumption.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-orange font-bold shrink-0 mt-0.5">✓</span>
                <div>
                  <strong className="text-primary block mb-0.5">Physical Store Support</strong>
                  If a battery malfunctions, bring it directly to our shop for load testing and claims.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-accent-yellow font-bold text-xs uppercase tracking-wider">
              Core Principles
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl !text-white">
              Our Professional Commitments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <div
                  key={i}
                  className="bg-slate-950/60 border border-slate-800 p-6 rounded-xl flex flex-col items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/5 text-accent-yellow flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-lg !text-white">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 px-4 text-center max-w-xl mx-auto flex flex-col items-center gap-6">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl !text-primary">
          Need a Custom Sizing Quote?
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
          Let our technicians help you choose the correct battery capacity or solar inverter size.
        </p>
        <div className="flex gap-4">
          <Button
            className={cn(
              buttonVariants({ variant: 'default' }),
              'bg-accent-orange hover:bg-accent-orange/95 text-white font-bold'
            )}>

            <Link
              href="/contact"

            >
              Get a Quote
            </Link>
          </Button>
          <Button

            className={cn(
              buttonVariants({ variant: 'outline' }),
              'border-primary text-primary font-bold'
            )}>
            <Link
              href="/services"
            >
              Our Services
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
