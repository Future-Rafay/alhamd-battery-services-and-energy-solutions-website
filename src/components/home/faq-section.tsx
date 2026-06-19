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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center gap-3">
          <span className="text-accent-orange font-bold text-xs uppercase tracking-wider border-b-2 border-accent-orange pb-1">
            FAQ
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 max-w-lg">
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

        {/* View all button link */}
        <div className="text-center mt-10">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-accent-orange transition-colors"
          >
            <span>Have More Questions? View All FAQs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
