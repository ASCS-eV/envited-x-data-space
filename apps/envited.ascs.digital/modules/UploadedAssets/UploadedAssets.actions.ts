'use server'

import { AssetStatus } from 'apps/envited.ascs.digital/common/types'

import { getMintParams, updateAssetStatus, uploadTokenMetadata } from '../../common/serverActions'
import { internalServerErrorError } from '../../common/utils'

export async function uploadAssetTokenMetadata(id: string) {
  try {
    const fileLocation = await uploadTokenMetadata(id)
    return fileLocation
  } catch (e) {
    throw internalServerErrorError()
  }
}

export async function getAssetMintParams(id: string) {
  try {
    const mintParams = await getMintParams(id)
    return mintParams
  } catch (e) {
    console.log(e)
    throw internalServerErrorError()
  }
}

export async function updateStatus(assetId: string, hash: string) {
  try {
    await updateAssetStatus({ id: assetId, hash, status: AssetStatus.minted })
  } catch (e) {
    throw internalServerErrorError()
  }
}
