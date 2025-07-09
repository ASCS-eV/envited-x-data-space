'use server'

import { revalidatePath } from 'next/cache'

import { log } from '../../common/logger'
import { getMintParams, updateAssetStatus, uploadTokenMetadata } from '../../common/serverActions'
import { AssetStatus } from '../../common/types'
import { internalServerErrorError } from '../../common/utils'

export async function uploadAssetTokenMetadata(cid: string) {
  try {
    console.log('uploading token metadata', cid)
    return uploadTokenMetadata(cid)
  } catch (e) {
    console.log(e)
    log.error(e)
    throw internalServerErrorError()
  }
}

export async function getAssetMintParams(id: string) {
  try {
    console.log('getting mint params', id)
    const mintParams = await getMintParams(id)
    console.log('mint params', mintParams)
    return mintParams
  } catch (e) {
    log.error(e)
    throw internalServerErrorError()
  }
}

export async function updateStatus(assetId: string) {
  try {
    console.log('updating status', assetId)
    await updateAssetStatus({ id: assetId, status: AssetStatus.minted })
    revalidatePath('/add-assets')
  } catch (e) {
    console.log(e)
    log.error(e)
    throw internalServerErrorError()
  }
}
