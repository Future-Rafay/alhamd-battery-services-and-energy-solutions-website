import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { ContactForm } from '@/components/forms/contact-form'
import { getLocalBusinessSchema } from '@/lib/structured-data'
import { FaWhatsapp } from "react-icons/fa";
import { PageHero } from '@/components/shared/page-hero'

import { getSiteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Contact Us | Alhamd Battery Services and Energy Solutions',
  description: 'Visit our battery retail shop in Saudabad, Karachi. Get custom quotes, check battery warranties, and ask about solar panel installations.',
  openGraph: {
    title: 'Contact Us | Alhamd Battery Services & Energy Solutions',
    description: 'Visit our battery retail shop in Saudabad, Karachi. Get custom quotes, check battery warranties, and ask about solar panel installations.',
    url: `${getSiteUrl()}/contact`,
    siteName: 'Alhamd Battery Services & Energy Solutions',
    locale: 'en_PK',
    type: 'website',
    images: [{ url: '/opengraph.jpg', width: 1200, height: 630, alt: 'Contact Alhamd Battery Services in Karachi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Alhamd Battery Services & Energy Solutions',
    description: 'Visit our battery retail shop in Saudabad, Karachi.',
    images: ['/opengraph.jpg'],
  },
}

export default async function ContactPage() {
  let settings: any = null

  try {
    const settingsRes = await sanityFetch({ query: SITE_SETTINGS_QUERY })
    settings = settingsRes.data || null
  } catch (error) {
    console.error('Error fetching site settings for contact page:', error)
  }

  // Fallbacks
  const phone = settings?.phone
  const whatsapp = settings?.whatsappNumber
  const email = settings?.email
  const address = settings?.address
  const mapEmbed = settings?.mapEmbed

  const formattedPhone = phone.replace(/[^\d+]/g, '')
  const formattedWhatsapp = whatsapp.replace(/[^\d+]/g, '')

  const structuredData = getLocalBusinessSchema(settings)

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Structured data injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Intro Banner */}
      <PageHero
        badge="Get In Touch"
        title="Contact Us"
        description="Have questions about prices or product availability? Reach out through our contact form, email, or WhatsApp."

      />

      <div className="max-w-7xl mx-auto py-12 px-4">

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Contact Details (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Phone */}
            <div className="bg-white border border-slate-200/60 p-5 rounded-xl flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400">Call Support</span>
                <a href={`tel:${formattedPhone}`} className="text-sm sm:text-base font-extrabold text-primary hover:text-accent-orange mt-0.5 transition-colors">
                  {phone}
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-white border border-slate-200/60 p-5 rounded-xl flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                <FaWhatsapp className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400">WhatsApp Inquiry</span>
                <a href={`https://wa.me/${formattedWhatsapp}`} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base font-extrabold text-primary hover:text-accent-orange mt-0.5 transition-colors">
                  {whatsapp}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white border border-slate-200/60 p-5 rounded-xl flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400">Email Address</span>
                <a href={`mailto:${email}`} className="text-sm sm:text-base font-extrabold text-primary hover:text-accent-orange mt-0.5 transition-colors break-all">
                  {email}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white border border-slate-200/60 p-5 rounded-xl flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400">Shop Address</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed mt-1">
                  {address}
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white border border-slate-200/60 p-5 rounded-xl flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col w-full text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400">Opening Hours</span>
                <div className="flex justify-between items-center mt-1.5 pb-1.5 border-b border-slate-100">
                  <span className="font-semibold text-slate-500">Sat - Thu </span>
                  <span className="font-bold text-primary">10:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between items-center mt-1.5">
                  <span className="font-semibold text-slate-500">Friday</span>
                  <span className="font-bold text-accent-orange uppercase">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Area (Right) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/60 p-6 sm:p-8 rounded-xl shadow-sm h-full">
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-primary border-b border-slate-100 pb-3 mb-6">
              Send a Message
            </h3>
            <ContactForm />
          </div>
        </div>

        {/* Map Embed Container */}
        <div className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm p-4">
          <h3 className="font-heading font-bold text-base !text-primary mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent-orange" /> Find Our Shop in Malir Karachi 
          </h3>
          <div 
            className="w-full rounded-lg overflow-hidden border border-slate-200 [&_iframe]:w-full"
            dangerouslySetInnerHTML={{ __html: mapEmbed }}
          />
        </div>
      </div>
    </div>
  )
}
