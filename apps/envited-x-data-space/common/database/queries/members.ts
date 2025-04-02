import { eq, isNotNull } from 'drizzle-orm'

import { globalIdentifier, issuer, user } from '../schema'
import { DatabaseConnection } from '../types'

export const getMembers = (db: DatabaseConnection) => async () =>
  db
    .select({ ...user } as any)
    .from(issuer)
    .leftJoin(user, eq(issuer.id, user.id))
    .leftJoin(globalIdentifier, eq(issuer.globalIdentifierId, globalIdentifier.id))
    .where(isNotNull(user.id))
