import { z } from 'zod'

export const serviceRequestSchema = z.object({
  service: z.string({
    message: 'Please select a service',
  }).min(1, 'Please select a service'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^((\+92)|(0092)|(0))?3[0-9]{9}$/, 'Please enter a valid Pakistani mobile number (e.g. 03222592589 or +923222592589)'),
  address: z
    .string()
    .min(10, 'Address must be at least 10 characters')
    .refine(
      (val) => val.toLowerCase().includes('karachi'),
      {
        message: 'We currently only service Karachi. Please enter a valid Karachi address.',
      }
    ),
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
})

export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>
