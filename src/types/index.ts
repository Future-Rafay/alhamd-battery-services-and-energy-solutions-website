export interface SiteSettings {
  businessName: string
  phone: string
  whatsappNumber: string
  email: string
  address: string
  mapEmbed?: string
  googleMapsLink?: string
  businessHours?: Array<{
    day: string
    hours: string
    isClosed?: boolean
  }>
  yearsInBusiness?: string
  socialLinks?: Array<{
    platform: string
    url: string
  }>
  seoTitle?: string
  seoDescription?: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  logo: any
  websiteLink?: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  image?: any
  subcategories?: Subcategory[]
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  parentSlug?: string
}

export interface Product {
  _id: string
  name: string
  slug: string
  brand: {
    name: string
    slug: string
    logo?: any
  }
  category: {
    _id?: string
    name: string
    slug: string
  }
  subcategory?: {
    name: string
    slug: string
  }
  capacity?: string
  voltage?: string
  warranty?: string
  shortDescription?: string
  fullDescription?: string
  specs?: Array<{
    key: string
    value: string
  }>
  images: any[]
  featured?: boolean
}

export interface Service {
  _id: string
  name: string
  slug: string
  description: string
  fullDescription?: string
  icon?: string
  image?: any
}

export interface Banner {
  headline: string
  subtext?: string
  image: any
  ctaText?: string
  ctaLink?: string
}

export interface Certificate {
  _id: string
  title: string
  image: any
  issuedBy?: string
  dateIssued?: string
}

export interface Testimonial {
  _id: string
  customerName: string
  designation?: string
  rating: number
  quote: string
}

export interface FAQ {
  _id: string
  question: string
  answer: string
}
