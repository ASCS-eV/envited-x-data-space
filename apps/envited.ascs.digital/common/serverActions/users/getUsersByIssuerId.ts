'use server'

import { isNil } from 'ramda'
import { cache } from 'react'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { hasCredentialType, isFederator, isPrincipal } from '../../guards'
import { Log, log } from '../../logger'
import { User } from '../../types'
import { Session } from '../../types/types'
import { forbiddenError, formatError, internalServerErrorError, unauthorizedError } from '../../utils'

export const _getUsersByIssuerId =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (): Promise<User[]> => {
    try {
      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError({ resource: 'users' })
      }

      if (!isFederator(session) && !isPrincipal(session)) {
        throw forbiddenError({ resource: 'users', message: 'Incorrect role', userId: session.user.id })
      }

      const connection = await db()
      const user = await connection.getUserById(session?.user?.pkh)

      let issuerId = session?.user?.pkh
      if (hasCredentialType('AscsUserCredential')(user.usersToCredentialTypes)) {
        const principal = await connection.getUserById(user.issuerId)
        issuerId = principal.id
      }

      const users = await connection.getUsersByIssuerId(issuerId)

      return users
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getUsersByIssuerId = cache(_getUsersByIssuerId({ db, getServerSession, log }))
