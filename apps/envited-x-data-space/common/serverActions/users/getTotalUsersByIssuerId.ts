import { isNil, isNotNil } from 'ramda'
import { cache } from 'react'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { hasCredentialType } from '../../guards'
import { Log, log } from '../../logger'
import { Session } from '../../types/types'
import { formatError, internalServerErrorError, unauthorizedError } from '../../utils'

export const _getTotalUsersByIssuerId =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (): Promise<number> => {
    try {
      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError({ resource: 'users' })
      }

      const connection = await db()
      const user = await connection.getUserById(session?.user?.id)

      let issuerId = session?.user?.id
      if (isNotNil(user) && hasCredentialType('AscsUserCredential')(user.usersToCredentialTypes)) {
        issuerId = user.issuerId
      }

      const users = await connection.getUsersByIssuerId(issuerId)
      return users.length
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getTotalUsersByIssuerId = cache(_getTotalUsersByIssuerId({ db, getServerSession, log }))
