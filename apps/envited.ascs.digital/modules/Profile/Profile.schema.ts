import { z } from 'zod'

export const ProfileSchema = z.object({
  name: z.string(),
  description: z.string(),
  logo: z.string().url().optional().or(z.literal('')),
  salesName: z.string(),
  salesPhone: z.string(),
  salesEmail: z.string().email().optional().or(z.literal('')),
  principalName: z.string(),
  principalPhone: z.string(),
  principalEmail: z.string().email().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  offerings: z.string().array().optional(),
  isPublished: z.boolean(),
})

export const ValidateProfileForm = ProfileSchema.safeParse
