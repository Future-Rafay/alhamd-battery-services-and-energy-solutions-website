import { Star } from 'lucide-react'
import { Testimonial } from '@/types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials?.length) return null

  const list = testimonials.slice(0, 4)

  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center gap-4">
          <span className="text-accent-orange font-bold text-xs sm:text-sm uppercase tracking-wider border-b-2 border-accent-orange pb-1">
            Customer Reviews
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary">
            What Our Karachi Customers Say
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            Read reviews and feedback from verified local buyers, homeowners, and business owners who trust Alhamd for their batteries and solar energy needs.
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-thin scrollbar-thumb-primary/20 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:pb-0">
          {list.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] md:min-w-0 md:w-full snap-start group bg-slate-50/40 rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-primary/20 hover:bg-white transition-all duration-300 h-full relative"
            >
              <div className="flex flex-col gap-4 relative z-10">
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
                  &quot;{item.quote}&quot;
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
