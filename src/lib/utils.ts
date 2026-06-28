import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSiteUrl() {
  let domain = process.env.NEXT_PUBLIC_SITE_DOMAIN

  // If domain is missing, default, or is incomplete (e.g. missing dot like "alhamdenergysolutions" on Vercel)
  if (!domain || domain === 'localhost:3000' || (!domain.includes('.') && !domain.includes('localhost'))) {
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      domain = process.env.VERCEL_PROJECT_PRODUCTION_URL
    } else if (process.env.VERCEL_URL) {
      domain = process.env.VERCEL_URL
    }
  }

  if (!domain) {
    domain = 'localhost:3000'
  }

  return domain.includes('localhost') ? `http://${domain}` : `https://${domain}`
}
