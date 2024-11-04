import { eq, and } from 'drizzle-orm'

import { token } from '../schema'
import { DatabaseConnection } from '../types'

export const getTokens = (db: DatabaseConnection) => async () =>
  db.select().from(token)

export const getToken =
  ({ database }: { database: DatabaseConnection }) =>
  async ({ contract, tokenId }: { tokenId: number; contract: string }) =>
    database
      .select()
      .from(token)
      .where(and(eq(token.tokenId, tokenId), eq(token.contract, contract)))

export const getTokenById =
  ({ database }: { database: DatabaseConnection }) =>
  async (id: string) =>
    database
      .select()
      .from(token)
      .where(eq(token.id, id))

export const getTokenByTokenId =
  ({ database }: { database: DatabaseConnection }) =>
  async ({ contract, tokenId }: { tokenId: number; contract: string }) =>
    database
      .select()
      .from(token)
      .where(and(eq(token.tokenId, tokenId), eq(token.contract, contract)))
