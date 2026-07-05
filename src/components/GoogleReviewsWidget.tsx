import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, UserCircle } from 'lucide-react'
import { fetchGoogleReviews, GoogleReview } from '@/lib/google-reviews'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-accent-yellow">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < Math.round(rating) ? 'fill-current' : 'text-slate-200'}`}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, googleMapsUrl }: { review: GoogleReview; googleMapsUrl: string | null }) {
  const reviewUrl = review.author_url || googleMapsUrl || 'https://www.google.com/maps'
  const isLong = (review.text?.length || 0) > 180

  return (
    <article className="min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] md:min-w-0 md:w-full snap-start group bg-slate-50/40 rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-primary/20 hover:bg-white transition-all duration-300 h-full relative">
      <div className="flex flex-col gap-4 relative z-10">
        <Stars rating={review.rating} />
        <p className="max-h-28 overflow-y-auto pr-2 text-slate-600 text-xs sm:text-sm italic leading-relaxed">
          &quot;{review.text || 'Reviewed on Google.'}&quot;
        </p>
        {isLong && (
          <Link href={reviewUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary hover:text-accent-orange">
            Read more
          </Link>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-3 relative z-10">
        {review.profile_photo_url ? (
          <Image
            src={review.profile_photo_url}
            alt={`${review.author_name} profile photo`}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full shrink-0"
            unoptimized
          />
        ) : (
          <UserCircle className="w-8 h-8 text-primary/60 shrink-0" />
        )}
        <div className="overflow-hidden">
          <div className="font-heading font-bold text-xs sm:text-sm text-primary truncate">{review.author_name}</div>
          <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium truncate">
            {review.relative_time_description || 'Google review'}
          </div>
        </div>
      </div>
    </article>
  )
}

function GoogleReviewsSkeleton() {
  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center gap-4">
          <div className="h-4 w-32 rounded bg-slate-100" />
          <div className="h-8 w-72 rounded bg-slate-100" />
          <div className="h-4 w-full max-w-md rounded bg-slate-100" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-56 rounded-2xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  )
}

async function GoogleReviewsContent() {
  const data = await fetchGoogleReviews()

  if (!data.reviews.length) {
    return (
      <section className="py-16 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary">Google Reviews</h2>
          <p className="mt-4 text-sm text-slate-500">Reviews are temporarily unavailable.</p>
          {data.googleMapsUrl && (
            <Link href={data.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-extrabold text-white hover:bg-primary/95">
              View on Google Maps
            </Link>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center gap-4">
          <span className="text-accent-orange font-bold text-xs sm:text-sm uppercase tracking-wider border-b-2 border-accent-orange pb-1">
            Google Reviews
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary">
            What Customers Say on Google
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500">
            {data.rating && <span className="font-extrabold text-primary">{data.rating.toFixed(1)}</span>}
            {data.rating && <Stars rating={data.rating} />}
            {data.user_ratings_total && <span>based on {data.user_ratings_total} reviews</span>}
          </div>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-thin scrollbar-thumb-primary/20 md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-6 md:pb-0">
          {data.reviews.map((review) => (
            <ReviewCard key={`${review.author_name}-${review.relative_time_description}`} review={review} googleMapsUrl={data.googleMapsUrl} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function GoogleReviewsWidget() {
  return (
    <Suspense fallback={<GoogleReviewsSkeleton />}>
      <GoogleReviewsContent />
    </Suspense>
  )
}
