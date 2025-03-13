import { NextResponse } from 'next/server'
import { isEmpty, isNil } from 'ramda'

import { getServerSession } from '../../../../common/auth'
import { ERRORS, ERROR_CODES } from '../../../../common/constants/errors'
import { db } from '../../../../common/database/queries'

export async function GET(request: Request, { params: { cid } }: { params: { cid: string } }) {
  try {
    if (isNil(cid) || isEmpty(cid)) {
      return NextResponse.json({ error: ERRORS.CID_MISSING }, { status: ERROR_CODES.BAD_REQUEST })
    }

    const session = await getServerSession()

    if (isNil(session)) {
      return NextResponse.json({ error: ERRORS.UNAUTHORIZED }, { status: ERROR_CODES.UNAUTHORIZED })
    }

    const connection = await db()
    const assets = await connection.getAssetByCID(cid)

    return NextResponse.json(assets)
  } catch (error) {
    console.error('Error fetching asset:', error)
    return NextResponse.json({ error: ERRORS.INTERNAL_SERVER_ERROR }, { status: ERROR_CODES.INTERNAL_SERVER_ERROR })
  }
}
