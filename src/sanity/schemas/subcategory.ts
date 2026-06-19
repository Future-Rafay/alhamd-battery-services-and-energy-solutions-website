import { defineType, defineField } from 'sanity'

export const subcategory = defineType({
  name: 'subcategory',
  title: 'Subcategory',
  type: 'document',
  icon: () => '📁',
  fields: [
    defineField({
      name: 'name',
      title: 'Subcategory Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Subcategory Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
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
      title: 'name',
      parentName: 'parent.name',
      media: 'image',
    },
    prepare({ title, parentName, media }) {
      return {
        title: title || 'Untitled',
        subtitle: parentName ? `in ${parentName}` : 'No parent category',
        media,
      }
    },
  },
})
