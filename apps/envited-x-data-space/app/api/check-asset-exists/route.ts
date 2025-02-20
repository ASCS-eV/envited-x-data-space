import { NextResponse } from 'next/server'
import { isEmpty, isNil, isNotNil } from 'ramda'

import { getServerSession } from '../../../common/auth'
import { db } from '../../../common/database/queries'
import { badRequestError, unauthorizedError } from '../../../common/utils'

export async function POST(req: Request) {
  try {
    const { cid } = await req.json()

    if (isNil(cid) || isEmpty(cid)) {
      throw badRequestError({ resource: 'assets', resourceId: cid, message: 'Missing CID' })
    }

    const session = await getServerSession()

    if (isNil(session)) {
      throw unauthorizedError({ resource: 'assets' })
    }

    const connection = await db()
    const [asset] = await connection.getAssetByCID(cid)

    return NextResponse.json({
      exists: isNotNil(asset),
      message: asset ? 'Asset already exists' : 'New asset',
    })
  } catch (error) {
    return error
  }
}
