'use server'

import { revalidatePath } from 'next/cache'
import { isNil, isNotNil } from 'ramda'

import { getServerSession } from '../../common/auth'
import { getAssetUploadUrl } from '../../common/aws'
import { ERRORS } from '../../common/constants'
import { log } from '../../common/logger'
import { getAssetByCID, insertAsset } from '../../common/serverActions'
import { badRequestError, formatError, internalServerErrorError, unauthorizedError } from '../../common/utils'

export interface AssetFile {
  name: string
  cid: string
  type: string
}
export interface UploadAssetFile {
  success: boolean
  file: string
  signedUrl?: string
  cid?: string
  fileType?: string
}

export async function validateAndUploadAssets(files: AssetFile[]) {
  const session = await getServerSession()

  try {
    if (isNil(session)) {
      throw unauthorizedError({ resource: 'addAssets' })
    }

    if (!files || files.length === 0) {
      throw badRequestError({
        resource: 'addAssets',
        resourceId: 'assets',
        message: ERRORS.ASSETS_NOT_FOUND,
      })
    }

    const uploadData = await Promise.all(
      files.map(async ({ name, cid, type }) => {
        const asset = await getAssetByCID(cid)

        // if (isNotNil(asset)) {
        //   return { success: false, file: name, message: 'Asset already exists' }
        // }

        const signedUrl = await getAssetUploadUrl(cid)

        return {
          success: true,
          file: name,
          signedUrl,
          cid,
          fileType: type,
        }
      }),
    )

    return uploadData
  } catch (error: unknown) {
    log.error(formatError(error))
    throw internalServerErrorError()
  }
}

export async function insertAssetAfterUpload(cid: string, name: string) {
  const session = await getServerSession()

  try {
    if (isNil(session)) {
      throw unauthorizedError({ resource: 'addAssets' })
    }

    await insertAsset({
      cid,
      name,
    })

    revalidatePath('/dashboard/assets/add-assets')

    return { success: true, file: name }
  } catch (error: unknown) {
    log.error(formatError(error))
    throw internalServerErrorError()
  }
}
