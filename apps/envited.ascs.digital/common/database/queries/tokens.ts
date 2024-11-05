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

export const getTokenById = (db: DatabaseConnection) => async (id: string) =>
  db.select().from(token).where(eq(token.id, id))

export const getTokenByTokenId =
  (db: DatabaseConnection) =>
  async ({ contract, tokenId }: { tokenId: number; contract: string }) =>
    db
      .select()
      .from(token)
      .where(and(eq(token.tokenId, tokenId), eq(token.contract, contract)))

export const getTokensByIssuerId = (db: DatabaseConnection) => async (issuer: string) =>
  db.select().from(token).where(eq(token.minter, issuer))
