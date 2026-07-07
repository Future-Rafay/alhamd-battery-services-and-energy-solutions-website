import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const sections = [
  {
    badge: 'Lithium Ion Batteries',
    title: 'Smart Lithium Batteries for Modern Power Needs',
    description:
      'Explore lithium batteries with smart BMS, WiFi monitoring, and long cycle life. Ideal for home, office, and commercial backup with inverter compatibility and clean power.',
    points: ['Smart BMS protection', 'WiFi monitoring', 'Inverter-ready lithium solutions'],
    image: '/images/lithium-batteries.jpg',
    href: '/products?category=lithium-ion-battery',
    bg: 'bg-white',
    buttonText: 'Explore Lithium Ion Batteries'
  },
  {
    badge: 'Lead Acid Batteries',
    title: 'Trusted Lead Acid Batteries for Daily Backup',
    description:
      'Explore genuine lead acid battery options for UPS, automotive, solar backup, and commercial power needs. Alhamd helps customers choose from trusted names like AGS, Osaka, Exide, Daewoo, Phoenix, Crown, and Hawk with official warranty support.',
    points: ['Load-tested guidance', 'Genuine warranty-backed stock', 'Karachi service with Pakistan-wide coordination'],
    image: '/images/lead-acid-batteries-alhamd.jpg',
    href: '/products?category=lead-acid-battery',
    bg: 'bg-slate-50',
    buttonText:   'Explore Lead Acid Batteries'
  },
  {
    badge: 'Tubular Batteries',
    title: 'Tall Tubular Batteries for Longer Backup',
    description:
      'For homes, shops, and offices that need dependable inverter backup, Alhamd supports tall tubular battery selection with practical sizing advice, brand comparison, and warranty claim help.',
    points: ['Made for inverter backup', 'Popular Pakistan-market brands', 'Sizing advice for home and business use'],
    image: '/images/tubular-batteries-alhamd.jpg',
    href: '/products?category=lead-acid-battery&subcategory=tubular-batteries',
    bg: 'bg-white',
    buttonText: 'Explore Tubular Batteries'
  },
  {
    badge: 'Inverters & Chargers',
    title: 'Solar Inverters and Hybrid Power Control',
    description:
      'Match your panels and batteries with the right inverter or charger setup. We guide customers on hybrid inverters, solar inverters, and backup power systems from trusted energy brands.',
    points: ['Hybrid and solar inverter options', 'Battery and panel matching', 'Installation-ready guidance'],
    image: '/images/inverters-alhamd.jpg',
    href: '/products?category=inverter-charger',
    bg: 'bg-slate-50',
    buttonText:'Explore Inverters & Chargers'
  },
  {
    badge: 'Solar Panels',
    title: 'High-Quality Solar Panels for Clean Energy',
    description:
      'Alhamd supplies solar panel options for homes, shops, offices, and commercial projects with guidance on panel quality, roof space, inverter matching, and Pakistan-wide support.',
    points: ['Mono solar panel options', 'Roof and load estimation support', 'Top Brands'],
    image: '/images/solar-panels-alhamd.jpg',
    href: '/products?category=solar-panel',
    bg: 'bg-white',
    buttonText:'Explore Solar Panels'
  },
]

export function CategoryShowcaseSections() {
  return (
    <>
      {sections.map((section) => (
        <section key={section.title} className={`py-16 px-4 border-t border-slate-200/50 lg:py-14 ${section.bg}`}>
          <div className="max-w-7xl mx-auto grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-accent-orange font-bold text-xs md:text-sm uppercase tracking-wider border-l-4 border-accent-orange pl-3">
                  {section.badge}
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary leading-tight">
                  {section.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate-500 sm:text-base">{section.description}</p>
              </div>

              <div className="grid gap-3">
                {section.points.map((point) => (
                  <div key={point} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-orange" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <Link
                href={section.href}
                className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg border border-slate-200 bg-primary px-5 text-sm font-extrabold text-white shadow-sm transition-smooth hover:border-primary hover:bg-white hover:text-primary"
              >
             {section.buttonText}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200/60 bg-slate-100 shadow-sm">
              <Image
                src={section.image}
                alt={`${section.title} at Alhamd Battery Services and Energy Solutions`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
