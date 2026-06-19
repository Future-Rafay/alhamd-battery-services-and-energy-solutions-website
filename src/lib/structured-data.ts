export function getLocalBusinessSchema(settings: any) {
  const businessName = settings?.businessName
  const phone = settings?.phone
  const whatsappNumber = settings?.whatsappNumber
  const addressStr = settings?.address

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessName,
    image: 'https://cdn.sanity.io/images//production/default-logo.png', // Replace with dynamic URL later if needed
    '@id': 'https://alhamdbatteryservices.com',
    url: 'https://alhamdbatteryservices.com',
    telephone: phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shop No. C-22/3, Begum Khursheed Road, Saudabad, Baraf Khana, S1 Saudabad',
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
    hasMap: 'https://maps.app.goo.gl/wmQcFeBncBiG3KZn8',
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
    sameAs: settings?.socialLinks?.map((link: any) => link.url) || [],
  }
}

export function getProductSchema(product: any, canonicalUrl: string) {
  if (!product) return null

  const brandName = product.brand?.name || 'Generic'
  const categoryName = product.category?.name || 'Battery'
  const imageUrl = product.images?.[0] ? product.images[0] : null // Dynamic URL resolved by builder

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: imageUrl,
    description: product.shortDescription || product.name,
    brand: {
      '@type': 'Brand',
      name: brandName,
    },
    category: categoryName,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'PKR',
      lowPrice: '0',
      highPrice: '0',
      offerCount: '1',
      priceValuation: 'Contact for Price',
      url: canonicalUrl,
      availability: 'https://schema.org/InStock',
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
