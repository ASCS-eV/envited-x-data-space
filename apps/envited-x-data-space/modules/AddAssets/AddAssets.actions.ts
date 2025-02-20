'use server'

import { revalidatePath } from 'next/cache'
import { isNil, isNotNil } from 'ramda'

import { createFilename } from '../../common/asset/utils'
import { getServerSession } from '../../common/auth'
import { getAssetUploadUrl } from '../../common/aws'
import { ERRORS } from '../../common/constants'
import { log } from '../../common/logger'
import { getAssetByCID, insertAsset } from '../../common/serverActions'
import { badRequestError, formatError, internalServerErrorError, unauthorizedError } from '../../common/utils'

export async function addAssetsForm(formData: FormData) {
  const assets = formData.getAll('assets') as File[]
  const session = await getServerSession()

  try {
    if (isNil(session)) {
      throw unauthorizedError({ resource: 'addAssets' })
    }

    if (isNil(assets)) {
      throw badRequestError({
        resource: 'addAssets',
        resourceId: 'assets',
        message: ERRORS.ASSETS_NOT_FOUND,
      })
    }

    const result = assets.map(async (asset: File) => {
      const arrayBuffer = Buffer.from(await asset.arrayBuffer())
      const cid = await createFilename(arrayBuffer)
      const checkIfAssetExists = await getAssetByCID(cid)

      if (isNotNil(checkIfAssetExists)) {
        return { success: false, file: asset.name }
      }

      const signedUrl = await getAssetUploadUrl(cid)

      await fetch(signedUrl, {
        body: arrayBuffer,
        method: 'PUT',
        headers: {
          'Content-Type': asset.type,
          'Content-Disposition': `attachment; filename="${cid}"`,
        },
      })

      await insertAsset({
        cid,
        name: asset.name,
      })

      return { success: true, file: asset.name }
    })

    const uploadResults = await Promise.all(result)

    revalidatePath('/dashboard/assets/add-assets')

    return uploadResults
  } catch (error: unknown) {
    log.error(formatError(error))
    throw internalServerErrorError()
  }
}
