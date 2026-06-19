

export const metadata = {
  title: 'Terms & Conditions | Alhamd Battery Services and Energy Solutions',
  description: 'Terms and conditions governing the purchase of batteries and solar panel systems at Alhamd Battery Services.',
}

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200/60 p-8 sm:p-12 rounded-2xl shadow-sm text-slate-650 text-xs sm:text-sm leading-relaxed flex flex-col gap-6">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary border-b border-slate-100 pb-4 mb-2">
          Terms & Conditions
        </h1>
        
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
  )
}
