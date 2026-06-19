export default {
  name: 'serviceRequest',
  title: 'Service Requests',
  type: 'document',
  fields: [
    { name: 'service', title: 'Requested Service', type: 'string' },
    { name: 'name', title: 'Customer Name', type: 'string' },
    { name: 'phone', title: 'Phone Number', type: 'string' },
    { name: 'address', title: 'Address', type: 'string' },
    { name: 'message', title: 'Additional Instructions', type: 'text' },
    { name: 'submittedAt', title: 'Submitted At', type: 'datetime' },
    {
      name: 'emailNotificationSent',
      title: 'Email Notification Sent',
      type: 'boolean',
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
}
