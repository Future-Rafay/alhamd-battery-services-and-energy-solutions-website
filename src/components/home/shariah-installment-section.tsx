import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const points = [
  'Shariah-compliant plan structure with clear terms before approval.',
  'Suitable for solar panels, lithium batteries, inverters, and backup systems.',
  'Quote-based guidance from Alhamd for Karachi and Pakistan-wide customers.',
]

export function ShariahInstallmentSection() {
  return (
    <section className="py-20 px-4 bg-white border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto grid items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-accent-orange font-bold text-xs md:text-sm uppercase tracking-wider border-l-4 border-accent-orange pl-3">
              Easy Energy Ownership
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary leading-tight">
              Islamic Shariah-Compliant Installment Plan
            </h2>
            <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
              Alhamd helps homeowners, shops, offices, and commercial buyers move to reliable backup power with a transparent installment option. Get genuine batteries, solar systems, and inverter solutions with warranty-backed support and a plan explained clearly before you commit.
            </p>
          </div>

          <div className="grid gap-3">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-3 text-sm text-slate-600">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-orange" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg border border-slate-200 bg-primary px-5 text-sm font-extrabold text-white shadow-sm transition-smooth hover:border-primary hover:bg-white hover:text-primary"
          >
            Ask for Installment Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200/60 bg-slate-100 shadow-sm">
          <Image
            src="/images/shariah-installments-alhamd.png"
            alt="Alhamd Shariah-compliant installment plan for solar batteries and energy systems"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
