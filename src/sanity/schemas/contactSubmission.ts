export default {
  name: 'contactSubmission',
  title: 'Contact Submissions',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'phone', type: 'string' },
    { name: 'message', type: 'text' },
    { name: 'submittedAt', type: 'datetime' },
    { name: 'emailNotificationSent', type: 'boolean', initialValue: false },
  ],
}
