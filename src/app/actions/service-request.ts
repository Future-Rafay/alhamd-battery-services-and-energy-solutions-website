'use server'

import { serviceRequestSchema, ServiceRequestInput } from '@/lib/validations/service-request'
import { createClient } from 'next-sanity'

// Server-only write client — token never reaches the browser
const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-06-19',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

export async function submitServiceRequest(data: ServiceRequestInput) {
  try {
    // Server-side Zod validation (belt-and-suspenders fallback)
    const parsed = serviceRequestSchema.parse(data)

    // --- EmailJS ---
    const emailPromise = fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_SERVICE_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          request_type: 'Service Booking',
          service_name: parsed.service,
          from_name: parsed.name,
          from_phone: parsed.phone,
          address: parsed.address,
          message: parsed.message || 'No additional instructions provided.',
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

    // --- Sanity write ---
    // Resolves after emailPromise so we can record emailNotificationSent truthfully
    const sanityPromise = (async () => {
      const emailSent = await emailPromise.then(() => true).catch(() => false)
      return sanityWriteClient.create({
        _type: 'serviceRequest',
        service: parsed.service,
        name: parsed.name,
        phone: parsed.phone,
        address: parsed.address,
        message: parsed.message ?? '',
        submittedAt: new Date().toISOString(),
        emailNotificationSent: emailSent,
      })
    })()

    const [emailResult, sanityResult] = await Promise.allSettled([emailPromise, sanityPromise])

    // Full detail to server logs (Vercel function logs)
    console.log(
      '[ServiceRequest:Sanity]',
      sanityResult.status === 'fulfilled' ? 'SUCCESS' : 'FAILED',
      sanityResult.status === 'rejected' ? sanityResult.reason : '',
    )
    console.log(
      '[ServiceRequest:EmailJS]',
      emailResult.status === 'fulfilled' ? 'SUCCESS' : 'FAILED',
      emailResult.status === 'rejected' ? emailResult.reason : '',
    )

    // Status-only payload back to client for browser console
    return {
      success: true,
      status: {
        sanity: sanityResult.status === 'fulfilled' ? 'SUCCESS' : 'FAILED',
        email: emailResult.status === 'fulfilled' ? 'SUCCESS' : 'FAILED',
      },
    } as const

  } catch (error) {
    // Catch-all: unexpected error (e.g. Zod parse fail from direct call, serialization)
    console.error('[ServiceRequest:Unexpected]', error)

    // Always return success to the client — never expose errors past validation
    return {
      success: true,
      status: { sanity: 'FAILED', email: 'FAILED' },
    } as const
  }
}
