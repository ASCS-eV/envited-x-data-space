import { equals, isEmpty } from 'ramda'

import { db } from '../../database/queries'
import { Credential, Database } from '../../database/types'
import { CredentialType } from '../../types'
import {
  badRequestError,
  error,
  extractIdFromCredential,
  extractIssuerIdFromCredential,
  extractTypeFromCredential,
} from '../../utils'

export const _insert =
  ({ db }: { db: Database }) =>
  async (credential: Credential) => {
    try {
      const connection = await db()

      const credentialId = extractIdFromCredential(credential)
      const credentialIssuerId = extractIssuerIdFromCredential(credential)
      const credentialType = extractTypeFromCredential(credential)

      const user = await connection.getUserById(credentialId)

      if (!isEmpty(user)) {
        throw badRequestError('User already exists')
      }

      if (equals(CredentialType.AscsUser)(credentialType as CredentialType)) {
        const principal = await connection.getUserById(credentialIssuerId)

        if (isEmpty(principal)) {
          return badRequestError('Issuer not found')
        }
      }

      return connection.insertUserTx(credential)
    } catch (e) {
      console.log('error', e)
      return error()
    }
  }

export const insert = _insert({ db })
