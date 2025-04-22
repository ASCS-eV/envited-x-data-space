import { db } from '../database/queries'
import { Database } from '../database/types'
import { Log, log } from '../logger'
import { Asset, AssetMetadata, AssetStatus } from '../types'
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

export const _getMinter =
  ({ db, log }: { db: Database; log: Log }) =>
  async (asset: Asset) => {
    const connection = await db()
    const user = await connection.getUserById(asset.userId)

    if (!user) {
      log.error('User not found')
      return {}
    }

    const issuer = await connection.getUserByIssuerId(user.issuerId)

    if (!issuer) {
      log.error('Issuer not found')
      return {}
    }

    return issuer
  }

export const getMinter = _getMinter({ db, log })

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
