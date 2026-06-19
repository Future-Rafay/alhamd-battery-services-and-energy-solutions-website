'use client'

import React, { useState } from 'react'
import { urlFor } from '@/sanity/lib/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface ProductGalleryProps {
  images: any[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const hasImages = images && images.length > 0
  const imagesList = hasImages ? images : []

  if (imagesList.length === 0) {
    return (
      <div className="w-full aspect-[4/3] rounded-xl bg-slate-100 flex flex-col items-center justify-center text-slate-400 gap-2 border border-slate-200">
        <svg
          className="w-16 h-16 stroke-current text-slate-300"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
          <circle cx="9" cy="9" r="2" />
          <path d="M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21" />
        </svg>
        <span className="text-xs uppercase font-bold tracking-wider text-slate-400">No Image Gallery</span>
      </div>
    )
  }

  const activeImage = imagesList[activeIdx]

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Area */}
      <div className="relative aspect-[4/3] bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-inner group">
        <Image
          src={urlFor(activeImage).width(800).height(600).quality(85).url()}
          alt={activeImage.alt || `${productName} main view`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 600px"
          className="object-cover"
        />
        
        {/* Lightbox Trigger */}
        <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
          <DialogTrigger
            render={
              <button 
                className="absolute bottom-4 right-4 bg-slate-900/80 hover:bg-primary text-white p-2 rounded-full shadow-lg transition-smooth opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Zoom Image"
              />
            }
          >
              <ZoomIn className="w-5 h-5" />
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] max-h-[85vh] p-0 bg-transparent border-none outline-none overflow-hidden flex items-center justify-center">
            <div className="relative w-full max-w-[800px] aspect-[4/3] rounded-lg overflow-hidden bg-white shadow-2xl">
              <Image
                src={urlFor(activeImage).width(1200).height(900).quality(90).url()}
                alt={activeImage.alt || `${productName} lightbox view`}
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Thumbnail Bar */}
      {imagesList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {imagesList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative w-20 aspect-[4/3] rounded-lg overflow-hidden bg-slate-50 border transition-all shrink-0 ${
                activeIdx === idx 
                  ? 'border-accent-orange ring-2 ring-accent-orange/20 scale-[0.98]' 
                  : 'border-slate-200 hover:border-slate-350'
              }`}
            >
              <Image
                src={urlFor(img).width(120).height(90).quality(75).url()}
                alt={img.alt || `${productName} thumbnail ${idx + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
