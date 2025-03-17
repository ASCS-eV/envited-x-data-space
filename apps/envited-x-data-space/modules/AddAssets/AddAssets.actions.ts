'use server'

import { revalidatePath } from 'next/cache'
import { isEmpty, isNil } from 'ramda'

import { createFilename } from '../../common/asset/utils'
import { getServerSession } from '../../common/auth'
import { getAssetUploadUrl } from '../../common/aws'
import { ERRORS } from '../../common/constants'
import { log } from '../../common/logger'
import { getAssetByCID, insertAsset } from '../../common/serverActions'
import { badRequestError, formatError, internalServerErrorError, unauthorizedError } from '../../common/utils'
import { FEATURE_FLAGS } from 'apps/envited-x-data-space/common/featureFlags'
import { Environment } from 'apps/envited-x-data-space/common/types'

export async function validateAndUploadAssets(formData: FormData) {
  const files = formData.getAll('assets') as File[]
  const session = await getServerSession()

  try {
    if (isNil(session)) {
      throw unauthorizedError({ resource: 'addAssets' })
    }

    if (isNil(files)) {
      throw badRequestError({
        resource: 'addAssets',
        resourceId: 'assets',
        message: ERRORS.ASSETS_NOT_FOUND,
      })
    }

    const result = files.map(async (file: File) => {
      const arrayBuffer = Buffer.from(await file.arrayBuffer())
      const cid = await createFilename(arrayBuffer)
      
      if (FEATURE_FLAGS[process.env.ENV as Environment || 'development'].uniqueAsset) {
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

      await insertAsset({
        cid,
        name: file.name,
      })

      return { success: true, file: file.name }
    })

    const uploadResults = await Promise.all(result)

    revalidatePath('/dashboard/assets/add-assets')

    return uploadResults
  } catch (error: unknown) {
    log.error(formatError(error))
    throw internalServerErrorError()
  }
}
