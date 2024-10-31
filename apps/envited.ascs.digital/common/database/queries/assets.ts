import { eq, sql } from 'drizzle-orm'
import { omit } from 'ramda'

import { Asset, AssetStatus } from '../../types'
import { asset } from '../schema'
import { DatabaseConnection } from '../types'

export const getAssetsByUserId = (db: DatabaseConnection) => async (userId: string) =>
  db.select().from(asset).where(eq(asset.userId, userId))

export const getAsset = (db: DatabaseConnection) => async (id: string) =>
  db.select().from(asset).where(eq(asset.id, id))

export const getAssets = (db: DatabaseConnection) => async () => db.select().from(asset)

export const getAssetByCID = (db: DatabaseConnection) => async (cid: string) =>
  db.select().from(asset).where(eq(asset.cid, cid))

export const insertAsset = (db: DatabaseConnection) => async (userId: string, cid: string) =>
  db
    .insert(asset)
    .values({
      cid,
      metadata: {},
      status: AssetStatus.processing,
      userId,
    })
    .returning()

export const updateAsset = (db: DatabaseConnection) => async (data: Asset) =>
  db
    .update(asset)
    .set({
      ...omit(['id', 'userId'])(data),
      metadata: {},
    })
    .where(eq(asset.cid, data.cid))
    .returning()

export const updateAssetByCID = (db: DatabaseConnection) => async (data: Asset, cid: string) =>
  db
    .update(asset)
    .set({
      ...omit(['id', 'userId'])(data),
      metadata: {},
    })
    .where(eq(asset.cid, cid))
    .returning()
