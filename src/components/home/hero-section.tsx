'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Banner } from '@/types'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

interface HeroSectionProps {
  banners: Banner[]
  phone: string
  whatsapp: string
}

export function HeroSection({ banners, phone, whatsapp }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const validBanners = banners && banners.length > 0 ? banners : [{
    _id: 'default',
    headline: 'Powering Your Home & Business with Trusted Energy Solutions',
    subtext: 'Authorized retail distributor of branded batteries and solar energy products in Karachi.',
    ctaText: 'Explore Products',
    ctaLink: '/products',
    image: null,
  } as unknown as Banner]

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 800)
  }, [isTransitioning])

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % validBanners.length)
  }, [currentIndex, validBanners.length, goToSlide])

  const goPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + validBanners.length) % validBanners.length)
  }, [currentIndex, validBanners.length, goToSlide])

  // Auto-play
  useEffect(() => {
    if (validBanners.length <= 1) return
    const interval = setInterval(goNext, 5000)
    return () => clearInterval(interval)
  }, [validBanners.length, goNext])

  const activeBanner = validBanners[currentIndex]
  const headline = activeBanner?.headline || 'Powering Your Home & Business with Trusted Energy Solutions'
  const subtext = activeBanner?.subtext || 'Authorized retail distributor of branded batteries and solar energy products in Karachi.'
  const ctaText = activeBanner?.ctaText || 'Explore Products'
  const ctaLink = activeBanner?.ctaLink || '/products'

  return (
    <section className="relative w-full h-[500px] sm:h-[550px] lg:h-[600px] overflow-hidden">
      {/* Background Images — crossfade */}
      {validBanners.map((banner, index) => {
        const bgUrl = banner.image
          ? urlFor(banner.image).url()
          : null
        return (
          <div
            key={index}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-in-out',
              index === currentIndex ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
            )}
          >
            {bgUrl ? (
              <Image
                src={bgUrl}
                alt={banner.image?.alt || `Banner ${index + 1}`}
                fill
                className=" object-cover object-left"
                priority={index === 0}
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 bg-primary" />
            )}
            {/* Dark overlay for text readability */}
            {/* <div className="absolute inset-0 bg-primary/70" /> */}
          </div>
        )
      })}

      {/* Content */}
      <div className="relative z-10  px-4 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl flex flex-col gap-5">
            {/* Slide counter badge */}
            <span className="text-accent-yellow text-[11px] font-bold  tracking-[0.2em] bg-primary/40 px-3 py-1 rounded-full self-start border border-white/40">
              {/* {String(currentIndex + 1).padStart(2, '0')} / {String(validBanners.length).padStart(2, '0')} */}
              100% Genuine Branded Products & Warranties
            </span>

            {/* Headline */}
            <h1
              key={`h-${currentIndex}`}
              className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl !text-white leading-tight animate-[fadeSlideUp_0.6s_ease-out]"
            >
              {headline}
            </h1>

            {/* Subtext */}
            <p
              key={`p-${currentIndex}`}
              className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl animate-[fadeSlideUp_0.6s_0.1s_ease-out_both]"
            >
              {subtext}
            </p>

            {/* Single CTA */}
            <div className="mt-1 animate-[fadeSlideUp_0.6s_0.2s_ease-out_both]">
              <Link
                href={ctaLink}
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }),
                  'bg-accent-orange hover:bg-accent-orange/90 text-white font-bold px-6 py-5 sm:px-8 sm:py-6 text-sm sm:text-base rounded-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2'
                )}
              >
                {ctaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next Arrows */}
      {validBanners.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="hidden md:flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={goNext}
            className="hidden md:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Bottom Dots */}
      {validBanners.length > 1 && (
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
          {validBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={cn(
                'h-2 rounded-full transition-all duration-400',
                idx === currentIndex
                  ? 'bg-accent-orange w-8'
                  : 'bg-white/40 hover:bg-white/70 w-2'
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
