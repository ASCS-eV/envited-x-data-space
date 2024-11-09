import { cache } from 'react'

import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { Log, log } from '../../logger'
import { Token } from '../../types'
import { formatError, internalServerErrorError } from '../../utils'

export const _getTokens =
  ({ db, log }: { db: Database; log: Log }) =>
  async (): Promise<Token[]> => {
    try {
      const connection = await db()
      const tokens = await connection.getTokens()

      return tokens
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getTokens = cache(_getTokens({ db, log }))
