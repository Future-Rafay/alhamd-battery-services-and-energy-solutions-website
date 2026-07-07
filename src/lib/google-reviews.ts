import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

export interface GoogleReview {
  author_name: string
  author_url?: string
  profile_photo_url?: string
  rating: number
  time?: number
  relative_time_description?: string
  text?: string
}

export interface GoogleReviewsResponse {
  reviews: GoogleReview[]
  rating: number | null
  user_ratings_total: number | null
  googleMapsUrl: string | null
  error?: string
}

interface CachedGoogleReviewsResponse extends GoogleReviewsResponse {
  fetchedAt: string
}

const CACHE_PATH = path.join(process.cwd(), 'data', 'google-reviews.json')
const CACHE_TTL = 60 * 60 * 1000

const emptyGoogleReviews = (googleMapsUrl: string | null): GoogleReviewsResponse => ({
  reviews: [],
  rating: null,
  user_ratings_total: null,
  googleMapsUrl,
})

async function readCachedReviews(): Promise<CachedGoogleReviewsResponse | null> {
  try {
    const cached = JSON.parse(await readFile(CACHE_PATH, 'utf8'))
    return typeof cached?.fetchedAt === 'string' && Array.isArray(cached?.reviews) ? cached : null
  } catch {
    return null
  }
}

async function writeCachedReviews(data: CachedGoogleReviewsResponse) {
  try {
    await mkdir(path.dirname(CACHE_PATH), { recursive: true })
    await writeFile(CACHE_PATH, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  } catch {
    // keep serving the in-memory fresh response or previous file
  }
}

function mergeReviews(fresh: GoogleReview[], cached: GoogleReview[] = []) {
  const seen = new Set<string>()
  return [...fresh, ...cached].filter((review) => {
    const key = review.author_url || `${review.author_name}-${review.time || review.relative_time_description || ''}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

async function fetchFreshGoogleReviews(): Promise<GoogleReviewsResponse | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  const googleMapsUrl = placeId ? `https://www.google.com/maps/place/?q=place_id:${placeId}` : null

  if (!apiKey || !placeId) {
    return null
  }

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
    url.searchParams.set('place_id', placeId)
    url.searchParams.set('fields', 'reviews,rating,user_ratings_total')
    url.searchParams.set('key', apiKey)

    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
      return null
    }

    const data = await res.json()

    if (data.status && data.status !== 'OK') {
      return null
    }

    return {
      reviews: Array.isArray(data.result?.reviews) ? data.result.reviews.slice(0, 5) : [],
      rating: typeof data.result?.rating === 'number' ? data.result.rating : null,
      user_ratings_total:
        typeof data.result?.user_ratings_total === 'number' ? data.result.user_ratings_total : null,
      googleMapsUrl,
    }
  } catch {
    return null
  }
}

export async function fetchGoogleReviews(): Promise<GoogleReviewsResponse> {
  const placeId = process.env.GOOGLE_PLACE_ID
  const googleMapsUrl = placeId ? `https://www.google.com/maps/place/?q=place_id:${placeId}` : null
  const cached = await readCachedReviews()
  const cachedTime = cached ? new Date(cached.fetchedAt).getTime() : 0

  if (cached && Date.now() - cachedTime < CACHE_TTL) {
    return cached
  }

  const fresh = await fetchFreshGoogleReviews()

  if (!fresh) {
    return cached || emptyGoogleReviews(googleMapsUrl)
  }

  const nextCache = {
    ...fresh,
    reviews: mergeReviews(fresh.reviews, cached?.reviews).slice(0, 5),
    fetchedAt: new Date().toISOString(),
  }

  await writeCachedReviews(nextCache)
  return nextCache
}
