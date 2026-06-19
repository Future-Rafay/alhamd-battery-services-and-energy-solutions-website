'use client'


import { Star, MessageSquare } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Testimonial } from '@/types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const defaultTestimonials = [
    {
      customerName: 'Muhammad Salman',
      designation: 'Resident, Saudabad, Karachi',
      rating: 5,
      quote: 'Excellent customer service! I bought a Daewoo Maintenance Free battery for my car. They checked my generator current, fitted the battery, and gave me an official warranty card. The shop is professional and honest.',
    },
    {
      customerName: 'Kashif Ali',
      designation: 'Solar Home Owner, Landhi',
      rating: 5,
      quote: 'Bought 8 panels of LONGi Hi-MO 6 and an Inverex hybrid inverter from Alhamd. They calculated my home load and recommended the right capacity. System is running perfectly for 6 months. Clean shop and original materials.',
    },
    {
      customerName: 'Farhan Sheikh',
      designation: 'Shop Owner, Saudabad Market',
      rating: 5,
      quote: 'Best rates for tubular batteries in Saudabad. I replaced my old UPS battery with an AGS battery. Their trading/discount offer for old batteries is very good. Recommended business for backup solutions.',
    },
  ]

  const hasCMSTestimonials = testimonials && testimonials.length > 0
  const list = hasCMSTestimonials ? testimonials : defaultTestimonials

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col items-center gap-3">
          <span className="text-accent-orange font-bold text-xs uppercase tracking-wider border-b-2 border-accent-orange pb-1">
            Customer Reviews
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary">
            What Our Karachi Customers Say
          </h2>
          <p className="text-sm text-slate-500">
            Reviews from verified local buyers and solar panel system owners.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((item, idx) => (
            <Card
              key={idx}
              className="border border-slate-200/60 rounded-xl bg-slate-50/50 p-6 flex flex-col justify-between hover:shadow-md transition-smooth min-h-[220px]"
            >
              <CardContent className="p-0 flex flex-col gap-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4.5 h-4.5 fill-current ${
                        i < item.rating ? 'text-accent-yellow' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                
                <blockquote className="text-slate-600 text-xs sm:text-sm italic leading-relaxed">
                  "{item.quote}"
                </blockquote>
              </CardContent>
              
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center font-bold font-heading text-sm">
                  {item.customerName.charAt(0)}
                </div>
                <div>
                  <div className="font-heading font-bold text-sm text-primary">{item.customerName}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{item.designation}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
