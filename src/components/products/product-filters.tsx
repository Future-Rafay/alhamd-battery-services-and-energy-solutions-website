'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Category, Brand, Subcategory } from '@/types'

interface ProductFiltersProps {
  categories: Category[]
  brands: Brand[]
  subcategories: Subcategory[]
}

export function ProductFilters({ categories, brands, subcategories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')

  // Get active query states
  const activeCategory = searchParams.get('category') || ''
  const activeSubcategory = searchParams.get('subcategory') || ''
  const activeBrand = searchParams.get('brand') || ''

  // Debounce search update
  useEffect(() => {
    const timer = setTimeout(() => {
      updateSearchParams('search', searchTerm)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Sync state when URL params change
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '')
  }, [searchParams])

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', '1') // reset page on filter change
    
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    
    // Clear subcategory if category changes
    if (key === 'category') {
      params.delete('subcategory')
    }

    router.push(`/products?${params.toString()}`, { scroll: false })
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    router.push('/products')
  }

  const hasActiveFilters = activeCategory || activeSubcategory || activeBrand || searchParams.get('search')

  return (
    <div className="flex flex-col gap-6">
      {/* Search Filter */}
      <div className="flex flex-col gap-2">
        <h4 className="font-heading font-bold text-xs uppercase !text-primary tracking-wider">
          Search Catalog
        </h4>
        <div className="relative">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-white border-slate-200 focus-visible:ring-primary h-10 text-xs sm:text-sm"
          />
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearAllFilters}
          className="w-full border-slate-200 text-xs hover:bg-slate-50 font-bold"
        >
          <X className="w-3.5 h-3.5 mr-1.5" /> Clear All Filters
        </Button>
      )}

      {/* Category Accordion */}
      <Accordion multiple defaultValue={['categories', 'brands']} className="w-full">
        <AccordionItem value="categories" className="border-b border-slate-200">
          <AccordionTrigger className="font-heading font-bold text-xs uppercase text-primary tracking-wider py-3 hover:no-underline">
            Categories
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3 flex flex-col gap-1">
            <button
              onClick={() => updateSearchParams('category', '')}
              className={`text-left py-1.5 px-2.5 rounded text-xs sm:text-sm font-semibold transition-colors ${
                !activeCategory ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-100/50'
              }`}
            >
              All Categories
            </button>
            
            {categories.map((cat) => {
              const isCatActive = activeCategory === cat.slug
              // Filter subcategories for this category
              const categorySubs = subcategories.filter(sub => sub.parentSlug === cat.slug || sub.parentSlug === cat._id)

              return (
                <div key={cat._id} className="flex flex-col gap-0.5">
                  <button
                    onClick={() => updateSearchParams('category', cat.slug)}
                    className={`text-left py-1.5 px-2.5 rounded text-xs sm:text-sm font-semibold transition-colors ${
                      isCatActive && !activeSubcategory ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-100/50'
                    }`}
                  >
                    {cat.name}
                  </button>

                  {/* Render nested subcategories if parent category is active */}
                  {isCatActive && categorySubs.length > 0 && (
                    <div className="flex flex-col pl-4 border-l border-slate-200 gap-0.5 ml-3 my-0.5">
                      <button
                        onClick={() => updateSearchParams('subcategory', '')}
                        className={`text-left py-1 px-2 rounded text-xs font-medium transition-colors ${
                          !activeSubcategory ? 'text-primary font-bold' : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        All {cat.name}
                      </button>
                      {categorySubs.map((sub) => {
                        const isSubActive = activeSubcategory === sub.slug
                        return (
                          <button
                            key={sub._id}
                            onClick={() => updateSearchParams('subcategory', sub.slug)}
                            className={`text-left py-1 px-2 rounded text-xs transition-colors ${
                              isSubActive ? 'text-primary font-bold bg-primary/5' : 'text-slate-500 hover:text-slate-700'
                            }`}
                          >
                            {sub.name}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </AccordionContent>
        </AccordionItem>

        {/* Brand Checklist */}
        <AccordionItem value="brands" className="border-b border-slate-200">
          <AccordionTrigger className="font-heading font-bold text-xs uppercase text-primary tracking-wider py-3 hover:no-underline">
            Brands
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3 flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-1">
            <button
              onClick={() => updateSearchParams('brand', '')}
              className={`text-left py-1.5 px-2.5 rounded text-xs sm:text-sm font-semibold transition-colors ${
                !activeBrand ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-100/50'
              }`}
            >
              All Brands
            </button>
            {brands.map((b) => {
              const isBrandActive = activeBrand === b.slug
              return (
                <button
                  key={b._id}
                  onClick={() => updateSearchParams('brand', b.slug)}
                  className={`text-left py-1.5 px-2.5 rounded text-xs sm:text-sm font-semibold transition-colors ${
                    isBrandActive ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-100/50'
                  }`}
                >
                  {b.name}
                </button>
              )
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
