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

  return (
    <section className="py-16 px-4 bg-slate-900 border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-accent-yellow font-bold text-xs uppercase tracking-wider">
            Trusted Partners
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mt-1">
            Authorized Brands We Distribute
          </h2>
        </div>

        {hasCMSBrands ? (
          /* Grid of logos from CMS */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
            {brandsList.map((brand) => (
              <div
                key={brand._id}
                className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex items-center justify-center aspect-[2.2/1] transition-smooth hover:border-slate-700/80 group"
              >
                {brand.logo ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={urlFor(brand.logo).width(200).height(90).quality(85).url()}
                      alt={brand.logo.alt || brand.name}
                      fill
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-smooth opacity-75 group-hover:opacity-100"
                    />
                  </div>
                ) : (
                  <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">
                    {brand.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Text wall for local fallback brands */
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 max-w-4xl mx-auto">
            {BRAND_NAMES.map((name) => (
              <div
                key={name}
                className="bg-slate-950/40 border border-slate-800/60 px-4 py-2.5 rounded-lg text-slate-400 font-bold hover:text-white hover:border-slate-700 hover:bg-slate-950/80 transition-smooth select-none text-xs sm:text-sm tracking-wide shadow-sm"
              >
                {name}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
