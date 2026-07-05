# AGENTS.md

## Start Here

- Read this file before editing.
- Then skim [.agents/project-map.md](.agents/project-map.md) for routes, data flow, and common files.
- Keep changes small and aligned with existing components. Do not add new libraries unless the current stack cannot do it.

## Product Rules

- This is the Alhamd Battery Services and Energy Solutions public website.
- Keep the UI/UX consistent everywhere: reuse existing dialogs, forms, cards, buttons, badges, sheets, section headings, page heroes, and product cards before creating new patterns.
- Any return, reject, delete, cancel, danger, or irreversible action must be visually and physically away from routine primary actions so users do not tap it by mistake.
- Customer-facing text should stay clear, sales-focused, and relevant to batteries, solar, inverters, Karachi-based Pakistan-wide support, warranties, and quote-based pricing.
- Prices are intentionally quote-based. Do not add fixed prices unless the owner explicitly asks for pricing support.

## Stack

- Next.js App Router with TypeScript.
- Tailwind CSS v4 with shadcn-style UI primitives in `src/components/ui`.
- Sanity is the CMS and data source.
- Forms use React Hook Form, Zod, and server actions.
- Icons mostly use `lucide-react`; WhatsApp uses `react-icons/fa`.

## Code Rules

- Use `@/` imports.
- Use `cn()` from `src/lib/utils.ts` for class merging.
- Use existing shared components:
  - `src/components/shared/page-hero.tsx`
  - `src/components/shared/product-card.tsx`
  - `src/components/shared/section-heading.tsx`
  - `src/components/ui/*`
- Keep server data fetching in route/page server components unless client interactivity requires otherwise.
- When changing Sanity schema fields, update matching GROQ queries, TypeScript types, Studio/client docs if needed, and revalidation rules if the changed content affects routes.
- For App Router paths with parentheses or brackets in PowerShell, use `-LiteralPath`.
- Do not expose server tokens to the browser. Sanity write tokens and EmailJS private keys stay server-only.

## Data And Behavior Contracts

- `siteSettings` drives phone, WhatsApp, email, address, maps, hours, social links, and default SEO.
- Product schema fields include `name`, `slug`, `brand`, `category`, optional `subcategory`, `capacity`, `voltage`, `warranty`, descriptions, `specs`, `images`, and `featured`.
- Product listing filters use query params: `category`, `subcategory`, `brand`, `search`, and `page`.
- Product detail pages build WhatsApp messages for daily-rate inquiries.
- Contact and service request forms validate on client/server, write Sanity entries, send EmailJS notifications, and intentionally return customer-friendly success instead of exposing backend delivery failures. Service requests should accept Pakistan-wide addresses while explaining that Alhamd is based in Karachi and coordinates through sub-distributors. Check server logs for Sanity or EmailJS failures.
- Sanity webhooks hit `src/app/api/revalidate/route.ts` and revalidate tags plus relevant paths.
- Google reviews are fetched server-side through `src/app/api/google-reviews/route.ts` / `src/lib/google-reviews.ts` with hourly revalidation. Never expose the Places API key to client components.

## Commands

- Install: `npm install`
- Dev: `npm.cmd run dev`
- Build check: `npm.cmd run build`
- Lint check: `npm.cmd run lint`
- Sanity Studio route: `/studio`
- Product import: `node scripts/import-products.mjs`

## Environment

Use `.env.local.example` as the source for required variables. Important keys:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`
- `SANITY_API_WRITE_TOKEN`
- `SANITY_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_DOMAIN`
- `GOOGLE_PLACES_API_KEY`
- `GOOGLE_PLACE_ID`
- EmailJS keys used by server actions.

## Before Finishing

- Run the smallest relevant check. For most code changes, run `npm.cmd run lint`; for route, schema, or build-sensitive changes, run `npm.cmd run build`.
- If UI changed, inspect desktop and mobile behavior.
- If routes, APIs, schema contracts, or workflow rules changed, update this file or `.agents/project-map.md`.
