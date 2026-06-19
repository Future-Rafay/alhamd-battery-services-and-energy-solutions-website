import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      initialValue: 'Alhamd Battery Services and Energy Solutions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '+92 322 2592589',
      description: 'Format: +92 322 2592589',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      initialValue: '+92 312 1141703',
      description: 'Format: +92 312 1141703',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'alhamdes@hotmail.com',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'address',
      title: 'Shop Address',
      type: 'text',
      rows: 3,
      initialValue: 'Shop No. C-22/3, Begum Khursheed Road, Saudabad, Baraf Khana, S1 Saudabad, Karachi, Pakistan',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mapEmbed',
      title: 'Google Maps Embed iframe',
      type: 'text',
      rows: 4,
      initialValue: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.100049739101!2d67.1912107!3d24.894568699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb3370017cac591%3A0xbd39731246e60d6c!2sAlhamd%20energy%20solutions!5e0!3m2!1sen!2s!4v1781877819867!5m2!1sen!2s" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
      description: 'The standard iframe tag copied from Google Maps Embed share options.',
    }),
    defineField({
      name: 'googleMapsLink',
      title: 'Google Maps Profile Link',
      type: 'url',
      initialValue: 'https://maps.app.goo.gl/wmQcFeBncBiG3KZn8',
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dayHours',
          fields: [
            defineField({ name: 'day', title: 'Day', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'hours', title: 'Hours', type: 'string', description: 'e.g. "10:00 AM – 10:00 PM" or "Closed"' }),
            defineField({ name: 'isClosed', title: 'Closed', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: { title: 'day', hours: 'hours', isClosed: 'isClosed' },
            prepare({ title, hours, isClosed }) {
              return {
                title,
                subtitle: isClosed ? 'Closed' : hours || 'Not set',
              }
            },
          },
        },
      ],
      initialValue: [
        { day: 'Monday', hours: '10:00 AM – 10:00 PM', isClosed: false },
        { day: 'Tuesday', hours: '10:00 AM – 10:00 PM', isClosed: false },
        { day: 'Wednesday', hours: '10:00 AM – 10:00 PM', isClosed: false },
        { day: 'Thursday', hours: '10:00 AM – 10:00 PM', isClosed: false },
        { day: 'Friday', hours: 'Closed', isClosed: true },
        { day: 'Saturday', hours: '10:00 AM – 10:00 PM', isClosed: false },
        { day: 'Sunday', hours: '10:00 AM – 10:00 PM', isClosed: false },
      ],
    }),
    defineField({
      name: 'yearsInBusiness',
      title: 'Years in Business / Establishment Text',
      type: 'string',
      initialValue: 'Established March 2025',
      description: 'e.g. "Established March 2025" or "Serving Karachi since 2025"',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string', description: 'Facebook, Instagram, LinkedIn, etc.' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'Default SEO Title',
      type: 'string',
      initialValue: 'Alhamd Battery Services and Energy Solutions - Batteries & Solar in Karachi',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default SEO Description',
      type: 'text',
      rows: 2,
      initialValue: 'Authorized distributor of branded batteries (AGS, Osaka, Daewoo, Exide) and solar panels (LONGi, JinkoSolar) in Saudabad, Karachi. Contact us for wholesale and retail quotes.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
