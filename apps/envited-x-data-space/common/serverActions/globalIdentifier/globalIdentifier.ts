import { isEmpty, isNil } from 'ramda'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { parseGlobalIdentifier } from '../../globalIdentifiers'
import { Log, log } from '../../logger'
import { Session } from '../../types'
import { badRequestError, formatError, internalServerErrorError, unauthorizedError } from '../../utils'

export const _getGlobalIdentifierById =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (id: string) => {
    try {
      if (isNil(id) || isEmpty(id)) {
        throw badRequestError({ resource: 'globalIdentifier', resourceId: id, message: 'Missing ID' })
      }

      const session = await getServerSession()

      if (isNil(session)) {
        throw unauthorizedError({ resource: 'globalIdentifier' })
      }

      const { scopedIdentifier } = parseGlobalIdentifier(id)

      const connection = await db()
      const [globalIdentifier] = await connection.getGlobalIdentifierByScopedIdentifier(scopedIdentifier)

      return globalIdentifier
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getGlobalIdentifierById = _getGlobalIdentifierById({ db, getServerSession, log })
