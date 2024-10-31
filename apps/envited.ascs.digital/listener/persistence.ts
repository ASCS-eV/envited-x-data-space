import { and, eq } from 'drizzle-orm'
import { AwsDataApiPgDatabase } from 'drizzle-orm/aws-data-api/pg'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import * as schema from '../common/database/schema'

export type DatabaseConnection = PostgresJsDatabase<typeof schema> | AwsDataApiPgDatabase<typeof schema>

export const getTokenByTokenId =
  ({ database }: { database: DatabaseConnection }) =>
  async ({ contract, tokenId }: { tokenId: number; contract: string }) =>
    database
      .select()
      .from(schema.token)
      .where(and(eq(schema.token.tokenId, tokenId), eq(schema.token.contract, contract)))

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
    database.insert(schema.token).values({
      hash,
      contract,
      creator,
      tokenId,
      thumbnail,
      tokenMetadata,
      createdAt: new Date(),
    })
