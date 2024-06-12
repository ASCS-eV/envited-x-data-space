'use server'

import { equals, isEmpty, isNil } from 'ramda'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { isOwnAsset } from '../../guards'
import { Log, log } from '../../logger'
import { Session } from '../../types'
import {
  badRequestError,
  forbiddenError,
  formatError,
  internalServerErrorError,
  notFoundError,
  unauthorizedError,
} from '../../utils'

export const _get =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (id: string) => {
    try {
      if (isNil(id) || isEmpty(id)) {
        throw badRequestError({ resource: 'assets', resourceId: id, message: 'Missing ID' })
      }

      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError({ resource: 'users' })
      }

      const connection = await db()
      const asset = await connection.getAsset(id)

      if (isNil(asset) || isEmpty(asset)) {
        throw notFoundError({ resource: 'assets', resourceId: id, userId: session?.user.id })
      }

      if (!isOwnAsset(asset)(session)) {
        throw forbiddenError({
          resource: 'assets',
          resourceId: id,
          message: 'Not allowed to fetch this resource',
          userId: session.user.id,
        })
      }

      return asset
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const get = _get({ db, getServerSession, log })

export const _getAssetsByUserId =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (userId: string) => {
    try {
      if (isNil(userId) || isEmpty(userId)) {
        throw badRequestError({ resource: 'assets', resourceId: userId, message: 'Missing user ID' })
      }

      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError({ resource: 'assets' })
      }

      if (!equals(userId)(session.user.id)) {
        throw forbiddenError({
          resource: 'assets',
          resourceId: userId,
          message: 'Not allowed to fetch this resource',
          userId: session.user.id,
        })
      }

      const connection = await db()
      const assets = await connection.getAssetsByUserId(userId)

      return assets
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getAssetsByUserId = _getAssetsByUserId({ db, getServerSession, log })
