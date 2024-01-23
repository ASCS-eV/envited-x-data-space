import { isNil } from 'ramda'

import { getServerSession } from '../../../../common/auth/session'
import { db } from '../../../../common/database/queries'
import { badRequest, internalServerError, ok, unauthorized } from '../../../../common/utils'
import { isOwnUser, userIsIssuedByLoggedInUser } from '../../utils'

export async function GET(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerSession()

    if (isNil(session)) {
      return unauthorized()
    }

    const connection = await db()
    const [user] = await connection.getUserById(id)

    if (!userIsIssuedByLoggedInUser(user)(session?.user.pkh) && !isOwnUser(user)(session?.user.pkh)) {
      return badRequest()
    }

    return ok(user)
  } catch (error) {
    console.log('error', error)

    return internalServerError()
  }
}

export const dynamic = 'force-dynamic'
