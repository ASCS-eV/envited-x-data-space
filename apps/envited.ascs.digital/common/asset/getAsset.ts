import { db } from '../database/queries'
import { Database } from '../database/types'
import { Log, log } from '../logger'
import { formatError, internalServerErrorError } from '../utils'

export const _getAsset =
  ({ db, log }: { db: Database; log: Log }) =>
  async (cid: string) => {
    try {
      const connection = await db()
      const [result] = await connection.getAssetByCID(cid)

      return result
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getAsset = _getAsset({ db, log })
