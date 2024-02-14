'use server'

import { isEmpty, isNil, omit } from 'ramda'

import { getServerSession } from '../../auth'
import { RESTRICTED_PROFILE_FIELDS } from '../../constants'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { isOwnProfile, isUsersCompanyProfile } from '../../guards'
import { Session } from '../../types'
import { badRequestError, error, notFoundError, unauthorizedError } from '../../utils'

export const _get =
  ({ db, getServerSession }: { db: Database; getServerSession: () => Promise<Session | null> }) =>
  async (slug: string) => {
    try {
      if (isNil(slug) || isEmpty(slug)) {
        throw badRequestError('Missing slug')
      }

      const session = await getServerSession()
      const connection = await db()
      const [profile] = await connection.getProfileBySlug(slug)

      if (isNil(profile) || isEmpty(profile)) {
        throw notFoundError()
      }

      if (!isNil(session)) {
        const [user] = await connection.getUserById(session.user.id)

        if (isOwnProfile(user)(profile)) {
          return profile
        }

        const [principal] = await connection.getUserByIssuerId(user.issuerId)
        if (isUsersCompanyProfile(principal)(profile)) {
          return profile
        }
      }

      return omit(RESTRICTED_PROFILE_FIELDS)(profile)
    } catch (e) {
      console.log('error', e)
      throw error()
    }
  }

export const get = _get({ db, getServerSession })

export const _getCategories =
  ({ db, getServerSession }: { db: Database; getServerSession: () => Promise<Session | null> }) =>
  async () => {
    try {
      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError()
      }

      const connection = await db()
      const categories = await connection.getCompanyCategories()

      return categories
    } catch (e) {
      console.log('error', e)
      throw error()
    }
  }

export const getCategories = _getCategories({ db, getServerSession })
