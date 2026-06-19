import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'designation',
      title: 'Designation / Location',
      type: 'string',
      description: 'e.g. "Local Resident, Saudabad" or "Solar Customer, Karachi"',
      initialValue: 'Karachi Customer',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: true,
      description: 'Show on the homepage testimonials slider',
    }),
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'quote',
      rating: 'rating',
    },
    prepare({ title, subtitle, rating }) {
      return {
        title: title || 'Anonymous',
        subtitle: `${'★'.repeat(rating || 5)} — ${subtitle || ''}`,
      }
    },
  },
})
