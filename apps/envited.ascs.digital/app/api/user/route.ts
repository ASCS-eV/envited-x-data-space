import { db } from '../../../common/database/queries'
import { internalServerError, ok } from '../../../common/utils'

export async function POST(request: Request) {
  try {
    const credential = await request.json()

    const connection = await db()
    const newUser = await connection.insertUserTx(credential)

    return ok(newUser)
  } catch (error) {
    console.log('error', error)

    return internalServerError()
  }
}

export const dynamic = 'force-dynamic'
