import { z } from 'zod'

import { FILE_TYPES, MAX_FILE_SIZE } from '../../common/constants'

export const ProfileSchema = z.object({
  name: z.string(),
  description: z.string(),
  logo: z.string().or(z.literal('')),
  file: z
    .unknown()
    .transform(value => value as File | null | undefined)
    .optional()
    .refine(file => (file ? FILE_TYPES.includes(file?.type) : true), { message: `Valid types: ${FILE_TYPES}` })
    .refine(file => (file ? file.size <= MAX_FILE_SIZE : true), {
      message: `File size must be less than ${MAX_FILE_SIZE}MB`,
    }),
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
