import { sanityFetch } from '@/sanity/lib/live'
import { GALLERY_ITEMS_QUERY } from '@/sanity/lib/queries'
import { GalleryClient } from '@/components/gallery/gallery-client'
import { PageHero } from '@/components/shared/page-hero'

import { getSiteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Media Gallery | Alhamd Battery Services & Energy Solutions',
  description: 'View photos and videos of our physical shop in Malir, Karachi, customer reviews, deliveries, and clean energy projects in Karachi.',
  openGraph: {
    title: 'Media Gallery | Alhamd Battery Services & Energy Solutions',
    description: 'View photos and videos of our physical shop in Malir, Karachi, customer reviews, deliveries, and clean energy projects in Karachi.',
    url: `${getSiteUrl()}/gallery`,
    siteName: 'Alhamd Battery Services & Energy Solutions',
    locale: 'en_PK',
    type: 'website',
    images: [{ url: '/opengraph.jpg', width: 1200, height: 630, alt: 'Alhamd Battery Services media gallery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Gallery | Alhamd Battery Services & Energy Solutions',
    description: 'View photos and videos of our physical shop in Malir, Karachi, customer reviews, deliveries, and clean energy projects in Karachi.',
    images: ['/opengraph.jpg'],
  },
}

export default async function GalleryPage() {
  let galleryItems: any[] = []

  try {
    const { data } = await sanityFetch({
      query: GALLERY_ITEMS_QUERY,
    })
    galleryItems = data || []
  } catch (error) {
    console.error('Error fetching gallery items from Sanity, using empty list:', error)
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Intro Banner */}
      <PageHero
        badge="Media Gallery"
        title="Our Business in Action"
        description="Explore our store, deliveries, customer media, and recent solar energy work across Karachi."

      />

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6">

        {/* Client Gallery Component */}
        <GalleryClient initialItems={galleryItems} />

      </div>
    </div>
  )
}
