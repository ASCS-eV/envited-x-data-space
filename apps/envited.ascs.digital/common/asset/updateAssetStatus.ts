import { isEmpty, isNil } from 'ramda'

import { db } from '../database/queries'
import { AssetStatus } from '../types'
import { notFoundError } from '../utils'

export const updateAssetStatus = async (cid: string, status: AssetStatus, metadata: string = '') => {
  try {
    const connection = await db()
    const assets = await connection.getAssets()
    const asset = await connection.getAssetByCID(cid)

    console.log('********* updateAssetStatus - assets', assets)
    console.log('********* updateAssetStatus - cid', cid)
    console.log('********* updateAssetStatus - asset', asset)
    console.log('********* updateAssetStatus - status', status)
    console.log('********* updateAssetStatus - metadata', metadata)

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
