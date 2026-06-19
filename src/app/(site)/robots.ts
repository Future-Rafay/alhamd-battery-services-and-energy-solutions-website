import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Disallow crawlers from index or scrape the CMS Studio editor
    },
    sitemap: `https://${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
