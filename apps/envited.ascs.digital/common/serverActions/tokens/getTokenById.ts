import { isEmpty, isNil } from 'ramda'

import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { Log, log } from '../../logger'
import { Token, TokenAttributes } from '../../types'
import { badRequestError, formatError, internalServerErrorError } from '../../utils'

export const _getTokenById =
  ({ db, log }: { db: Database; log: Log }) =>
  async (id: string): Promise<{ token: Token; tokenAttributes: TokenAttributes[] }> => {
    try {
      if (isNil(id) || isEmpty(id)) {
        throw badRequestError({ resource: 'token', resourceId: id, message: 'Missing ID' })
      }

      const connection = await db()
      const [token] = await connection.getTokenById(id)
      console.log({ token })
      const tokenAttributes = await connection.getTokenAttributesById(id)
      console.log({ tokenAttributes })

      return {
        token,
        tokenAttributes,
      }
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getTokenById = _getTokenById({ db, log })
