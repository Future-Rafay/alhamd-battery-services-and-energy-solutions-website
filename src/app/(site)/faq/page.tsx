import { sanityFetch } from '@/sanity/lib/live'
import { FAQS_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQS } from '@/lib/constants'
import { getFAQPageSchema } from '@/lib/structured-data'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'FAQ | Alhamd Battery Services and Energy Solutions',
  description: 'Common pre-sale questions answered. Understand how our Contact for Price quotes, warranty processing, and solar maintenance services work in Karachi.',
}

export default async function FAQPage() {
  let faqs: any[] = []
  let settings: any = null

  try {
    const [faqsRes, settingsRes] = await Promise.all([
      sanityFetch({ query: FAQS_QUERY }),
      sanityFetch({ query: SITE_SETTINGS_QUERY })
    ])
    faqs = faqsRes.data || []
    settings = settingsRes.data || null
  } catch (error) {
    console.error('Error fetching FAQs for FAQ page:', error)
  }

  // Fallbacks
  const faqsList = faqs.length > 0 ? faqs : FAQS
  const whatsapp = settings?.whatsappNumber || '+92 312 1141703'
  const formattedWhatsapp = whatsapp.replace(/[^\d+]/g, '')

  const faqSchema = getFAQPageSchema(faqsList)

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      {/* FAQ Schema injection */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col items-center gap-3">
          <span className="text-accent-orange font-bold text-xs uppercase tracking-wider border-b-2 border-accent-orange pb-1">
            FAQ Guide
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Everything you need to know about pricing, purchase policies, warranties, and our Karachi service areas.
          </p>
        </div>

        {/* Accordions */}
        <Accordion className="w-full space-y-4">
          {faqsList.map((faq, index) => (
            <AccordionItem
              key={faq._id || index}
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

        {/* CTA help box */}
        <div className="bg-primary text-white rounded-xl p-8 mt-12 text-center flex flex-col items-center gap-4 shadow-lg shadow-primary/10">
          <h3 className="font-heading font-bold text-lg sm:text-xl">Still Have Questions?</h3>
          <p className="text-xs sm:text-sm text-white/80 max-w-md leading-relaxed">
            Our support agents are active on WhatsApp between 10:00 AM and 10:00 PM (except Fridays) to answer direct queries instantly.
          </p>
          <a
            href={`https://wa.me/${formattedWhatsapp}?text=Hi! I have a question not listed in your FAQ.`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: 'default', size: 'lg' }),
              'bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold px-8 mt-2 shadow-md'
            )}
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
