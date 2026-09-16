export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

declare global {
  interface Window {
    fbq?: {
      (action: 'init', pixelId: string, options?: Record<string, unknown>): void
      (action: 'track', eventName: string, params?: Record<string, unknown>): void
      (action: 'trackCustom', eventName: string, params?: Record<string, unknown>): void
      push?: (...args: unknown[]) => void
      loaded?: boolean
      version?: string
      queue?: unknown[]
    }
    _fbq?: unknown
  }
}

/**
 * Trigger standard PageView event.
 */
export const pageview = (): void => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView')
  }
}

/**
 * Standard Meta Pixel event types for future use.
 */
export type StandardEventName =
  | 'PageView'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact'

/**
 * Trigger standard Meta Pixel event.
 */
export const event = (name: StandardEventName, options: Record<string, unknown> = {}): void => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', name, options)
  }
}

/**
 * Trigger custom Meta Pixel event.
 */
export const customEvent = (name: string, options: Record<string, unknown> = {}): void => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', name, options)
  }
}
