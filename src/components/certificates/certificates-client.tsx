'use client'

import { ShieldCheck } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

export interface Certificate {
  _id?: string
  id?: string
  title: string
  issuedBy?: string
  dateIssued?: string
  image: any
}

function getCertImageUrl(image: any): string {
  if (typeof image === 'string') return image
  try {
    return urlFor(image).width(1200).quality(92).url()
  } catch {
    return ''
  }
}

export function CertificatesClient({ certificates }: { certificates: Certificate[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {certificates.map((cert) => {
        const imageUrl = getCertImageUrl(cert.image)
        const key = cert._id || cert.id || cert.title
        
        return (
          <div
            key={key}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-[520px]"
          >
            {/* Visual Frame */}
            <div className="relative flex-1 w-full bg-slate-50/50 p-4 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full rounded-lg overflow-hidden border border-slate-100 bg-white shadow-xs">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={cert.title}
                    fill
                    className="object-contain p-2 group-hover:scale-102 transition-transform duration-500"
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                  />
                )}
              </div>

              {/* Verified badge */}
              <div className="absolute top-6 left-6 flex items-center gap-1 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-sm border border-slate-100 z-10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wide">
                  Official
                </span>
              </div>
            </div>

            {/* Title / Caption */}
            <div className="px-5 py-4 border-t border-slate-100 bg-white">
              <h3 className="font-heading font-extrabold text-sm !text-primary leading-snug text-center group-hover:text-accent-orange transition-colors duration-200">
                {cert.title}
              </h3>
              {cert.issuedBy && (
                <p className="text-[10px] text-slate-400 text-center mt-1 font-semibold uppercase tracking-wider">
                  {cert.issuedBy}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
