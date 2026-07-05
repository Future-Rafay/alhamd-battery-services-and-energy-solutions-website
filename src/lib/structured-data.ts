import { urlFor } from '@/sanity/lib/image'
import { getSiteUrl } from '@/lib/utils'

function absoluteUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${getSiteUrl()}${path.startsWith('/') ? path : `/${path}`}`
}

function getImageUrl(image: any) {
  if (!image) return undefined
  if (typeof image === 'string') return absoluteUrl(image)

  try {
    return urlFor(image).width(1200).height(900).quality(90).url()
  } catch {
    return undefined
  }
}

export function getLocalBusinessSchema(settings: any) {
  const siteUrl = getSiteUrl()
  const businessName = settings?.businessName || 'Alhamd Battery Services and Energy Solutions'
  const phone = settings?.phone || '+92 322 2592589'

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessName,
    image: `${siteUrl}/opengraph.jpg`,
    '@id': `${siteUrl}/#localbusiness`,
    url: siteUrl,
    telephone: phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shop No. C-22/3, Begum Khursheed Road',
      addressLocality: 'Karachi',
      addressRegion: 'Sindh',
      postalCode: '75080',
      addressCountry: 'PK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '24.8945687',
      longitude: '67.1912107',
    },
    areaServed: 'Pakistan',
    hasMap: settings?.googleMapsLink || 'https://maps.app.goo.gl/wmQcFeBncBiG3KZn8',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'],
        opens: '10:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday'],
        opens: '00:00',
        closes: '00:00',
      },
    ],
    sameAs: settings?.socialLinks?.map((link: any) => link.url).filter(Boolean) || [],
  }
}

export function getProductSchema(product: any, canonicalUrl: string) {
  if (!product) return null

  const brandName = product.brand?.name || 'Generic'
  const categoryName = product.category?.name || 'Battery'
  const imageUrl = getImageUrl(product.images?.[0])

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    ...(imageUrl ? { image: [imageUrl] } : {}),
    description: product.shortDescription || product.name,
    brand: {
      '@type': 'Brand',
      name: brandName,
    },
    category: categoryName,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PKR',
      url: canonicalUrl,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  }
}

export function getFAQPageSchema(faqs: any[]) {
  if (!faqs || faqs.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
