import { isNil } from 'ramda'

import { getServerSession } from '../../../common/auth/session'
import { db } from '../../../common/database/queries'
import { badRequest, internalServerError, ok } from '../../../common/utils'
import { isFederator, isPrincipal } from '../utils'

export async function GET(request: Request) {
  try {
    const session = await getServerSession()

    if (isNil(session)) {
      return badRequest()
    }

    if (!isFederator(session) && !isPrincipal(session)) {
      return badRequest()
    }

    const connection = await db()
    const users = await connection.getUsersByIssuerId(session?.user?.pkh)

    return ok(users)
  } catch (error) {
    console.log('error', error)

    return internalServerError()
  }
}

export const dynamic = 'force-dynamic'
