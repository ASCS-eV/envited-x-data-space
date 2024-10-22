import { eq } from 'drizzle-orm'

import { issuer } from '../schema'
import { DatabaseConnection } from '../types'

export const getIssuerById = (db: DatabaseConnection) => async (id: string) =>
  db.select().from(issuer).where(eq(issuer.id, id))
