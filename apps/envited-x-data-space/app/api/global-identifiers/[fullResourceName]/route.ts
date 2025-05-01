import { parseGlobalIdentifier } from 'apps/envited-x-data-space/common/globalIdentifiers'
import { NextResponse } from 'next/server'
import { isEmpty, isNil } from 'ramda'

import { getServerSession } from '../../../../common/auth'
import { ERRORS, ERROR_CODES } from '../../../../common/constants/errors'
import { db } from '../../../../common/database/queries'

export async function GET(
  request: Request,
  { params: { fullResourceName } }: { params: { fullResourceName: string } },
) {
  try {
    if (isNil(fullResourceName) || isEmpty(fullResourceName)) {
      return NextResponse.json({ error: ERRORS.CID_MISSING }, { status: ERROR_CODES.BAD_REQUEST })
    }

    const session = await getServerSession()

    if (isNil(session)) {
      return NextResponse.json({ error: ERRORS.UNAUTHORIZED }, { status: ERROR_CODES.UNAUTHORIZED })
    }

    const connection = await db()
    const { scopedIdentifier } = parseGlobalIdentifier(fullResourceName)
    const assets = await connection.getGlobalIdentifierByScopedIdentifier(scopedIdentifier)

    return NextResponse.json(assets)
  } catch (error) {
    console.error('Error fetching asset:', error)
    return NextResponse.json({ error: ERRORS.INTERNAL_SERVER_ERROR }, { status: ERROR_CODES.INTERNAL_SERVER_ERROR })
  }
}
