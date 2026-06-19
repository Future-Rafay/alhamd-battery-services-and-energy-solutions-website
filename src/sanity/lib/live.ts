import { client } from './client'

interface FetchParams {
  query: string
  params?: Record<string, any>
  tags?: string[]
}

export async function sanityFetch({ query, params = {}, tags = [] }: FetchParams) {
  // Determine cache tags based on query type or passed tags
  // We can automatically tag with the document type if it exists in the query
  const inferredTags = [...tags]
  if (query.includes('_type == "product"')) inferredTags.push('product')
  if (query.includes('_type == "category"')) inferredTags.push('category')
  if (query.includes('_type == "subcategory"')) inferredTags.push('subcategory')
  if (query.includes('_type == "brand"')) inferredTags.push('brand')
  if (query.includes('_type == "banner"')) inferredTags.push('banner')
  if (query.includes('_type == "service"')) inferredTags.push('service')
  if (query.includes('_type == "certificate"')) inferredTags.push('certificate')
  if (query.includes('_type == "testimonial"')) inferredTags.push('testimonial')
  if (query.includes('_type == "faq"')) inferredTags.push('faq')
  if (query.includes('_type == "siteSettings"')) inferredTags.push('siteSettings')

  const data = await client.fetch(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600, // Cache for 1 hour in production, bypass in development
      tags: inferredTags,
    },
  })
  
  return { data }
}

// Placeholder for page compatibility
export function SanityLive() {
  return null
}
