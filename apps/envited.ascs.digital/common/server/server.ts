import { isNil } from 'ramda'

import { isOwnUser, userIsIssuedByLoggedInUser } from '../../app/api/utils'
import { getServerSession } from '../auth'
import { db } from '../database/queries'
import { Database } from '../database/types'
import { User } from '../types'
import { badRequestError, error, unauthorizedError } from '../utils'

export const _getUserById =
  ({ db, getServerSession }: { db: Database; getServerSession: any }) =>
  async (id: string): Promise<User> => {
    try {
      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError()
      }

      const connection = await db()
      const [user] = await connection.getUserById(id)

      if (!userIsIssuedByLoggedInUser(user)(session) && !isOwnUser(user)(session)) {
        throw badRequestError()
      }

      return user
    } catch (e) {
      console.log('error', e)
      throw error()
    }
  }

export const getUserById = _getUserById({ db, getServerSession })
