'use server'

import { revalidatePath } from 'next/cache'
import { dissoc } from 'ramda'
import { z } from 'zod'

import { getUploadUrl } from '../../common/aws'
import { log } from '../../common/logger'
import { updateProfile } from '../../common/serverActions/profiles'
import { badRequestError, formatError, internalServerErrorError, slugify } from '../../common/utils'
import { ProfileSchema, ValidateProfileForm } from './Profile.schema'

type ProfileForm = z.infer<typeof ProfileSchema>

export async function updateProfileForm(formData: FormData) {
  const file = formData.get('file') as File
  let data = JSON.parse(formData.get('data') as string) as ProfileForm

  try {
    const result = ValidateProfileForm(data)

    if (!result.success) {
      throw badRequestError({
        resource: 'profiles',
        resourceId: data.name,
        message: 'Profile validate form data failed',
      })
    }
    console.log(file)
    if (file) {
      const arrayBuffer = Buffer.from(await file.arrayBuffer())
      const url = await getUploadUrl(slugify(data.name), file.name)
      console.log(url)
      const image = await fetch(url, {
        body: arrayBuffer,
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
          'Content-Disposition': `attachment; filename="${file.name}"`,
        },
      })
      console.log(image)
      data = { ...data, logo: image.url.split('?')[0] }
    }

    await updateProfile(dissoc('businessCategories')(data), data.businessCategories)

    revalidatePath('/dashboard/profile')
  } catch (error: unknown) {
    log.error(formatError(error))
    throw internalServerErrorError()
  }
}
