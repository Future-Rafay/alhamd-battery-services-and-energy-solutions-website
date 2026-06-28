import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'

interface PageHeroProps {
  badge: string
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  cta?: {
    label: string
    href: string
  }
  align?: 'left' | 'center'
}

export function PageHero({
  badge,
  title,
  description,
  imageSrc,
  imageAlt,
  cta,
  align = 'center',
}: PageHeroProps) {
  const isLeft = align === 'left'

  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div className="absolute inset-0">
        {imageSrc && imageAlt && (
          <Image
            src={imageSrc}
            alt={imageAlt}  
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/72 to-primary/28" /> */}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'flex min-h-[300px] flex-col justify-center gap-4 py-16 sm:min-h-[340px] lg:min-h-[380px]',
            isLeft ? 'max-w-2xl items-start text-left' : 'items-center text-center'
          )}
        >
          <span className="rounded-full border border-white/15 bg-white/12 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-yellow backdrop-blur-sm">
            {badge}
          </span>
          <h1 className="font-heading text-3xl font-extrabold leading-tight !text-white sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-white/84 sm:text-base">
            {description}
          </p>
          {cta && (
            <Link
              href={cta.href}
              className="mt-2 inline-flex h-11 items-center gap-2 rounded-lg bg-accent-orange px-5 text-sm font-extrabold text-white shadow-lg shadow-black/10 transition-smooth hover:bg-accent-orange/90"
            >
              {cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
