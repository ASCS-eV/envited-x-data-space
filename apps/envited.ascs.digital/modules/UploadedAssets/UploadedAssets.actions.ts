'use server'

import { getAssetMintParams, uploadAssetTokenMetadata } from '../../common/serverActions'
import { internalServerErrorError } from '../../common/utils'

export async function uploadTokenMetadata(id: string) {
  try {
    const fileLocation = await uploadAssetTokenMetadata(id)
    return fileLocation
  } catch (e) {
    throw internalServerErrorError()
  }
}

export async function getMintParams(id: string) {
  try {
    const mintParams = await getAssetMintParams(id)
    return mintParams
  } catch (e) {
    console.log(e)
    throw internalServerErrorError()
  }
}
