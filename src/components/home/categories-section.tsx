'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BatteryCharging, Cpu, Sun, Zap } from 'lucide-react'
import type { SanityImageSource } from '@sanity/image-url'

import { urlFor } from '@/sanity/lib/image'

interface CategoriesSectionProps {
  categories: HomeCategory[]
}

type SanityImageWithAlt = SanityImageSource & { alt?: string }

interface CategoryProduct {
  name: string
  slug: string
  brand?: { name: string }
  capacity?: string
  voltage?: string
  warranty?: string
  shortDescription?: string
  images?: Array<string | SanityImageWithAlt>
}

interface HomeCategory {
  _id?: string
  name: string
  slug: string
  description?: string
  image?: SanityImageWithAlt
  representativeProduct?: CategoryProduct | null
}

const DEFAULT_CATEGORIES_WITH_PRODUCTS: HomeCategory[] = [
  {
    _id: 'def-1',
    name: 'Lead Acid Battery',
    slug: 'lead-acid-battery',
    description: 'Reliable batteries for UPS, vehicles, generators, and backup power needs.',
    representativeProduct: {
      name: 'AGS SP-210 Deep Cycle Tubular Battery',
      slug: 'ags-sp-210-deep-cycle-tubular-battery',
      brand: { name: 'AGS' },
      capacity: '180Ah',
      voltage: '12V',
      warranty: '1 Year',
      shortDescription: 'High-performance tubular battery designed for frequent power cuts.',
      images: [],
    },
  },
  {
    _id: 'def-2',
    name: 'Lithium Ion Battery',
    slug: 'lithium-ion-battery',
    description: 'Long-life lithium storage options for modern solar backup systems.',
    representativeProduct: null,
  },
  {
    _id: 'def-3',
    name: 'Solar Panel',
    slug: 'solar-panel',
    description: 'Tier-1 solar panels for homes, shops, and commercial installations.',
    representativeProduct: null,
  },
  {
    _id: 'def-4',
    name: 'Inverter & Charger',
    slug: 'inverter-charger',
    description: 'Hybrid, off-grid, and UPS charging solutions for stable power.',
    representativeProduct: null,
  },
]

function getCategoryIcon(slug = '') {
  if (slug.includes('lead-acid')) return BatteryCharging
  if (slug.includes('lithium')) return Cpu
  if (slug.includes('solar')) return Sun
  return Zap
}

function getProductImage(product?: CategoryProduct | null) {
  if (!product?.images?.length) return null
  const firstImage = product.images[0]
  return typeof firstImage === 'string'
    ? firstImage
    : urlFor(firstImage).width(480).height(360).quality(82).url()
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  const categoriesList = categories && categories.length > 0
    ? categories.slice(0, 4)
    : DEFAULT_CATEGORIES_WITH_PRODUCTS

  return (
    <section className="border-t border-slate-200/70 bg-slate-50 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col items-center text-center max-w-2xl mx-auto gap-3">
          <span className="border-b-2 border-accent-orange pb-1 text-xs md:text-sm font-bold uppercase tracking-wider text-accent-orange">
            Power Catalog
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
            Featured Categories
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            Browse our core product categories and see one featured product from each range.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categoriesList.map((category) => {
            const product = category.representativeProduct
            const productImage = getProductImage(product)
            const Icon = getCategoryIcon(category.slug)

            return (
              <article
                key={category._id || category.slug}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm transition-smooth hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {productImage ? (
                    <Image
                      src={productImage}
                      alt={product?.name || category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-4 transition-smooth group-hover:scale-105"
                    />
                  ) : category.image ? (
                    <Image
                      src={urlFor(category.image).width(480).height(360).quality(82).url()}
                      alt={category.image.alt || category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-smooth group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white text-accent-orange shadow-sm">
                        <Icon className="h-8 w-8" />
                      </span>
                    </div>
                  )}

                  <div className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-primary shadow-sm">
                    {product ? 'Featured' : 'Category'}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-4 flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/6 text-accent-orange">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-extrabold leading-snug !text-primary">
                        {category.name}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">
                        {category.description || 'Premium power solutions with genuine warranties.'}
                      </p>
                    </div>
                  </div>

                  {product ? (
                    <div className="mt-auto rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <p className="text-[10px] font-extrabold uppercase tracking-wide text-accent-orange">
                        Product Preview
                      </p>
                      <Link
                        href={`/products/${product.slug}`}
                        className="mt-1 block font-heading text-sm font-extrabold leading-snug text-primary transition-colors line-clamp-2 hover:text-accent-orange"
                      >
                        {product.name}
                      </Link>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                        {product.brand?.name && (
                          <span className="rounded bg-white px-2 py-1 font-bold text-slate-600">
                            {product.brand.name}
                          </span>
                        )}
                        {product.capacity && (
                          <span className="rounded bg-white px-2 py-1 font-bold text-slate-600">
                            {product.capacity}
                          </span>
                        )}
                        {product.voltage && (
                          <span className="rounded bg-white px-2 py-1 font-bold text-slate-600">
                            {product.voltage}
                          </span>
                        )}
                        {product.warranty && (
                          <span className="rounded bg-white px-2 py-1 font-bold text-slate-600">
                            {product.warranty}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-auto rounded-lg border border-dashed border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
                      Products are being updated. Contact us for current stock and daily prices.
                    </div>
                  )}

                  <Link
                    href={`/products?category=${category.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-primary transition-colors hover:text-accent-orange"
                  >
                    Explore Category
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
        {/* button  */}
        <div className='flex items-center justify-center'>
          <Link
            href="/products"
            className="mt-8 px-10 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-primary px-5 text-sm font-extrabold text-white shadow-sm transition-smooth hover:border-white hover:bg-white hover:text-primary"
          >
            View Catalog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
