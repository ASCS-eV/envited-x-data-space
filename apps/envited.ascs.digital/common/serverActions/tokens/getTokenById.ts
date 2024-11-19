import { isEmpty, isNil } from 'ramda'

import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { Log, log } from '../../logger'
import { Profile, Token, TokenAttribute } from '../../types'
import { addDidToAddress, badRequestError, formatError, internalServerErrorError } from '../../utils'

export const _getTokenById =
  ({ db, log }: { db: Database; log: Log }) =>
  async (id: string): Promise<{ token: Token & { tokenAttributes: TokenAttribute[] }; profile: Profile }> => {
    try {
      if (isNil(id) || isEmpty(id)) {
        throw badRequestError({ resource: 'token', resourceId: id, message: 'Missing ID' })
      }

      const connection = await db()
      const [token] = await connection.getTokenById(id)
      const [user] = await connection.getUserWithProfileById(addDidToAddress(token.minter))

      const tokenWithTokenAttributes = await connection.getTokenWithAttributesById(id)

      return {
        token: tokenWithTokenAttributes,
        profile: user.profile,
      }
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getTokenById = _getTokenById({ db, log })
