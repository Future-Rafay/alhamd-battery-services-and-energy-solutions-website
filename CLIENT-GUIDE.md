# Alhamd Battery Services - Owner's Content Management Guide

Welcome to your website's content manager! Your site is powered by **Sanity Studio**, which allows you to update your product inventory, contact details, opening hours, and banner pictures without needing any developer assistance.

---

## 1. Accessing your Content Studio
1. Open your live website (e.g., `https://alhamdbatteryservices.com/studio`).
2. Log in using your Sanity account credentials (provided during handoff).
3. You will see a clean admin interface with **"Site Settings"** at the top, followed by other document types (Products, Categories, Brands, Banners, Services, Certificates, Testimonials, and FAQs).

---

## 2. Managing Your Inventory (Adding & Editing Products)
To add a new battery, inverter, or solar panel:
1. Under the **Content Manager** list, click on **Products**.
2. Click the green **"Create New"** button at the top right.
3. Fill in the fields:
   - **Product Name**: e.g., *Daewoo DLS-200 Tubular*
   - **Slug**: Click the **"Generate"** button beside it. This creates the URL path.
   - **Brand & Category**: Select from the dropdown lists. (If the brand doesn't exist, create it under "Brands" first).
   - **Capacity / Voltage / Warranty**: Enter details (e.g. *200Ah*, *12V*, *1 Year*).
   - **Short Description**: A brief 2-line summary shown on list cards.
   - **Full Description**: Detailed paragraphs shown on the product page.
   - **Product Images**: Click "Upload" to upload images. Check **Hotspot** to crop/focus the image.
   - **Featured Product Toggle**: Turn this on if you want it to appear on the homepage.
4. Click the green **"Publish"** button at the bottom. The website will update in seconds.

---

## 3. Swapping Homepage Banners
To update the slides or announcement banners at the top of the homepage:
1. Go to **Banners** under the admin list.
2. Click **Create New** or edit an existing banner.
3. Upload a high-quality picture (optimized automatically by our system).
4. Enter a **Headline** and **Subtext** (e.g. *Special Summer Discount on Tubular UPS Batteries*).
5. Add a CTA Link (e.g., `/products` or `/contact`).
6. Toggle the **Active** switch on or off to show/hide the banner. Click **Publish**.

---

## 4. Updating Store Address, Phone, & Hours (Site Settings)
Your contact info is pulled dynamically from a single document. If you change it there, it updates everywhere (Header, Footer, Contact Page, and SEO tags) instantly:
1. Select **Site Settings** at the very top of the admin list.
2. Edit details:
   - **Phone Support**: Double check the number format.
   - **WhatsApp Number**: Used for all "Get Quote" triggers.
   - **Shop Address**: Enter your physical store address.
   - **Business Hours**: Click each day to change timings or toggle "Closed" for Fridays.
   - **SEO Title & Description**: Keep keywords like "Saudabad Karachi Solar Batteries" for high Google search ranks.
3. Click **Publish**.

---

## 5. Uploading Dealer Certificates
Show off your authorized dealer credentials on the Certificates page:
1. Navigate to **Certificates** and click **Create New**.
2. Enter the **Certificate Title** (e.g. *AGS Authorized Retail Dealer 2026*).
3. Upload a scan or clear photo of the certificate.
4. Click **Publish**. It will automatically appear in the certificate gallery with zoomable lightbox support.

---

## 6. Inviting Staff/Editors to the Studio
If you want to allow employees to manage inventory without sharing administrator passwords:
1. Log in to [https://manage.sanity.io](https://manage.sanity.io).
2. Select your project.
3. Go to **Members** -> **Invite Member**.
4. Enter their email address and select the **Editor** role. Editors can create and publish products but cannot delete core structural layouts.
5. Click **Send Invitation**.







## Import Product CMD

node scripts/import-products.mjs