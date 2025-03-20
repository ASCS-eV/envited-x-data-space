'use server'

import { revalidatePath } from 'next/cache'
import { isEmpty, isNil, isNotNil } from 'ramda'

import { createFilename } from '../../common/asset/utils'
import { getServerSession } from '../../common/auth'
import { getAssetUploadUrl } from '../../common/aws'
import { ERRORS } from '../../common/constants'
import { log } from '../../common/logger'
import { getAssetByCID, insertAsset } from '../../common/serverActions'
import { badRequestError, formatError, internalServerErrorError, unauthorizedError } from '../../common/utils'

/*
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
      const asset = await getAssetByCID(cid)

      if (!isEmpty(asset)) {
        return { success: false, file: file.name }
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
*/

export async function validateAndUploadAssets(files: { name: string; cid: string; type: string }[]) {
  // export async function validateAndUploadAssets(formData: FormData) {
  // const files = formData.getAll('assets') as File[]
  const session = await getServerSession()
  console.log('validateAndUploadAssets')

  try {
    if (isNil(session)) {
      throw unauthorizedError({ resource: 'addAssets' })
    }

    if (!files || files.length === 0) {
      throw badRequestError({
        resource: 'addAssets',
        resourceId: 'assets',
        message: 'No files provided',
      })
    }

    console.log('before promise', files)

    const uploadData = await Promise.all(
      files.map(async ({ name, cid, type }) => {
        console.log('in promise')
        // const arrayBuffer = Buffer.from(await file.arrayBuffer())
        // const cid = await createFilename(arrayBuffer)
        // const asset = await getAssetByCID(cid)
        // const cid = await createFilename(Buffer.from(file.arrayBuffer))
        // console.log('createFilename', cid)
        const asset = await getAssetByCID(cid)
        // console.log('getAssetByCID', asset)

        // if (isNotNil(asset)) {
        //   return { success: false, file: name, reason: 'Asset already exists' }
        // }

        console.log('before signed')
        const signedUrl = await getAssetUploadUrl(cid)
        console.log('signedUrl', signedUrl)

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
