import { isNil } from 'ramda'
import { cache } from 'react'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { Log, log } from '../../logger'
import { User } from '../../types'
import { Session } from '../../types/types'
import { formatError, internalServerErrorError, unauthorizedError } from '../../utils'

export const _getTokens =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (): Promise<User[]> => {
    try {
      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError({ resource: 'tokens' })
      }

      const connection = await db()
      const tokens = await connection.getTokens()

      return tokens
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getTokens = cache(_getTokens({ db, getServerSession, log }))
