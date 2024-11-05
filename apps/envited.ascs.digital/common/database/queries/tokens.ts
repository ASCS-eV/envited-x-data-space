import { and, eq } from 'drizzle-orm'

import { token, tokenAttributes } from '../schema'
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
  db.select().from(token).leftJoin(tokenAttributes, eq(token.id, tokenAttributes.tokenId)).where(eq(token.id, id))

export const getTokenByIdQuery = (db: DatabaseConnection) => async (id: string) =>
  db.query.token.findFirst({
    where: eq(token.id, id),
    with: {
      tokenAttributes: true,
    },
  })

export const getTokenByTokenId =
  (db: DatabaseConnection) =>
  async ({ contract, tokenId }: { tokenId: number; contract: string }) =>
    db
      .select()
      .from(token)
      .where(and(eq(token.tokenId, tokenId), eq(token.contract, contract)))

export const getTokensByIssuerId = (db: DatabaseConnection) => async (issuer: string) =>
  db.select().from(token).where(eq(token.minter, issuer))
