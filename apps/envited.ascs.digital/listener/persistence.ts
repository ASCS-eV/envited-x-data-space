import { and, eq, sql } from 'drizzle-orm'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import { token } from '../common/database/schema'

export type DatabaseConnection = PostgresJsDatabase<any>

export const getTokenByTokenId =
  ({ database }: { database: DatabaseConnection }) =>
  async ({ contract, tokenId }: { tokenId: number; contract: string }) =>
    database
      .select()
      .from(token)
      .where(and(eq(token.tokenId, tokenId), eq(token.contract, contract)))

export const insertToken =
  ({ database }: { database: DatabaseConnection }) =>
  async ({
    hash,
    creator,
    contract,
    tokenId,
    tokenMetadata,
    thumbnail,
  }: {
    hash: string
    creator: string
    contract: string
    tokenId: number
    tokenMetadata: any
    thumbnail: string
  }) =>
    database.insert(token).values({
      hash,
      contract,
      creator,
      tokenId,
      thumbnail,
      tokenMetadata: sql`${tokenMetadata}::jsonb`,
      createdAt: new Date(),
    })
