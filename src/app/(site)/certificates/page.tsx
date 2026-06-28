import { CertificatesClient, Certificate } from '@/components/certificates/certificates-client'
import { PageHero } from '@/components/shared/page-hero'

import { getSiteUrl } from '@/lib/utils'
import { sanityFetch } from '@/sanity/lib/live'
import { CERTIFICATES_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Authorized Certificates | Alhamd Battery Services and Energy Solutions',
  description: 'Verified proof of official authorization to sell and distribute leading battery and solar brands in Karachi.',
  openGraph: {
    title: 'Authorized Certificates | Alhamd Battery Services & Energy Solutions',
    description: 'Verified proof of official authorization to sell and distribute leading battery and solar brands in Karachi.',
    url: `${getSiteUrl()}/certificates`,
    siteName: 'Alhamd Battery Services & Energy Solutions',
    locale: 'en_PK',
    type: 'website',
    images: [{ url: '/opengraph.jpg', width: 1200, height: 630, alt: 'Alhamd Energy Solutions authorized dealer certificates' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Authorized Certificates | Alhamd Battery Services & Energy Solutions',
    description: 'Verified proof of official authorization to sell and distribute leading battery and solar brands.',
    images: ['/opengraph.jpg'],
  },
}


export default async function CertificatesPage() {

  let certificates: Certificate[] = []
  try {
    const certificatesRes = await sanityFetch({ query: CERTIFICATES_QUERY })
    certificates = certificatesRes.data || []
  } catch (error) {
    console.error('Error fetching certificates page:', error)
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Intro Banner */}
      <PageHero
        badge="Credentials"
        title="Authorized Dealer Certificates"
        description="Verified proof of official authorization to sell and distribute leading battery and solar brands."

      />

      <div className="max-w-5xl mx-auto py-16 px-4">
        <CertificatesClient certificates={certificates} />
      </div>
    </div>
  )
}
