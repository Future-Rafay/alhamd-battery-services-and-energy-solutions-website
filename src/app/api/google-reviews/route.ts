import { fetchGoogleReviews } from '@/lib/google-reviews'

export async function GET() {
  return Response.json(await fetchGoogleReviews())
}
