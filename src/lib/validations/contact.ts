import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^((\+92)|(0092)|(0))?3[0-9]{9}$/, 'Please enter a valid Pakistani mobile number (e.g. 03222592589 or +923222592589)'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
})

export type ContactInput = z.infer<typeof contactSchema>
