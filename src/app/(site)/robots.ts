import { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/utils'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Disallow crawlers from index or scrape the CMS Studio editor
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  }
}
