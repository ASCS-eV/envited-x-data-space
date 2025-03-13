import { eq } from 'drizzle-orm'

import { issuer } from '../schema'
import { DatabaseConnection } from '../types'

export const getIssuerById = (db: DatabaseConnection) => async (id: string) =>
  db.query.issuer.findFirst({
    where: eq(issuer.id, id),
    with: {
      globalIdentifier: true,
    }
  })
  // db.select().from(issuer).where(eq(issuer.id, id))
