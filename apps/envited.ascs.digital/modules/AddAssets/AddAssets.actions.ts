'use server'

import { revalidatePath } from 'next/cache'

import { getServerSession } from '../../common/auth'
import { getAssetUploadUrl } from '../../common/aws'
import { ERRORS } from '../../common/constants'
import { log } from '../../common/logger'
import { badRequestError, formatError, internalServerErrorError, slugify } from '../../common/utils'

export async function addAssetsForm(formData: FormData) {
  const assets = formData.getAll('assets') as File[]
  const session = await getServerSession()

  try {
    if (!session) {
      throw badRequestError({
        resource: 'addAssets',
        resourceId: 'session',
        message: ERRORS.UNAUTHORIZED,
      })
    }

    if (!assets) {
      throw badRequestError({
        resource: 'addAssets',
        resourceId: 'assets',
        message: ERRORS.ASSETS_NOT_FOUND,
      })
    }

    const result = assets.map(async (asset: File) => {
      const arrayBuffer = Buffer.from(await asset.arrayBuffer())
      const signedUrl = await getAssetUploadUrl(session?.user?.pkh, slugify(asset.name), asset.name)

      const uploadResult = await fetch(signedUrl, {
        body: arrayBuffer,
        method: 'PUT',
        headers: {
          'Content-Type': asset.type,
          'Content-Disposition': `attachment; filename="${asset.name}"`,
        },
      })

      return uploadResult
    })

    await Promise.all(result)

    revalidatePath('/dashboard/assets/add-assets')
  } catch (error: unknown) {
    log.error(formatError(error))
    throw internalServerErrorError()
  }
}
