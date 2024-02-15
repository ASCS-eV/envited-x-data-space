'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { log } from '../../common/logger'
import { updateProfile } from '../../common/serverActions/profiles'
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

    await updateProfile(data)

    revalidatePath('/dashboard/profile')
  } catch (error: unknown) {
    log.error(formatError(error))
    throw internalServerErrorError()
  }
}
