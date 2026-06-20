'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ShieldCheck, X, ZoomIn } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

export interface Certificate {
  id: string
  title: string
  issuer?: string
  image: any
}

function getCertImageUrl(image: any): string {
  if (typeof image === 'string') return image
  try {
    return urlFor(image).width(1600).quality(90).url()
  } catch {
    return ''
  }
}

export function CertificatesClient({ mockCertificates }: { mockCertificates: Certificate[] }) {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenCert = (cert: Certificate) => {
    setActiveCert(cert)
    setIsOpen(true)
  }

  return (
    <>
      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCertificates.map((cert) => (
          <button
            key={cert.id}
            onClick={() => handleOpenCert(cert)}
            className="group relative bg-white rounded-xl overflow-hidden border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange"
          >
            <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
              <Image
                src={getCertImageUrl(cert.image)}
                alt={cert.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Verified badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wide">
                  Verified
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white text-primary font-bold text-xs py-2 px-4 rounded-full shadow-lg flex items-center gap-1.5">
                  <ZoomIn className="w-4 h-4 text-accent-orange" /> View Certificate
                </span>
              </div>
            </div>

            {/* Single-line caption */}
            <div className="px-4 py-3 border-t border-slate-100">
              <h3 className="font-heading font-bold text-sm !text-primary leading-snug line-clamp-2">
                {cert.title}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="!w-fit !max-w-[92vw] !p-0 bg-transparent border-none shadow-none [&>button]:hidden"
        >
          <DialogTitle className="sr-only">
            {activeCert?.title ?? 'Certificate'}
          </DialogTitle>

          {activeCert && (
            <div className="relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-white text-primary shadow-lg flex items-center justify-center hover:bg-accent-yellow transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="bg-white rounded-2xl p-2 sm:p-3 shadow-2xl ring-1 ring-accent-yellow/40 max-h-[85vh] max-w-[92vw] overflow-hidden">
                <Image
                  src={getCertImageUrl(activeCert.image)}
                  alt={activeCert.title}
                  width={1600}
                  height={1200}
                  className="w-auto h-auto max-h-[75vh] max-w-full object-contain rounded-lg"
                />
              </div>

              <p className="hidden sm:block text-center text-white/90 text-sm font-medium mt-4 drop-shadow">
                {activeCert.title}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
