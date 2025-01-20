import { db } from '../database/queries'
import { Database } from '../database/types'
import { Log, log } from '../logger'
import { AssetMetadata, AssetStatus } from '../types'
import { formatError, internalServerErrorError } from '../utils'

export const _updateAsset =
  ({ db, log }: { db: Database; log: Log }) =>
  async (
    newCID: string,
    oldCid: string,
    status: AssetStatus,
    metadata: AssetMetadata | string = '',
    manifest: Record<string, unknown> = {},
  ) => {
    try {
      const connection = await db()
      const [result] = await connection.updateAssetByCID({ metadata, status, cid: newCID, manifest }, oldCid)

      return result
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const updateAsset = _updateAsset({ db, log })
