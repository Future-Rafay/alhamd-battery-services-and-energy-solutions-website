import { NextRequest, NextResponse } from 'next/server'
import { serviceRequestSchema } from '@/lib/validations/service-request'
import { submitServiceRequest } from '@/app/actions/service-request'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate request body against Zod schema.
    const result = serviceRequestSchema.safeParse(body)
    
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

    const submitResult = await submitServiceRequest(result.data)

    return NextResponse.json({ 
      success: true, 
      message: 'Booking request registered. We will call you within 2 hours.',
      status: submitResult.status,
    })
  } catch (error: any) {
    console.error('API Service Request route error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}
