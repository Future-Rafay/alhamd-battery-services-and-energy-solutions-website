'use server'

import { contactSchema, ContactInput } from '@/lib/validations/contact'
import { createClient } from 'next-sanity'

// Client configured specifically for writing (requires a token, does not use CDN)
const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-06-19',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

export async function submitContactForm(data: ContactInput) {
  try {
    // 1. Validate Input (throws if invalid, but since client already validates, this is a fallback)
    const parsed = contactSchema.parse(data)

    // 2. Perform Side Effects
    
    // EmailJS Task
    const emailPromise = fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          from_name: parsed.name,
          from_phone: parsed.phone,
          message: parsed.message,
          submitted_at: new Date().toISOString(),
        },
      }),
    }).then(async (res) => {
      if (!res.ok) {
        const text = await res.text()
        throw new Error(`EmailJS Error: ${res.status} ${text}`)
      }
      return res.text()
    })

    // Sanity Task
    const sanityPromise = (async () => {
      // Determine if email succeeds first without failing the sanity block if email rejects
      const emailSent = await emailPromise.then(() => true).catch(() => false)
      
      return sanityWriteClient.create({
        _type: 'contactSubmission',
        name: parsed.name,
        phone: parsed.phone,
        message: parsed.message,
        submittedAt: new Date().toISOString(),
        emailNotificationSent: emailSent,
      })
    })()

    const [emailResult, sanityResult] = await Promise.allSettled([emailPromise, sanityPromise])

    // 3. Log results server-side with full details
    console.log(
      '[ContactForm:Sanity]', 
      sanityResult.status === 'fulfilled' ? 'SUCCESS' : 'FAILED', 
      sanityResult.status === 'rejected' ? sanityResult.reason : ''
    )
    console.log(
      '[ContactForm:EmailJS]', 
      emailResult.status === 'fulfilled' ? 'SUCCESS' : 'FAILED', 
      emailResult.status === 'rejected' ? emailResult.reason : ''
    )

    // 4. Return status payload to client
    return {
      success: true,
      status: {
        sanity: sanityResult.status === 'fulfilled' ? 'SUCCESS' : 'FAILED',
        email: emailResult.status === 'fulfilled' ? 'SUCCESS' : 'FAILED',
      }
    }

  } catch (error) {
    // Catch-all for unexpected top-level errors (e.g. Zod validation failure, serialization)
    console.error('[ContactForm:Unexpected]', error)
    
    // We still return success: true to the client so the UI always shows the calm success confirmation.
    return {
      success: true,
      status: {
        sanity: 'FAILED',
        email: 'FAILED',
      }
    }
  }
}
