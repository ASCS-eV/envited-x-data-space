import { equals, isNil } from 'ramda'

import { getServerSession } from '../../../../common/auth/session'
import { db } from '../../../../common/database/queries'
import { Role } from '../../../../common/types'
import { badRequest, internalServerError, ok, unauthorized } from '../../../../common/utils'

export async function GET(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerSession()

    if (isNil(session)) {
      return unauthorized()
    }

    const connection = await db()
    const [user] = await connection.getUserById(id)

    if (
      !equals(Role.federator)(session?.user.role) &&
      !equals(id)(session?.user.pkh) &&
      !equals(user.issuerId)(session?.user.pkh)
    ) {
      return badRequest()
    }

    return ok(user)
  } catch (error) {
    console.log('error', error)

    return internalServerError()
  }
}

export const dynamic = 'force-dynamic'
