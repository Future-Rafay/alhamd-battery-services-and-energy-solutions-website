# Alhamd Battery Services and Energy Solutions - Web App

A production-ready business website built using Next.js 15+ (App Router), TypeScript, Tailwind CSS (v4), shadcn/ui, React Hook Form, Zod, and Sanity.io.

## Features

- **Embedded Sanity Studio**: Deployed directly under the `/studio` endpoint, allowing the client to manage inventory, categories, homepage banners, testimonials, certificates, and site-wide metadata easily.
- **On-Demand ISR (Incremental Static Regeneration)**: Configured using Sanity Webhooks to invalidate Next.js caches on tag and path levels, making updates live in seconds.
- **Advanced Local SEO**: Auto-generated dynamic `sitemap.xml`, proper heading structure, and built-in JSON-LD structured data (`LocalBusiness`, `Product`, and `FAQPage`).
- **Pakistani Form Validation**: React Hook Form + Zod resolvers checking mobile phone formats and strictly restricting service requests to Karachi limits.
- **Custom Visual Brand Aesthetics**: Dominant primary blue branding with accent orange highlights matching authentic tangible retail shops.
- **Floating WhatsApp Integration**: Floating, persistent chat button with pre-filled product inquiry context.

---

## 1. Getting Started Locally

### Prerequisites
- Node.js 20+ installed.
- npm installed (package manager).

### Installation
1. Clone the project workspace.
2. Run npm install to download packages:
   ```bash
   npm install
   ```

### Setup Environment Variables
Create a `.env.local` file in the root directory (based on `.env.local.example`):
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_sanity_read_token_here
SANITY_WEBHOOK_SECRET=alhamd_reval_secret_2026
```

### Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The website will load with mock data if the Sanity project does not have content.
Access the embedded Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio).

---

## 2. Deploying to Production (Vercel + Sanity)

### Step A: Configure CORS Origins on Sanity
For Sanity Studio to save changes when running on a custom domain, you must whitelist the domain:
1. Log in to [https://manage.sanity.io](https://manage.sanity.io).
2. Choose your project (``).
3. Navigate to **API** -> **CORS Origins** -> **Add CORS Origin**.
4. Enter your Vercel URL (e.g. `https://alhamdbatteryservices.vercel.app` or custom domain `https://alhamdbatteryservices.com`).
5. Select **Allow credentials** and click **Save**.

### Step B: Setup On-Demand Revalidation Webhook
To ensure published content updates on the live website instantly:
1. On [https://manage.sanity.io](https://manage.sanity.io), go to your project.
2. Select **API** -> **Webhooks** -> **Create Webhook**.
3. Configure the webhook settings:
   - **Name**: Next.js Revalidation
   - **URL**: `https://your-domain.com/api/revalidate` (Replace with your live domain)
   - **Dataset**: `production`
   - **Trigger on**: `Create`, `Update`, `Delete`
   - **Filter**: `_type in ["product", "category", "subcategory", "brand", "banner", "service", "certificate", "testimonial", "faq", "siteSettings"]`
   - **Projection**: `{_type, "slug": slug.current}`
   - **Secret**: `alhamd_reval_secret_2026` (Must match the `SANITY_WEBHOOK_SECRET` environment variable)
4. Click **Create Webhook**.

---

## 3. Preparation for Future E-Commerce

The content models (`product` schema) are built with attributes like `capacity`, `voltage`, `brand`, and `warranty` to organize inventory. If you choose to expand into online checkouts down the line:
1. **Extend Schemas**: Add `price` (number), `stock` (number), and `sku` (string) fields directly inside `src/sanity/schemas/product.ts`.
2. **Integrate Payments**: Setup a payment gateway provider relevant to Pakistan (e.g., **Nayapay**, **Sadapay**, **Alfalah IPG**, or **JazzCash/EasyPaisa API**) inside a new API checkout endpoint (`src/app/api/checkout/route.ts`).
3. **Cart System**: Layer a simple zustand-based shopping cart on the frontend while pulling product validation directly from the Sanity client during order creation.
