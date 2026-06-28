import { getSiteUrl } from '@/lib/utils'
import { ServicesClient } from '@/components/services/services-client'
import { PageHero } from '@/components/shared/page-hero'

export const metadata = {
  title: 'Our Services | Alhamd Battery Services and Energy Solutions',
  description: 'Professional battery load testing, solar system configurations, and routine maintenance panels. We service all of Karachi.',
  openGraph: {
    title: 'Our Services | Alhamd Battery Services & Energy Solutions',
    description: 'Professional battery load testing, solar system configurations, and routine maintenance panels. We service all of Karachi.',
    url: `${getSiteUrl()}/services`,
    siteName: 'Alhamd Battery Services & Energy Solutions',
    locale: 'en_PK',
    type: 'website',
    images: [{ url: '/social-share.jpg', width: 1200, height: 630, alt: 'Alhamd Battery Services maintenance and delivery services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | Alhamd Battery Services & Energy Solutions',
    description: 'Professional battery and solar maintenance services in Karachi.',
    images: ['/social-share.jpg'],
  },
}

export default function ServicesPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <PageHero
        badge="Expert Support"
        title="Our Services"
        description="Professional battery load testing, solar system configurations, and routine maintenance support across Karachi."
        imageSrc="/page-banners/services.png"
        imageAlt="Battery delivery and service media in Karachi"
      />

      <ServicesClient />
    </div>
  )
}
