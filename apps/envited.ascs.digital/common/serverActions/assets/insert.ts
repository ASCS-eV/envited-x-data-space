'use server'

import { equals, isNil } from 'ramda'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { Log, log } from '../../logger'
import { Session } from '../../types'
import { forbiddenError, formatError, internalServerErrorError, unauthorizedError } from '../../utils'

export const _insert =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (userId: string, cid: string) => {
    try {
      const session = await getServerSession()
      if (isNil(session)) {
        throw unauthorizedError({ resource: 'assets', resourceId: userId })
      }

      if (!equals(userId)(session.user.id)) {
        throw forbiddenError({
          resource: 'assets',
          resourceId: userId,
          message: 'Not allowed to insert a asset',
          userId: session.user.id,
        })
      }

      const connection = await db()
      const [result] = await connection.insertAsset(userId, cid)

      console.log('******* insertAsset ServerAction', result)

      return result
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const insert = _insert({ db, getServerSession, log })
