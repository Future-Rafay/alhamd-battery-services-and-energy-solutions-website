export interface GoogleReview {
  author_name: string
  author_url?: string
  profile_photo_url?: string
  rating: number
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

export async function fetchGoogleReviews(): Promise<GoogleReviewsResponse> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  const googleMapsUrl = placeId ? `https://www.google.com/maps/place/?q=place_id:${placeId}` : null

  if (!apiKey || !placeId) {
    return {
      reviews: [],
      rating: null,
      user_ratings_total: null,
      googleMapsUrl,
      error: 'Google Places API is not configured.',
    }
  }

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
    url.searchParams.set('place_id', placeId)
    url.searchParams.set('fields', 'reviews,rating,user_ratings_total')
    url.searchParams.set('key', apiKey)

    const res = await fetch(url, { next: { revalidate: 3600 } })

    if (!res.ok) {
      return {
        reviews: [],
        rating: null,
        user_ratings_total: null,
        googleMapsUrl,
        error: `Google Places API returned ${res.status}.`,
      }
    }

    const data = await res.json()

    if (data.status && data.status !== 'OK') {
      return {
        reviews: [],
        rating: null,
        user_ratings_total: null,
        googleMapsUrl,
        error: data.error_message || `Google Places API status: ${data.status}`,
      }
    }

    return {
      reviews: Array.isArray(data.result?.reviews) ? data.result.reviews.slice(0, 5) : [],
      rating: typeof data.result?.rating === 'number' ? data.result.rating : null,
      user_ratings_total:
        typeof data.result?.user_ratings_total === 'number' ? data.result.user_ratings_total : null,
      googleMapsUrl,
      error: Array.isArray(data.result?.reviews) ? undefined : 'Google reviews are unavailable.',
    }
  } catch (error) {
    return {
      reviews: [],
      rating: null,
      user_ratings_total: null,
      googleMapsUrl,
      error: error instanceof Error ? error.message : 'Google reviews are unavailable.',
    }
  }
}
