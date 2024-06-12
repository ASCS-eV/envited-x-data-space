import { isEmpty, isNil } from 'ramda'

import { db } from '../database/queries'
import { AssetStatus } from '../types'
import { notFoundError } from '../utils'

export const updateAssetStatus = async (cid: string, status: AssetStatus, metadata: string = '') => {
  try {
    const connection = await db()
    const asset = await connection.getAssetByCID(cid)

    if (isNil(asset) || isEmpty(asset)) {
      throw notFoundError({ resource: 'updateAssetStatus', resourceId: cid })
    }

    const [result] = await connection.updateAsset({ ...asset, metadata, status })

    return result
  } catch (err) {
    console.log(err)
    throw err
  }
}
