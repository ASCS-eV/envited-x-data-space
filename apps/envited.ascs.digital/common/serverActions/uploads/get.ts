'use server'

import { isEmpty, isNil } from 'ramda'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { isOwnUpload } from '../../guards'
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
        throw badRequestError({ resource: 'uploads', resourceId: id, message: 'Missing ID' })
      }

      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError({ resource: 'users' })
      }

      const connection = await db()
      const [upload] = await connection.getUpload(id)

      if (isNil(upload) || isEmpty(upload)) {
        throw notFoundError({ resource: 'uploads', resourceId: id, userId: session?.user.id })
      }

      if (!isOwnUpload(upload)(session)) {
        throw forbiddenError({
          resource: 'uploads',
          resourceId: id,
          message: 'Not allowed to fetch this resource',
          userId: session.user.id,
        })
      }

      return upload
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const get = _get({ db, getServerSession, log })

export const _getUploads =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async () => {
    try {
      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError({ resource: 'uploads' })
      }

      const connection = await db()
      const uploads = await connection.getUploadsByUserId(session.user.id)

      return uploads
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getUploads = _getUploads({ db, getServerSession, log })
