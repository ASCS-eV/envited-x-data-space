import { and, eq } from 'drizzle-orm'

import { AccessLevel } from '../../asset/types'
import { assetResource } from '../schema'
import { DatabaseConnection } from '../types'

export const getAssetResourcesByAssetId = (db: DatabaseConnection) => async (assetId: string) =>
  db.select().from(assetResource).where(eq(assetResource.assetId, assetId))

export const getAssetResourcesByAssetIdAndAccessLevel =
  (db: DatabaseConnection) => async (assetId: string, accessLevel: AccessLevel) =>
    db
      .select()
      .from(assetResource)
      .where(and(eq(assetResource.assetId, assetId), eq(assetResource.accessLevel, accessLevel)))

export const insertAssetResource =
  (db: DatabaseConnection) =>
  async ({
    assetId,
    name,
    cid,
    mimeType,
    accessLevel,
  }: {
    assetId: string
    name: string
    cid: string
    mimeType: string
    accessLevel: AccessLevel
  }) =>
    db
      .insert(assetResource)
      .values({ assetId, name, cid, mimeType, accessLevel, createdAt: new Date(), updatedAt: new Date() })
      .returning()

export const deleteAssetResource = (db: DatabaseConnection) => async (id: string) =>
  db.delete(assetResource).where(eq(assetResource.id, id)).returning()
