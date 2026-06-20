import { getSiteUrl } from '@/lib/utils'
import { ServicesClient } from '@/components/services/services-client'

export const metadata = {
  title: 'Our Services | Alhamd Battery Services and Energy Solutions',
  description: 'Professional battery load testing, solar system configurations, and routine maintenance panels. We service all of Karachi.',
  openGraph: {
    title: 'Our Services | Alhamd Battery Services',
    description: 'Professional battery load testing, solar system configurations, and routine maintenance panels. We service all of Karachi.',
    url: `${getSiteUrl()}/services`,
    siteName: 'Alhamd Battery Services',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | Alhamd Battery Services',
    description: 'Professional battery and solar maintenance services in Karachi.',
  },
}

export default function ServicesPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <section className="bg-primary text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-foreground" />
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <span className="text-accent-yellow text-xs font-bold uppercase tracking-widest bg-white/10 px-3.5 py-1 rounded-full">
            Expert Support
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl !text-white">
            Our Services
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
            Professional battery load testing, solar system configurations, and routine maintenance panels. We service all of Karachi.
          </p>
        </div>
      </section>

      <ServicesClient />
    </div>
  )
}
