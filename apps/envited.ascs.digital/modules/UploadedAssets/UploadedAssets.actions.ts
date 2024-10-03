'use server'

import { revalidatePath } from 'next/cache'

import { uploadAssetTokenMetadata } from '../../common/serverActions'
import { internalServerErrorError } from '../../common/utils'

export async function mintAssetById(id: string) {
  try {
    const fileLocation = await uploadAssetTokenMetadata(id)
    console.log(fileLocation)
    // revalidatePath('/dashboard/assets')
  } catch (e) {
    console.log(e)
    throw internalServerErrorError()
  }
}
