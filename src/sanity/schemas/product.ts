import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: () => '🔋',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{ type: 'brand' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'reference',
      to: [{ type: 'subcategory' }],
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity (Ah / Watts)',
      type: 'string',
      description: 'e.g. "200Ah", "550W", "12V 200Ah"',
    }),
    defineField({
      name: 'voltage',
      title: 'Voltage',
      type: 'string',
      description: 'e.g. "12V", "24V", "48V"',
    }),
    defineField({
      name: 'warranty',
      title: 'Warranty',
      type: 'string',
      description: 'e.g. "2 Years", "5 Years Limited"',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief summary shown on product cards (max 200 characters)',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      rows: 6,
      description: 'Detailed product description shown on the product page',
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'spec',
          fields: [
            defineField({
              name: 'key',
              title: 'Specification Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Specification Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'key', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error('At least one product image is required'),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
      description: 'Show this product in featured sections on the homepage',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand.name',
      media: 'images.0',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Product',
        subtitle: subtitle ? `by ${subtitle}` : 'No brand',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [{ field: 'featured', direction: 'desc' }],
    },
  ],
})
