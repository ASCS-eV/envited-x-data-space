import { Handler } from 'aws-lambda'

import { internalServerError, ok } from '../common/responses'
import { getPresentCredential } from '../handlers/presentCredential'

export const handler: Handler = async event => {
  try {
    const {
      queryStringParameters: { loginId },
    } = event
    const result = getPresentCredential(loginId)

    return ok(result)
  } catch (error) {
    return internalServerError(error.message)
  }
}