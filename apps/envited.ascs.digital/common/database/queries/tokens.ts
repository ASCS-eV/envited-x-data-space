import { and, eq } from 'drizzle-orm'

import { token } from '../schema'
import { DatabaseConnection } from '../types'

export const getTokens = (db: DatabaseConnection) => async () => db.select().from(token)

export const getToken =
  (db: DatabaseConnection) =>
  async ({ contract, tokenId }: { tokenId: number; contract: string }) =>
    db
      .select()
      .from(token)
      .where(and(eq(token.tokenId, tokenId), eq(token.contract, contract)))

export const getTokenById =
(db: DatabaseConnection) =>
  async ({ contract, tokenId }: { tokenId: number; contract: string }) =>
    db
      .select()
      .from(token)
      .where(and(eq(token.tokenId, tokenId), eq(token.contract, contract)))

export const getTokenByTokenId =
  (db: DatabaseConnection) =>
  async ({ contract, tokenId }: { tokenId: number; contract: string }) =>
    db
      .select()
      .from(token)
      .where(and(eq(token.tokenId, tokenId), eq(token.contract, contract)))
