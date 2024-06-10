import { eq } from 'drizzle-orm'

import { asset, profile } from '../schema'
import { DatabaseConnection } from '../types'

export const getAssetsByProfileSlug = (db: DatabaseConnection) => async (slug: string) =>
  db.query.profile.findMany({
    where: eq(profile.slug, slug),
    with: {
      assets: true,
    },
  })

export const getAsset = (db: DatabaseConnection) => async (id: string) =>
  db.select().from(asset).where(eq(asset.id, id))
