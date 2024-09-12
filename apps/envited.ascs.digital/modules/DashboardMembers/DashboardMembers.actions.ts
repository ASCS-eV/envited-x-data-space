'use server'

import { revalidatePath } from 'next/cache'

import { log } from '../../common/logger'
import { activateMemberById, deactivateMemberById } from '../../common/serverActions/members'
import { formatError, internalServerErrorError } from '../../common/utils'

export async function deactivateMember(id: string) {
  try {
    await deactivateMemberById(id)

    revalidatePath('/dashboard/members')
  } catch (error: unknown) {
    log.error(formatError(error))

    throw internalServerErrorError()
  }
}

export async function activateMember(id: string) {
  try {
    await activateMemberById(id)

    revalidatePath('/dashboard/members')
  } catch (error: unknown) {
    log.error(formatError(error))

    throw internalServerErrorError()
  }
}
