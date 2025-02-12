import { isNil } from 'ramda'
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
      const user = await connection.getUserById(session?.user?.pkh)

      let issuerId = session?.user?.pkh
      if (hasCredentialType('AscsUserCredential')(user.usersToCredentialTypes)) {
        const principal = await connection.getUserById(user.issuerId)
        issuerId = principal.id
      }

      const users = await connection.getTotalUsersByIssuerId(issuerId)

      return users
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getTotalUsersByIssuerId = cache(_getTotalUsersByIssuerId({ db, getServerSession, log }))
