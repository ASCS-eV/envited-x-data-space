'use server'

import { revalidatePath } from 'next/cache'

import { log } from '../../common/logger'
import { activateUserById, deactivateUserById } from '../../common/serverActions/users'
import { formatError, internalServerErrorError } from '../../common/utils'

export async function deactivateUser(id: string) {
  try {
    await deactivateUserById(id)

    revalidatePath('/dashboard/users')
  } catch (error: unknown) {
    log.error(formatError(error))

    throw internalServerErrorError()
  }
}

export async function activateUser(id: string) {
  try {
    await activateUserById(id)

    revalidatePath('/dashboard/users')
  } catch (error: unknown) {
    log.error(formatError(error))

    throw internalServerErrorError()
  }
}
