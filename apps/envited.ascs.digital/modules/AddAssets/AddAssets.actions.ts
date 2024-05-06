'use server'

import { revalidatePath } from 'next/cache'
import { isNil } from 'ramda'

import { getServerSession } from '../../common/auth'
import { getAssetUploadUrl } from '../../common/aws'
import { ERRORS } from '../../common/constants'
import { log } from '../../common/logger'
import { badRequestError, formatError, internalServerErrorError, slugify, unauthorizedError } from '../../common/utils'

export async function addAssetsForm(formData: FormData) {
  const assets = formData.getAll('assets') as File[]
  const session = await getServerSession()

  console.log('session', session)

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

    console.log('assets', assets)

    const result = assets.map(async (asset: File) => {
      const arrayBuffer = Buffer.from(await asset.arrayBuffer())
      const signedUrl = await getAssetUploadUrl(session?.user?.pkh, slugify(asset.name), asset.name)
      console.log('arrayBuffer', arrayBuffer)
      console.log('signedUrl', signedUrl)

      const uploadResult = await fetch(signedUrl, {
        body: arrayBuffer,
        method: 'PUT',
        headers: {
          'Content-Type': asset.type,
          'Content-Disposition': `attachment; filename="${asset.name}"`,
        },
      })

      console.log('uploadResult', uploadResult)

      return uploadResult
    })

    await Promise.all(result)

    revalidatePath('/dashboard/assets/add-assets')
  } catch (error: unknown) {
    log.error(formatError(error))
    throw internalServerErrorError()
  }
}
