'use client'

import Link from 'next/link'
import { ArrowRight, Zap, Sun, BatteryCharging, Cpu } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

interface CategoriesSectionProps {
  categories: any[]
}

// Full-featured fallback categories with dummy representative products & specs
const DEFAULT_CATEGORIES_WITH_PRODUCTS = [
  {
    _id: 'def-1',
    name: 'Lead Acid Battery',
    slug: 'lead-acid-battery',
    description: 'Reliable and low-maintenance deep-cycle tubular batteries for maximum backups on domestic UPS and solar systems.',
    representativeProduct: {
      name: 'AGS SP-210 Deep Cycle Tubular Battery',
      slug: 'ags-sp-210-deep-cycle-tubular-battery',
      brand: { name: 'AGS' },
      capacity: '180Ah',
      voltage: '12V',
      warranty: '1 Year Warranty',
      shortDescription: 'High-performance tubular battery designed to withstand frequent power cuts.',
      specs: [
        { key: 'Battery Type', value: 'Tubular Deep Cycle' },
        { key: 'Voltage', value: '12 Volts' },
        { key: 'Plate Count', value: '7 Deep Plates per Cell' },
        { key: 'Electrolyte', value: 'Acid filled' },
      ],
    },
  },
  {
    _id: 'def-2',
    name: 'Lithium Ion Battery',
    slug: 'lithium-ion-battery',
    description: 'Maintenance-free, fast-charging LiFePO4 battery packs with 10+ years lifespan and built-in Smart BMS protection.',
    representativeProduct: {
      name: 'Crown LiFePO4 Smart Storage 100Ah',
      slug: 'crown-lifepo4-smart-storage-100ah',
      brand: { name: 'Crown' },
      capacity: '100Ah',
      voltage: '48V',
      warranty: '5 Years Warranty',
      shortDescription: 'Next-gen solar energy storage with high efficiency and fast recharge speeds.',
      specs: [
        { key: 'Chemistry', value: 'Lithium Iron Phosphate' },
        { key: 'Life Cycles', value: '4000+ Cycles @ 80% DoD' },
        { key: 'Smart Protection', value: 'Integrated Overcharge BMS' },
        { key: 'Weight', value: 'Lightweight (approx. 42kg)' },
      ],
    },
  },
  {
    _id: 'def-3',
    name: 'Solar Panel',
    slug: 'solar-panel',
    description: 'High-efficiency Tier-1 monocrystalline panels from top international brands with up to 25 years performance warranty.',
    representativeProduct: {
      name: 'LONGi Hi-MO 6 Explorer 575W',
      slug: 'longi-hi-mo-6-explorer-575w',
      brand: { name: 'LONGi' },
      capacity: '575W',
      voltage: '43V',
      warranty: '25 Years Performance',
      shortDescription: 'High-density mono-PERC cells offering superior output even in cloudy Karachi weather.',
      specs: [
        { key: 'Module Type', value: 'Monocrystalline N-Type' },
        { key: 'Cell Efficiency', value: '22.3% Maximum' },
        { key: 'Frame', value: 'Anodized Aluminum Alloy' },
        { key: 'Wind Load', value: 'Certified to 2400 Pa' },
      ],
    },
  },
  {
    _id: 'def-4',
    name: 'Inverter & Charger',
    slug: 'inverter-charger',
    description: 'Smart hybrid and off-grid solar inverters with automatic energy management and real-time WiFi mobile monitoring.',
    representativeProduct: {
      name: 'Inverex Veyron II 5.2kW Hybrid Inverter',
      slug: 'inverex-veyron-ii-5-2kw-hybrid-inverter',
      brand: { name: 'Inverex' },
      capacity: '5.2kW',
      voltage: '48V Input',
      warranty: '5 Years Warranty',
      shortDescription: 'Pure sine wave inverter with dual smart outputs and on-grid net metering feedback.',
      specs: [
        { key: 'Output Power', value: '5200 Watts Continuous' },
        { key: 'Max PV Input', value: '6000 Watts (MPPT)' },
        { key: 'Monitoring', value: 'Built-in WiFi with Mobile App' },
        { key: 'Net Metering', value: 'Supported (Three-Phase grid feedback)' },
      ],
    },
  },
]

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  const hasCMSCategories = categories && categories.length > 0
  const categoriesList = hasCMSCategories ? categories : DEFAULT_CATEGORIES_WITH_PRODUCTS

  // Helper to choose index icons
  const getCategoryIcon = (slug: string) => {
    if (slug.includes('lead-acid')) return <BatteryCharging className="w-6 h-6 text-accent-orange" />
    if (slug.includes('lithium')) return <Cpu className="w-6 h-6 text-accent-orange" />
    if (slug.includes('solar')) return <Sun className="w-6 h-6 text-accent-orange" />
    return <Zap className="w-6 h-6 text-accent-orange" />
  }

  return (
    <section className="py-24 px-4 bg-slate-50 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-accent-orange font-bold text-xs uppercase tracking-wider border-l-4 border-accent-orange pl-3">
              Power Catalog
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
              Featured Categories &amp; Specs
            </h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Browse our core product categories. Below, see a representative product and actual specifications for each category.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-250 text-slate-700 hover:text-white hover:bg-primary rounded-xl font-bold text-sm transition-smooth shadow-sm self-start shrink-0"
          >
            <span>View Complete Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Showcase Grid */}
        <div className="flex flex-col gap-12">
          {categoriesList.map((category) => {
            const product = category.representativeProduct
            const categoryIcon = getCategoryIcon(category.slug)

            return (
              <div
                key={category._id || category.slug}
                className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:shadow-md hover:border-primary/10 transition-smooth"
              >
                {/* Left Side: Category Info */}
                <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-slate-50 to-white border-b lg:border-b-0 lg:border-r border-slate-100">
                  <div className="flex flex-col gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-150">
                      {categoryIcon}
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <h3 className="font-heading font-extrabold text-2xl !text-primary">
                        {category.name}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {category.description || 'Premium power solutions tailored to Karachi\'s environment.'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
                    <Link
                      href={`/products?category=${category.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-accent-orange transition-colors"
                    >
                      <span>Explore all {category.name}s</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Side: Representative Product Showcase */}
                <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
                  {product ? (
                    <div className="flex flex-col md:flex-row gap-8 items-start h-full">
                      {/* Product Thumbnail */}
                      <div className="w-full md:w-44 shrink-0 flex flex-col gap-2">
                        <div className="aspect-square w-full rounded-xl bg-slate-50 border border-slate-150 relative overflow-hidden flex items-center justify-center">
                          {product.images && product.images.length > 0 ? (
                            <Image
                              src={typeof product.images[0] === 'string' ? product.images[0] : urlFor(product.images[0]).width(200).height(200).url()}
                              alt={product.name}
                              fill
                              className="object-contain p-2"
                            />
                          ) : (
                            <BatteryCharging className="w-16 h-16 text-slate-300" />
                          )}
                        </div>

                        {/* Badges */}
                        <div className="flex flex-col gap-1 mt-1 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                          {product.brand && (
                            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-center truncate">
                              Brand: {product.brand.name}
                            </span>
                          )}
                          {product.warranty && (
                            <span className="bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded text-center truncate">
                              {product.warranty}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Product Details & Specifications */}
                      <div className="flex flex-col justify-between flex-grow gap-6 self-stretch">
                        <div className="flex flex-col gap-3">
                          <div>
                            <span className="text-[10px] font-extrabold text-accent-orange uppercase tracking-wider">
                              Representative Product
                            </span>
                            <h4 className="font-heading font-extrabold text-xl !text-primary leading-snug hover:text-accent-orange transition-colors">
                              <Link href={`/products/${product.slug}`}>{product.name}</Link>
                            </h4>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                            {product.shortDescription}
                          </p>

                          {/* Specs Grid */}
                          {product.specs && product.specs.length > 0 && (
                            <div className="mt-2 bg-slate-50 border border-slate-150 rounded-xl p-4 grid grid-cols-2 gap-x-6 gap-y-3">
                              {product.specs.slice(0, 4).map((spec: any, idx: number) => (
                                <div key={idx} className="flex flex-col gap-0.5">
                                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                    {spec.key}
                                  </span>
                                  <span className="text-xs font-bold text-primary truncate">
                                    {spec.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <Link
                            href={`/products/${product.slug}`}
                            className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 bg-primary text-white hover:bg-primary/95 text-xs sm:text-sm font-bold rounded-lg transition-smooth shadow-sm"
                          >
                            Product Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* If category exists but has no products yet */
                    <div className="h-full flex flex-col justify-center items-center text-center p-8 border border-dashed border-slate-200 rounded-xl">
                      <BatteryCharging className="w-12 h-12 text-slate-300 animate-pulse mb-3" />
                      <h4 className="font-bold text-slate-700 text-sm">Products Coming Soon</h4>
                      <p className="text-xs text-slate-400 max-w-xs mt-1">
                        We are currently updating our database for {category.name}s. Contact us directly for daily prices!
                      </p>
                    </div>
                  )}
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
