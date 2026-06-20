import { CertificatesClient, Certificate } from '@/components/certificates/certificates-client'

import { getSiteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Authorized Certificates | Alhamd Battery Services and Energy Solutions',
  description: 'Verified proof of official authorization to sell and distribute leading battery and solar brands in Karachi.',
  openGraph: {
    title: 'Authorized Certificates | Alhamd Battery Services',
    description: 'Verified proof of official authorization to sell and distribute leading battery and solar brands in Karachi.',
    url: `${getSiteUrl()}/certificates`,
    siteName: 'Alhamd Battery Services',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Authorized Certificates | Alhamd Battery Services',
    description: 'Verified proof of official authorization to sell and distribute leading battery and solar brands.',
  },
}

const mockCertificates: Certificate[] = [
  {
    id: 'cert1',
    title: 'Authorized Solar Energy Solutions Retailer Certificate',
    issuer: 'Solar Brand Partner',
    image: '/NOT_AVAILABLE.png',
  },
  {
    id: 'cert2',
    title: 'Official Battery Distribution & Load Diagnostics Certification',
    issuer: 'Branded Batteries Group',
    image: '/NOT_AVAILABLE.png',
  },
]

export default function CertificatesPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Intro Banner */}
      <section className="bg-primary text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-foreground" />
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-4">
          <span className="text-accent-yellow text-xs font-bold uppercase tracking-widest bg-white/10 px-3.5 py-1 rounded-full">
            Credentials
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl !text-white">
            Authorized Dealer Certificates
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
            Verified proof of official authorization to sell and distribute leading battery and solar brands.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto py-16 px-4">
        <CertificatesClient mockCertificates={mockCertificates} />
      </div>
    </div>
  )
}