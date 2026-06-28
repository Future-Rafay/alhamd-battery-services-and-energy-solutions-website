'use client'


import Link from 'next/link'
import { ArrowRight, HelpCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQ } from '@/types'
import { FAQS } from '@/lib/constants'

interface FAQSectionProps {
  faqs: FAQ[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const hasCMSFaqs = faqs && faqs.length > 0
  const faqsList = hasCMSFaqs ? faqs : FAQS.slice(0, 4)

  return (
    <section className="py-20 px-4 bg-slate-50 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center gap-3">
          <span className="text-accent-orange font-bold text-xs md:text-sm uppercase tracking-wider border-b-2 border-accent-orange pb-1">
            FAQ
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            Answers to common questions about pricing, warranty terms, and installations.
          </p>
        </div>

        {/* Accordion list */}
        <Accordion className="w-full space-y-4">
          {faqsList.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-white border border-slate-200/60 rounded-xl px-6 shadow-sm overflow-hidden"
            >
              <AccordionTrigger className="font-heading font-bold text-sm sm:text-base text-primary hover:text-accent-orange text-left py-4 hover:no-underline [&[data-state=open]]:text-accent-orange [&[data-state=open]]:pb-2 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-slate-500 leading-relaxed pt-1 pb-4 border-t border-slate-100/50">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* button  */}
        <div className='flex items-center justify-center'>
          <Link
            href="/faq"
            className="mt-8 px-10 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-primary px-5 text-sm font-extrabold text-white shadow-sm transition-smooth hover:border-white hover:bg-white hover:text-primary"
          >
            View FAQ's
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
