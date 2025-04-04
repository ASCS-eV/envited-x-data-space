import { isEmpty, isNil } from 'ramda'

import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { Log, log } from '../../logger'
import { Profile, Token, TokenAttribute } from '../../types'
import { badRequestError, formatError, internalServerErrorError } from '../../utils'

export const _getTokenById =
  ({ db, log }: { db: Database; log: Log }) =>
  async (id: string): Promise<{ token: Token & { tokenAttributes: TokenAttribute[] }; profile: Profile }> => {
    try {
      if (isNil(id) || isEmpty(id)) {
        throw badRequestError({ resource: 'token', resourceId: id, message: 'Missing ID' })
      }

      const connection = await db()
      const [token] = await connection.getTokenById(id)
      const minterGuid = await connection.getGlobalIdentifierById(token.minterGlobalIdentifierId)
      const user = await connection.getUserByDid({
        method: minterGuid.method,
        namespace: minterGuid.namespace,
        chainId: minterGuid.chainId,
        nss: minterGuid.nss,
      })
      const profile = await connection.getProfileByName(user.name)
      const tokenWithTokenAttributes = await connection.getTokenWithAttributesById(id)

      return {
        token: tokenWithTokenAttributes,
        profile: profile,
      }
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getTokenById = _getTokenById({ db, log })
