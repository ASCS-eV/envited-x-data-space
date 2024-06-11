import { ExtractTablesWithRelations, eq } from 'drizzle-orm'
import { PgTransaction } from 'drizzle-orm/pg-core'
import { PostgresJsDatabase, PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from '../schema'
import { asset, profile } from '../schema'
import { Asset, DatabaseConnection } from '../types'

export const getAssetsByProfileSlug = (db: DatabaseConnection) => async (slug: string) =>
  db.query.profile.findMany({
    where: eq(profile.slug, slug),
    with: {
      assets: true,
    },
  })

export const getAsset = (db: DatabaseConnection) => async (id: string) =>
  db.select().from(asset).where(eq(asset.id, id))

export const insertProfilesToAssetsTx =
  (tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>) =>
  async ({ assetId, profileId }: { assetId: string; profileId: string }) =>
    await tx.insert(schema.profilesToAssets).values({ assetId, profileId })

export const _txn =
  ({
    insertProfilesToAssetsTx,
  }: {
    insertProfilesToAssetsTx: (
      tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>,
    ) => ({ assetId, profileId }: { assetId: string; profileId: string }) => Promise<postgres.RowList<never[]>>
  }) =>
  (profileId: string) =>
  async (tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>) => {
    try {
      const [newAsset] = await tx
        .insert(asset)
        .values({
          metadata: '',
          status: 'processing',
        })
        .returning()

      await insertProfilesToAssetsTx(tx)({
        assetId: newAsset.id,
        profileId,
      })

      return newAsset
    } catch (error) {
      console.log(error)
      tx.rollback()
    }
  }

export const txn = _txn({
  insertProfilesToAssetsTx,
})

export const _insertAssetTx =
  (
    transaction: (
      profileId: string,
    ) => (
      tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>,
    ) => Promise<Asset | any>,
  ) =>
  (db: PostgresJsDatabase<typeof schema>) =>
  (profileId: string) =>
    db.transaction(transaction(profileId))

export const insertAssetTx = _insertAssetTx(txn)
