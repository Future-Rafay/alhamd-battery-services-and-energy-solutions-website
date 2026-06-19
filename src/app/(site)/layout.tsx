import React from 'react'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { WhatsAppFloat } from '@/components/layout/whatsapp-float'
import { SiteSettings } from '@/types'

// Disable caching for layout during development if needed, but in next-sanity live fetch handles caching
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let settings: SiteSettings | undefined

  try {
    const { data } = await sanityFetch({
      query: SITE_SETTINGS_QUERY,
    })
    settings = data || undefined
  } catch (error) {
    console.error('Error fetching site settings from Sanity, using fallback data:', error)
  }

  const whatsappNum = settings?.whatsappNumber || '+92 312 1141703'
  const businessName = settings?.businessName || 'Alhamd Battery Services'

  return (
    <>
      <Header settings={settings} />
      <main className="flex-grow">{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloat number={whatsappNum} businessName={businessName} />
      {/* SanityLive handles on-demand revalidation in the background */}
      <SanityLive />
    </>
  )
}
