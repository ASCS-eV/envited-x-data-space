import { NextResponse } from 'next/server'
import { isEmpty, isNil, prop } from 'ramda'

import { getServerSession } from '../../../../common/auth'
import { ERRORS, ERROR_CODES } from '../../../../common/constants/errors'
import { parseGlobalIdentifier } from '../../../../common/globalIdentifiers'
import { db } from '../../../../common/database/queries'

export async function GET(
  request: Request,
  { params: { fullResourceName } }: { params: { fullResourceName: string } },
) {
  try {
    if (isNil(fullResourceName) || isEmpty(fullResourceName)) {
      return NextResponse.json({ error: ERRORS.GLOBAL_IDENTIFIER_MISSING }, { status: ERROR_CODES.BAD_REQUEST })
    }

    const session = await getServerSession()

    if (isNil(session)) {
      return NextResponse.json({ error: ERRORS.UNAUTHORIZED }, { status: ERROR_CODES.UNAUTHORIZED })
    }

    const { scopedIdentifier } = parseGlobalIdentifier(fullResourceName)

    const connection = await db()
    const globalIdentifier = await connection.getGlobalIdentifierByScopedIdentifier(scopedIdentifier)

    if (isNil(globalIdentifier)) {
      return NextResponse.json(null)
    }

    const token = await connection.getTokenByWebGlobalIdentifierId(prop('id')(globalIdentifier))

    return NextResponse.json(token)
  } catch (error) {
    console.error('Error fetching asset:', error)
    return NextResponse.json({ error: ERRORS.INTERNAL_SERVER_ERROR }, { status: ERROR_CODES.INTERNAL_SERVER_ERROR })
  }
}
