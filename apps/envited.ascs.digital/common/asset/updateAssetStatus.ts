import { db } from '../database/queries'
import { Database } from '../database/types'
import { Log, log } from '../logger'
import { AssetMetadata, AssetStatus } from '../types'
import { formatError, internalServerErrorError } from '../utils'

export const _updateAsset =
  ({ db, log }: { db: Database; log: Log }) =>
  async (newCID: string, oldCid: string, status: AssetStatus, metadata?: AssetMetadata) => {
    try {
      const connection = await db()
      const [result] = await connection.updateAssetCID(
        { metadata: JSON.stringify(metadata), status, cid: newCID },
        oldCid,
      )

      return result
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const updateAsset = _updateAsset({ db, log })
