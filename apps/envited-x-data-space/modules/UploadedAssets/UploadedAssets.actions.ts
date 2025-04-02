'use server'

import { revalidatePath } from 'next/cache'

import { log } from '../../common/logger'
import { getMintParams, updateAssetStatus, uploadTokenMetadata } from '../../common/serverActions'
import { AssetStatus } from '../../common/types'
import { internalServerErrorError } from '../../common/utils'

export async function uploadAssetTokenMetadata(cid: string) {
  try {
    return uploadTokenMetadata(cid)
  } catch (e) {
    log.error(e)
    throw internalServerErrorError()
  }
}

export async function getAssetMintParams(id: string) {
  try {
    const mintParams = await getMintParams(id)
    return mintParams
  } catch (e) {
    log.error(e)
    throw internalServerErrorError()
  }
}

export async function updateStatus(assetId: string, status: AssetStatus) {
  try {
    await updateAssetStatus({ id: assetId, status })
    revalidatePath('/add-assets')
  } catch (e) {
    log.error(e)
    throw internalServerErrorError()
  }
}
