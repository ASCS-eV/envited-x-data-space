import { z } from 'zod'

export const ProfileSchema = z.object({
  name: z.string(),
  description: z.string(),
  logo: z.string().url().optional().or(z.literal('')),
  file: z
    .object({
      name: z.string({ required_error: 'Please upload a valid file type. (JPG, JPEG, PNG)' }),
      lastModified: z.number(),
      size: z.number(),
      type: z.string(),
    })
    .optional(),
  salesName: z.string().or(z.literal(null)),
  salesPhone: z.string().or(z.literal(null)),
  salesEmail: z.string().email().optional().or(z.literal('')),
  principalName: z.string(),
  principalPhone: z.string(),
  principalEmail: z.string().email().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  offerings: z.string().array().optional(),
})

export const ValidateProfileForm = ProfileSchema.safeParse
