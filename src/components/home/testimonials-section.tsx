'use client'

import { Star, MessageSquare, ArrowRight } from 'lucide-react'
import { Testimonial } from '@/types'

const GoogleIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
)

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const defaultTestimonials = [
    {
      customerName: 'Qazi Jalil',
      designation: 'Verified Google Review • 5.0 Rating',
      rating: 5,
      quote: 'Best prices in Karachi on solar panels, batteries, inverters. The staff guides the customer in the best and most professional way. Highly recommended!',
    },
    {
      customerName: 'Atta Ullah',
      designation: 'Verified Google Review • 5.0 Rating',
      rating: 5,
      quote: 'Best price and all types of batteries available. Must recommend!',
    },
    {
      customerName: 'Shahbaz Hussain',
      designation: 'Verified Google Review • 5.0 Rating',
      rating: 5,
      quote: 'All battery types are available here at reasonable prices.',
    },
    {
      customerName: 'Zain Rajput',
      designation: 'Verified Google Review • 5.0 Rating',
      rating: 5,
      quote: 'Highly professional services and original energy products with authentic warranties.',
    },
    {
      customerName: 'Rafay Nadeem',
      designation: 'Verified Google Review • 5.0 Rating',
      rating: 5,
      quote: 'Excellent backup solutions, great pricing, and expert guidance on solar load sizing.',
    },
  ]

  const hasCMSTestimonials = testimonials && testimonials.length > 0
  
  // Merge CMS testimonials with Google reviews, avoiding duplicates, and limit to top 4
  const list = (
    hasCMSTestimonials
      ? [
          ...testimonials,
          ...defaultTestimonials.filter(
            (dt) => !testimonials.some((t) => t.customerName.toLowerCase() === dt.customerName.toLowerCase())
          ),
        ]
      : defaultTestimonials
  ).slice(0, 4)

  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center gap-4">
          <span className="text-accent-orange font-bold text-xs sm:text-sm uppercase tracking-wider border-b-2 border-accent-orange pb-1">
            Customer Reviews
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary">
            What Our Karachi Customers Say
          </h2>
          
          {/* Google Business Rating Badge */}
          {/* <a
            href="https://maps.app.goo.gl/2f3eSCFv6YgCyFx68"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 rounded-full px-4.5 py-1.5 hover:shadow-sm hover:border-slate-300 transition-all duration-300"
          >
            <GoogleIcon />
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs text-slate-800">5.0</span>
              <div className="flex items-center text-accent-yellow">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-[11px] text-slate-500 font-medium">(5.0/5.0 based on Google Reviews)</span>
            </div>
          </a> */}

          <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            Read reviews and feedback from verified local buyers, homeowners, and business owners who trust Alhamd for their batteries and solar energy needs.
          </p>
        </div>

        {/* Testimonials Grid on Desktop, Overflow Carousel on Mobile */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-thin scrollbar-thumb-primary/20 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:pb-0">
          {list.map((item, idx) => {
            return (
              <div
                key={idx}
                className="min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] md:min-w-0 md:w-full snap-start group bg-slate-50/40 rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-primary/20 hover:bg-white transition-all duration-300 h-full relative"
              >

                <div className="flex flex-col gap-4 relative z-10">
                  {/* Rating stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 fill-current ${
                          i < item.rating ? 'text-accent-yellow' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-slate-600 text-xs sm:text-sm italic leading-relaxed">
                    "{item.quote}"
                  </blockquote>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold font-heading text-xs shrink-0">
                      {item.customerName.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-heading font-bold text-xs sm:text-sm text-primary truncate">{item.customerName}</div>
                      <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium truncate">{item.designation}</div>
                    </div>
                  </div>
                  {/* Google G-logo indicator for authenticity */}
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white border border-slate-100 shadow-sm shrink-0">
                    <GoogleIcon />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Action Button to Google Maps Review Page */}
        <div className="flex items-center justify-center mt-10">
          <a
            href="https://maps.app.goo.gl/2f3eSCFv6YgCyFx68"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-primary text-sm font-extrabold text-white shadow-sm transition-smooth hover:border-primary hover:bg-white hover:text-primary"
          >
            Write a Google Review
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
