import { db } from '../../../common/database/queries'
import { ok } from '../../../common/utils'

export async function GET(request: Request) {
  try {
    const connection = await db()
    const tables = await connection.fetchTables()

    return ok(tables)
  } catch (error) {
    console.log('error', error)
    return Response.json(error)
  }
}

export const dynamic = 'force-dynamic'
