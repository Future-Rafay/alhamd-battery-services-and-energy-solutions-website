import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string
      slug?: { current?: string }
    }>(req, process.env.SANITY_WEBHOOK_SECRET)

    // Log the revalidation trigger attempt
    console.log(`[Revalidation Webhook] Received webhook trigger for: ${body?._type || 'unknown type'}`)

    if (!isValidSignature) {
      console.warn('[Revalidation Webhook] Invalid signature verification attempt')
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad Request: Missing body document type', { status: 400 })
    }

    // 1. Tag-based revalidation (clears queries that fetch these types)
    revalidateTag(body._type, { expire: 0 })
    console.log(`[Revalidation Webhook] Invalidated cache tag: ${body._type}`)

    // 2. Path-based revalidation for dynamic routes
    if (body._type === 'product' && body.slug?.current) {
      revalidatePath(`/products/${body.slug.current}`)
      console.log(`[Revalidation Webhook] Invalidated path: /products/${body.slug.current}`)
    }

    // 3. Global singletons trigger revalidation of root layouts
    if (body._type === 'siteSettings' || body._type === 'banner' || body._type === 'service') {
      revalidatePath('/', 'layout')
      console.log(`[Revalidation Webhook] Invalidated root layout for global singleton changes`)
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err: any) {
    console.error('[Revalidation Webhook] Error processing revalidation:', err)
    return new NextResponse(`Error revalidating: ${err.message || err}`, { status: 500 })
  }
}
