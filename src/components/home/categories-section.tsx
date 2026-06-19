'use client'

import Link from 'next/link'
import { ArrowRight, BatteryCharging, Sun, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Category } from '@/types'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

interface CategoriesSectionProps {
  categories: Category[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  // Local default categories as fallback
  const defaultCategories = [
    {
      name: 'Solar energy Solutions',
      slug: 'solar-energy-solutions',
      description: 'Premium mono-PERC solar panels, hybrid and on-grid solar inverters from top global brands.',
      icon: Sun,
    },
    {
      name: 'Tubular Batteries',
      slug: 'tubular-batteries',
      description: 'Deep-cycle tubular batteries for maximum backups on solar power and UPS systems.',
      icon: BatteryCharging,
    },
    {
      name: 'Automotive & Lead Acid',
      slug: 'automotive-and-lead-acid',
      description: 'Dry batteries, maintenance-free, and lead-acid batteries for cars, generators, and UPS.',
      icon: Zap,
    },
  ]

  const hasCMSCategories = categories && categories.length > 0
  const categoriesList = hasCMSCategories ? categories : []

  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-accent-orange font-bold text-xs uppercase tracking-wider border-l-4 border-accent-orange pl-3">
              Product Categories
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary">
              Find the Right Product for Your Needs
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-accent-orange transition-colors self-start"
          >
            <span>View Complete Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hasCMSCategories ? (
            categoriesList.map((category) => (
              <Card
                key={category._id}
                className="group overflow-hidden rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-primary/20 transition-smooth bg-white flex flex-col"
              >
                <div className="aspect-[4/3] w-full bg-slate-100 relative overflow-hidden">
                  {category.image ? (
                    <Image
                      src={urlFor(category.image).width(400).height(300).quality(85).url()}
                      alt={category.image.alt || category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-smooth"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-primary/40">
                      <Zap className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-heading font-bold text-xl text-primary group-hover:text-accent-orange transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                      {category.description || 'Browse our range of high-quality products.'}
                    </p>
                  </div>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-accent-orange transition-colors mt-2"
                  >
                    <span>Browse Products</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            defaultCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <Card
                  key={cat.slug}
                  className="group overflow-hidden rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-primary/20 transition-smooth bg-white flex flex-col p-6 justify-between min-h-[220px]"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-smooth">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-heading font-bold text-xl text-primary group-hover:text-accent-orange transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-accent-orange transition-colors mt-6 pt-2 border-t border-slate-100"
                  >
                    <span>Browse Products</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
