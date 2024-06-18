import { isEmpty, isNil } from 'ramda'

import { db } from '../database/queries'
import { Database } from '../database/types'
import { Log, log } from '../logger'
import { AssetStatus } from '../types'
import { formatError, internalServerErrorError, notFoundError } from '../utils'

export const _updateAssetStatus =
  ({ db, log }: { db: Database; log: Log }) =>
  async (cid: string, status: AssetStatus, metadata: string = '') => {
    try {
      const connection = await db()
      const [asset] = await connection.getAssetByCID(cid)

      if (isNil(asset) || isEmpty(asset)) {
        throw notFoundError({ resource: 'updateAssetStatus', resourceId: cid })
      }

      const [result] = await connection.updateAsset({ ...asset, metadata, status })

      return result
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const updateAssetStatus = _updateAssetStatus({ db, log })
