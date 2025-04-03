import { eq } from 'drizzle-orm'

import { issuer } from '../schema'
import { DatabaseConnection } from '../types'

export const getIssuerById = (db: DatabaseConnection) => async (id: string) =>
  db.query.issuer.findFirst({
    where: eq(issuer.id, id),
    with: {
      globalIdentifier: true,
    },
  })

export const getIssuerByGlobalIdentifier = (db: DatabaseConnection) => async (globalIdentifierId: string) =>
  db.query.issuer.findFirst({
    where: eq(issuer.globalIdentifierId, globalIdentifierId),
  })
