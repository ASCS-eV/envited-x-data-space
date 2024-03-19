import { Handler } from 'aws-lambda'

import { getPresentCredential } from '../handlers/presentCredential'
import { internalServerError, ok } from '../common/responses'

export const handler: Handler = async (event) => {
  try {
    const { loginId } = event.queryStringParameters
    const result = getPresentCredential(loginId)
    return ok(result)
  } catch (error) {
    return internalServerError(error.message)
  }
}
