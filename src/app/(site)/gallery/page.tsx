import { sanityFetch } from '@/sanity/lib/live'
import { GALLERY_ITEMS_QUERY } from '@/sanity/lib/queries'
import { GalleryClient } from '@/components/gallery/gallery-client'

import { getSiteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Media Gallery | Alhamd Battery Services & Energy Solutions',
  description: 'View photos and videos of our physical shop in Malir, customer reviews, deliveries, and clean energy projects in Karachi.',
  openGraph: {
    title: 'Media Gallery | Alhamd Battery Services',
    description: 'View photos and videos of our physical shop in Malir, customer reviews, deliveries, and clean energy projects in Karachi.',
    url: `${getSiteUrl()}/gallery`,
    siteName: 'Alhamd Battery Services',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Gallery | Alhamd Battery Services',
    description: 'View photos and videos of our physical shop in Malir, customer reviews, deliveries, and clean energy projects in Karachi.',
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
      <section className="bg-primary text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-foreground" />
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-4">
          <span className="text-accent-yellow text-xs font-bold uppercase tracking-widest bg-white/10 px-3.5 py-1 rounded-full">
            Media Gallery
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl !text-white">
            Our Business in Action
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
            Explore our store, watch unboxing videos, view customer deliveries, and inspect recent solar system installations across Karachi.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6">

        {/* Client Gallery Component */}
        <GalleryClient initialItems={galleryItems} />

      </div>
    </div>
  )
}
