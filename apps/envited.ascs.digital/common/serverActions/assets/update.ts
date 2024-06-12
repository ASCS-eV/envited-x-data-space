'use server'

import { isEmpty, isNil } from 'ramda'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { isOwnAsset } from '../../guards'
import { Log, log } from '../../logger'
import { AssetStatus, Session } from '../../types'
import { forbiddenError, formatError, internalServerErrorError, notFoundError, unauthorizedError } from '../../utils'

export const _update =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (userId: string, id: string, metadata: string, status: AssetStatus) => {
    try {
      const session = await getServerSession()
      if (isNil(session)) {
        throw unauthorizedError({ resource: 'assets', resourceId: userId })
      }

      const connection = await db()
      const asset = await connection.getAsset(id)

      if (isNil(asset) || isEmpty(asset)) {
        throw notFoundError({ resource: 'assets', resourceId: id, userId: session?.user.id })
      }

      if (!isOwnAsset(asset)(session)) {
        throw forbiddenError({
          resource: 'assets',
          resourceId: userId,
          message: 'Not allowed to update this resource',
          userId: session.user.id,
        })
      }

      const [result] = await connection.updateAsset(userId, id, { ...asset, metadata, status })

      return result
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const update = _update({ db, getServerSession, log })
