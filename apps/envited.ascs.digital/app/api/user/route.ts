import { equals, isEmpty } from 'ramda'

import { db } from '../../../common/database/queries'
import { CredentialType } from '../../../common/types'
import { badRequest, internalServerError, ok } from '../../../common/utils'
import { extractIdFromCredential, extractIssuerIdFromCredential, extractTypeFromCredential } from '../utils'

export async function POST(request: Request) {
  try {
    const credential = await request.json()

    const connection = await db()

    const credentialId = extractIdFromCredential(credential)
    const credentialIssuerId = extractIssuerIdFromCredential(credential)
    const credentialType = extractTypeFromCredential(credential)

    const user = await connection.getUserById(credentialId)

    if (!isEmpty(user)) {
      return badRequest()
    }

    if (equals(CredentialType.AscsUser)(credentialType as CredentialType)) {
      const principal = await connection.getUserById(credentialIssuerId)

      if (isEmpty(principal)) {
        return badRequest()
      }
    }

    const newUser = await connection.insertUserTx(credential)

    return ok(newUser)
  } catch (error) {
    console.log('error', error)

    return internalServerError()
  }
}

export const dynamic = 'force-dynamic'
