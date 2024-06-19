import { db } from '../database/queries'
import { Database } from '../database/types'
import { Log, log } from '../logger'
import { AssetMetadata, AssetStatus } from '../types'
import { formatError, internalServerErrorError } from '../utils'

export const _updateAssetStatus =
  ({ db, log }: { db: Database; log: Log }) =>
  async (cid: string, status: AssetStatus, metadata?: AssetMetadata) => {
    try {
      const connection = await db()
      const [result] = await connection.updateAsset({ metadata: JSON.stringify(metadata), status, cid })

      return result
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const updateAssetStatus = _updateAssetStatus({ db, log })
