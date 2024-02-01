'use server'

import { revalidatePath } from 'next/cache'

import { log } from '../../common/logger'
import { deleteUserById } from '../../common/serverActions/users/deleteUserById'
import { formatError, internalServerErrorError } from '../../common/utils'

export async function deleteUser(id: string) {
  try {
    await deleteUserById(id)

    revalidatePath('/dashboard/users')
  } catch (error: unknown) {
    log.error(formatError(error))

    throw internalServerErrorError()
  }
}
