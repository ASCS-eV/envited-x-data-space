import { isNil } from 'ramda'
import { cache } from 'react'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { hasCredentialType } from '../../guards'
import { Log, log } from '../../logger'
import { Token } from '../../types'
import { Session } from '../../types/types'
import { formatError, internalServerErrorError, unauthorizedError } from '../../utils'

export const _getTokensForLoggedInUser =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (): Promise<Token[]> => {
    try {
      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError({ resource: 'tokens' })
      }

      const connection = await db()
      const user = await connection.getUserById(session?.user?.id)

      let addressGlobalIdentifierId = user.addressGlobalIdentifierId
      if (hasCredentialType('AscsUserCredential')(user.usersToCredentialTypes)) {
        const principal = await connection.getUserById(user.issuerId)
        addressGlobalIdentifierId = principal.addressGlobalIdentifierId
      }

      return connection.getTokensByIssuerId(addressGlobalIdentifierId)
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getTokensForLoggedInUser = cache(_getTokensForLoggedInUser({ db, getServerSession, log }))
