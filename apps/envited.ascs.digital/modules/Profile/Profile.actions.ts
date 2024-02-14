'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { updateProfile } from '../../common/serverActions/profiles'
import { error } from '../../common/utils'
import { ProfileSchema, ValidateProfileForm } from './Profile.schema'

type ProfileForm = z.infer<typeof ProfileSchema>

export async function updateProfileForm(data: ProfileForm) {
  try {
    const result = ValidateProfileForm(data)

    if (!result.success) {
      throw error()
    }

    await updateProfile(data)

    revalidatePath('/dashboard/profile')
  } catch (e) {
    console.log('error', e)

    throw error()
  }
}
