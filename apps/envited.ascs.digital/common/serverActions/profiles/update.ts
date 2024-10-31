'use server'

import { isNil } from 'ramda'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { isFederator, isOwnProfile, isPrincipal } from '../../guards'
import { Log, log } from '../../logger'
import { Profile, Session } from '../../types'
import { badRequestError, forbiddenError, formatError, internalServerErrorError, unauthorizedError } from '../../utils'

export const _update =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (profile: Partial<Profile>, businessCategories?: string[]) => {
    try {
      const session = await getServerSession()
      if (isNil(session)) {
        throw unauthorizedError({ resource: 'profiles', resourceId: profile.id })
      }

      if (!isFederator(session) && !isPrincipal(session)) {
        throw forbiddenError({
          resource: 'profiles',
          resourceId: profile.id,
          message: 'Incorrect role',
          userId: session.user.id,
        })
      }

      const connection = await db()
      const [user] = await connection.getUserWithProfileById(session.user.id)

      if (isNil(user)) {
        throw badRequestError({
          resource: 'profiles',
          resourceId: profile.id,
          message: 'User not found',
          userId: session.user.id,
        })
      }

      if (!isOwnProfile(user.user)(profile)) {
        throw forbiddenError({
          resource: 'profiles',
          resourceId: profile.id,
          message: 'Incorrect profile',
          userId: session.user.id,
        })
      }
      log.info('Updating profile', { profile, businessCategories })
      const [updatedProfile] = await connection.updateProfile(profile)

      if (businessCategories) {
        await connection.deleteBusinessCategoriesByProfileId(updatedProfile.id)

        const insertProfilesToBusinessCategoriesPromises = businessCategories.map((id: string) =>
          connection.insertBusinessCategoryByProfileId(updatedProfile.id, id),
        )

        await Promise.all(insertProfilesToBusinessCategoriesPromises)
      }
      const [result] = await connection.maybeUpdatePublishedState(updatedProfile)
      return result
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const update = _update({ db, getServerSession, log })
