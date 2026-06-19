import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}`

  const staticPages = [
    '',
    '/about',
    '/services',
    '/products',
    '/certificates',
    '/faq',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Fetch dynamic product routes from Sanity
  let productPages: any[] = []
  try {
    const products = await client.fetch(
      `*[_type == "product" && defined(slug.current)] { "slug": slug.current, _updatedAt }`
    )
    productPages = products.map((prod: any) => ({
      url: `${baseUrl}/products/${prod.slug}`,
      lastModified: prod._updatedAt || new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Error fetching sitemap dynamic products:', error)
  }

  return [...staticPages, ...productPages]
}
