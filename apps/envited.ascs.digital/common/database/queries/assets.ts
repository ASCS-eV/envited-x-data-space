import { eq } from 'drizzle-orm'

import { asset, profile } from '../schema'
import { DatabaseConnection } from '../types'
import { AssetStatus } from '../../types'

export const getAssetsByProfileSlug = (db: DatabaseConnection) => async (slug: string) =>
  db.query.profile.findMany({
    where: eq(profile.slug, slug),
    with: {
      assets: true,
    },
  })

export const getAsset = (db: DatabaseConnection) => async (id: string) =>
  db.select().from(asset).where(eq(asset.id, id))

export const insertAsset = (db: DatabaseConnection) => async (profileId: string) =>
  db
    .insert(asset)
    .values({
      metadata: '',
      status: 'processing',
      profileId,
    })
    .returning()

export const updateAsset = (db: DatabaseConnection) => async (id: string, metadata: string, status: AssetStatus) =>
  db
    .update(asset)
    .set({
      metadata,
      status,
    })
    .where(eq(asset.id, id))
    .returning()
