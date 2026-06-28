'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { X, Play, ChevronLeft, ChevronRight, Image as ImageIcon, Video as VideoIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GalleryItem {
  _id: string
  title: string
  slug: string
  mediaType: 'image' | 'video' | 'youtube'
  image?: any
  videoUrl?: string
  youtubeUrl?: string
  description?: string
}

interface GalleryClientProps {
  initialItems: GalleryItem[]
}


export function GalleryClient({ initialItems }: GalleryClientProps) {
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const items = initialItems || []

  // Filter items
  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true
    if (filter === 'image') return item.mediaType === 'image'
    if (filter === 'video') return item.mediaType === 'video' || item.mediaType === 'youtube'
    return true
  })

  // Extract YouTube ID
  const getYoutubeId = (url?: string) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  // Navigation inside lightbox
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev! === filteredItems.length - 1 ? 0 : prev! + 1))
  }

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null

  return (
    <div>
      {/* Filters Bar */}
      <div className="flex justify-center items-center gap-3 mb-10">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            'px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-smooth border border-slate-200 shadow-sm cursor-pointer',
            filter === 'all'
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          )}
        >
          All Media
        </button>
        <button
          onClick={() => setFilter('image')}
          className={cn(
            'px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-smooth border border-slate-200 shadow-sm flex items-center gap-1.5 cursor-pointer',
            filter === 'image'
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          )}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          Photos
        </button>
        <button
          onClick={() => setFilter('video')}
          className={cn(
            'px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-smooth border border-slate-200 shadow-sm flex items-center gap-1.5 cursor-pointer',
            filter === 'video'
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          )}
        >
          <VideoIcon className="w-3.5 h-3.5" />
          Videos
        </button>
      </div>

      {/* Media Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="font-heading font-bold text-xl text-slate-600">No Media Found</h3>
          <p className="text-sm text-slate-400 max-w-md">
            There are no photos or videos available at the moment. Check back later for updates!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
          <div
            key={item._id}
            onClick={() => setLightboxIndex(index)}
            className="group cursor-pointer bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-md hover:border-primary/20 transition-smooth flex flex-col h-full"
          >
            {/* Media Thumbnail Container */}
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
              {item.mediaType === 'image' && item.image ? (
                <Image
                  src={urlFor(item.image).width(600).height(450).quality(85).url()}
                  alt={item.image.alt || item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-smooth"
                />
              ) : item.mediaType === 'video' && item.videoUrl ? (
                <video
                  src={item.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : item.mediaType === 'youtube' && item.youtubeUrl ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeId(item.youtubeUrl)}?autoplay=1&mute=1&loop=1&playlist=${getYoutubeId(item.youtubeUrl)}`}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : item.image ? (
                <Image
                  src={urlFor(item.image).width(600).height(450).quality(85).url()}
                  alt={item.image.alt || item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-smooth"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-primary/40">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}

              {/* Play overlay for videos when they have custom image */}
              {item.mediaType !== 'image' && item.image && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-smooth group-hover:bg-accent-orange">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Info Footer */}
            <div className="p-5 flex flex-col gap-2 flex-grow justify-between border-t border-slate-100">
              <div className="flex flex-col gap-1.5">
                <h3 className="font-heading font-bold text-lg !text-primary group-hover:text-accent-orange transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && activeItem && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col items-center justify-between py-10 px-4 select-none animate-in fade-in duration-300"
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-smooth flex items-center justify-center cursor-pointer z-50 border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-smooth flex items-center justify-center cursor-pointer z-45 border border-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-smooth flex items-center justify-center cursor-pointer z-45 border border-white/10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Spacer */}
          <div className="h-6" />

          {/* Media Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[70vh] flex items-center justify-center relative overflow-hidden"
          >
            {activeItem.mediaType === 'image' && activeItem.image && (
              <div className="relative w-full aspect-[4/3] max-h-[70vh]">
                <Image
                  src={urlFor(activeItem.image).quality(95).url()}
                  alt={activeItem.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}

            {activeItem.mediaType === 'image' && !activeItem.image && (
              <div className="text-white text-center flex flex-col gap-2">
                <ImageIcon className="w-16 h-16 opacity-30 mx-auto" />
                <p className="text-sm font-medium">No image asset available</p>
              </div>
            )}

            {activeItem.mediaType === 'youtube' && activeItem.youtubeUrl && (
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black border border-white/5 max-h-[70vh]">
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeId(activeItem.youtubeUrl)}?autoplay=1`}
                  title={activeItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            )}

            {activeItem.mediaType === 'video' && activeItem.videoUrl && (
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black border border-white/5 max-h-[70vh]">
                <video
                  src={activeItem.videoUrl}
                  controls
                  autoPlay
                  muted
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {activeItem.mediaType === 'video' && !activeItem.videoUrl && (
              <div className="text-white text-center flex flex-col gap-2">
                <VideoIcon className="w-16 h-16 opacity-30 mx-auto" />
                <p className="text-sm font-medium">No video file available</p>
              </div>
            )}
          </div>

          {/* Media Info Footer */}
          <div className="text-center max-w-2xl px-6 flex flex-col gap-2">
            <h2 className="!text-white font-heading font-bold text-lg sm:text-2xl">
              {activeItem.title}
            </h2>
            {activeItem.description && (
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
                {activeItem.description}
              </p>
            )}
            <span className="text-[10px] text-slate-500 font-bold tracking-wider mt-1 uppercase">
              {lightboxIndex + 1} of {filteredItems.length}
            </span>
          </div>

        </div>
      )}
    </div>
  )
}
