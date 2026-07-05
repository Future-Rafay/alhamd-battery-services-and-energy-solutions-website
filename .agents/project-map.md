# Project Map

## Shape

- `src/app/layout.tsx`: root metadata, fonts, global shell.
- `src/app/(site)/layout.tsx`: public site layout with header/footer and shared Sanity settings.
- `src/app/(site)/page.tsx`: homepage; fetches banners, categories, services, brands, testimonials, FAQs, gallery, certificates, and settings.
- `src/app/(site)/products/page.tsx`: product catalog with filters and pagination.
- `src/app/(site)/products/[slug]/page.tsx`: product detail page, related products, structured data, WhatsApp and phone CTAs.
- `src/app/(studio)/studio/[[...index]]/page.tsx`: embedded Sanity Studio.
- `src/app/actions/contact.ts`: contact form server action; sends EmailJS and writes `contactSubmission`.
- `src/app/actions/service-request.ts`: service booking server action; sends EmailJS and writes `serviceRequest`.
- `src/app/api/revalidate/route.ts`: Sanity webhook revalidation.
- `src/app/api/service-request/route.ts`: service request API route; reuses the service booking server action.

## CMS

- `src/sanity/schemas/*`: Sanity document schemas.
- `src/sanity/lib/queries.ts`: GROQ queries used by pages/components.
- `src/sanity/lib/client.ts`: Sanity client.
- `src/sanity/lib/live.ts`: `sanityFetch` helper.
- `src/sanity/lib/image.ts`: image URL builder.
- `sanity.config.ts`: Studio structure and schema registration.

## UI

- Shared layout: `src/components/layout/header.tsx`, `src/components/layout/footer.tsx`, `src/components/layout/whatsapp-float.tsx`.
- Shared building blocks: `src/components/shared/*`.
- shadcn-style primitives: `src/components/ui/*`.
- Homepage sections: `src/components/home/*`.
- Forms: `src/components/forms/contact-form.tsx`, `src/components/forms/service-request-form.tsx`; service requests accept Pakistan-wide addresses and explain that support is coordinated from Karachi through sub-distributors.
- Product-specific UI: `src/components/products/*`.
- Gallery/certificate/services client components live in their matching folders.

## Styling

- Global tokens and utility classes live in `src/app/globals.css`.
- Brand colors are primary blue, accent orange, accent yellow, white, and slate neutrals.
- Cards commonly use white backgrounds, slate borders, subtle shadows, and `rounded-lg`/`rounded-xl`.
- Keep text sizes compact inside cards, forms, sidebars, and sheets.

## Content Sources

- `src/lib/constants.ts`: fallback brand/service/FAQ constants.
- `public/page-banners/*`, `public/about/*`, `public/logo/*`: static visual assets.
- `CLIENT-GUIDE.md`: owner-facing CMS instructions.
- `EMAILJS-TEMPLATES.md`: paste-ready branded EmailJS HTML templates for contact and service request notifications.
- `README.md`: setup and deployment notes.
- `scripts/import-products.mjs`: imports `scripts/products-to-import.json` into Sanity.

## Gotchas

- README says Next.js 15+, but `package.json` currently uses Next `16.2.9`.
- Some files contain mojibake in comments/icons from earlier encoding issues. Avoid broad formatting churn unless fixing the touched code.
- `phone` and `whatsappNumber` are optional in some runtime paths; guard before calling string methods when touching those flows.
- Search/fetch failures often fall back to empty arrays or mock product data so pages still render.
