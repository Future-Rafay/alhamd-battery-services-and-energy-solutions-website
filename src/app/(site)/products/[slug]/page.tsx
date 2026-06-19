
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, MessageSquare, Shield, ArrowLeft, Heart, Award } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/live'
import { PRODUCT_BY_SLUG_QUERY, SITE_SETTINGS_QUERY, RELATED_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { ProductGallery } from '@/components/products/product-gallery'
import { ProductCard } from '@/components/shared/product-card'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Product } from '@/types'
import { getProductSchema } from '@/lib/structured-data'

interface SingleProductPageProps {
  params: Promise<{ slug: string }>
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: SingleProductPageProps): Promise<Metadata> {
  const resolvedParams = await params
  let product: Product | null = null

  try {
    product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug: resolvedParams.slug })
  } catch (error) {
    console.error('Error fetching metadata for product:', error)
  }

  // Fallback to mock titles if database was empty
  if (!product) {
    const mock = getMockProducts().find(p => p.slug === resolvedParams.slug)
    if (mock) product = mock
  }

  if (!product) {
    return { title: 'Product Not Found | Alhamd Battery Services' }
  }

  return {
    title: `${product.name} - Authorized Rates Karachi`,
    description: product.shortDescription || `Contact Alhamd Battery Services for dynamic wholesale and retail pricing for ${product.name} in Saudabad, Karachi.`,
  }
}

export default async function SingleProductPage({ params }: SingleProductPageProps) {
  const resolvedParams = await params
  
  let product: Product | null = null
  let settings: any = null
  let relatedProducts: Product[] = []

  try {
    const productRes = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug: resolvedParams.slug })
    product = productRes || null
    
    const settingsRes = await sanityFetch({ query: SITE_SETTINGS_QUERY })
    settings = settingsRes.data || null
  } catch (error) {
    console.error('Error loading product details from Sanity, trying mock fallbacks:', error)
  }

  // Fallback checks
  if (!product) {
    const mock = getMockProducts().find(p => p.slug === resolvedParams.slug)
    if (mock) {
      product = mock
    }
  }

  if (!product) {
    notFound()
  }

  // Fetch related products
  try {
    if (product.category?._id && product._id) {
      // Find category reference or query
      const relatedRes = await client.fetch(RELATED_PRODUCTS_QUERY, {
        categoryId: product.category._id,
        productId: product._id
      })
      relatedProducts = relatedRes || []
    }
  } catch (error) {
    console.error('Error loading related products:', error)
  }

  if (relatedProducts.length === 0) {
    // Mock related products
    relatedProducts = getMockProducts().filter(p => p.slug !== resolvedParams.slug).slice(0, 4)
  }

  const phone = settings?.phone
  const whatsapp = settings?.whatsappNumber
  const formattedPhone = phone.replace(/[^\d+]/g, '')
  const formattedWhatsapp = whatsapp.replace(/[^\d+]/g, '')
  
  const whatsappMessage = encodeURIComponent(
    `Hi Alhamd Battery Services! I am interested in the following product: ${product.name}. Please share today's daily rate and delivery/pickup status.`
  )

  const productSchema = getProductSchema(product, `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/products/${product.slug}`)

  return (
    <div className="py-12 px-4 bg-slate-50 min-h-screen">
      {/* Structured data injection */}
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Product Catalog
        </Link>

        {/* Product Details Section */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-10 shadow-sm mb-16">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Text Information */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              {/* Badges bar */}
              <div className="flex flex-wrap items-center gap-2">
                {product.brand && (
                  <span className="bg-primary/5 text-primary text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded border border-primary/10">
                    {product.brand.name}
                  </span>
                )}
                {product.category && (
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded">
                    {product.category.name}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-primary leading-tight">
                {product.name}
              </h1>

              {/* Pricing banner */}
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 flex flex-col gap-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Pricing Update</span>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold text-accent-orange">Contact for Price</span>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-semibold bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                    Fluctuates Daily in Pakistan
                  </span>
                </div>
              </div>

              {/* Short Description */}
              {product.shortDescription && (
                <p className="text-slate-650 text-xs sm:text-sm leading-relaxed border-b border-slate-100 pb-6">
                  {product.shortDescription}
                </p>
              )}

              {/* Primary Specs grid list */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                {product.capacity && (
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Capacity</span>
                    <span className="text-sm font-extrabold text-primary mt-0.5">{product.capacity}</span>
                  </div>
                )}
                {product.voltage && (
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Voltage</span>
                    <span className="text-sm font-extrabold text-primary mt-0.5">{product.voltage}</span>
                  </div>
                )}
                {product.warranty && (
                  <div className="col-span-2 flex items-center gap-2 border-t border-slate-150/50 pt-3 mt-1 text-xs font-semibold text-slate-600">
                    <Shield className="w-4 h-4 text-accent-orange" />
                    <span>{product.warranty} Original Manufacturer Warranty Card Included</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <a
                href={`https://wa.me/${formattedWhatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }),
                  'w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold px-8 shadow-md'
                )}
              >
                <MessageSquare className="w-5 h-5 mr-2 fill-white/20" /> WhatsApp Inquiry
              </a>

              <a
                href={`tel:${formattedPhone}`}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white font-bold px-6'
                )}
              >
                <Phone className="w-4.5 h-4.5 mr-2 text-accent-orange" /> Call Store Support
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Descriptions / Specs Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Full description */}
          <div className="lg:col-span-7 bg-white border border-slate-200/60 p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col gap-4">
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-primary border-b border-slate-100 pb-3">
              Product Overview
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {product.fullDescription || product.shortDescription || 'No detailed overview available for this product.'}
            </p>
          </div>

          {/* Specifications Table */}
          <div className="lg:col-span-5 bg-white border border-slate-200/60 p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col gap-4">
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-primary border-b border-slate-100 pb-3">
              Technical Specifications
            </h3>
            {product.specs && product.specs.length > 0 ? (
              <div className="flex flex-col border border-slate-200 rounded-lg overflow-hidden text-xs sm:text-sm">
                {product.specs.map((spec, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center px-4 py-3 ${
                      i % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                    } ${i < (product.specs?.length || 0) - 1 ? 'border-b border-slate-100' : ''}`}
                  >
                    <span className="font-semibold text-slate-500">{spec.key}</span>
                    <span className="font-bold text-primary text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-500">
                <p>Standard technical specs for this item:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {product.capacity && <li>Capacity: {product.capacity}</li>}
                  {product.voltage && <li>Voltage: {product.voltage}</li>}
                  {product.warranty && <li>Warranty: {product.warranty}</li>}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products list */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-primary mb-6 border-l-4 border-accent-orange pl-3">
              More Products You May Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

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
      fullDescription: 'LONGi LR5-72HPH 550W is a premier Hi-MO 5 series solar module utilizing mono-crystalline silicon cells. Designed for grid-tied and hybrid power systems, it features smart PERC technology for maximum power outputs. The module boasts excellent temperature performance and minimal degradation rate over a 25-year service period. Fits perfectly on rooftop installations in Karachi.',
      specs: [
        { key: 'Model Name', value: 'LR5-72HPH-550M' },
        { key: 'Max Power', value: '550W' },
        { key: 'Cell Type', value: 'Mono PERC' },
        { key: 'No. of Cells', value: '144 (6x24)' },
        { key: 'Efficiency', value: '21.3%' },
        { key: 'Dimensions', value: '2256 x 1133 x 35 mm' },
      ],
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
      fullDescription: 'Inverex Nitrox 6KW hybrid solar inverter is a state-of-the-art energy conversion system. It supports single-phase power setups and dual-input solar arrays. The system works with lead-acid and lithium batteries. Zero-export functionality allows you to block feeding excess electricity back into K-Electric grid without net-metering. Features IP65 weather rating.',
      specs: [
        { key: 'Rating Output', value: '6000W' },
        { key: 'Battery Input', value: '48VDC' },
        { key: 'Inverter Waveform', value: 'Pure Sine Wave' },
        { key: 'Max PV Array', value: '7800W' },
        { key: 'Efficiency', value: '97.6%' },
      ],
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
      fullDescription: 'Daewoo DLS-200 is a premium deep-cycle tubular battery. Manufactured using top lead alloy formulations and dense positive plates. It holds charge for longer intervals and supports slow, steady current discharge, making it the perfect backup match for heavy-duty household UPS and off-grid solar storage configurations in Karachi.',
      specs: [
        { key: 'Battery Type', value: 'Tubular Deep Cycle' },
        { key: 'Capacity', value: '200Ah' },
        { key: 'Voltage', value: '12V' },
        { key: 'Electrolyte Vol', value: '18 Liters' },
      ],
      images: [],
      featured: true,
    },
  ]
}
