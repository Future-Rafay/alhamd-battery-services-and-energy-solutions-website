'use client'

import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/types'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const hasImage = product.images && product.images.length > 0
  const firstImage = hasImage ? product.images[0] : null

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200/70 bg-white shadow-sm transition-smooth hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden border-b border-slate-100 bg-slate-50">
        {firstImage ? (
          <Image
            src={urlFor(firstImage).width(360).height(270).quality(80).url()}
            alt={firstImage.alt || product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            className="object-contain p-4 transition-smooth group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2 bg-slate-100">
            <svg
              className="w-12 h-12 stroke-current text-slate-300"
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
            <span className="text-[10px] uppercase font-bold tracking-wide text-slate-400">No Image Available</span>
          </div>
        )}
        
        {/* Brand Badge */}
        {product.brand && (
          <Badge className="absolute left-3 top-3 border border-slate-200 bg-white text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm hover:bg-white/90">
            {product.brand.name}
          </Badge>
        )}

        {/* Featured Tag */}
        {product.featured && (
          <Badge className="absolute right-3 top-3 bg-accent-yellow text-[10px] font-extrabold uppercase tracking-widest text-black shadow-sm hover:bg-accent-yellow/90">
            Featured
          </Badge>
        )}
      </div>

      {/* Card Content */}
      <CardContent className="flex flex-grow flex-col justify-between gap-3 p-5">
        <div className="flex flex-col gap-2">
          {/* Category */}
          {product.category && (
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
              {product.category.name}
            </span>
          )}
          
          {/* Title */}
          <h3 className="font-heading text-base font-extrabold text-primary line-clamp-2 transition-colors group-hover:text-accent-orange sm:text-lg">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Description */}
          {product.shortDescription && (
            <p className="text-xs text-slate-550 leading-relaxed line-clamp-2">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Technical Specs Summary */}
        <div className="grid grid-cols-2 gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2.5 text-xs">
          {product.capacity && (
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-slate-400">Capacity</span>
              <span className="font-bold text-primary">{product.capacity}</span>
            </div>
          )}
          {product.voltage && (
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-slate-400">Voltage</span>
              <span className="font-bold text-primary">{product.voltage}</span>
            </div>
          )}
          {product.warranty && (
            <div className="col-span-2 flex items-center gap-1.5 pt-1.5 border-t border-slate-200/50 text-[10px] font-medium text-slate-500">
              <Shield className="w-3.5 h-3.5 text-accent-orange" />
              <span>{product.warranty} Original Warranty</span>
            </div>
          )}
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="mt-auto flex items-end justify-between border-t border-slate-100 px-5 pb-5 pt-4">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Price Quote</span>
          <span className="text-sm font-extrabold text-primary">Contact for Price</span>
        </div>
        
        <Link
          href={`/products/${product.slug}`}
          className={cn(
            buttonVariants({ variant: 'default', size: 'sm' }),
            'bg-primary hover:bg-primary/95 text-white font-bold h-8 text-xs transition-smooth  shadow-sm flex items-center justify-center'
          )}
        >
          View Details <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Link>
      </CardFooter>
    </Card>
  )
}
