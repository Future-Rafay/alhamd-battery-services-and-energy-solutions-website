import { NextRequest, NextResponse } from 'next/server'
import { serviceRequestSchema } from '@/lib/validations/service-request'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate request body against Zod schema (includes Karachi check)
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

    const { service, name, phone, address, message } = result.data

    // Log the request to console (visible in Vercel)
    console.log(
      `[Service Request Booking] Service: ${service}, Customer: ${name}, Phone: ${phone}, Address: ${address}, Msg: ${message || 'None'}`
    )

    return NextResponse.json({ 
      success: true, 
      message: 'Booking request registered. We will call you within 2 hours.' 
    })
  } catch (error: any) {
    console.error('API Service Request route error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}
