'use server'

import { revalidatePath } from 'next/cache'
import { isEmpty, isNil } from 'ramda'

import { createFilename } from '../../common/asset/utils'
import { getServerSession } from '../../common/auth'
import { getAssetUploadUrl } from '../../common/aws'
import { ERRORS } from '../../common/constants'
import { FEATURE_FLAGS } from '../../common/featureFlags'
import { log } from '../../common/logger'
import { getAssetByCID, insertAsset } from '../../common/serverActions'
import { Environment } from '../../common/types'
import { badRequestError, formatError, internalServerErrorError, unauthorizedError } from '../../common/utils'

export interface AssetFile {
  name: string
  cid: string
  type: string
  arrayBuffer: () => Promise<ArrayBuffer>
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

    const result = files.map(async (file: AssetFile) => {
      const arrayBuffer = Buffer.from(await file.arrayBuffer())
      const cid = await createFilename(arrayBuffer)

      if (FEATURE_FLAGS[(process.env.ENV as Environment) || 'development'].uniqueAsset) {
        const asset = await getAssetByCID(cid)

        if (!isEmpty(asset)) {
          return { success: false, file: file.name }
        }
      }

      const signedUrl = await getAssetUploadUrl(cid)
      await fetch(signedUrl, {
        body: arrayBuffer,
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
          'Content-Disposition': `attachment; filename="${cid}"`,
        },
      })
    })
    return result
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
