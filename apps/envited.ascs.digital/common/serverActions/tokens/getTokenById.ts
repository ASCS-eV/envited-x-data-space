import { isEmpty, isNil } from 'ramda'

import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { Log, log } from '../../logger'
import { Token } from '../../types'
import { badRequestError, formatError, internalServerErrorError } from '../../utils'

export const _getTokenById =
  ({ db, log }: { db: Database; log: Log }) =>
  async (id: string): Promise<Token> => {
    try {
      if (isNil(id) || isEmpty(id)) {
        throw badRequestError({ resource: 'token', resourceId: id, message: 'Missing ID' })
      }

      console.log('_getTokenById id', id)

      const connection = await db()
      const token = await connection.getTokenById(id)

      console.log('_getTokenById token', id)

      return token
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getTokenById = _getTokenById({ db, log })
