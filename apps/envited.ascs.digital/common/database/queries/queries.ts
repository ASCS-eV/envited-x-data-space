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
import { getProfileBySlug, getPublishedProfiles, maybeUpdatePublishedState, update as updateProfile } from './profiles'
import {
  deleteUserById,
  getUserById,
  getUserByIssuerId,
  getUserWithProfileById,
  getUsersByIssuerId,
  insertUserTx,
} from './users'

const queries = {
  deleteUserById,
  deleteBusinessCategoriesByProfileId,
  fetchTables,
  getBusinessCategories,
  getBusinessCategoriesByProfileId,
  getUserById,
  getUserWithProfileById,
  getUsersByIssuerId,
  insertBusinessCategoryByProfileId,
  insertUserTx,
  updateProfile,
  maybeUpdatePublishedState,
  getProfileBySlug,
  getPublishedProfiles,
  getUserByIssuerId,
}

export const init =
  (connectDb: () => Promise<PostgresJsDatabase<typeof schema>>) =>
  (
    queries: Record<
      string,
      (
        db: PostgresJsDatabase<typeof schema>,
      ) => (...args: any[]) => Promise<postgres.RowList<Record<string, unknown>[]> | postgres.Row>
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
