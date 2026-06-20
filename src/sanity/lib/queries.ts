import { defineQuery } from 'next-sanity'

// Fetch site-wide settings singleton
export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings"][0] {
    businessName,
    phone,
    whatsappNumber,
    email,
    address,
    mapEmbed,
    googleMapsLink,
    businessHours,
    yearsInBusiness,
    socialLinks,
    seoTitle,
    seoDescription
  }`
)

// Fetch active homepage banners
export const BANNERS_QUERY = defineQuery(
  `*[_type == "banner" && isActive == true] | order(displayOrder asc) {
    headline,
    subtext,
    image,
    ctaText,
    ctaLink
  }`
)

// Fetch product categories with their subcategories
export const CATEGORIES_WITH_SUBCATEGORIES_QUERY = defineQuery(
  `*[_type == "category"] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    image,
    "subcategories": *[_type == "subcategory" && references(^._id)] | order(name asc) {
      _id,
      name,
      "slug": slug.current
    }
  }`
)

// Fetch all categories
export const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category"] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    image
  }`
)

// Fetch all subcategories
export const SUBCATEGORIES_QUERY = defineQuery(
  `*[_type == "subcategory"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    "parentSlug": parent->slug.current
  }`
)

// Fetch all brands
export const BRANDS_QUERY = defineQuery(
  `*[_type == "brand"] | order(displayOrder asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    logo,
    websiteLink
  }`
)

// Fetch all services
export const SERVICES_QUERY = defineQuery(
  `*[_type == "service"] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    fullDescription,
    icon,
    image
  }`
)

// Fetch certificates
export const CERTIFICATES_QUERY = defineQuery(
  `*[_type == "certificate"] | order(displayOrder asc, dateIssued desc) {
    _id,
    title,
    image,
    issuedBy,
    dateIssued
  }`
)

// Fetch testimonials
export const TESTIMONIALS_QUERY = defineQuery(
  `*[_type == "testimonial" && featured == true] | order(displayOrder asc) {
    _id,
    customerName,
    designation,
    rating,
    quote
  }`
)

// Fetch FAQs for homepage (showOnHome == true)
export const HOME_FAQS_QUERY = defineQuery(
  `*[_type == "faq" && showOnHome == true] | order(displayOrder asc) {
    _id,
    question,
    answer
  }`
)

// Fetch all FAQs
export const FAQS_QUERY = defineQuery(
  `*[_type == "faq"] | order(displayOrder asc) {
    _id,
    question,
    answer
  }`
)

// Fetch featured products for homepage
export const FEATURED_PRODUCTS_QUERY = defineQuery(
  `*[_type == "product" && featured == true] | order(name asc)[0...8] {
    _id,
    name,
    "slug": slug.current,
    brand->{ name, "slug": slug.current },
    category->{ name, "slug": slug.current },
    capacity,
    voltage,
    warranty,
    shortDescription,
    images
  }`
)

// Single product query by slug
export const PRODUCT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    brand->{ name, "slug": slug.current, logo },
    category->{ _id, name, "slug": slug.current },
    subcategory->{ name, "slug": slug.current },
    capacity,
    voltage,
    warranty,
    shortDescription,
    fullDescription,
    specs,
    images,
    featured
  }`
)

// Related products query (same category, excluding current product)
export const RELATED_PRODUCTS_QUERY = defineQuery(
  `*[_type == "product" && category._ref == $categoryId && _id != $productId][0...4] {
    _id,
    name,
    "slug": slug.current,
    brand->{ name, "slug": slug.current },
    capacity,
    voltage,
    warranty,
    shortDescription,
    images
  }`
)

// Main product listing query with filtering (used inside client or server fetching)
// Note: In GROQ, filters can be applied dynamically, so we can define queries or construct queries dynamically.
// This is a base query to get items.
export const ALL_PRODUCTS_QUERY = defineQuery(
  `*[_type == "product"] | order(name asc) {
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
    images
  }`
)

// Fetch gallery items for media page
export const GALLERY_ITEMS_QUERY = defineQuery(
  `*[_type == "galleryItem"] | order(displayOrder asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    mediaType,
    image,
    "videoUrl": videoFile.asset->url,
    youtubeUrl,
    description
  }`
)

// Fetch homepage categories alongside a single representative product for each
export const HOME_CATEGORIES_WITH_PRODUCT_QUERY = defineQuery(
  `*[_type == "category"] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    image,
    "representativeProduct": *[_type == "product" && category._ref == ^._id] | order(featured desc, name asc)[0] {
      _id,
      name,
      "slug": slug.current,
      brand->{ name, "slug": slug.current },
      capacity,
      voltage,
      warranty,
      shortDescription,
      images,
      specs
    }
  }`
)

