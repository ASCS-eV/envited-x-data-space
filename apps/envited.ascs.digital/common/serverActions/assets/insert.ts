'use server'

import { equals, isNil } from 'ramda'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { Log, log } from '../../logger'
import { Role, Session } from '../../types'
import { forbiddenError, formatError, internalServerErrorError, unauthorizedError } from '../../utils'

export const _insert =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (cid: string) => {
    try {
      const session = await getServerSession()
      if (isNil(session)) {
        throw unauthorizedError({ resource: 'assets' })
      }
      const userId = session.user.id

      const connection = await db()
      const user = await connection.getUserById(userId)

      if (isNil(user)) {
        throw forbiddenError({
          resource: 'assets',
          resourceId: userId,
          message: 'User not found',
          userId: session.user.id,
        })
      }

      if (!equals(Role.provider)(session.user.role) && !equals(Role.principal)(session.user.role)) {
        throw forbiddenError({
          resource: 'assets',
          resourceId: userId,
          message: 'Not allowed to create assets',
          userId: session.user.id,
        })
      }

      const [result] = await connection.insertAsset({ userId, cid, ownerId: user.issuerId })
      return result
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const insert = _insert({ db, getServerSession, log })
