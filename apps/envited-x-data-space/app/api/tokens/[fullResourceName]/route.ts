import { NextResponse } from 'next/server'
import { equals, isEmpty, isNil, prop } from 'ramda'

import { getServerSession } from '../../../../common/auth'
import { ERRORS, ERROR_CODES } from '../../../../common/constants/errors'
import { db } from '../../../../common/database/queries'
import { parseGlobalIdentifier } from '../../../../common/globalIdentifiers'
import { IdentifierMethod } from '../../../../common/types'

export async function GET(
  _request: Request,
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

    const { method, scopedIdentifier } = parseGlobalIdentifier(fullResourceName)

    const connection = await db()
    const globalIdentifier = await connection.getGlobalIdentifierByScopedIdentifier(scopedIdentifier)

    if (isNil(globalIdentifier)) {
      return NextResponse.json(null)
    }

    if (equals(method)(IdentifierMethod.didWeb)) {
      const token = await connection.getTokenByWebGlobalIdentifierId(prop('id')(globalIdentifier))

      return NextResponse.json(token)
    }

    return NextResponse.json(null)
  } catch (error) {
    console.error('Error fetching asset:', error)
    return NextResponse.json({ error: ERRORS.INTERNAL_SERVER_ERROR }, { status: ERROR_CODES.INTERNAL_SERVER_ERROR })
  }
}
