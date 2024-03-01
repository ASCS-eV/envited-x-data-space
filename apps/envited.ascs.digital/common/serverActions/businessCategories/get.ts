'use server'

import { isNil } from 'ramda'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { Log, log } from '../../logger'
import { Session } from '../../types'
import { formatError, internalServerErrorError, unauthorizedError } from '../../utils'

export const _get =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async () => {
    try {
      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError({ resource: 'businessCategories' })
      }

      const connection = await db()
      const categories = await connection.getBusinessCategories()

      return categories
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const get = _get({ db, getServerSession, log })

export const _getProfileBusinessCategories =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (profileId: string) => {
    try {
      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError({ resource: 'businessCategories' })
      }

      const connection = await db()
      const categories = await connection.getBusinessCategoriesByProfileId(profileId)

      return categories
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getProfileBusinessCategories = _getProfileBusinessCategories({ db, getServerSession, log })
