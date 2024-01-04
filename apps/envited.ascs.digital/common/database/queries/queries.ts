import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { fromPairs, map, pipe, toPairs } from 'ramda'

import { connectDb } from '../database'
import { fetchTables } from './common'

const queries = {
  fetchTables,
}

export const init =
  (connectDb: () => Promise<PostgresJsDatabase>) =>
  (queries: Record<string, (db: PostgresJsDatabase) => () => Promise<postgres.RowList<Record<string, unknown>[]>>>) =>
  async () => {
    const connection = await connectDb()

    return pipe(
      toPairs,
      map(([key, value]: [key: string, value: (connection: PostgresJsDatabase) => any]): [any, any] => [
        key,
        value(connection),
      ]),
      fromPairs,
    )(queries)
  }

export const db = init(connectDb)(queries)
