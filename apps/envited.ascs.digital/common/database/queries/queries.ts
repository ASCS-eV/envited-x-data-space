import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { fromPairs, map, pipe, toPairs } from 'ramda'

import { connectDb } from '../database'
import * as schema from '../schema'
import {
  deleteBusinessCategoriesByProfileId,
  getBusinessCategories,
  getBusinessCategoriesByProfileId,
  insertBusinessCategoryByProfileId,
} from './businessCategories'
import { fetchTables } from './common'
import { getIssuerById } from './issuers'
import { getMembers } from './members'
import {
  getProfileByName,
  getProfileBySlug,
  getPublishedProfiles,
  maybeUpdatePublishedState,
  update as updateProfile,
} from './profiles'
import {
  getAsset,
  getAssetByCID,
  getAssets,
  getAssetsByUserId,
  insertAsset,
  updateAsset,
  updateAssetCID,
} from './assets'
import {
  activateUserById,
  deactivateUserById,
  getUserById,
  getUserByIssuerId,
  getUserRolesById,
  getUserWithProfileById,
  getUsersByIssuerId,
  insertUserTx,
} from './users'

const queries = {
  activateUserById,
  deactivateUserById,
  deleteBusinessCategoriesByProfileId,
  fetchTables,
  getBusinessCategories,
  getBusinessCategoriesByProfileId,
  getMembers,
  getUserById,
  getUserRolesById,
  getUserWithProfileById,
  getUsersByIssuerId,
  getIssuerById,
  insertBusinessCategoryByProfileId,
  insertUserTx,
  updateProfile,
  maybeUpdatePublishedState,
  getProfileByName,
  getProfileBySlug,
  getPublishedProfiles,
  getUserByIssuerId,
  getAsset,
  getAssets,
  getAssetByCID,
  getAssetsByUserId,
  insertAsset,
  updateAsset,
  updateAssetCID,
}

export const init =
  (connectDb: () => Promise<PostgresJsDatabase<typeof schema>>) =>
  (
    queries: Record<
      string,
      (
        db: PostgresJsDatabase<typeof schema>,
      ) => (...args: any[]) => Promise<postgres.RowList<Record<string, unknown>[]> | postgres.Row | undefined>
    >,
  ) =>
  async () => {
    const connection = await connectDb()

    return pipe(
      toPairs,
      map(([key, value]: [key: string, value: (connection: PostgresJsDatabase<typeof schema>) => any]): [any, any] => [
        key,
        value(connection),
      ]),
      fromPairs,
    )(queries)
  }

export const db = init(connectDb)(queries)
