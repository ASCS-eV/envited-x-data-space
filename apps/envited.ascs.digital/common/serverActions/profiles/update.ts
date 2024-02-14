'use server'

import { isNil } from 'ramda'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { isFederator, isOwnProfile, isPrincipal } from '../../guards'
import { Profile, Session } from '../../types'
import { badRequestError, error, unauthorizedError } from '../../utils'

export const _update =
  ({ db, getServerSession }: { db: Database; getServerSession: () => Promise<Session | null> }) =>
  async (profile: Partial<Profile>) => {
    try {
      const session = await getServerSession()
      if (isNil(session)) {
        throw unauthorizedError()
      }

      if (!isFederator(session) && !isPrincipal(session)) {
        throw badRequestError('Incorrect role')
      }

      const connection = await db()
      const [user] = await connection.getUserWithProfileById(session.user.id)

      if (isNil(user)) {
        throw badRequestError('User not found')
      }

      if (!isOwnProfile(user.user)(profile)) {
        throw badRequestError('Incorrect profile')
      }

      const [updatedProfile] = await connection.updateProfile(profile)
      const [result] = await connection.maybeUpdatePublishedState(updatedProfile)
      return result
    } catch (e) {
      console.log('error', e)
      throw error()
    }
  }

export const update = _update({ db, getServerSession })
