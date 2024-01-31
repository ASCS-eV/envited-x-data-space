'use server'

import { revalidatePath } from 'next/cache'

import { deleteUserById } from '../../common/serverActions/users/deleteUserById'
import { error } from '../../common/utils'

export async function deleteUser(id: string) {
  try {
    await deleteUserById(id)

    revalidatePath('/dashboard/users')
  } catch (e) {
    console.log('error', e)
    throw error()
  }
}
