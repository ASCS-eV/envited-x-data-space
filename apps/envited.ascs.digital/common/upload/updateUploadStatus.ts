import { db } from '../database/queries'
import { Database } from '../database/types'
import { Log, log } from '../logger'
import { UploadMetadata, UploadStatus } from '../types'
import { formatError, internalServerErrorError } from '../utils'

export const _updateUpload =
  ({ db, log }: { db: Database; log: Log }) =>
  async (newCID: string, oldCid: string, status: UploadStatus, metadata: UploadMetadata | string = '') => {
    try {
      const connection = await db()
      const [result] = await connection.updateUploadCID(
        { metadata: JSON.stringify(metadata), status, cid: newCID },
        oldCid,
      )

      return result
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const updateUpload = _updateUpload({ db, log })
