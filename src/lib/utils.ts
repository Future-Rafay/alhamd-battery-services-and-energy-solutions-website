import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSiteUrl() {
  const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'localhost:3000'
  return domain.includes('localhost') ? `http://${domain}` : `https://${domain}`
}
