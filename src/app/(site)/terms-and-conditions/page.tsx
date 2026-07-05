

import { getSiteUrl } from '@/lib/utils'
import { PageHero } from '@/components/shared/page-hero'

export const metadata = {
  title: 'Terms & Conditions | Alhamd Battery Services and Energy Solutions',
  description: 'Terms and conditions governing the purchase of batteries and solar panel systems at Alhamd Battery Services.',
  alternates: {
    canonical: '/terms-and-conditions',
  },
  openGraph: {
    title: 'Terms & Conditions | Alhamd Battery Services',
    description: 'Terms and conditions governing the purchase of batteries and solar panel systems at Alhamd Battery Services.',
    url: `${getSiteUrl()}/terms-and-conditions`,
    siteName: 'Alhamd Battery Services',
    locale: 'en_PK',
    type: 'website',
    images: [{ url: '/opengraph.jpg', width: 1200, height: 630, alt: 'Alhamd Battery Services terms and conditions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | Alhamd Battery Services',
    description: 'Terms and conditions governing the purchase of batteries and solar panel systems.',
    images: ['/opengraph.jpg'],
  },
}

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Intro Banner */}
      <PageHero
        badge="Legal"
        title="Terms & Conditions"
        description="Rules and regulations for the use of our website and purchase policies."
        imageSrc="/page-banners/terms-and-conditions-banner.jpg"
        imageAlt="Alhamd Battery Services purchase terms warranty cards and solar equipment"
      />

      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="bg-white border border-slate-200/60 p-8 sm:p-12 rounded-2xl shadow-sm text-slate-650 text-xs sm:text-sm leading-relaxed flex flex-col gap-6">
        
        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Last Updated: June 19, 2026</p>

        <p>
          Welcome to Alhamd Battery Services and Energy Solutions. These terms and conditions outline the rules and regulations for the use of our website and purchase policies.
        </p>

        <h2 className="font-heading font-bold text-lg text-primary mt-4">1. Pricing Policy (No Online Payments)</h2>
        <p>
          Our website serves as an interactive catalog. We do NOT display product prices or process payments online. Because battery and solar prices fluctuate daily in Pakistan (due to raw materials, exchange rates, and freight), you must request a quote. All sales agreements and payments are finalized directly in-store (cash, bank transfer) or upon direct courier deliveries.
        </p>

        <h2 className="font-heading font-bold text-lg text-primary mt-4">2. Warranty Terms & Assistance</h2>
        <p>
          All products sold carry their official manufacturer warranties (e.g. AGS, Daewoo, Osaka, LONGi, Inverex). 
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Warranty cards must be kept safe. We cannot verify or process claims without the original manufacturer card.</li>
          <li>Battery replacement warranties are governed strictly by the manufacturer’s diagnostic center rules.</li>
          <li>We act as your local retail facilitator to assist in submitting warranty claims, but final approval is determined by the manufacturer.</li>
        </ul>

        <h2 className="font-heading font-bold text-lg text-primary mt-4">3. Service Coverage</h2>
        <p>
          We are based in <strong>Karachi, Pakistan</strong> and can coordinate battery, solar, inverter, and maintenance support across Pakistan through our sub-distributor network. Availability, timelines, and logistics may vary by city and service type.
        </p>

        <h2 className="font-heading font-bold text-lg text-primary mt-4">4. Limitation of Liability</h2>
        <p>
          Alhamd Battery Services is not liable for electrical damages caused to household appliances due to user-induced battery short-circuiting, incorrect solar inverter settings configured by third-party installers, or power grid surges from K-Electric.
        </p>

        <h2 className="font-heading font-bold text-lg text-primary mt-4">5. Revisions and Errata</h2>
        <p>
          The materials appearing on our website could include technical, typographical, or photographic errors. We may make changes to the materials contained on our website at any time without notice.
        </p>
      </div>
    </div>
    </div>
  )
}
