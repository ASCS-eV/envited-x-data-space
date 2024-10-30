'use server'

import { getMintParams, uploadTokenMetadata } from '../../common/serverActions'
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
