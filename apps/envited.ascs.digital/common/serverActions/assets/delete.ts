import { equals, isEmpty, isNil } from 'ramda'

import { ERRORS } from '../../constants'
import { Database } from '../../database/types'
import { isOwnAsset } from '../../guards'
import { Log } from '../../logger'
import { AssetStatus, Session } from '../../types'
import { badRequestError, forbiddenError, notFoundError, unauthorizedError } from '../../utils'
import { getServerSession } from "next-auth"
import { authOptions } from '../../auth/auth'

export const deleteAsset =
  ({ db, log }: { db: Database; log: Log }) =>
  async (id: string) => {
    if (isNil(id) || isEmpty(id)) {
      throw badRequestError({ resource: 'assets', resourceId: id, message: 'Missing ID' })
    }

    const session = await getServerSession(authOptions)

    if (isNil(session)) {
      throw unauthorizedError({ resource: 'users' })
    }

    const connection = await db()
    const [asset] = await connection.getAsset(id)

    if (isNil(asset) || isEmpty(asset)) {
      throw notFoundError({ resource: 'assets', resourceId: id, userId: session?.user.id })
    }
    log.info('deleteAsset', { id })
    log.info('asset', { asset })
    log.info('session', { session })
    if (!isOwnAsset(asset)(session)) {
      throw forbiddenError({
        resource: 'assets',
        resourceId: id,
        message: ERRORS.NOT_ALLOWED_TO_DELETE_ASSET,
        userId: session.user.pkh,
      })
    }

    if (equals(AssetStatus.minted)(asset.status)) {
      throw forbiddenError({
        resource: 'assets',
        resourceId: id,
        message: ERRORS.MINTED_ASSET_CANNOT_BE_DELETED,
        userId: session.user.pkh,
      })
    }
    return
    // return connection.deleteAsset(id)
  }
