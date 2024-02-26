'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { getUploadUrl } from '../../common/aws'
import { log } from '../../common/logger'
// import { updateProfile } from '../../common/serverActions/profiles'
import { badRequestError, formatError, internalServerErrorError } from '../../common/utils'
import { ProfileSchema, ValidateProfileForm } from './Profile.schema'

type ProfileForm = z.infer<typeof ProfileSchema>

export async function updateProfileForm(data: ProfileForm) {
  try {
    const result = ValidateProfileForm(data)

    if (!result.success) {
      throw badRequestError({
        resource: 'profiles',
        resourceId: data.name,
        message: 'Profile validate form data failed',
      })
    }

    if (data.file) {
      const url = await getUploadUrl()

      const file = data.file
      const image = await fetch(url, {
        body: file as any,
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
          'Content-Disposition': `attachment; filename="${file.name}"`,
        },
      })

      console.log('***** UPLOAD IMAGE *****', image)

      data = {
        ...data,
        logo: image.url.split('?')[0],
      }
    }

    console.log(data)
    // await updateProfile(data)

    revalidatePath('/dashboard/profile')
  } catch (error: unknown) {
    log.error(formatError(error))
    throw internalServerErrorError()
  }
}
