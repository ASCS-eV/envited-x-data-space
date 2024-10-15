import { z } from 'zod'

import { FILE_TYPES, MAX_FILE_SIZE } from '../../common/constants'

export const ProfileSchema = z.object({
  name: z.string(),
  description: z.string().min(100, 'Please provide a company overview').max(500),
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
  businessCategories: z.string().array().min(1, 'Please provide at least one business category'),
  offerings: z
    .object({
      name: z.string().max(100),
      type: z.string().max(100),
      functionalities: z.string().max(500),
      supportedTools: z.string().max(150),
      supportedStandards: z.string().max(150),
    })
    .array()
    .max(5)
    .optional(),
})

export const ValidateProfileForm = ProfileSchema.safeParse
