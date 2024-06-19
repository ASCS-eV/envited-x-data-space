'use server'

import { revalidatePath } from 'next/cache'
import { isNil } from 'ramda'

import { getServerSession } from '../../common/auth'
import { getAssetUploadUrl, getUniqueFilename } from '../../common/aws'
import { ERRORS } from '../../common/constants'
import { log } from '../../common/logger'
import { insertAsset } from '../../common/serverActions'
import { badRequestError, formatError, internalServerErrorError, slugify, unauthorizedError } from '../../common/utils'

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
      const uniqueFilename = getUniqueFilename(slugify(asset.name), asset.name)
      const signedUrl = await getAssetUploadUrl(uniqueFilename)

      const uploadResult = await fetch(signedUrl, {
        body: arrayBuffer,
        method: 'PUT',
        headers: {
          'Content-Type': asset.type,
          'Content-Disposition': `attachment; filename="${uniqueFilename}"`,
        },
      })

      await insertAsset(session.user.id, uniqueFilename)

      return uploadResult
    })

    await Promise.all(result)

    revalidatePath('/dashboard/assets/add-assets')
  } catch (error: unknown) {
    log.error(formatError(error))
    throw internalServerErrorError()
  }
}
