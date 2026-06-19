import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations/contact'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate request body against Zod schema
    const result = contactSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed', 
          errors: result.error.flatten().fieldErrors 
        }, 
        { status: 400 }
      )
    }

    const { name, phone, message } = result.data

    // In a real-world scenario, you would send this to an email API (e.g. Resend, Sendgrid) 
    // or push to a database or Sanity database itself.
    // For now we will mock save it by writing to console logs (visible in Vercel panel).
    console.log(`[Contact Form Submission] Name: ${name}, Phone: ${phone}, Message: ${message}`)

    return NextResponse.json({ 
      success: true, 
      message: 'Your message has been received. We will contact you shortly.' 
    })
  } catch (error: any) {
    console.error('API Contact route error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}
