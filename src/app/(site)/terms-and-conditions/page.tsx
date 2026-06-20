

import { getSiteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Terms & Conditions | Alhamd Battery Services and Energy Solutions',
  description: 'Terms and conditions governing the purchase of batteries and solar panel systems at Alhamd Battery Services.',
  openGraph: {
    title: 'Terms & Conditions | Alhamd Battery Services',
    description: 'Terms and conditions governing the purchase of batteries and solar panel systems at Alhamd Battery Services.',
    url: `${getSiteUrl()}/terms-and-conditions`,
    siteName: 'Alhamd Battery Services',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | Alhamd Battery Services',
    description: 'Terms and conditions governing the purchase of batteries and solar panel systems.',
  },
}

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Intro Banner */}
      <section className="bg-primary text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-foreground" />
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-4">
          <span className="text-accent-yellow text-xs font-bold uppercase tracking-widest bg-white/10 px-3.5 py-1 rounded-full">
            Legal
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl !text-white">
            Terms & Conditions
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
            Rules and regulations for the use of our website and purchase policies.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto py-16 px-4">
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

        <h2 className="font-heading font-bold text-lg text-primary mt-4">3. Local Service Boundaries</h2>
        <p>
          Our solar panel cleaning and battery load testing/diagnostics maintenance services are strictly limited to the municipal limits of <strong>Karachi, Pakistan</strong>. Bookings made outside of Karachi will be rejected or subject to additional logistics fees.
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
