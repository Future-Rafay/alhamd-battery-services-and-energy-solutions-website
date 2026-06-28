'use client'

import { ShieldCheck, Award, ArrowRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { Certificate } from '../certificates/certificates-client'

interface CertificatesHomeSectionProps {
  certificates: Certificate[]
}

function getCertImageUrl(image: any): string {
  if (typeof image === 'string') return image
  try {
    return urlFor(image).width(800).quality(90).url()
  } catch {
    return ''
  }
}

export function CertificatesHomeSection({ certificates }: CertificatesHomeSectionProps) {
  // Take top 4 certificates
  const displayCerts = certificates.slice(0, 4)

  if (displayCerts.length === 0) return null

  return (
    <section className="py-20 px-4 bg-slate-50 border-t border-slate-200/50 relative overflow-hidden">
      {/* Decorative backgrounds */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center gap-3">
          <span className="text-accent-orange font-bold text-xs md:text-sm uppercase tracking-wider border-b-2 border-accent-orange pb-1">
            Our Credentials
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary">
            Official Brand Certifications
          </h2>
         <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            We are officially certified and authorized retailers for Pakistan's leading solar panels, batteries, and backup power inverter manufacturers.
          </p>
        </div>

        {/* Certificates Carousel on Mobile, Grid on Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-thin scrollbar-thumb-primary/20 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:pb-0">
          {displayCerts.map((cert) => {
            const imageUrl = getCertImageUrl(cert.image)
            const key = cert._id || cert.id || cert.title

            return (
              <div
                key={key}
                className="min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] md:min-w-0 md:w-full snap-start group bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-[480px]"
              >
                {/* Visual Frame */}
                <div className="relative flex-1 w-full bg-slate-50/50 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full rounded-lg overflow-hidden border border-slate-100 bg-white shadow-xs">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={cert.title}
                        fill
                        className="object-contain p-2 group-hover:scale-102 transition-transform duration-500"
                        sizes="(max-w-768px) 100vw, 250px"
                      />
                    )}
                  </div>

                  {/* Verified badge */}
                  {/* <div className="absolute top-6 left-6 flex items-center gap-1 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-sm border border-slate-100 z-10">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wide">
                      Official
                    </span>
                  </div> */}
                </div>

                {/* Title / Caption */}
                <div className="px-5 py-4 border-t border-slate-100 bg-white">
                  <h3 className="font-heading font-extrabold text-xs sm:text-sm !text-primary leading-snug text-center group-hover:text-accent-orange transition-colors duration-200 line-clamp-2">
                    {cert.title}
                  </h3>
                  {cert.issuedBy && (
                    <p className="text-[9px] sm:text-[10px] text-slate-400 text-center mt-1 font-semibold uppercase tracking-wider">
                      {cert.issuedBy}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
          {/* button  */}
        <div className='flex items-center justify-center'>
          <Link
            href="/certificates"
            className="mt-8 px-10 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-primary px-5 text-sm font-extrabold text-white shadow-sm transition-smooth hover:border-primary hover:bg-white hover:text-primary"
          >
            View Certificates
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
