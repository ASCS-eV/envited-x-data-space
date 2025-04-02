import { and, eq } from 'drizzle-orm'

import { token, tokenAttributes } from '../schema'
import { DatabaseConnection } from '../types'

export const getTokens = (db: DatabaseConnection) => async () => db.select().from(token)

export const getToken =
  (db: DatabaseConnection) =>
  async ({ contractGuid, tokenId }: { tokenId: number; contractGuid: string }) =>
    db
      .select()
      .from(token)
      .where(and(eq(token.tokenId, tokenId), eq(token.contractGlobalIdentifierId, contractGuid)))

export const getTokenById = (db: DatabaseConnection) => async (id: string) =>
  db.select().from(token).where(eq(token.id, id))

export const getTokenWithAttributesById = (db: DatabaseConnection) => async (id: string) =>
  db.query.token.findFirst({
    where: eq(token.id, id),
    with: {
      tokenAttributes: true,
    },
  })

export const getTokenAttributesByTokenId = (db: DatabaseConnection) => async (id: string) =>
  db.select().from(tokenAttributes).where(eq(tokenAttributes.tokenId, id))

export const getTokenByTokenId =
  (db: DatabaseConnection) =>
  async ({ contractGuid, tokenId }: { tokenId: number; contractGuid: string }) =>
    db
      .select()
      .from(token)
      .where(and(eq(token.tokenId, tokenId), eq(token.contractGlobalIdentifierId, contractGuid)))

export const getTokensByIssuerId = (db: DatabaseConnection) => async (issuerGuid: string) =>
  db.select().from(token).where(eq(token.minterGlobalIdentifierId, issuerGuid))
