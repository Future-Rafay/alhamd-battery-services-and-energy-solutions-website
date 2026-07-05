import { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/utils'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio', '/studio/', '/api/'], // Keep CMS Studio and API routes out of crawlers.
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  }
}
