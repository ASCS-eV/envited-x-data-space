import { z } from 'zod'

const FILE_TYPES = ['image/png', 'image/jpeg'] as const

export const ProfileSchema = z.object({
  name: z.string(),
  description: z.string(),
  logo: z.string().url().optional().or(z.literal('')),
  file: z
    .object({
      name: z.string({ required_error: 'Please upload a valid file type. (JPG, JPEG, PNG)' }),
      lastModified: z.number(),
      size: z.number(),
      type: z.enum(FILE_TYPES),
    })
    .optional(),
  salesName: z.string().or(z.literal(null)),
  salesPhone: z.string().or(z.literal(null)),
  salesEmail: z.string().email().optional().or(z.literal('')),
  principalName: z.string(),
  principalPhone: z.string(),
  principalEmail: z.string().email().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  businessCategories: z.string().array().optional(),
  offerings: z
    .object({
      name: z.string().max(100),
      type: z.string().max(100),
      functionalities: z.string().max(100),
      supportedTools: z.string().max(200),
      supportedStandards: z.string().max(200),
    })
    .array()
    .max(5)
    .optional(),
})

export const ValidateProfileForm = ProfileSchema.safeParse
