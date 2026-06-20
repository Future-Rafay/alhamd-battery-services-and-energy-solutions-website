

import { getSiteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Privacy Policy | Alhamd Battery Services and Energy Solutions',
  description: 'Privacy policy and data collection terms for Alhamd Battery Services and Energy Solutions website.',
  openGraph: {
    title: 'Privacy Policy | Alhamd Battery Services',
    description: 'Privacy policy and data collection terms for Alhamd Battery Services and Energy Solutions website.',
    url: `${getSiteUrl()}/privacy-policy`,
    siteName: 'Alhamd Battery Services',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Alhamd Battery Services',
    description: 'Privacy policy and data collection terms.',
  },
}

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
            How we collect, use, and protect your information when you interact with us.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto py-16 px-4">
        <div className="bg-white border border-slate-200/60 p-8 sm:p-12 rounded-2xl shadow-sm text-slate-650 text-xs sm:text-sm leading-relaxed flex flex-col gap-6">

        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Last Updated: June 19, 2026</p>

        <p>
          At Alhamd Battery Services and Energy Solutions, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by our website and how we use it.
        </p>

        <h2 className="font-heading font-bold text-lg text-primary mt-4">1. Information We Collect</h2>
        <p>
          If you contact us directly or request a service booking through our forms, we may collect the following personal details:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li><strong>Name:</strong> To identify you during communications.</li>
          <li><strong>Phone Number:</strong> To call you for confirmations or send price quotes via WhatsApp.</li>
          <li><strong>Address:</strong> To verify if you reside within our Karachi service boundaries.</li>
          <li><strong>Message Content:</strong> Any additional details you provide regarding your UPS/solar needs.</li>
        </ul>

        <h2 className="font-heading font-bold text-lg text-primary mt-4">2. How We Use Your Information</h2>
        <p>
          We use the information we collect in various ways, including to:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Provide, operate, and maintain our website.</li>
          <li>Process service request bookings and contact you back.</li>
          <li>Communicate with you directly, including support and quote delivery.</li>
          <li>Understand and analyze how visitors use our website to improve UX.</li>
        </ul>

        <h2 className="font-heading font-bold text-lg text-primary mt-4">3. Log Files & Cookies</h2>
        <p>
          Our website follows a standard procedure of using log files and cookies. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and number of clicks. These are not linked to any information that is personally identifiable.
        </p>

        <h2 className="font-heading font-bold text-lg text-primary mt-4">4. Third-Party Services</h2>
        <p>
          We use Google Maps Embeds on our Contact Us page. Google may collect usage statistics or cookies according to their own privacy policies. We also use Sanity.io as our database provider.
        </p>

        <h2 className="font-heading font-bold text-lg text-primary mt-4">5. Contact Details</h2>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>alhamdes@hotmail.com</strong>.
        </p>
      </div>
    </div>
  )
}
