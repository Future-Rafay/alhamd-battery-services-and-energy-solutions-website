'use client'

import { Brand } from '@/types'
import { BRAND_NAMES } from '@/lib/constants'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

interface BrandsSectionProps {
  brands: Brand[]
}

export function BrandsSection({ brands }: BrandsSectionProps) {
  const hasCMSBrands = brands && brands.length > 0
  const brandsList = hasCMSBrands ? brands : []

  // Helper to construct slug from brand name
  const getBrandSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // remove non-alphanumeric/non-space/non-hyphen characters
      .replace(/[\s_]+/g, '-')  // replace spaces/underscores with single hyphen
      .replace(/^-+|-+$/g, '')  // trim leading/trailing hyphens
  }

  return (
    <section className="py-16 sm:py-20 px-4 brand-blue-gradient " id='brands-section'>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col items-center gap-3">
           <span className="text-accent-orange font-bold text-xs md:text-sm uppercase tracking-wider border-b-2 border-accent-orange pb-1">
            Trusted Partners
          </span>
          <h2 className="font-heading !text-white font-bold text-2xl sm:text-3xl">
            Authorized Brands We Distribute
          </h2>
           <p className="text-sm leading-relaxed text-white/70 sm:text-base">
            We are officially certified and authorized retailers for Pakistan's leading solar panels, batteries, and backup power inverter manufacturers.
          </p>
        </div>

        {hasCMSBrands ? (
          /* Grid of logos from CMS */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
            {brandsList.map((brand) => (
              <a
                key={brand._id}
                href={`/products?brand=${brand.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl flex items-center justify-center aspect-[2.2/1] transition-smooth border border-slate-200/50 hover:border-primary/20 hover:shadow-md bg-white hover:-translate-y-0.5 group cursor-pointer"
              >
                {brand.logo ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={urlFor(brand.logo).url()}
                      alt={brand.logo.alt || brand.name}
                      fill
                      sizes="(max-w-768px) 50vw, 150px"
                      className="object-contain transition-smooth"
                    />
                  </div>
                ) : (
                  <span className="text-sm font-bold text-slate-500 group-hover:text-primary transition-colors">
                    {brand.name}
                  </span>
                )}
              </a>
            ))}
          </div>
        ) : (
          /* Text wall for local fallback brands */
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 max-w-4xl mx-auto">
            {BRAND_NAMES.map((name) => {
              const slug = getBrandSlug(name)
              return (
                <a
                  key={name}
                  href={`/products?brand=${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-slate-200/60 px-4 py-2.5 rounded-lg text-slate-600 font-bold hover:text-white hover:border-primary hover:bg-primary transition-smooth select-none text-xs sm:text-sm tracking-wide shadow-xs cursor-pointer hover:-translate-y-0.5"
                >
                  {name}
                </a>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
