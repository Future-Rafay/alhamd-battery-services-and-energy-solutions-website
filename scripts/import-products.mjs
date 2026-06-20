import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Helper to load and parse .env.local file manually to avoid dependency issues
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) {
    console.error('❌ Error: .env.local file not found at the root of the project!')
    process.exit(1)
  }

  const envContent = fs.readFileSync(envPath, 'utf-8')
  const env = {}

  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return

    const firstEq = trimmed.indexOf('=')
    if (firstEq === -1) return

    const key = trimmed.substring(0, firstEq).trim()
    let val = trimmed.substring(firstEq + 1).trim()

    // Strip wrapping quotes
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.substring(1, val.length - 1)
    }

    env[key] = val
  })

  return env
}

const env = loadEnv()

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN must be defined in your .env.local file!')
  process.exit(1)
}

// Initialize Sanity Write Client
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-06-19',
  token,
  useCdn: false, // Must be false for write operations
})

// Path to products JSON file
const dataFilePath = path.resolve(process.cwd(), 'scripts/products-to-import.json')

if (!fs.existsSync(dataFilePath)) {
  console.error(`❌ Error: JSON file not found at ${dataFilePath}`)
  process.exit(1)
}

async function uploadImage(imagePathOrUrl) {
  try {
    // 1. If it's a web URL
    if (imagePathOrUrl.startsWith('http://') || imagePathOrUrl.startsWith('https://')) {
      console.log(`🌐 Fetching remote image: ${imagePathOrUrl}`)
      const response = await fetch(imagePathOrUrl)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const blob = await response.blob()
      const buffer = Buffer.from(await blob.arrayBuffer())
      const filename = path.basename(new URL(imagePathOrUrl).pathname) || 'image.jpg'
      const asset = await client.assets.upload('image', buffer, { filename })
      return asset._id
    }

    // 2. If it's a local file path
    const absolutePath = path.isAbsolute(imagePathOrUrl)
      ? imagePathOrUrl
      : path.resolve(process.cwd(), imagePathOrUrl)

    if (fs.existsSync(absolutePath)) {
      console.log(`📁 Uploading local image: ${absolutePath}`)
      const fileStream = fs.createReadStream(absolutePath)
      const asset = await client.assets.upload('image', fileStream, {
        filename: path.basename(absolutePath),
      })
      return asset._id
    } else {
      console.warn(`⚠️ Warning: Local image path not found: ${absolutePath}`)
      return null
    }
  } catch (error) {
    console.error(`❌ Failed to upload image "${imagePathOrUrl}":`, error.message)
    return null
  }
}

async function main() {
  console.log('🚀 Starting Sanity Importer Script...')
  console.log(`📌 Project ID: ${projectId}`)
  console.log(`📌 Dataset: ${dataset}`)

  const rawData = fs.readFileSync(dataFilePath, 'utf-8')
  const data = JSON.parse(rawData)

  // 1. Upload/Find Fallback Image
  let fallbackImageAssetId = null
  const defaultPlaceholderPath = path.resolve(process.cwd(), 'public/NOT_AVAILABLE.png')
  if (fs.existsSync(defaultPlaceholderPath)) {
    console.log('🖼️ Found default fallback image (NOT_AVAILABLE.png). Uploading to Sanity...')
    fallbackImageAssetId = await uploadImage(defaultPlaceholderPath)
    if (fallbackImageAssetId) {
      console.log(`✅ Default fallback image uploaded. Asset ID: ${fallbackImageAssetId}`)
    }
  } else {
    console.warn('⚠️ Warning: public/NOT_AVAILABLE.png not found. Script will proceed without a local default fallback image.')
  }

  // Helper to construct image object
  const makeImageObject = (assetId, altText = 'Image') => {
    if (!assetId) return null
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: assetId,
      },
      alt: altText,
    }
  }

  // 2. Fetch existing brands and categories to map name/slug to _id
  console.log('\n🔍 Fetching existing Brands, Categories, and Subcategories from Sanity...')
  const existingBrands = await client.fetch(`*[_type == "brand"] { _id, name, "slug": slug.current }`)
  const existingCategories = await client.fetch(`*[_type == "category"] { _id, name, "slug": slug.current }`)
  const existingSubcategories = await client.fetch(`*[_type == "subcategory"] { _id, name, "slug": slug.current }`)

  console.log(`✅ Loaded: ${existingBrands.length} brands, ${existingCategories.length} categories, ${existingSubcategories.length} subcategories.`)

  // Maps for reference resolution
  const brandMap = new Map(existingBrands.map((b) => [b.name.toLowerCase(), b._id]))
  const categoryMap = new Map(existingCategories.map((c) => [c.slug, c._id]))
  const subcategoryMap = new Map(existingSubcategories.map((s) => [s.slug, s._id]))

  // 3. Import Categories
  if (data.categories && data.categories.length > 0) {
    console.log('\n📁 Importing Categories...')
    for (const cat of data.categories) {
      const doc = {
        _type: 'category',
        _id: `category-${cat.slug}`,
        name: cat.name,
        slug: { _type: 'slug', current: cat.slug },
        description: cat.description,
        displayOrder: cat.displayOrder || 0,
      }

      // If category has image in JSON, upload it
      if (cat.imagePath) {
        const assetId = await uploadImage(cat.imagePath)
        if (assetId) {
          doc.image = makeImageObject(assetId, cat.name)
        }
      } else if (fallbackImageAssetId) {
        doc.image = makeImageObject(fallbackImageAssetId, cat.name)
      }

      console.log(`💾 Creating/Replacing Category: ${cat.name} (${cat.slug})`)
      const created = await client.createOrReplace(doc)
      categoryMap.set(cat.slug, created._id)
    }
  }

  // 4. Import Subcategories
  if (data.subcategories && data.subcategories.length > 0) {
    console.log('\n📁 Importing Subcategories...')
    for (const sub of data.subcategories) {
      const parentId = categoryMap.get(sub.parentCategorySlug)
      if (!parentId) {
        console.error(`❌ Error: Parent category "${sub.parentCategorySlug}" not found for subcategory "${sub.name}"! Skipping.`)
        continue
      }

      const doc = {
        _type: 'subcategory',
        _id: `subcategory-${sub.slug}`,
        name: sub.name,
        slug: { _type: 'slug', current: sub.slug },
        description: sub.description,
        parent: {
          _type: 'reference',
          _ref: parentId,
        },
      }

      console.log(`💾 Creating/Replacing Subcategory: ${sub.name} (${sub.slug})`)
      const created = await client.createOrReplace(doc)
      subcategoryMap.set(sub.slug, created._id)
    }
  }

  // 5. Import Banners
  if (data.banners && data.banners.length > 0) {
    console.log('\n🖼️ Importing Banners...')
    for (let i = 0; i < data.banners.length; i++) {
      const banner = data.banners[i]
      const doc = {
        _type: 'banner',
        _id: `banner-${i + 1}`,
        headline: banner.headline,
        subtext: banner.subtext,
        ctaText: banner.ctaText || 'Learn More',
        ctaLink: banner.ctaLink,
        displayOrder: banner.displayOrder || i + 1,
        isActive: true,
      }

      if (banner.imagePath) {
        const assetId = await uploadImage(banner.imagePath)
        if (assetId) {
          doc.image = makeImageObject(assetId, banner.headline)
        }
      } else if (fallbackImageAssetId) {
        doc.image = makeImageObject(fallbackImageAssetId, banner.headline)
      }

      console.log(`💾 Creating/Replacing Banner: "${banner.headline}"`)
      await client.createOrReplace(doc)
    }
  }

  // 6. Import Services
  if (data.services && data.services.length > 0) {
    console.log('\n🔧 Importing Services...')
    for (const srv of data.services) {
      const doc = {
        _type: 'service',
        _id: `service-${srv.slug}`,
        name: srv.name,
        slug: { _type: 'slug', current: srv.slug },
        description: srv.description,
        fullDescription: srv.fullDescription,
        icon: srv.icon,
      }

      if (srv.imagePath) {
        const assetId = await uploadImage(srv.imagePath)
        if (assetId) {
          doc.image = makeImageObject(assetId, srv.name)
        }
      } else if (fallbackImageAssetId) {
        doc.image = makeImageObject(fallbackImageAssetId, srv.name)
      }

      console.log(`💾 Creating/Replacing Service: ${srv.name}`)
      await client.createOrReplace(doc)
    }
  }

  // 7. Import FAQs
  if (data.faqs && data.faqs.length > 0) {
    console.log('\n❓ Importing FAQs...')
    for (let i = 0; i < data.faqs.length; i++) {
      const faq = data.faqs[i]
      const doc = {
        _type: 'faq',
        _id: `faq-${i + 1}`,
        question: faq.question,
        answer: faq.answer,
        showOnHome: faq.showOnHome || false,
        displayOrder: faq.displayOrder || i + 1,
      }

      console.log(`💾 Creating/Replacing FAQ: "${faq.question.substring(0, 40)}..."`)
      await client.createOrReplace(doc)
    }
  }

  // 8. Import Products
  if (data.products && data.products.length > 0) {
    console.log('\n🔋 Importing Products...')
    for (const prod of data.products) {
      // Resolve Brand Reference
      let brandRefId = brandMap.get(prod.brandName.toLowerCase())
      if (!brandRefId) {
        console.warn(`⚠️ Warning: Brand "${prod.brandName}" not found in Sanity.`)
        console.log(`🏷️ Creating Brand "${prod.brandName}" automatically to prevent reference failure...`)
        const brandSlug = prod.brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        const brandDoc = {
          _type: 'brand',
          _id: `brand-${brandSlug}`,
          name: prod.brandName,
          slug: { _type: 'slug', current: brandSlug },
        }

        if (fallbackImageAssetId) {
          brandDoc.logo = makeImageObject(fallbackImageAssetId, prod.brandName)
        }

        const createdBrand = await client.createOrReplace(brandDoc)
        brandRefId = createdBrand._id
        brandMap.set(prod.brandName.toLowerCase(), brandRefId)
      }

      // Resolve Category Reference
      const categoryRefId = categoryMap.get(prod.categorySlug)
      if (!categoryRefId) {
        console.error(`❌ Error: Category "${prod.categorySlug}" not found in Sanity. Skipping product "${prod.name}".`)
        continue
      }

      // Resolve Subcategory Reference (if provided)
      let subcategoryRef = undefined
      if (prod.subcategorySlug) {
        const subcategoryRefId = subcategoryMap.get(prod.subcategorySlug)
        if (subcategoryRefId) {
          subcategoryRef = {
            _type: 'reference',
            _ref: subcategoryRefId,
          }
        } else {
          console.warn(`⚠️ Warning: Subcategory "${prod.subcategorySlug}" not found. Link will be omitted.`)
        }
      }

      // Upload product images
      const imagesArray = []
      if (prod.images && prod.images.length > 0) {
        for (let idx = 0; idx < prod.images.length; idx++) {
          const imgPath = prod.images[idx]
          const assetId = await uploadImage(imgPath)
          if (assetId) {
            imagesArray.push(makeImageObject(assetId, `${prod.name} Image ${idx + 1}`))
          }
        }
      }

      // If no images could be uploaded, use fallback placeholder
      if (imagesArray.length === 0 && fallbackImageAssetId) {
        imagesArray.push(makeImageObject(fallbackImageAssetId, prod.name))
      }

      const doc = {
        _type: 'product',
        _id: `product-${prod.slug}`,
        name: prod.name,
        slug: { _type: 'slug', current: prod.slug },
        brand: {
          _type: 'reference',
          _ref: brandRefId,
        },
        category: {
          _type: 'reference',
          _ref: categoryRefId,
        },
        subcategory: subcategoryRef,
        capacity: prod.capacity,
        voltage: prod.voltage,
        warranty: prod.warranty,
        shortDescription: prod.shortDescription,
        fullDescription: prod.fullDescription,
        specs: prod.specs || [],
        featured: prod.featured || false,
        images: imagesArray,
      }

      console.log(`💾 Creating/Replacing Product: ${prod.name} (${prod.slug})`)
      await client.createOrReplace(doc)
    }
  }

  console.log('\n🎉 Import completed successfully!')
}

main().catch((err) => {
  console.error('\n❌ Unhandled error during import:', err)
  process.exit(1)
})
