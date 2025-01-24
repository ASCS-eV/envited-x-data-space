'use server'

import { revalidatePath } from 'next/cache'

import { log } from '../../common/logger'
import { deleteAsset as deleteAssetById, getAsset as getAssetById } from '../../common/serverActions/assets'
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

export async function deleteAsset(assetId: string) {
  try {
    await deleteAssetById(assetId)
    revalidatePath('/add-assets')
  } catch (e) {
    log.error(e)
    throw internalServerErrorError()
  }
}
