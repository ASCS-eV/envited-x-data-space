'use server'

import { isEmpty, isNil } from 'ramda'

import { getServerSession } from '../../auth'
import { getUploadDownloadUrl } from '../../aws'
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

export const _download =
  ({
    db,
    getServerSession,
    log,
    getUploadDownloadUrl,
  }: {
    db: Database
    getServerSession: () => Promise<Session | null>
    log: Log
    getUploadDownloadUrl: (filename: string) => Promise<string>
  }) =>
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
      const [asset] = await connection.getUpload(id)

      if (isNil(asset) || isEmpty(asset)) {
        throw notFoundError({ resource: 'assets', resourceId: id, userId: session?.user.id })
      }

      if (!isOwnUpload(asset)(session)) {
        throw forbiddenError({
          resource: 'assets',
          resourceId: id,
          message: 'Not allowed to fetch this resource',
          userId: session.user.id,
        })
      }

      return await getUploadDownloadUrl(asset.cid)
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const download = _download({ db, getServerSession, log, getUploadDownloadUrl })
