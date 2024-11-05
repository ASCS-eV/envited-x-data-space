import { cache } from 'react'

import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { Log, log } from '../../logger'
import { Token } from '../../types'
import { extractAddressFromDid, formatError, internalServerErrorError } from '../../utils'

export const _getTokensByProfileSlug =
  ({ db, log }: { db: Database; log: Log }) =>
  async (slug: string): Promise<Token[]> => {
    try {
      const connection = await db()

      const profile = await connection.getProfileBySlug(slug)
      const user = await connection.getUserByIssuerId(profile.name)
      const tokens = await connection.getTokensByIssuerId(extractAddressFromDid(user.id))

      return tokens
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getTokensByProfileSlug = cache(_getTokensByProfileSlug({ db, log }))
