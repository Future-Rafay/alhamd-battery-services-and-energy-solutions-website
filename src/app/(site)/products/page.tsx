
import { sanityFetch } from '@/sanity/lib/live'
import {
  CATEGORIES_QUERY,
  BRANDS_QUERY,
  SUBCATEGORIES_QUERY,
} from '@/sanity/lib/queries'
import { ProductFilters } from '@/components/products/product-filters'
import { ProductCard } from '@/components/shared/product-card'
import { ProductPagination } from '@/components/products/product-pagination'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Filter, SlidersHorizontal } from 'lucide-react'
import { Product } from '@/types'
import { client } from '@/sanity/lib/client'

// Pre-define dynamic search queries for products
const FILTERED_PRODUCTS_QUERY = `
  *[_type == "product" 
    && (!defined($category) || category->slug.current == $category)
    && (!defined($subcategory) || subcategory->slug.current == $subcategory)
    && (!defined($brand) || brand->slug.current == $brand)
    && (!defined($search) || name match $search || brand->name match $search || shortDescription match $search)
  ] | order(featured desc, name asc) [$start...$end] {
    _id,
    name,
    "slug": slug.current,
    brand->{ name, "slug": slug.current },
    category->{ name, "slug": slug.current },
    subcategory->{ name, "slug": slug.current },
    capacity,
    voltage,
    warranty,
    shortDescription,
    images,
    featured
  }
`

const FILTERED_PRODUCTS_COUNT_QUERY = `
  count(*[_type == "product" 
    && (!defined($category) || category->slug.current == $category)
    && (!defined($subcategory) || subcategory->slug.current == $subcategory)
    && (!defined($brand) || brand->slug.current == $brand)
    && (!defined($search) || name match $search || brand->name match $search || shortDescription match $search)
  ])
`

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string
    subcategory?: string
    brand?: string
    search?: string
    page?: string
  }>
}

// ... existing imports ...
import { getSiteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Product Catalog | Alhamd Battery Services and Energy Solutions',
  description: 'Explore our catalog of authentic batteries, solar panels, and inverters. Top brands available with official warranties.',
  openGraph: {
    title: 'Product Catalog | Alhamd Battery Services',
    description: 'Explore our catalog of authentic batteries, solar panels, and inverters. Top brands available with official warranties.',
    url: `${getSiteUrl()}/products`,
    siteName: 'Alhamd Battery Services',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Catalog | Alhamd Battery Services',
    description: 'Explore our catalog of authentic batteries, solar panels, and inverters.',
  },
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams
  
  const category = resolvedParams.category || null
  const subcategory = resolvedParams.subcategory || null
  const brand = resolvedParams.brand || null
  const search = resolvedParams.search ? `*${resolvedParams.search}*` : null
  const page = parseInt(resolvedParams.page || '1')
  
  const limit = 12
  const start = (page - 1) * limit
  const end = start + limit

  // Fetch filter metadata
  let categories: any[] = []
  let brands: any[] = []
  let subcategories: any[] = []
  let products: Product[] = []
  let totalProductsCount = 0

  try {
    const [categoriesRes, brandsRes, subcategoriesRes] = await Promise.all([
      sanityFetch({ query: CATEGORIES_QUERY }),
      sanityFetch({ query: BRANDS_QUERY }),
      sanityFetch({ query: SUBCATEGORIES_QUERY }),
    ])

    categories = categoriesRes.data || []
    brands = brandsRes.data || []
    subcategories = subcategoriesRes.data || []

    // Fetch filtered products
    const productsRes = await client.fetch(FILTERED_PRODUCTS_QUERY, {
      category,
      subcategory,
      brand,
      search,
      start,
      end,
    })

    const countRes = await client.fetch(FILTERED_PRODUCTS_COUNT_QUERY, {
      category,
      subcategory,
      brand,
      search,
    })

    products = productsRes || []
    totalProductsCount = countRes || 0
  } catch (error) {
    console.error('Error fetching catalog data from Sanity, loading mock values:', error)
  }

  // Create robust mock products if Sanity returns empty catalog
  if (products.length === 0 && !category && !brand && !search) {
    products = getMockProducts().slice(start, end)
    totalProductsCount = getMockProducts().length
  } else if (products.length === 0 && (category || brand || search)) {
    // Filter mock products if user searched/filtered and Sanity was empty
    let filteredMocks = getMockProducts()
    if (category) {
      filteredMocks = filteredMocks.filter(p => p.category.slug === category)
    }
    if (brand) {
      filteredMocks = filteredMocks.filter(p => p.brand.slug === brand)
    }
    if (resolvedParams.search) {
      const q = resolvedParams.search.toLowerCase()
      filteredMocks = filteredMocks.filter(p => p.name.toLowerCase().includes(q) || p.brand.name.toLowerCase().includes(q))
    }
    products = filteredMocks.slice(start, end)
    totalProductsCount = filteredMocks.length
  }

  // If filter databases were empty, pre-populate them for the sidebar
  if (categories.length === 0) {
    categories = [
      { _id: 'cat1', name: 'Solar Panels', slug: 'solar-panels' },
      { _id: 'cat2', name: 'Batteries', slug: 'batteries' },
      { _id: 'cat3', name: 'Inverters', slug: 'inverters' },
    ]
  }
  if (brands.length === 0) {
    brands = [
      { _id: 'b1', name: 'LONGi', slug: 'longi' },
      { _id: 'b2', name: 'Daewoo Battery', slug: 'daewoo-battery' },
      { _id: 'b3', name: 'AGS', slug: 'ags' },
      { _id: 'b4', name: 'Osaka Batteries', slug: 'osaka-batteries' },
      { _id: 'b5', name: 'Inverex Solar Energy', slug: 'inverex-solar-energy' },
    ]
  }

  const totalPages = Math.ceil(totalProductsCount / limit)

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Intro Banner */}
      <section className="bg-primary text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-foreground" />
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-4">
          <span className="text-accent-yellow text-xs font-bold uppercase tracking-widest bg-white/10 px-3.5 py-1 rounded-full">
            Our Products
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl !text-white">
            Product Catalog
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
            Showing {products.length} of {totalProductsCount} premium battery and solar solutions.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-12 px-4">

        {/* Mobile Filters Header button */}
        <div className="lg:hidden mb-6 flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Filter Catalog
          </span>
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="sm" className="border-slate-200 text-xs font-semibold h-9" />}>
                <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" /> Filters
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-6 bg-white overflow-y-auto border-r border-slate-200">
              <SheetHeader className="text-left border-b border-slate-100 pb-3 mb-6">
                <SheetTitle className="font-heading font-bold text-lg !text-primary flex items-center gap-2">
                  <Filter className="w-5 h-5 text-accent-orange" /> Filters
                </SheetTitle>
              </SheetHeader>
              <ProductFilters
                categories={categories}
                brands={brands}
                subcategories={subcategories}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar (Left) */}
          <aside className="hidden lg:block lg:col-span-1 bg-white border border-slate-200/60 p-6 rounded-xl shadow-sm self-start sticky top-24">
            <h3 className="font-heading font-extrabold text-sm !text-primary uppercase tracking-wide border-b border-slate-100 pb-3 mb-6 flex items-center gap-2">
              <Filter className="w-4 h-4 text-accent-orange" /> Filters
            </h3>
            <ProductFilters
              categories={categories}
              brands={brands}
              subcategories={subcategories}
            />
          </aside>

          {/* Product Grid Area (Right) */}
          <section className="lg:col-span-3 flex flex-col justify-between">
            {products.length === 0 ? (
              <div className="text-center py-20 bg-white border border-slate-200/60 rounded-xl flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                  <SlidersHorizontal className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-lg !text-primary">No Products Found</h3>
                <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                  We couldn't find any products matching your filters. Try modifying your selections or clear filters to start over.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                
                <ProductPagination currentPage={page} totalPages={totalPages} />
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

// Generate static list of mock products if Sanity doesn't contain documents yet
function getMockProducts(): Product[] {
  return [
    {
      _id: 'mock1',
      name: 'LONGi LR5-72HPH 550W',
      slug: 'longi-lr5-72hph-550w',
      brand: { name: 'LONGi', slug: 'longi' },
      category: { name: 'Solar Panels', slug: 'solar-panels' },
      capacity: '550W',
      voltage: '42V',
      warranty: '12 Years Product',
      shortDescription: 'Hi-MO 5 mono-PERC solar panel with high efficiency, optimized under low-light environments.',
      images: [],
      featured: true,
    },
    {
      _id: 'mock2',
      name: 'Inverex Nitrox 6KW Hybrid',
      slug: 'inverex-nitrox-6kw-hybrid',
      brand: { name: 'Inverex Solar Energy', slug: 'inverex-solar-energy' },
      category: { name: 'Inverters', slug: 'inverters' },
      capacity: '6000W',
      voltage: '48VDC',
      warranty: '5 Years',
      shortDescription: 'Dual output smart hybrid inverter. Zero export feature with external limiter.',
      images: [],
      featured: true,
    },
    {
      _id: 'mock3',
      name: 'Daewoo DLS-200 Tubular',
      slug: 'daewoo-dls-200-tubular',
      brand: { name: 'Daewoo Battery', slug: 'daewoo-battery' },
      category: { name: 'Batteries', slug: 'batteries' },
      capacity: '200Ah',
      voltage: '12V',
      warranty: '1 Year',
      shortDescription: 'Deep cycle tubular battery specifically engineered for solar backup and heavy load UPS systems.',
      images: [],
      featured: true,
    },
    {
      _id: 'mock4',
      name: 'AGS SP-180 Lead Acid',
      slug: 'ags-sp-180-lead-acid',
      brand: { name: 'AGS', slug: 'ags' },
      category: { name: 'Batteries', slug: 'batteries' },
      capacity: '120Ah',
      voltage: '12V',
      warranty: '6 Months',
      shortDescription: 'Reliable water-activated lead acid battery suitable for general UPS and home backup.',
      images: [],
      featured: false,
    },
    {
      _id: 'mock5',
      name: 'Osaka OD-230 Tubular',
      slug: 'osaka-od-230-tubular',
      brand: { name: 'Osaka Batteries', slug: 'osaka-batteries' },
      category: { name: 'Batteries', slug: 'batteries' },
      capacity: '230Ah',
      voltage: '12V',
      warranty: '1 Year',
      shortDescription: 'High-performance heavy-duty tubular battery. Slow discharge rate for longer backups.',
      images: [],
      featured: false,
    },
    {
      _id: 'mock6',
      name: 'Jinko Tiger Neo N-type 575W',
      slug: 'jinko-tiger-neo-n-type-575w',
      brand: { name: 'JinKO Solar', slug: 'jinko-solar' },
      category: { name: 'Solar Panels', slug: 'solar-panels' },
      capacity: '575W',
      voltage: '44V',
      warranty: '12 Years Product',
      shortDescription: 'Top-tier N-type mono-crystalline panel with SMBB technology and higher generation output.',
      images: [],
      featured: false,
    },
  ]
}
