import { eq, isNotNull } from 'drizzle-orm'

import { issuer, user } from '../schema'
import { DatabaseConnection } from '../types'

export const getMembers = (db: DatabaseConnection) => async () =>
  db
    .select({ ...user } as any)
    .from(issuer)
    .leftJoin(user, eq(issuer.id, user.id))
    .where(isNotNull(user.id))
