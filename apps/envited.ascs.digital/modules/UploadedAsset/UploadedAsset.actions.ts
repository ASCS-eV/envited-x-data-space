'use server'

import { log } from '../../common/logger'
import { getAsset as getAssetById } from '../../common/serverActions/assets'
import { internalServerErrorError } from '../../common/utils'

export async function getAsset(assetId: string) {
  try {
    const asset = await getAssetById(assetId)
    return asset
  } catch (e) {
    log.error(e)
    throw internalServerErrorError()
  }
}
