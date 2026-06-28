import { Compass, Heart, ShieldAlert, MapPin, CheckCircle } from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { PageHero } from '@/components/shared/page-hero'

import { getSiteUrl } from '@/lib/utils'

export const metadata = {
  title: 'About Us | Alhamd Battery Services and Energy Solutions',
  description: 'Learn about our history, our commitment to genuine battery and solar brands, and our retail shop located in Malir, Karachi.',
  openGraph: {
    title: 'About Us | Alhamd Battery Services & Energy Solutions',
    description: 'Learn about our history, our commitment to genuine battery and solar brands, and our retail shop located in Malir, Karachi.',
    url: `${getSiteUrl()}/about`,
    siteName: 'Alhamd Battery Services & Energy Solutions',
    locale: 'en_PK',
    type: 'website',
    images: [{ url: '/social-share.jpg', width: 1200, height: 630, alt: 'Alhamd Battery Services storefront and brand' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Alhamd Battery Services & Energy Solutions',
    description: 'Learn about our history and retail shop in Malir, Karachi.',
    images: ['/social-share.jpg'],
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
      desc: 'To provide local retail walk-in and online customers in Malir, Karachi with authentic backup batteries and high-efficiency solar equipment, backed by manufacturer warranties and honest support.',
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
      <PageHero
        badge="Our Story"
        title="About Us"
        description="Established in Saudabad, Karachi on March 1, 2025, we help customers solve local electricity challenges through reliable products and honest support."
      />

      {/* Section 1: Our Story (Text Left, Media Right) */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <SectionHeading
              badge="Established 2025"
              title="A Trusted Physical Presence in Malir, Karachi"
            />
            <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed">
              At Alhamd Battery Services and Energy Solutions, we understand that energy backup is a critical necessity in Pakistan. That's why we opened our physical retail outlet at Begum Khursheed Road, Saudabad. We wanted to offer local walk-in clients a reliable place to inspect batteries, consult on solar sizes, and easily claim manufacturer warranties.
            </p>
            <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed">
              We specialize in top-quality energy equipment, acting as a retail and wholesale distributor for 17 leading brands. Whether you need a tubular battery for a UPS, a replacement car battery, or a full solar power setup, our team has the knowledge to configure the system correctly.
            </p>
            {/* location in map like  */}
            <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100 self-start">
              <MapPin className="w-4 h-4 text-accent-orange shrink-0" />
              <span>Location: Shop No. C-22/3, Begum Khursheed Road, Saudabad, Baraf Khana, S1 Saudabad, Karachi, Pakistan</span>
            </div>

          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50">
              <Image
                src="/about/physical-presence.jpg"
                alt="Energy Consultant with Homeowner"
                fill
                sizes="(max-w-768px) 100vw, 450px"
                className="object-cover hover:scale-103 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Divider Banner */}
      <section className="bg-primary text-white py-12 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center flex flex-col gap-1 border-r last:border-0 border-white/10">
                <div className="font-heading font-extrabold text-2xl sm:text-4xl text-accent-yellow">{stat.value}</div>
                <div className="text-[10px] sm:text-xs font-bold text-white/80 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Why Choose Us (Media Left, Text Right) */}
      <section className="py-16 sm:py-24 px-4 bg-slate-50/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Image */}
          <div className="lg:col-span-5 order-last lg:order-first w-full flex justify-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50">
              <Image
                src="/about/brands-connections.jpg"
                alt="Professional Solar Panel Electrical Distribution Setup"
                fill
                sizes="(max-w-768px) 100vw, 450px"
                className="object-cover object-top hover:scale-103 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <SectionHeading
              badge="Quality Assured"
              title="Official Warranties & Direct Brand Ties"
            />
            <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed">
              We never sell counterfeit, B-grade, or refurbished products. Every single item leaving our shop is 100% genuine and comes with the manufacturer's original warranty card. By maintaining direct relationships with official distributors, we ensure our clients always receive authentic daily market pricing.
            </p>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-600 mt-2">
              <li className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200/50 shadow-xs hover:border-primary/20 transition-smooth">
                <CheckCircle className="w-5 h-5 text-accent-orange shrink-0 mt-0.5" />
                <div>
                  <strong className="text-primary block mb-0.5">100% Genuine Inventory</strong>
                  Sourced directly from companies to secure official serials and product verification.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200/50 shadow-xs hover:border-primary/20 transition-smooth">
                <CheckCircle className="w-5 h-5 text-accent-orange shrink-0 mt-0.5" />
                <div>
                  <strong className="text-primary block mb-0.5">Actual Load Sizing Consultation</strong>
                  We analyze your home appliance wattage to provide a configuration that lasts, preventing overselling.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200/50 shadow-xs hover:border-primary/20 transition-smooth">
                <CheckCircle className="w-5 h-5 text-accent-orange shrink-0 mt-0.5" />
                <div>
                  <strong className="text-primary block mb-0.5">Local Claim Center Support</strong>
                  If a battery underperforms, bring it directly to our storefront for instant load testing and warranty processing support.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Professional Standards (Text Left, Media Right) */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <SectionHeading
              badge="Engineering Standards"
              title="Tailored Sizing and Technical Support"
            />
            <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed">
              Energy systems are not one-size-fits-all. A configuration that works for one home may fail on another due to power surge factors, wiring quality, and specific backup requirements. Our experienced engineers analyze every customer's setup to recommend perfect combinations of hybrid inverters, battery banks, and solar panels.
            </p>
            <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed">
              From calculating battery gravity and load testing individual cells to routing DC wiring using proper fire-resistant conduits, we implement professional standards in every deployment we handle in Karachi.
            </p>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50">
              <Image
                src="/services/ups-inverter.png"
                alt="Electrician testing and configuring backup inverter system"
                fill
                sizes="(max-w-768px) 100vw, 450px"
                className="object-cover hover:scale-103 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 px-4 brand-blue-gradient text-white relative overflow-hidden">
        {/* Decorative accents */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-accent-yellow/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-accent-orange/5 blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-accent-yellow font-bold text-xs md:text-sm border-b-1 border-accent-yellow pb-1 uppercase tracking-wider">
              Core Principles
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl !text-white">
              Our Professional Commitments
            </h2>
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">
              We are guided by core values that keep our customers first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <div
                  key={i}
                  className="bg-white/[0.07] backdrop-blur-sm border border-white/10 p-6 rounded-xl flex flex-col items-start gap-4 hover:bg-white/[0.12] hover:border-accent-yellow/30 transition-smooth group"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent-yellow/15 text-accent-yellow flex items-center justify-center group-hover:bg-accent-yellow/25 transition-smooth">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-lg !text-white group-hover:text-accent-yellow transition-colors">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{pillar.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA section */}

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto brand-blue-gradient rounded-2xl p-10 sm:p-14 text-center flex flex-col items-center gap-6 relative overflow-hidden ">


          <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
            <span className="text-accent-yellow font-bold text-xs sm:text-sm uppercase tracking-wider border-b-2 border-accent-orange pb-1">
              Free Consultation
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl !text-white">
              Need a Custom Sizing Quote?
            </h2>
            <p className="text-white/70 text-xs sm:text-base leading-relaxed">
              Let our technicians help you choose the correct battery capacity or solar inverter size. We provide free load analysis and system recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="/contact" className="bg-accent-orange hover:bg-accent-orange/90 text-white font-bold px-8 py-3.5 rounded-lg shadow-lg shadow-accent-orange/20 transition-smooth text-xs sm:text-sm inline-block">
                Get a Free Quote
              </Link>
              <Link href="/services" className="bg-white/10 border border-white/20 text-white hover:bg-white/20 font-bold px-8 py-3.5 rounded-lg backdrop-blur-sm transition-smooth text-xs sm:text-sm inline-block">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
