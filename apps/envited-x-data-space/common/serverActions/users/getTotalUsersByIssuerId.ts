import { isNil, isNotNil } from 'ramda'
import { cache } from 'react'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { hasCredentialType } from '../../guards'
import { Log, log } from '../../logger'
import { Session, User } from '../../types'
import { formatError, internalServerErrorError, notFoundError, unauthorizedError } from '../../utils'

export const _getTotalUsersByIssuerId =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (): Promise<number> => {
    try {
      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError({ resource: 'users' })
      }

      const connection = await db()
      const user = (await connection.getUserById(session?.user?.id)) as User

      if (isNil(user)) {
        throw notFoundError({ resource: 'users', resourceId: session?.user?.id })
      }

      let issuerId = null
      if (user.usersToCredentialTypes && hasCredentialType('AscsUserCredential')(user.usersToCredentialTypes)) {
        issuerId = user.issuerId
      }

      if (user.usersToCredentialTypes && hasCredentialType('AscsMemberCredential')(user.usersToCredentialTypes)) {
        const issuer = await connection.getIssuerByGlobalIdentifier(user.addressGlobalIdentifierId)
        issuerId = issuer.id
      }

      const users = await connection.getUsersByIssuerId(issuerId)
      return users.length
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getTotalUsersByIssuerId = cache(_getTotalUsersByIssuerId({ db, getServerSession, log }))
