import { isEmpty, isNil } from 'ramda'

import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { Log, log } from '../../logger'
import { Profile, Token, TokenAttributes } from '../../types'
import { addDidToAddress, badRequestError, formatError, internalServerErrorError } from '../../utils'

export const _getTokenById =
  ({ db, log }: { db: Database; log: Log }) =>
  async (id: string): Promise<{ token: Token; tokenAttributes: TokenAttributes[]; profile: Profile }> => {
    try {
      if (isNil(id) || isEmpty(id)) {
        throw badRequestError({ resource: 'token', resourceId: id, message: 'Missing ID' })
      }

      const connection = await db()
      const [token] = await connection.getTokenById(id)
      const [user] = await connection.getUserWithProfileById(addDidToAddress(token.minter))
      const tokenAttributes = await connection.getTokenAttributesById(id)

      return {
        token,
        tokenAttributes,
        profile: user.profile,
      }
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getTokenById = _getTokenById({ db, log })
