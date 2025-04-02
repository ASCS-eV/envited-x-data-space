import { equals, isEmpty, isNil } from 'ramda'

import { ERRORS } from '../../constants'
import { Database } from '../../database/types'
import { isOwnAsset } from '../../guards'
import { Log } from '../../logger'
import { Asset, AssetStatus, Session } from '../../types'
import { badRequestError, forbiddenError, notFoundError, unauthorizedError } from '../../utils'

export const deleteAsset =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (id: string) => {
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
        message: ERRORS.NOT_ALLOWED_TO_DELETE_ASSET,
        userId: session.user.did,
      })
    }

    if (equals(AssetStatus.minted)(asset.status)) {
      throw forbiddenError({
        resource: 'assets',
        resourceId: id,
        message: ERRORS.MINTED_ASSET_CANNOT_BE_DELETED,
        userId: session.user.did,
      })
    }

    return connection.deleteAsset(id)
  }
