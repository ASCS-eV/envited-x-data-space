import { isNil } from 'ramda'
import { cache } from 'react'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { isFederator, isPrincipal } from '../../guards'
import { User } from '../../types'
import { Session } from '../../types/types'
import { badRequestError, error, unauthorizedError } from '../../utils'

export const _getUsersByIssuerId =
  ({ db, getServerSession }: { db: Database; getServerSession: () => Promise<Session | null> }) =>
  async (): Promise<User[]> => {
    try {
      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError()
      }

      if (!isFederator(session) && !isPrincipal(session)) {
        throw badRequestError()
      }

      const connection = await db()
      const users = await connection.getUsersByIssuerId(session?.user?.pkh)

      return users
    } catch (e) {
      console.log('error', e)
      throw error()
    }
  }

export const getUsersByIssuerId = cache(_getUsersByIssuerId({ db, getServerSession }))
