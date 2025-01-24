import { z } from 'zod'

export enum Asset {
  OpenDrive = 'OpenDrive',
}

export const OpenDriveSchema = z.object({
  type: z.literal(Asset.OpenDrive),
  title: z.string(),
})

export const assetSchema = z.discriminatedUnion('type', [OpenDriveSchema])
