import { sanityFetch } from '@/sanity/lib/live'
import dynamic from 'next/dynamic'
import {
  BANNERS_QUERY,
  SERVICES_QUERY,
  BRANDS_QUERY,
  TESTIMONIALS_QUERY,
  HOME_FAQS_QUERY,
  SITE_SETTINGS_QUERY,
  HOME_GALLERY_ITEMS_QUERY,
  CERTIFICATES_QUERY,
} from '@/sanity/lib/queries'
import { HeroSection } from '@/components/home/hero-section'
import { BrandsSection } from '@/components/home/brands-section'
import { TrustSection } from '@/components/home/trust-section'
import { CertificatesHomeSection } from '@/components/home/certificates-home-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { GoogleReviewsWidget } from '@/components/GoogleReviewsWidget'
import { FAQSection } from '@/components/home/faq-section'
import { getLocalBusinessSchema } from '@/lib/structured-data'
import CTASection from '@/components/home/CTASection'

const ServicesSection = dynamic(() => import('@/components/home/services-section').then((mod) => mod.ServicesSection))
const GalleryPreview = dynamic(() => import('@/components/home/gallery-preview').then((mod) => mod.GalleryPreview))

export default async function HomePage() {
  // Fetch settings first for phone/whatsapp info
  let settings: any = null
  let banners: any[] = []
  let services: any[] = []
  let brands: any[] = []
  let testimonials: any[] = []
  let faqs: any[] = []
  let galleryItems: any[] = []
  let certificates: any[] = []

  try {
    const [
      settingsRes,
      bannersRes,
      servicesRes,
      brandsRes,
      testimonialsRes,
      faqsRes,
      galleryRes,
      certificatesRes,
    ] = await Promise.all([
      sanityFetch({ query: SITE_SETTINGS_QUERY }),
      sanityFetch({ query: BANNERS_QUERY }),
      sanityFetch({ query: SERVICES_QUERY }),
      sanityFetch({ query: BRANDS_QUERY }),
      sanityFetch({ query: TESTIMONIALS_QUERY }),
      sanityFetch({ query: HOME_FAQS_QUERY }),
      sanityFetch({ query: HOME_GALLERY_ITEMS_QUERY }),
      sanityFetch({ query: CERTIFICATES_QUERY }),
    ])

    settings = settingsRes.data || null
    banners = bannersRes.data || []
    services = servicesRes.data || []
    brands = brandsRes.data || []
    testimonials = testimonialsRes.data || []
    faqs = faqsRes.data || []
    galleryItems = galleryRes.data || []
    certificates = certificatesRes.data || []
  } catch (error) {
    console.error('Error loading homepage data from Sanity, using fallbacks:', error)
  }

  const phone = settings?.phone 
  const whatsapp = settings?.whatsappNumber
  const structuredData = getLocalBusinessSchema(settings)

  return (
    <>
      {/* Structured data injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <HeroSection banners={banners} phone={phone} whatsapp={whatsapp} />
      <ServicesSection services={services} />
      <GalleryPreview items={galleryItems} />
      <TrustSection settings={settings} />
      <CertificatesHomeSection certificates={certificates} />
      <BrandsSection brands={brands} />
      <TestimonialsSection testimonials={testimonials} />
      <GoogleReviewsWidget />
      <CTASection />
      <FAQSection faqs={faqs} />
    </>
  )
}
