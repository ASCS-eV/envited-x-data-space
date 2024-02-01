import { isNil } from 'ramda'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { userIsIssuedByLoggedInUser } from '../../guards'
import { Log, log } from '../../logger'
import { User } from '../../types'
import { Session } from '../../types/types'
import { forbiddenError, formatError, internalServerErrorError, unauthorizedError } from '../../utils'

export const _deleteUserById =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (id: string): Promise<User> => {
    try {
      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError({ resource: 'users', resourceId: id })
      }

      const connection = await db()
      const [user] = await connection.getUserById(id)

      if (!userIsIssuedByLoggedInUser(user)(session)) {
        throw forbiddenError({
          resource: 'users',
          resourceId: id,
          message: 'Not allowed to delete this resource',
          userId: session.user.id,
        })
      }

      const [deletedUser] = await connection.deleteUserById(user.id)

      return deletedUser
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const deleteUserById = _deleteUserById({ db, getServerSession, log })
