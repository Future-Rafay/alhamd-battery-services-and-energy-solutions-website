import { defineType, defineField } from 'sanity'

export const certificate = defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  icon: () => '📜',
  fields: [
    defineField({
      name: 'title',
      title: 'Certificate Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Certificate Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuedBy',
      title: 'Issued By',
      type: 'string',
      description: 'Organization that issued this certificate (optional)',
    }),
    defineField({
      name: 'dateIssued',
      title: 'Date Issued',
      type: 'date',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'issuedBy',
      media: 'image',
    },
  },
})
