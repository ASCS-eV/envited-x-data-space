import { isNil } from 'ramda'
import { cache } from 'react'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { isOwnUser, userIsIssuedByLoggedInUser } from '../../guards'
import { Log, log } from '../../logger'
import { User } from '../../types'
import { Session } from '../../types/types'
import { forbiddenError, formatError, internalServerErrorError, unauthorizedError } from '../../utils'

export const _getUserById =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (id: string): Promise<User> => {
    try {
      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError({ resource: 'users', resourceId: id })
      }

      const connection = await db()
      const user = await connection.getUserById(id)

      if (!userIsIssuedByLoggedInUser(user)(session) && !isOwnUser(user)(session)) {
        throw forbiddenError({
          resource: 'users',
          resourceId: id,
          message: 'Not allowed to get this resource',
          userId: session.user.id,
        })
      }

      return user
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getUserById = cache(_getUserById({ db, getServerSession, log }))
