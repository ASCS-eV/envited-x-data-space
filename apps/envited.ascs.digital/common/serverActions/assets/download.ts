'use server'

import { isEmpty, isNil } from 'ramda'

import { getServerSession } from '../../auth'
import { getAssetDownloadUrl } from '../../aws/S3'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { isOwnAsset } from '../../guards'
import { Log, log } from '../../logger'
import { Asset, Session } from '../../types'
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
    getAssetDownloadUrl,
  }: {
    db: Database
    getServerSession: () => Promise<Session | null>
    log: Log
    getAssetDownloadUrl: (filename: string) => Promise<string>
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
      const [asset] = (await connection.getAsset(id)) as Asset[]

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

      return await getAssetDownloadUrl(asset.cid)
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const download = _download({ db, getServerSession, log, getAssetDownloadUrl })
