'use server'

import { equals, isEmpty } from 'ramda'

import { db } from '../../database/queries'
import { Credential, Database } from '../../database/types'
import { Log, log } from '../../logger'
import { CredentialType } from '../../types'
import {
  badRequestError,
  extractIdFromCredential,
  extractIssuerIdFromCredential,
  extractTypeFromCredential,
  formatError,
  internalServerError,
} from '../../utils'

export const _insert =
  ({ db, log }: { db: Database; log: Log }) =>
  async (credential: Credential) => {
    try {
      const connection = await db()

      const credentialId = extractIdFromCredential(credential)
      const credentialIssuerId = extractIssuerIdFromCredential(credential)
      const credentialType = extractTypeFromCredential(credential)

      const user = await connection.getUserById(credentialId)

      if (!isEmpty(user)) {
        throw badRequestError({ resource: 'users', resourceId: credentialId, message: 'User already exists' })
      }

      if (equals(CredentialType.AscsUser)(credentialType as CredentialType)) {
        const principal = await connection.getUserById(credentialIssuerId)

        if (isEmpty(principal)) {
          throw badRequestError({ resource: 'users', resourceId: credentialIssuerId, message: 'Principal not found' })
        }
      }
      return connection.insertUserTx(credential)
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerError()
    }
  }

export const insert = _insert({ db, log })
