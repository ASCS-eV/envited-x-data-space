import { z } from 'zod'

export enum Asset {
  OpenDrive = 'OpenDrive',
}

const TYPES = [Asset.OpenDrive] as const

export const MetadataSchema = z.object({
  type: z.enum(TYPES),
})

export const OpenDriveSchema = z.object({
  title: z.string(),
  type: z.enum(TYPES),
})

export const ASSETS_VALIDATION_MAP = {
  [Asset.OpenDrive]: OpenDriveSchema,
}
