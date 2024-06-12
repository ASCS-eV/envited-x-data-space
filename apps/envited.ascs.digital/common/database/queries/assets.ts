import { and, eq } from 'drizzle-orm'

import { Asset, AssetStatus } from '../../types'
import { asset } from '../schema'
import { DatabaseConnection } from '../types'

export const getAssetsByUserId = (db: DatabaseConnection) => async (userId: string) =>
  db.select().from(asset).where(eq(asset.userId, userId))

export const getAsset = (db: DatabaseConnection) => async (id: string) =>
  db.select().from(asset).where(eq(asset.id, id))

export const insertAsset = (db: DatabaseConnection) => async (userId: string, cid: string) =>
  db
    .insert(asset)
    .values({
      cid,
      metadata: '',
      status: AssetStatus.processing,
      userId,
    })
    .returning()

export const updateAsset = (db: DatabaseConnection) => async (userId: string, cid: string, data: Asset) =>
  db
    .update(asset)
    .set({
      ...data,
    })
    .where(and(eq(asset.cid, cid), eq(asset.userId, userId)))
    .returning()
