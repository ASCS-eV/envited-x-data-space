import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { fromPairs, map, pipe, toPairs } from 'ramda'

import { connectDb } from '../database'
import * as schema from '../schema'
import {
  deleteAsset,
  getAsset,
  getAssetByCID,
  getAssets,
  getAssetsByUserId,
  insertAsset,
  updateAsset,
  updateAssetByCID,
  updateAssetStatus,
} from './assets'
import {
  deleteBusinessCategoriesByProfileId,
  getBusinessCategories,
  getBusinessCategoriesByProfileId,
  insertBusinessCategoryByProfileId,
} from './businessCategories'
import { fetchTables } from './common'
import {
  getGlobalIdentifierByFullResourceName,
  getGlobalIdentifierById,
  insertGlobalIdentifier,
} from './globalIdentifiers'
import { getIssuerByGlobalIdentifier, getIssuerById } from './issuers'
import { getMembers } from './members'
import {
  getProfileByName,
  getProfileBySlug,
  getPublishedProfiles,
  maybeUpdatePublishedState,
  update as updateProfile,
} from './profiles'
import {
  getTokenAttributesByTokenId,
  getTokenById,
  getTokenWithAttributesById,
  getTokens,
  getTokensByIssuerId,
} from './tokens'
import {
  activateUserById,
  addUserToRole,
  deactivateUserById,
  getActiveUsersByIssuerId,
  getUserByDid,
  getUserById,
  getUserByIssuerId,
  getUserByName,
  getUserRolesByDid,
  getUserRolesById,
  getUserWithProfileById,
  getUsersByIssuerId,
  insertUserTx,
  removeUserFromRole,
} from './users'

const queries = {
  activateUserById,
  deactivateUserById,
  deleteBusinessCategoriesByProfileId,
  fetchTables,
  getBusinessCategories,
  getBusinessCategoriesByProfileId,
  getMembers,
  addUserToRole,
  removeUserFromRole,
  getActiveUsersByIssuerId,
  getUserById,
  getUserByName,
  getUserRolesById,
  getUserWithProfileById,
  getUsersByIssuerId,
  getIssuerById,
  getIssuerByGlobalIdentifier,
  insertBusinessCategoryByProfileId,
  insertUserTx,
  updateProfile,
  maybeUpdatePublishedState,
  getProfileByName,
  getProfileBySlug,
  getPublishedProfiles,
  getUserByIssuerId,
  getAsset,
  deleteAsset,
  getAssets,
  getAssetByCID,
  getAssetsByUserId,
  getTokenAttributesByTokenId,
  getTokenWithAttributesById,
  getTokens,
  getTokenById,
  getTokensByIssuerId,
  getGlobalIdentifierById,
  getGlobalIdentifierByFullResourceName,
  getUserByDid,
  getUserRolesByDid,
  insertGlobalIdentifier,
  insertAsset,
  updateAsset,
  updateAssetByCID,
  updateAssetStatus,
}

export const init =
  (connectDb: () => Promise<PostgresJsDatabase<typeof schema>>) =>
  (
    queries: Record<
      string,
      (
        db: PostgresJsDatabase<typeof schema>,
      ) => (...args: any[]) => Promise<postgres.RowList<Record<string, unknown>[]> | postgres.Row | number | undefined>
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
